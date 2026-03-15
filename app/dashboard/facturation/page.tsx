"use client";

import { useState } from "react";

const INVOICES = [
  { id: "FAC-2026-003", date: "1 mars 2026", amount: "66,00 €", status: "Payée" },
  { id: "FAC-2026-002", date: "1 fév. 2026", amount: "66,00 €", status: "Payée" },
  { id: "FAC-2026-001", date: "1 janv. 2026", amount: "66,00 €", status: "Payée" },
  { id: "FAC-2025-012", date: "1 déc. 2025", amount: "66,00 €", status: "Payée" },
];

const EXPERT_FEATURES = [
  "Analyses illimitées",
  "Rapport PDF complet",
  "Droits à construire & COS",
  "Historique des analyses",
  "Alertes PLU en temps réel",
  "Support prioritaire",
];

const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #E8E6DE",
  borderRadius: 12,
};

export default function FacturationPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Plan actif */}
      <div style={{ ...card, border: "1px solid #E8A020" }} className="overflow-hidden">
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ backgroundColor: "#1A1916" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Plan actif
            </p>
            <p className="mt-0.5 text-xl font-extrabold text-white">Expert</p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
          >
            Actif
          </span>
        </div>

        <div className="p-6">
          {/* Billing toggle */}
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex rounded-lg p-0.5"
              style={{ backgroundColor: "#F3F2EE" }}
            >
              {(["monthly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className="rounded-md px-4 py-1.5 text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: billing === b ? "#1A1916" : "transparent",
                    color: billing === b ? "#FAFAF7" : "#9E998A",
                  }}
                >
                  {b === "monthly" ? "Mensuel" : "Annuel"}
                </button>
              ))}
            </div>
            {billing === "annual" && (
              <span
                className="rounded-full px-2.5 py-1 text-xs font-bold"
                style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
              >
                2 mois offerts
              </span>
            )}
          </div>

          <div className="flex items-end gap-4 mb-6">
            <div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold" style={{ color: "#1A1916" }}>
                  {billing === "annual" ? "66 €" : "79 €"}
                </span>
                <span className="mb-1 text-sm" style={{ color: "#9E998A" }}>/mois</span>
              </div>
              {billing === "annual" && (
                <p className="mt-0.5 text-sm" style={{ color: "#9E998A" }}>
                  Facturé 792 €/an · Prochain renouvellement : 1er avril 2026
                </p>
              )}
              {billing === "monthly" && (
                <p className="mt-0.5 text-sm" style={{ color: "#9E998A" }}>
                  Facturé mensuellement · Prochain renouvellement : 1er avril 2026
                </p>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
            {EXPERT_FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <span style={{ color: "#22A060" }}>✓</span>
                <span style={{ color: "#1A1916" }}>{f}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
            >
              Gérer l&apos;abonnement
            </button>
            <button
              className="rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-stone-50"
              style={{ border: "1px solid #E8E6DE", color: "#1A1916" }}
            >
              Annuler l&apos;abonnement
            </button>
          </div>
        </div>
      </div>

      {/* Moyen de paiement */}
      <div style={card} className="p-6">
        <h3 className="mb-4 text-sm font-semibold" style={{ color: "#1A1916" }}>
          Moyen de paiement
        </h3>
        <div
          className="flex items-center justify-between rounded-xl p-4"
          style={{ border: "1px solid #E8E6DE", backgroundColor: "#F8F7F4" }}
        >
          <div className="flex items-center gap-3">
            {/* Visa logo mockup */}
            <div
              className="flex h-9 w-14 items-center justify-center rounded-md text-sm font-black"
              style={{ backgroundColor: "#1A1AFF", color: "#ffffff", letterSpacing: "-0.5px" }}
            >
              VISA
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#1A1916" }}>
                Visa •••• •••• •••• 4829
              </p>
              <p className="text-xs" style={{ color: "#9E998A" }}>
                Expire 09/2028
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: "#F0FDF4", color: "#22A060" }}
            >
              Par défaut
            </span>
            <button
              className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "#E8A020" }}
            >
              Modifier
            </button>
          </div>
        </div>
        <button
          className="mt-3 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "#9E998A" }}
        >
          + Ajouter un moyen de paiement
        </button>
      </div>

      {/* Historique factures */}
      <div style={card} className="overflow-hidden">
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #E8E6DE" }}
        >
          <h3 className="text-sm font-semibold" style={{ color: "#1A1916" }}>
            Historique des factures
          </h3>
          <button
            className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#E8A020" }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M7 10l5 5 5-5M12 15V3" />
            </svg>
            Tout exporter
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #E8E6DE" }}>
              {["Référence", "Date", "Montant", "Statut", ""].map((h, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#9E998A" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv, i) => (
              <tr
                key={inv.id}
                className="hover:bg-stone-50 transition-colors"
                style={{ borderBottom: i < INVOICES.length - 1 ? "1px solid #F3F2EE" : "none" }}
              >
                <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#1A1916" }}>
                  {inv.id}
                </td>
                <td className="px-6 py-3.5 text-sm" style={{ color: "#1A1916" }}>
                  {inv.date}
                </td>
                <td className="px-6 py-3.5 text-sm font-semibold" style={{ color: "#1A1916" }}>
                  {inv.amount}
                </td>
                <td className="px-6 py-3.5">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: "#F0FDF4", color: "#22A060" }}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <button
                    className="text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: "#E8A020" }}
                  >
                    Télécharger PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
