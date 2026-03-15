"use client";

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

const REPORTS = [
  { id: "WRC-2026-047", address: "12 rue de la Paix", city: "Paris 1er", score: 78, zone: "UA", date: "14 mars 2026", size: "2.4 Mo" },
  { id: "WRC-2026-046", address: "8 avenue Gambetta", city: "Lyon 3e", score: 62, zone: "UB", date: "13 mars 2026", size: "1.9 Mo" },
  { id: "WRC-2026-045", address: "3 impasse des Lilas", city: "Bordeaux", score: 85, zone: "UC", date: "12 mars 2026", size: "2.1 Mo" },
  { id: "WRC-2026-044", address: "27 rue Nationale", city: "Vierzon", score: 41, zone: "N", date: "11 mars 2026", size: "1.7 Mo" },
  { id: "WRC-2026-043", address: "15 chemin du Moulin", city: "Agde", score: 73, zone: "AU", date: "10 mars 2026", size: "2.2 Mo" },
  { id: "WRC-2026-042", address: "22 boulevard Haussmann", city: "Paris 9e", score: 91, zone: "UA", date: "8 mars 2026", size: "2.8 Mo" },
  { id: "WRC-2026-041", address: "4 place Bellecour", city: "Lyon 2e", score: 55, zone: "UB", date: "9 mars 2026", size: "1.8 Mo" },
  { id: "WRC-2026-040", address: "9 rue Sainte-Catherine", city: "Bordeaux", score: 80, zone: "UA", date: "5 mars 2026", size: "2.0 Mo" },
  { id: "WRC-2026-039", address: "31 avenue Jean Jaurès", city: "Lyon 7e", score: 67, zone: "UB", date: "6 mars 2026", size: "1.6 Mo" },
];

export default function RapportsPage() {
  return (
    <div className="space-y-5">
      {/* Header stats */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "#9E998A" }}>
          {REPORTS.length} rapport{REPORTS.length !== 1 ? "s" : ""} générés ce mois
        </p>
        <button
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ border: "1px solid #E8E6DE", backgroundColor: "#ffffff", color: "#1A1916" }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M7 10l5 5 5-5M12 15V3" />
          </svg>
          Tout télécharger
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map((r) => (
          <div
            key={r.id}
            className="overflow-hidden transition-shadow hover:shadow-md"
            style={{ backgroundColor: "#ffffff", border: "1px solid #E8E6DE", borderRadius: 12 }}
          >
            {/* PDF preview mockup */}
            <div
              className="flex flex-col items-center justify-center gap-3 py-8"
              style={{ backgroundColor: "#F8F7F4", borderBottom: "1px solid #E8E6DE" }}
            >
              <div
                className="flex h-14 w-11 flex-col items-center justify-center rounded-sm"
                style={{
                  backgroundColor: "#1A1916",
                  boxShadow: "2px 2px 8px rgba(0,0,0,0.18)",
                }}
              >
                <span className="text-[10px] font-bold" style={{ color: "#E8A020" }}>W</span>
                <span className="text-[8px] font-medium text-white/50 mt-0.5">PDF</span>
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-bold"
                style={{ backgroundColor: scoreBg(r.score), color: scoreColor(r.score) }}
              >
                Score {r.score}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="font-semibold leading-tight" style={{ color: "#1A1916" }}>
                {r.address}
              </p>
              <p className="mt-0.5 text-xs" style={{ color: "#9E998A" }}>
                {r.city}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className="rounded px-2 py-0.5 text-xs font-semibold"
                  style={{ backgroundColor: "#F3F2EE", color: "#1A1916" }}
                >
                  Zone {r.zone}
                </span>
                <span className="text-xs" style={{ color: "#9E998A" }}>
                  {r.date}
                </span>
                <span className="ml-auto text-xs" style={{ color: "#9E998A" }}>
                  {r.size}
                </span>
              </div>

              <p className="mt-1.5 text-[10px] font-mono" style={{ color: "#9E998A" }}>
                {r.id}
              </p>

              <button
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M7 10l5 5 5-5M12 15V3" />
                </svg>
                Télécharger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
