"use client";

import { useState } from "react";

function scoreColor(s: number) {
  if (s >= 70) return "#22A060";
  if (s >= 50) return "#E8A020";
  return "#EF4444";
}
function scoreBg(s: number) {
  if (s >= 70) return "#F0FDF4";
  if (s >= 50) return "#FFF8EE";
  return "#FEF2F2";
}

const ALL_ANALYSES = [
  { address: "12 rue de la Paix", city: "Paris 1er", score: 78, zone: "UA", price: "480 000 €", dpe: "C", market: "Paris", date: "14 mars 2026" },
  { address: "8 avenue Gambetta", city: "Lyon 3e", score: 62, zone: "UB", price: "325 000 €", dpe: "D", market: "Lyon", date: "13 mars 2026" },
  { address: "3 impasse des Lilas", city: "Bordeaux", score: 85, zone: "UC", price: "290 000 €", dpe: "B", market: "Bordeaux", date: "12 mars 2026" },
  { address: "27 rue Nationale", city: "Vierzon", score: 41, zone: "N", price: "78 000 €", dpe: "F", market: "Autres", date: "11 mars 2026" },
  { address: "15 chemin du Moulin", city: "Agde", score: 73, zone: "AU", price: "195 000 €", dpe: "C", market: "Autres", date: "10 mars 2026" },
  { address: "4 place Bellecour", city: "Lyon 2e", score: 55, zone: "UB", price: "410 000 €", dpe: "D", market: "Lyon", date: "9 mars 2026" },
  { address: "22 boulevard Haussmann", city: "Paris 9e", score: 91, zone: "UA", price: "820 000 €", dpe: "B", market: "Paris", date: "8 mars 2026" },
  { address: "7 rue du Château", city: "Bordeaux", score: 48, zone: "UC", price: "155 000 €", dpe: "E", market: "Bordeaux", date: "7 mars 2026" },
  { address: "31 avenue Jean Jaurès", city: "Lyon 7e", score: 67, zone: "UB", price: "275 000 €", dpe: "C", market: "Lyon", date: "6 mars 2026" },
  { address: "9 rue Sainte-Catherine", city: "Bordeaux", score: 80, zone: "UA", price: "340 000 €", dpe: "B", market: "Bordeaux", date: "5 mars 2026" },
];

const DPE_COLORS: Record<string, { bg: string; text: string }> = {
  A: { bg: "#DCFCE7", text: "#16A34A" },
  B: { bg: "#D1FAE5", text: "#059669" },
  C: { bg: "#FEF9C3", text: "#CA8A04" },
  D: { bg: "#FEF3C7", text: "#D97706" },
  E: { bg: "#FFEDD5", text: "#EA580C" },
  F: { bg: "#FEE2E2", text: "#DC2626" },
  G: { bg: "#FCE7F3", text: "#DB2777" },
};

const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #E8E6DE",
  borderRadius: 12,
};

const inputStyle = {
  border: "1px solid #E8E6DE",
  borderRadius: 8,
  backgroundColor: "#ffffff",
  color: "#1A1916",
  fontSize: 13,
};

export default function HistoriquePage() {
  const [search, setSearch] = useState("");
  const [filterScore, setFilterScore] = useState("all");
  const [filterMarket, setFilterMarket] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = ALL_ANALYSES.filter((a) => {
    const matchSearch =
      a.address.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase());
    const matchScore =
      filterScore === "all" ||
      (filterScore === "good" && a.score >= 70) ||
      (filterScore === "medium" && a.score >= 50 && a.score < 70) ||
      (filterScore === "low" && a.score < 50);
    const matchMarket = filterMarket === "all" || a.market === filterMarket;
    return matchSearch && matchScore && matchMarket;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-5">
      {/* Search + filters */}
      <div style={card} className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              width="14"
              height="14"
              fill="none"
              stroke="#9E998A"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher une adresse, ville…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full py-2.5 pl-9 pr-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>

          {/* Score filter */}
          <select
            value={filterScore}
            onChange={(e) => { setFilterScore(e.target.value); setPage(1); }}
            className="py-2.5 pl-3 pr-8 text-sm outline-none"
            style={inputStyle}
          >
            <option value="all">Tous les scores</option>
            <option value="good">≥ 70 — Bon</option>
            <option value="medium">50-69 — Moyen</option>
            <option value="low">&lt; 50 — Faible</option>
          </select>

          {/* Market filter */}
          <select
            value={filterMarket}
            onChange={(e) => { setFilterMarket(e.target.value); setPage(1); }}
            className="py-2.5 pl-3 pr-8 text-sm outline-none"
            style={inputStyle}
          >
            <option value="all">Tous les marchés</option>
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Bordeaux">Bordeaux</option>
            <option value="Autres">Autres</option>
          </select>

          {/* Date filter */}
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="py-2.5 pl-3 pr-8 text-sm outline-none"
            style={inputStyle}
          >
            <option value="all">Toutes les dates</option>
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="3m">3 derniers mois</option>
            <option value="1y">Cette année</option>
          </select>

          <span className="text-sm" style={{ color: "#9E998A" }}>
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Table */}
      <div style={card} className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #E8E6DE" }}>
              {["Adresse", "Score", "Zone PLU", "Prix", "DPE", "Marché", "Date", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#9E998A" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm" style={{ color: "#9E998A" }}>
                  Aucune analyse ne correspond à votre recherche.
                </td>
              </tr>
            ) : (
              paginated.map((a, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-stone-50"
                  style={{ borderBottom: "1px solid #F3F2EE" }}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium" style={{ color: "#1A1916" }}>{a.address}</p>
                    <p className="text-xs" style={{ color: "#9E998A" }}>{a.city}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold"
                      style={{ backgroundColor: scoreBg(a.score), color: scoreColor(a.score) }}
                    >
                      {a.score}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="rounded px-2 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: "#F3F2EE", color: "#1A1916" }}
                    >
                      {a.zone}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium" style={{ color: "#1A1916" }}>
                    {a.price}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="rounded px-2 py-0.5 text-xs font-bold"
                      style={{
                        backgroundColor: DPE_COLORS[a.dpe]?.bg ?? "#F3F4F6",
                        color: DPE_COLORS[a.dpe]?.text ?? "#6B7280",
                      }}
                    >
                      {a.dpe}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm" style={{ color: "#9E998A" }}>{a.market}</td>
                  <td className="px-5 py-3.5 text-sm" style={{ color: "#9E998A" }}>{a.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#FFF8EE", color: "#E8A020" }}
                      >
                        Voir
                      </button>
                      <button
                        className="rounded px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#F3F2EE", color: "#1A1916" }}
                      >
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: "1px solid #E8E6DE" }}
          >
            <p className="text-xs" style={{ color: "#9E998A" }}>
              Page {page} sur {totalPages} · {filtered.length} analyses
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-30"
                style={{ border: "1px solid #E8E6DE", color: "#1A1916" }}
              >
                ← Préc.
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="rounded px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: page === n ? "#E8A020" : "transparent",
                    color: page === n ? "#1A1916" : "#9E998A",
                    border: page === n ? "1px solid #E8A020" : "1px solid #E8E6DE",
                  }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-30"
                style={{ border: "1px solid #E8E6DE", color: "#1A1916" }}
              >
                Suiv. →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
