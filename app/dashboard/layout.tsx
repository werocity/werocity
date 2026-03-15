"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// ── Icons ────────────────────────────────────────────────────────
function IconGrid() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 3" />
    </svg>
  );
}
function IconFile() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}
function IconBell() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function IconCard() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// ── Nav config ───────────────────────────────────────────────────
const NAV = [
  { href: "/dashboard", label: "Tableau de bord", Icon: IconGrid },
  { href: "/dashboard/historique", label: "Historique", Icon: IconClock },
  { href: "/dashboard/rapports", label: "Rapports PDF", Icon: IconFile },
  { href: "/dashboard/alertes", label: "Alertes", Icon: IconBell, badge: 3 },
  { href: "/dashboard/facturation", label: "Facturation", Icon: IconCard },
  { href: "/dashboard/parametres", label: "Paramètres", Icon: IconGear },
];

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/historique": "Historique des analyses",
  "/dashboard/rapports": "Rapports PDF",
  "/dashboard/alertes": "Alertes",
  "/dashboard/facturation": "Facturation",
  "/dashboard/parametres": "Paramètres",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#FAFAF7" }}>
      {/* ── Sidebar ── */}
      <aside
        className="fixed inset-y-0 left-0 z-30 flex flex-col"
        style={{ width: 220, backgroundColor: "#1A1916" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-5 py-[18px] shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
            style={{ backgroundColor: "#E8A020" }}
          >
            <span className="text-base font-black leading-none" style={{ color: "#1A1916" }}>W</span>
          </div>
          <span className="text-base font-bold text-white tracking-tight">Werocity</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {NAV.map(({ href, label, Icon, badge }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
                style={{
                  backgroundColor: active ? "rgba(232,160,32,0.12)" : "transparent",
                  color: active ? "#E8A020" : "rgba(255,255,255,0.55)",
                  borderLeft: active ? "2px solid #E8A020" : "2px solid transparent",
                }}
              >
                <span style={{ opacity: active ? 1 : 0.8 }}>
                  <Icon />
                </span>
                <span className="flex-1">{label}</span>
                {badge !== undefined && (
                  <span
                    className="flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold"
                    style={{ backgroundColor: "#EF4444", color: "#fff" }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: plan + user */}
        <div
          className="shrink-0 p-3 space-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="rounded-lg px-3 py-2.5"
            style={{
              backgroundColor: "rgba(232,160,32,0.08)",
              border: "1px solid rgba(232,160,32,0.18)",
            }}
          >
            <p className="text-xs font-bold" style={{ color: "#E8A020" }}>Plan Expert</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              Analyses illimitées
            </p>
          </div>
          <div className="flex items-center gap-2.5 px-1">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
            >
              T
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-white leading-tight">Thomas Dubois</p>
              <p className="truncate text-xs leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>
                thomas@dubois.fr
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main wrapper ── */}
      <div className="flex flex-1 flex-col min-h-screen" style={{ marginLeft: 220 }}>
        {/* Topbar */}
        <header
          className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between px-6"
          style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E8E6DE" }}
        >
          <h1 className="text-base font-semibold" style={{ color: "#1A1916" }}>
            {title}
          </h1>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nouvelle analyse
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
