"use client";

import { useState } from "react";

type Alert = {
  id: number;
  read: boolean;
  type: "warning" | "success" | "critical" | "info";
  title: string;
  description: string;
  date: string;
};

const INITIAL_ALERTS: Alert[] = [
  {
    id: 1,
    read: false,
    type: "warning",
    title: "Nouvelles données DVF disponibles",
    description: "11 nouvelles transactions ont été enregistrées à Vierzon (18100). Comparez avec votre analyse du 27 rue Nationale.",
    date: "14 mars 2026, 09h14",
  },
  {
    id: 2,
    read: false,
    type: "success",
    title: "Rapport PDF prêt",
    description: "Le rapport urbanistique de 12 rue de la Paix, Paris 1er a été généré avec succès (2.4 Mo).",
    date: "14 mars 2026, 08h52",
  },
  {
    id: 3,
    read: false,
    type: "critical",
    title: "Modification PLU — Agde (34300)",
    description: "La zone AU du secteur Moulin a été reclassifiée en zone N (non constructible) suite à la délibération du 12 mars 2026. Votre bien au 15 chemin du Moulin est impacté.",
    date: "14 mars 2026, 07h30",
  },
  {
    id: 4,
    read: true,
    type: "success",
    title: "Analyse complétée",
    description: "L'analyse urbanistique du 8 avenue Gambetta, Lyon 3e est disponible. Score obtenu : 62/100.",
    date: "13 mars 2026, 16h22",
  },
  {
    id: 5,
    read: true,
    type: "info",
    title: "Bienvenue sur Werocity",
    description: "Découvrez toutes les fonctionnalités de votre plan Expert : analyses illimitées, export PDF, historique complet et support prioritaire.",
    date: "1 mars 2026, 10h00",
  },
];

const TYPE_CONFIG = {
  critical: {
    bg: "#FEF2F2",
    border: "#FCA5A5",
    icon: (
      <svg width="18" height="18" fill="none" stroke="#EF4444" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
    ),
    label: "Critique",
    labelColor: "#EF4444",
  },
  warning: {
    bg: "#FFF8EE",
    border: "#FCD34D",
    icon: (
      <svg width="18" height="18" fill="none" stroke="#E8A020" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth={2.5} />
      </svg>
    ),
    label: "Info",
    labelColor: "#E8A020",
  },
  success: {
    bg: "#F0FDF4",
    border: "#86EFAC",
    icon: (
      <svg width="18" height="18" fill="none" stroke="#22A060" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="22,4 12,14.01 9,11.01" />
      </svg>
    ),
    label: "Succès",
    labelColor: "#22A060",
  },
  info: {
    bg: "#EFF6FF",
    border: "#93C5FD",
    icon: (
      <svg width="18" height="18" fill="none" stroke="#3B82F6" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" />
        <line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" strokeWidth={2.5} />
      </svg>
    ),
    label: "Information",
    labelColor: "#3B82F6",
  },
};

export default function AlertesPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  const unreadCount = alerts.filter((a) => !a.read).length;

  function markAllRead() {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  }

  function markRead(id: number) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  }

  function dismiss(id: number) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  const unread = alerts.filter((a) => !a.read);
  const read = alerts.filter((a) => a.read);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span
              className="rounded-full px-3 py-1 text-sm font-bold"
              style={{ backgroundColor: "#FEF2F2", color: "#EF4444" }}
            >
              {unreadCount} non lue{unreadCount !== 1 ? "s" : ""}
            </span>
          )}
          {unreadCount === 0 && (
            <span
              className="rounded-full px-3 py-1 text-sm font-medium"
              style={{ backgroundColor: "#F0FDF4", color: "#22A060" }}
            >
              Tout lu ✓
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#E8A020" }}
          >
            Tout marquer comme lu
          </button>
        )}
      </div>

      {/* Unread */}
      {unread.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9E998A" }}>
            Non lues
          </p>
          {unread.map((alert) => {
            const cfg = TYPE_CONFIG[alert.type];
            return (
              <div
                key={alert.id}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{cfg.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm" style={{ color: "#1A1916" }}>
                        {alert.title}
                      </p>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          backgroundColor: cfg.border,
                          color: cfg.labelColor,
                        }}
                      >
                        {cfg.label}
                      </span>
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: "#EF4444" }}
                        title="Non lue"
                      />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#1A1916", opacity: 0.75 }}>
                      {alert.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#9E998A" }}>
                        {alert.date}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => markRead(alert.id)}
                          className="text-xs font-medium transition-opacity hover:opacity-70"
                          style={{ color: cfg.labelColor }}
                        >
                          Marquer comme lu
                        </button>
                        <button
                          onClick={() => dismiss(alert.id)}
                          className="text-xs font-medium transition-opacity hover:opacity-70"
                          style={{ color: "#9E998A" }}
                        >
                          Ignorer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Read */}
      {read.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9E998A" }}>
            Lues
          </p>
          {read.map((alert) => {
            const cfg = TYPE_CONFIG[alert.type];
            return (
              <div
                key={alert.id}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E8E6DE",
                  opacity: 0.7,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 opacity-60">{cfg.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm" style={{ color: "#1A1916" }}>
                        {alert.title}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "#9E998A" }}>
                      {alert.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#9E998A" }}>
                        {alert.date}
                      </span>
                      <button
                        onClick={() => dismiss(alert.id)}
                        className="text-xs font-medium transition-opacity hover:opacity-70"
                        style={{ color: "#9E998A" }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {alerts.length === 0 && (
        <div
          className="flex flex-col items-center justify-center rounded-2xl py-16"
          style={{ backgroundColor: "#ffffff", border: "1px solid #E8E6DE" }}
        >
          <svg width="40" height="40" fill="none" stroke="#E8E6DE" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <p className="mt-4 text-sm font-medium" style={{ color: "#9E998A" }}>Aucune alerte</p>
        </div>
      )}
    </div>
  );
}
