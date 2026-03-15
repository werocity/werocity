"use client";

// ── Helpers ──────────────────────────────────────────────────────
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

// ── Static data ──────────────────────────────────────────────────
const KPIS = [
  {
    label: "Analyses ce mois",
    value: "47",
    sub: "↑ 12 % vs mois dernier",
    subGreen: true,
    icon: (
      <svg width="20" height="20" fill="none" stroke="#E8A020" strokeWidth={1.75} viewBox="0 0 24 24">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Score moyen",
    value: "71 / 100",
    sub: "↑ 3 pts ce mois",
    subGreen: true,
    icon: (
      <svg width="20" height="20" fill="none" stroke="#22A060" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: "Rapports PDF",
    value: "18",
    sub: "générés ce mois",
    subGreen: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="#9E998A" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
      </svg>
    ),
  },
  {
    label: "Opportunités",
    value: "5",
    sub: "biens avec score ≥ 70",
    subGreen: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="#E8A020" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth={2.5} />
      </svg>
    ),
  },
];

const RECENT_ANALYSES = [
  { address: "12 rue de la Paix", city: "Paris 1er", score: 78, zone: "UA", price: "480 000 €", date: "14 mars" },
  { address: "8 avenue Gambetta", city: "Lyon 3e", score: 62, zone: "UB", price: "325 000 €", date: "13 mars" },
  { address: "3 impasse des Lilas", city: "Bordeaux", score: 85, zone: "UC", price: "290 000 €", date: "12 mars" },
  { address: "27 rue Nationale", city: "Vierzon", score: 41, zone: "N", price: "78 000 €", date: "11 mars" },
  { address: "15 chemin du Moulin", city: "Agde", score: 73, zone: "AU", price: "195 000 €", date: "10 mars" },
];

const ACTIVITY_30 = [2, 4, 1, 3, 5, 2, 6, 3, 4, 7, 2, 5, 3, 8, 4, 3, 5, 2, 4, 6, 3, 5, 7, 4, 2, 6, 3, 5, 4, 7];
const MAX_ACT = Math.max(...ACTIVITY_30);

const RECENT_ACTIVITY = [
  { text: "Rapport PDF généré", sub: "12 rue de la Paix, Paris", time: "il y a 2h", dot: "#22A060" },
  { text: "Nouvelle analyse", sub: "8 av. Gambetta, Lyon", time: "il y a 5h", dot: "#E8A020" },
  { text: "Alerte PLU", sub: "Zone AU → N, Agde", time: "hier", dot: "#EF4444" },
  { text: "Nouvelle analyse", sub: "27 rue Nationale, Vierzon", time: "il y a 2j", dot: "#E8A020" },
];

// ── Card wrapper ─────────────────────────────────────────────────
const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #E8E6DE",
  borderRadius: 12,
};

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-extrabold" style={{ color: "#1A1916" }}>
          Bonjour, Thomas 👋
        </h2>
        <p className="mt-0.5 text-sm capitalize" style={{ color: "#9E998A" }}>
          {today}
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {KPIS.map(({ label, value, sub, subGreen, icon }) => (
          <div key={label} style={card} className="p-5">
            <div className="mb-3 flex items-start justify-between">
              <p className="text-sm font-medium" style={{ color: "#9E998A" }}>
                {label}
              </p>
              <span className="mt-0.5">{icon}</span>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "#1A1916" }}>
              {value}
            </p>
            <p
              className="mt-1 text-xs font-medium"
              style={{ color: subGreen ? "#22A060" : "#9E998A" }}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Main content: 2/3 + 1/3 */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 xl:col-span-2">
          {/* Recent analyses */}
          <div style={card} className="overflow-hidden">
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid #E8E6DE" }}
            >
              <h3 className="text-sm font-semibold" style={{ color: "#1A1916" }}>
                Dernières analyses
              </h3>
              <a
                href="/dashboard/historique"
                className="text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: "#E8A020" }}
              >
                Voir tout →
              </a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E6DE" }}>
                  {["Adresse", "Score", "Zone PLU", "Prix", "Date"].map((h) => (
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
                {RECENT_ANALYSES.map((a, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-stone-50"
                    style={{
                      borderBottom: i < RECENT_ANALYSES.length - 1 ? "1px solid #F3F2EE" : "none",
                    }}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium leading-tight" style={{ color: "#1A1916" }}>
                        {a.address}
                      </p>
                      <p className="text-xs" style={{ color: "#9E998A" }}>
                        {a.city}
                      </p>
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
                    <td className="px-5 py-3.5 text-sm font-medium" style={{ color: "#1A1916" }}>
                      {a.price}
                    </td>
                    <td className="px-5 py-3.5 text-sm" style={{ color: "#9E998A" }}>
                      {a.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activity chart */}
          <div style={card} className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ color: "#1A1916" }}>
                Activité — 30 derniers jours
              </h3>
              <span className="text-xs font-medium" style={{ color: "#9E998A" }}>
                Total : {ACTIVITY_30.reduce((a, b) => a + b, 0)} analyses
              </span>
            </div>
            <div className="flex items-end gap-[3px]" style={{ height: 56 }}>
              {ACTIVITY_30.map((val, i) => (
                <div
                  key={i}
                  title={`Jour ${i + 1} : ${val}`}
                  className="flex-1 rounded-sm transition-opacity hover:opacity-80"
                  style={{
                    height: `${Math.max(8, (val / MAX_ACT) * 100)}%`,
                    backgroundColor: "#E8A020",
                    opacity: i === 29 ? 1 : 0.22 + (val / MAX_ACT) * 0.45,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px]" style={{ color: "#9E998A" }}>
              <span>15 fév.</span>
              <span>1 mars</span>
              <span>15 mars</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Account stats */}
          <div style={card} className="p-5">
            <h3 className="mb-4 text-sm font-semibold" style={{ color: "#1A1916" }}>
              Mon compte
            </h3>
            <div className="space-y-3">
              {[
                { label: "Plan actif", value: "Expert", accent: true },
                { label: "Analyses utilisées", value: "47 / ∞" },
                { label: "Prochain renouvellement", value: "1er avr. 2026" },
                { label: "Support prioritaire", value: "Actif ✓", green: true },
              ].map(({ label, value, accent, green }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "#9E998A" }}>
                    {label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: accent ? "#E8A020" : green ? "#22A060" : "#1A1916",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="mt-4 rounded-lg px-3 py-2.5"
              style={{ backgroundColor: "#F3F2EE" }}
            >
              <div className="mb-1 flex items-center justify-between text-xs">
                <span style={{ color: "#9E998A" }}>Ce mois-ci</span>
                <span className="font-semibold" style={{ color: "#1A1916" }}>47 analyses</span>
              </div>
              <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: "#E8E6DE" }}>
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: "34%", backgroundColor: "#E8A020" }}
                />
              </div>
              <p className="mt-1 text-[10px]" style={{ color: "#9E998A" }}>
                Illimité sur le plan Expert
              </p>
            </div>
          </div>

          {/* Recent activity */}
          <div style={card} className="p-5">
            <h3 className="mb-4 text-sm font-semibold" style={{ color: "#1A1916" }}>
              Activité récente
            </h3>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map(({ text, sub, time, dot }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: dot }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight" style={{ color: "#1A1916" }}>
                      {text}
                    </p>
                    <p className="mt-0.5 truncate text-xs" style={{ color: "#9E998A" }}>
                      {sub}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs" style={{ color: "#9E998A" }}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
