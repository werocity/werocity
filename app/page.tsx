"use client";

import { useState } from "react";

const PROPERTY_TYPES = [
  "Appartement",
  "Maison",
  "Immeuble de rapport",
  "Local commercial",
  "Terrain",
  "Bureau",
];

const STEPS = ["Localisation", "Caractéristiques", "Prix"];

export default function Home() {
  const [step, setStep] = useState(0);
  const [formMode, setFormMode] = useState<"manual" | "cadastre">("manual");
  const [cadastre, setCadastre] = useState({ dept: "", section: "", numero: "" });
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [form, setForm] = useState({
    address: "",
    propertyType: "",
    surface: "",
    rooms: "",
    floor: "",
    dpe: "",
    price: "",
    pricePerSqm: "",
    agencyFees: "" as "" | "included" | "extra" | "unknown",
    listingRef: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "surface" || field === "price") {
        const s = parseFloat(next.surface);
        const p = parseFloat(next.price);
        if (s > 0 && p > 0) {
          next.pricePerSqm = Math.round(p / s).toString();
        } else {
          next.pricePerSqm = "";
        }
      }
      return next;
    });
  }

  function handleNext() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Analyse en cours…");
  }

  const canProceedStep0 = form.address.trim().length > 3 && !!form.propertyType;
  const canProceedStep1 = parseFloat(form.surface) > 0;
  const canProceedStep2 = parseFloat(form.price) > 0 && !!form.agencyFees;

  return (
    <div style={{ backgroundColor: "#FAFAF7", color: "#1A1916", minHeight: "100vh" }}>
      {/* ── Header ── */}
      <header
        style={{ backgroundColor: "#1A1916" }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
      >
        <div className="flex items-center gap-3">
          <div
            style={{ backgroundColor: "#E8A020" }}
            className="flex h-9 w-9 items-center justify-center rounded-sm"
          >
            <span style={{ color: "#1A1916" }} className="text-xl font-black leading-none">
              W
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Werocity</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" style={{ color: "#E8A020" }} className="text-sm font-medium hover:opacity-80 transition-opacity">
            Fonctionnalités
          </a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Tarifs
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm font-medium text-white/70 hover:text-white transition-colors md:block"
          >
            Espace client
          </a>
          <button
            style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
            className="rounded-md px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 active:scale-95"
          >
            Commencer gratuitement
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <main>
        <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center md:px-12 md:pt-28">
          <div
            style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Analyse urbanistique instantanée
          </div>

          <h1
            className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
            style={{ color: "#1A1916" }}
          >
            Analysez le potentiel{" "}
            <span style={{ color: "#E8A020" }}>urbanistique</span> de n&apos;importe quel bien{" "}
            <span style={{ color: "#E8A020" }}>en quelques minutes</span>
          </h1>

          <p
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed"
            style={{ color: "#1A1916", opacity: 0.65 }}
          >
            Coefficients d&apos;occupation des sols, droits à construire, règles PLU — Werocity
            décrypte les données urbanistiques pour chaque adresse en France et calcule
            la valeur cachée de vos investissements.
          </p>

          {/* Social proof strip */}
          <div
            className="mb-12 flex flex-wrap items-center justify-center gap-6 text-sm"
            style={{ color: "#1A1916", opacity: 0.55 }}
          >
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1l2.39 4.84L18 6.72l-4 3.9.94 5.49L10 13.77l-4.94 2.34.94-5.49-4-3.9 5.61-.88z" />
              </svg>
              +2 400 investisseurs actifs
            </span>
            <span className="h-4 w-px" style={{ backgroundColor: "#1A1916", opacity: 0.2 }} />
            <span>1 analyse = quelques minutes</span>
            <span className="h-4 w-px" style={{ backgroundColor: "#1A1916", opacity: 0.2 }} />
            <span>Données PLU en temps réel</span>
          </div>

          {/* ── Multi-step form ── */}
          <div
            className="mx-auto max-w-2xl rounded-2xl border p-8 shadow-xl"
            style={{ backgroundColor: "#ffffff", borderColor: "#E8A020" }}
          >
            {/* Mode toggle */}
            <div
              className="mb-8 flex rounded-xl p-1"
              style={{ backgroundColor: "#F0EFE9" }}
            >
              {(
                [
                  { value: "manual", label: "Saisie manuelle" },
                  { value: "cadastre", label: "Référence cadastrale" },
                ] as const
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormMode(value)}
                  className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: formMode === value ? "#1A1916" : "transparent",
                    color: formMode === value ? "#FAFAF7" : "#1A1916",
                    opacity: formMode === value ? 1 : 0.5,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Cadastre mode ── */}
            {formMode === "cadastre" && (
              <div>
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                      Département
                    </label>
                    <input
                      type="text"
                      placeholder="34"
                      maxLength={3}
                      value={cadastre.dept}
                      onChange={(e) => setCadastre((p) => ({ ...p, dept: e.target.value }))}
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      style={{ borderColor: "#E5E7EB", color: "#1A1916", backgroundColor: "#FAFAF7" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                      Section
                    </label>
                    <input
                      type="text"
                      placeholder="AC"
                      maxLength={2}
                      value={cadastre.section}
                      onChange={(e) => setCadastre((p) => ({ ...p, section: e.target.value.toUpperCase() }))}
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      style={{ borderColor: "#E5E7EB", color: "#1A1916", backgroundColor: "#FAFAF7" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                      Numéro
                    </label>
                    <input
                      type="text"
                      placeholder="0427"
                      maxLength={4}
                      value={cadastre.numero}
                      onChange={(e) => setCadastre((p) => ({ ...p, numero: e.target.value }))}
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      style={{ borderColor: "#E5E7EB", color: "#1A1916", backgroundColor: "#FAFAF7" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!cadastre.dept || !cadastre.section || !cadastre.numero}
                  onClick={() => alert("Analyse cadastrale en cours…")}
                  className="w-full rounded-lg py-3 text-sm font-bold transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
                >
                  Analyser →
                </button>

                <p className="mt-4 text-center text-xs" style={{ color: "#1A1916", opacity: 0.35 }}>
                  Source : IGN WFS Cadastre
                </p>
              </div>
            )}

            {/* ── Manual mode ── */}
            {formMode === "manual" && (
              <>
            {/* Step indicator */}
            <div className="mb-8 flex items-center justify-between">
              {STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors"
                      style={{
                        backgroundColor: i <= step ? "#E8A020" : "#F0EFE9",
                        color: i <= step ? "#1A1916" : "#9CA3AF",
                      }}
                    >
                      {i < step ? (
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: i <= step ? "#1A1916" : "#9CA3AF" }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="mx-2 mb-5 h-px flex-1 transition-colors"
                      style={{ backgroundColor: i < step ? "#E8A020" : "#E5E7EB" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 0 — Localisation */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-semibold"
                      style={{ color: "#1A1916" }}
                    >
                      Adresse du bien
                    </label>
                    <input
                      type="text"
                      placeholder="12 rue de la Paix, 75001 Paris"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      style={{
                        borderColor: "#E5E7EB",
                        color: "#1A1916",
                        backgroundColor: "#FAFAF7",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-semibold"
                      style={{ color: "#1A1916" }}
                    >
                      Type de bien
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => update("propertyType", type)}
                          className="rounded-lg border px-3 py-2.5 text-sm transition-all"
                          style={{
                            borderColor:
                              form.propertyType === type ? "#E8A020" : "#E5E7EB",
                            backgroundColor:
                              form.propertyType === type ? "#FFF8EE" : "#ffffff",
                            color:
                              form.propertyType === type ? "#1A1916" : "#6B7280",
                            fontWeight: form.propertyType === type ? 600 : 400,
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1 — Caractéristiques */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="mb-1.5 block text-sm font-semibold"
                        style={{ color: "#1A1916" }}
                      >
                        Surface (m²)
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="75"
                        value={form.surface}
                        onChange={(e) => update("surface", e.target.value)}
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                        style={{
                          borderColor: "#E5E7EB",
                          color: "#1A1916",
                          backgroundColor: "#FAFAF7",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                      />
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block text-sm font-semibold"
                        style={{ color: "#1A1916" }}
                      >
                        Nombre de pièces
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        placeholder="3"
                        value={form.rooms}
                        onChange={(e) => update("rooms", e.target.value)}
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                        style={{
                          borderColor: "#E5E7EB",
                          color: "#1A1916",
                          backgroundColor: "#FAFAF7",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="mb-1.5 block text-sm font-semibold"
                        style={{ color: "#1A1916" }}
                      >
                        Étage
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="2"
                        value={form.floor}
                        onChange={(e) => update("floor", e.target.value)}
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                        style={{
                          borderColor: "#E5E7EB",
                          color: "#1A1916",
                          backgroundColor: "#FAFAF7",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                      />
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block text-sm font-semibold"
                        style={{ color: "#1A1916" }}
                      >
                        DPE
                      </label>
                      <div className="flex gap-1.5">
                        {(["A", "B", "C", "D", "E", "F", "G"] as const).map((letter) => {
                          const colors: Record<string, string> = {
                            A: "#22C55E",
                            B: "#86EFAC",
                            C: "#BEF264",
                            D: "#FDE047",
                            E: "#FDBA74",
                            F: "#F97316",
                            G: "#EF4444",
                          };
                          return (
                            <button
                              key={letter}
                              type="button"
                              onClick={() => update("dpe", letter)}
                              className="flex-1 rounded py-2 text-xs font-bold transition-all"
                              style={{
                                backgroundColor:
                                  form.dpe === letter ? colors[letter] : "#F3F4F6",
                                color: form.dpe === letter ? "#1A1916" : "#9CA3AF",
                                outline:
                                  form.dpe === letter
                                    ? `2px solid ${colors[letter]}`
                                    : "none",
                                outlineOffset: "1px",
                              }}
                            >
                              {letter}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 — Prix */}
              {step === 2 && (
                <div className="space-y-4">
                  {/* Prix demandé */}
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-semibold"
                      style={{ color: "#1A1916" }}
                    >
                      Prix demandé (€)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        placeholder="320000"
                        value={form.price}
                        onChange={(e) => update("price", e.target.value)}
                        className="w-full rounded-lg border px-4 py-3 pr-12 text-sm outline-none"
                        style={{
                          borderColor: "#E5E7EB",
                          color: "#1A1916",
                          backgroundColor: "#FAFAF7",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                      />
                      <span
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium"
                        style={{ color: "#9CA3AF" }}
                      >
                        €
                      </span>
                    </div>
                  </div>

                  {form.pricePerSqm && (
                    <div
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-sm"
                      style={{ backgroundColor: "#FFF8EE", borderLeft: "3px solid #E8A020" }}
                    >
                      <span style={{ color: "#1A1916", opacity: 0.7 }}>Prix au m²</span>
                      <span className="font-bold" style={{ color: "#E8A020" }}>
                        {parseInt(form.pricePerSqm).toLocaleString("fr-FR")} €/m²
                      </span>
                    </div>
                  )}

                  {/* Honoraires agence */}
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-semibold"
                      style={{ color: "#1A1916" }}
                    >
                      Honoraires agence
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { value: "included", label: "Inclus (FAI)" },
                          { value: "extra", label: "En sus" },
                          { value: "unknown", label: "Non précisé" },
                        ] as const
                      ).map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => update("agencyFees", value)}
                          className="rounded-lg border px-3 py-2.5 text-sm transition-all"
                          style={{
                            borderColor: form.agencyFees === value ? "#E8A020" : "#E5E7EB",
                            backgroundColor: form.agencyFees === value ? "#FFF8EE" : "#ffffff",
                            color: form.agencyFees === value ? "#1A1916" : "#6B7280",
                            fontWeight: form.agencyFees === value ? 600 : 400,
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>


                  <div
                    className="rounded-lg p-4 text-sm"
                    style={{ backgroundColor: "#F8F9FA", border: "1px solid #E5E7EB" }}
                  >
                    <p className="mb-2 font-semibold" style={{ color: "#1A1916" }}>
                      Ce que vous obtiendrez :
                    </p>
                    <ul className="space-y-1.5" style={{ color: "#1A1916", opacity: 0.7 }}>
                      {[
                        "Droits à construire & COS du PLU",
                        "Potentiel de surélévation estimé",
                        "Valorisation des m² constructibles",
                        "Résumé des règles de zone",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span style={{ color: "#E8A020" }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 rounded-lg border py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#E5E7EB", color: "#1A1916" }}
                  >
                    Retour
                  </button>
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 0 ? !canProceedStep0 : !canProceedStep1}
                    className="flex-1 rounded-lg py-3 text-sm font-semibold transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
                  >
                    Continuer
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canProceedStep2}
                    className="flex-1 rounded-lg py-3 text-sm font-bold transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: "#1A1916", color: "#FAFAF7" }}
                  >
                    Lancer l&apos;analyse →
                  </button>
                )}
              </div>
            </form>
              </>
            )}
          </div>
        </section>

        {/* ── Features grid ── */}
        <section className="mx-auto max-w-5xl px-6 py-20 md:px-12">
          <h2
            className="mb-12 text-center text-3xl font-extrabold tracking-tight"
            style={{ color: "#1A1916" }}
          >
            Tout ce dont vous avez besoin pour{" "}
            <span style={{ color: "#E8A020" }}>investir avec conviction</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🗺️",
                title: "PLU en temps réel",
                desc: "Accès direct aux Plans Locaux d'Urbanisme de toutes les communes françaises, mis à jour en continu.",
              },
              {
                icon: "📐",
                title: "Droits à construire",
                desc: "COS, emprise au sol, hauteur maximale — tous les paramètres qui déterminent la valeur cachée d'un bien.",
              },
              {
                icon: "📊",
                title: "Valorisation instantanée",
                desc: "Estimation du potentiel de surélévation ou d'extension et de sa valeur marché en quelques minutes.",
              },
              {
                icon: "⚡",
                title: "Résultat en quelques minutes",
                desc: "Entrez une adresse, obtenez une analyse complète. Pas de formulaire interminable, pas d'attente.",
              },
              {
                icon: "🔒",
                title: "Données certifiées",
                desc: "Sources officielles : Géoportail de l'Urbanisme, IGN, bases DVF pour les prix de référence.",
              },
              {
                icon: "📤",
                title: "Export PDF",
                desc: "Téléchargez un rapport complet pour vos due diligences, vos banquiers ou vos associés.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border p-6 transition-shadow hover:shadow-md"
                style={{ borderColor: "#E5E7EB", backgroundColor: "#ffffff" }}
              >
                <div className="mb-4 text-3xl">{icon}</div>
                <h3 className="mb-2 text-base font-bold" style={{ color: "#1A1916" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#1A1916", opacity: 0.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="tarifs" className="mx-auto max-w-5xl px-6 py-20 md:px-12">
          <h2
            className="mb-4 text-center text-3xl font-extrabold tracking-tight"
            style={{ color: "#1A1916" }}
          >
            Des tarifs simples,{" "}
            <span style={{ color: "#E8A020" }}>sans surprise</span>
          </h2>
          <p className="mb-10 text-center text-base" style={{ color: "#1A1916", opacity: 0.6 }}>
            Commencez gratuitement. Passez au plan supérieur quand vous en avez besoin.
          </p>

          {/* Billing toggle */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
              style={{
                backgroundColor: billing === "monthly" ? "#1A1916" : "transparent",
                color: billing === "monthly" ? "#FAFAF7" : "#1A1916",
                border: "1px solid",
                borderColor: billing === "monthly" ? "#1A1916" : "#E5E7EB",
              }}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all"
              style={{
                backgroundColor: billing === "annual" ? "#1A1916" : "transparent",
                color: billing === "annual" ? "#FAFAF7" : "#1A1916",
                border: "1px solid",
                borderColor: billing === "annual" ? "#1A1916" : "#E5E7EB",
              }}
            >
              Annuel
              <span
                className="rounded-full px-2 py-0.5 text-xs font-bold"
                style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
              >
                −17%
              </span>
            </button>
          </div>

          {/* Plans grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Découverte */}
            <div
              className="rounded-2xl border p-8 flex flex-col"
              style={{ borderColor: "#E5E7EB", backgroundColor: "#ffffff" }}
            >
              <div className="mb-6">
                <p className="mb-1 text-sm font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                  Découverte
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold" style={{ color: "#1A1916" }}>0€</span>
                </div>
                <p className="mt-1 text-sm" style={{ color: "#1A1916", opacity: 0.5 }}>
                  2 analyses au total · Sans CB
                </p>
              </div>
              <ul className="mb-8 flex-1 space-y-3 text-sm" style={{ color: "#1A1916", opacity: 0.75 }}>
                {[
                  "2 analyses incluses",
                  "Rapport urbanistique complet",
                  "Droits à construire & COS",
                  "Export PDF",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span style={{ color: "#E8A020" }} className="mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full rounded-lg border py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#1A1916" }}
              >
                Commencer gratuitement
              </button>
            </div>

            {/* Pro */}
            <div
              className="rounded-2xl border p-8 flex flex-col"
              style={{ borderColor: "#E5E7EB", backgroundColor: "#ffffff" }}
            >
              <div className="mb-6">
                <p className="mb-1 text-sm font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                  Pro
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold" style={{ color: "#1A1916" }}>
                    {billing === "annual" ? "24€" : "29€"}
                  </span>
                  <span className="mb-1 text-sm" style={{ color: "#1A1916", opacity: 0.5 }}>/mois</span>
                </div>
                {billing === "annual" ? (
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
                    >
                      2 mois offerts
                    </span>
                    <span className="text-sm" style={{ color: "#1A1916", opacity: 0.5 }}>
                      288€/an
                    </span>
                  </div>
                ) : (
                  <p className="mt-1 text-sm" style={{ color: "#1A1916", opacity: 0.5 }}>Facturé mensuellement</p>
                )}
              </div>
              <ul className="mb-8 flex-1 space-y-3 text-sm" style={{ color: "#1A1916", opacity: 0.75 }}>
                {[
                  "30 analyses / mois",
                  "Rapport urbanistique complet",
                  "Droits à construire & COS",
                  "Export PDF",
                  "Historique des analyses",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span style={{ color: "#E8A020" }} className="mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full rounded-lg border py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB", color: "#1A1916" }}
              >
                Choisir Pro
              </button>
            </div>

            {/* Expert — highlighted */}
            <div
              className="rounded-2xl p-8 flex flex-col relative"
              style={{ backgroundColor: "#1A1916" }}
            >
              {/* Badge */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold whitespace-nowrap"
                style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
              >
                Le plus populaire
              </div>

              <div className="mb-6">
                <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-white/50">
                  Expert
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {billing === "annual" ? "66€" : "79€"}
                  </span>
                  <span className="mb-1 text-sm text-white/50">/mois</span>
                </div>
                {billing === "annual" ? (
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
                    >
                      2 mois offerts
                    </span>
                    <span className="text-sm text-white/50">792€/an</span>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-white/50">Facturé mensuellement</p>
                )}
              </div>
              <ul className="mb-8 flex-1 space-y-3 text-sm text-white/80">
                {[
                  "Analyses illimitées",
                  "Rapport urbanistique complet",
                  "Droits à construire & COS",
                  "Export PDF",
                  "Historique des analyses",
                  "Support prioritaire",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span style={{ color: "#E8A020" }} className="mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full rounded-lg py-3 text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
              >
                Choisir Expert
              </button>
            </div>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section
          className="mx-6 mb-20 rounded-2xl px-8 py-16 text-center md:mx-12"
          style={{ backgroundColor: "#1A1916" }}
        >
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
            Prêt à trouver la valeur cachée
            <br className="hidden md:block" /> de votre prochain bien ?
          </h2>
          <p className="mb-8 text-base text-white/60">
            Gratuit pour les 2 premières analyses. Aucune carte bancaire requise.
          </p>
          <button
            style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
            className="rounded-lg px-8 py-4 text-base font-bold transition-opacity hover:opacity-90"
          >
            Commencer gratuitement →
          </button>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t py-10" style={{ borderColor: "#E5E7EB" }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-12">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "#E8A020" }}
              className="flex h-6 w-6 items-center justify-center rounded-sm"
            >
              <span style={{ color: "#1A1916" }} className="text-xs font-black">
                W
              </span>
            </div>
            <span className="text-sm font-semibold" style={{ color: "#1A1916" }}>
              Werocity
            </span>
          </div>
          <p className="text-xs" style={{ color: "#1A1916", opacity: 0.4 }}>
            © 2026 Werocity — Analyse urbanistique instantanée
          </p>
          <div className="flex gap-5 text-xs" style={{ color: "#1A1916", opacity: 0.5 }}>
            <a href="#" className="hover:opacity-100">CGU</a>
            <a href="#" className="hover:opacity-100">Confidentialité</a>
            <a href="#" className="hover:opacity-100">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
