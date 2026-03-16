import { NextRequest, NextResponse } from "next/server";

interface BanFeature {
  geometry: { coordinates: [number, number] };
  properties: { label: string; city: string; postcode: string; citycode: string };
}

interface DvfTransaction {
  valeur_fonciere?: number;
  surface_reelle_bati?: number;
  date_mutation?: string;
  nature_mutation?: string;
  type_local?: string;
}

interface GeorisqueRisque {
  libelle_risque?: string;
  code_risque?: string;
  present?: boolean;
  alea?: string;
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, surface, prix, dpe, terrain } = body as {
      address: string;
      surface?: string;
      prix?: string;
      dpe?: string;
      terrain?: string;
    };

    if (!address?.trim()) {
      return NextResponse.json({ error: "Adresse manquante" }, { status: 400 });
    }

    // ── 1. Géocodage BAN ──────────────────────────────────────────────────────
    const banRes = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`,
      { next: { revalidate: 3600 } }
    );
    if (!banRes.ok) {
      return NextResponse.json({ error: "Erreur API géocodage" }, { status: 502 });
    }
    const banData = await banRes.json();
    const features: BanFeature[] = banData.features ?? [];
    if (!features.length) {
      return NextResponse.json({ error: "Adresse introuvable" }, { status: 404 });
    }

    const feat = features[0];
    const [longitude, latitude] = feat.geometry.coordinates;
    const { label: adresseGeocodee, city, postcode, citycode } = feat.properties;

    // ── 2. Risques + DVF en parallèle ─────────────────────────────────────────
    const [risquesRes, dvfRes] = await Promise.allSettled([
      fetch(
        `https://georisques.gouv.fr/api/v1/resultats_par_commune?code_insee=${citycode}`,
        { next: { revalidate: 86400 } }
      ),
      fetch(
        `https://api.cquest.org/dvf?code_commune=${citycode}&nature_mutation=Vente`,
        { next: { revalidate: 3600 } }
      ),
    ]);

    // Géorisques
    let risquesActifs: GeorisqueRisque[] = [];
    if (risquesRes.status === "fulfilled" && risquesRes.value.ok) {
      const raw = await risquesRes.value.json();
      const liste: GeorisqueRisque[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw.risques)
        ? raw.risques
        : [];
      risquesActifs = liste.filter((r) => r.present === true);
    }

    // DVF
    let transactions: DvfTransaction[] = [];
    if (dvfRes.status === "fulfilled" && dvfRes.value.ok) {
      const raw = await dvfRes.value.json();
      transactions = Array.isArray(raw) ? raw : (raw.resultats ?? raw.features ?? []);
    }

    // ── 3. Calcul du score ────────────────────────────────────────────────────
    const prixSaisi = parseFloat(prix ?? "0") || 0;
    const surfaceSaisie = parseFloat(surface ?? "0") || 0;
    const surfaceTerrain = parseFloat(terrain ?? "0") || surfaceSaisie;
    const prixM2Saisi = surfaceSaisie > 0 ? prixSaisi / surfaceSaisie : 0;

    // Prix au m² des transactions DVF
    const prixM2DVF = transactions
      .filter((t) => t.valeur_fonciere && t.surface_reelle_bati && t.surface_reelle_bati > 5)
      .map((t) => t.valeur_fonciere! / t.surface_reelle_bati!);
    const medianeDVF = median(prixM2DVF);

    // Prix vs médiane DVF — 20 pts
    let scorePrix = 10;
    if (medianeDVF && prixM2Saisi > 0) {
      const ratio = prixM2Saisi / medianeDVF;
      if (ratio <= 0.9) scorePrix = 20;
      else if (ratio <= 1.0) scorePrix = 17;
      else if (ratio <= 1.1) scorePrix = 13;
      else if (ratio <= 1.2) scorePrix = 8;
      else scorePrix = 3;
    }

    // DPE — 15 pts
    const dpeScores: Record<string, number> = {
      A: 15, B: 12, C: 10, D: 7, E: 4, F: 2, G: 0,
    };
    const scoreDPE = dpe ? (dpeScores[dpe.toUpperCase()] ?? 7) : 7;

    // Surface terrain — 25 pts
    let scoreTerrain: number;
    if (surfaceTerrain >= 500) scoreTerrain = 25;
    else if (surfaceTerrain >= 200) scoreTerrain = 20;
    else if (surfaceTerrain >= 100) scoreTerrain = 15;
    else if (surfaceTerrain >= 50) scoreTerrain = 10;
    else scoreTerrain = 5;

    // Risques — 20 pts (moins de risques = mieux)
    let scoreRisques: number;
    const nbRisques = risquesActifs.length;
    if (nbRisques === 0) scoreRisques = 20;
    else if (nbRisques === 1) scoreRisques = 17;
    else if (nbRisques === 2) scoreRisques = 14;
    else if (nbRisques === 3) scoreRisques = 10;
    else scoreRisques = 5;

    // Nb transactions — 20 pts
    let scoreTransactions: number;
    const nbTx = transactions.length;
    if (nbTx >= 20) scoreTransactions = 20;
    else if (nbTx >= 10) scoreTransactions = 16;
    else if (nbTx >= 5) scoreTransactions = 11;
    else if (nbTx >= 1) scoreTransactions = 6;
    else scoreTransactions = 0;

    const score =
      scorePrix + scoreDPE + scoreTerrain + scoreRisques + scoreTransactions;

    let verdict: string;
    if (score >= 75) verdict = "Excellente opportunité";
    else if (score >= 55) verdict = "Opportunité intéressante";
    else if (score >= 35) verdict = "À analyser avec attention";
    else verdict = "Risques significatifs";

    return NextResponse.json({
      adresseGeocodee,
      ville: city,
      codePostal: postcode,
      coordonnees: { latitude, longitude },
      codeInsee: citycode,
      risques: risquesActifs,
      transactions: {
        total: nbTx,
        medianeM2: medianeDVF ? Math.round(medianeDVF) : null,
        echantillon: transactions.slice(0, 5),
      },
      score,
      details: { scorePrix, scoreDPE, scoreTerrain, scoreRisques, scoreTransactions },
      verdict,
    });
  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
