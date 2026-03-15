"use client";

import { useState } from "react";

type Section = "profil" | "notifications" | "preferences" | "securite";

const SUB_NAV: { id: Section; label: string }[] = [
  { id: "profil", label: "Profil" },
  { id: "notifications", label: "Notifications" },
  { id: "preferences", label: "Préférences" },
  { id: "securite", label: "Sécurité" },
];

const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #E8E6DE",
  borderRadius: 12,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #E8E6DE",
  borderRadius: 8,
  backgroundColor: "#FAFAF7",
  color: "#1A1916",
  fontSize: 14,
  padding: "10px 14px",
  outline: "none",
};

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      style={{ backgroundColor: enabled ? "#E8A020" : "#E8E6DE" }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
        style={{ transform: enabled ? "translateX(22px)" : "translateX(3px)" }}
      />
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "#9E998A" }}>
      {children}
    </p>
  );
}

export default function ParametresPage() {
  const [section, setSection] = useState<Section>("profil");

  // Profil state
  const [profil, setProfil] = useState({
    firstName: "Thomas",
    lastName: "Dubois",
    email: "thomas@dubois.fr",
    phone: "+33 6 12 34 56 78",
    city: "Paris",
  });

  // Notifications state
  const [notifs, setNotifs] = useState({
    pluAlerts: true,
    dvfUpdates: true,
    pdfReady: true,
    analysisComplete: true,
    newsletter: false,
    weeklyDigest: true,
  });

  // Preferences state
  const [prefs, setPrefs] = useState({
    language: "fr",
    timezone: "Europe/Paris",
    currency: "EUR",
    distanceUnit: "m2",
    defaultView: "list",
  });

  // Security state
  const [security, setSecurity] = useState({
    current: "",
    newPwd: "",
    confirm: "",
    twoFactor: false,
  });

  function toggleNotif(key: keyof typeof notifs) {
    setNotifs((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <div className="flex gap-6 max-w-4xl">
      {/* Sub-nav */}
      <aside className="w-44 shrink-0">
        <div style={{ ...card, padding: "6px" }}>
          {SUB_NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
              style={{
                backgroundColor: section === id ? "rgba(232,160,32,0.1)" : "transparent",
                color: section === id ? "#E8A020" : "#1A1916",
                borderLeft: section === id ? "2px solid #E8A020" : "2px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* ── Profil ── */}
        {section === "profil" && (
          <div style={card} className="p-6">
            <h2 className="mb-1 text-base font-semibold" style={{ color: "#1A1916" }}>Profil</h2>
            <p className="mb-6 text-sm" style={{ color: "#9E998A" }}>
              Vos informations personnelles et coordonnées.
            </p>

            {/* Avatar */}
            <div className="mb-6 flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-black"
                style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
              >
                T
              </div>
              <div>
                <button
                  className="text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "#E8A020" }}
                >
                  Changer l&apos;avatar
                </button>
                <p className="mt-0.5 text-xs" style={{ color: "#9E998A" }}>
                  JPG, PNG — 2 Mo max
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                    Prénom
                  </label>
                  <input
                    style={inputStyle}
                    value={profil.firstName}
                    onChange={(e) => setProfil((p) => ({ ...p, firstName: e.target.value }))}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E6DE")}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                    Nom
                  </label>
                  <input
                    style={inputStyle}
                    value={profil.lastName}
                    onChange={(e) => setProfil((p) => ({ ...p, lastName: e.target.value }))}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E6DE")}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  style={inputStyle}
                  value={profil.email}
                  onChange={(e) => setProfil((p) => ({ ...p, email: e.target.value }))}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E6DE")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    style={inputStyle}
                    value={profil.phone}
                    onChange={(e) => setProfil((p) => ({ ...p, phone: e.target.value }))}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E6DE")}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                    Ville
                  </label>
                  <input
                    style={inputStyle}
                    value={profil.city}
                    onChange={(e) => setProfil((p) => ({ ...p, city: e.target.value }))}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E6DE")}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
              >
                Enregistrer
              </button>
              <button
                className="rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-stone-50"
                style={{ border: "1px solid #E8E6DE", color: "#1A1916" }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* ── Notifications ── */}
        {section === "notifications" && (
          <div style={card} className="p-6">
            <h2 className="mb-1 text-base font-semibold" style={{ color: "#1A1916" }}>Notifications</h2>
            <p className="mb-6 text-sm" style={{ color: "#9E998A" }}>
              Choisissez quels événements vous alertent par e-mail.
            </p>

            <SectionLabel>Alertes urbanistiques</SectionLabel>
            <div className="mb-6 space-y-4">
              {([
                { key: "pluAlerts", label: "Modifications PLU", desc: "Recevoir une alerte si un PLU change sur un bien analysé" },
                { key: "dvfUpdates", label: "Nouvelles données DVF", desc: "Notifié quand de nouvelles transactions sont disponibles" },
              ] as const).map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1A1916" }}>{label}</p>
                    <p className="text-xs" style={{ color: "#9E998A" }}>{desc}</p>
                  </div>
                  <Toggle enabled={notifs[key]} onChange={() => toggleNotif(key)} />
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #E8E6DE" }} className="pt-5 mb-6">
              <SectionLabel>Analyses & rapports</SectionLabel>
              <div className="space-y-4">
                {([
                  { key: "pdfReady", label: "Rapport PDF prêt", desc: "Notifié quand un export PDF est disponible au téléchargement" },
                  { key: "analysisComplete", label: "Analyse terminée", desc: "Recevoir une notification à chaque analyse complétée" },
                ] as const).map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#1A1916" }}>{label}</p>
                      <p className="text-xs" style={{ color: "#9E998A" }}>{desc}</p>
                    </div>
                    <Toggle enabled={notifs[key]} onChange={() => toggleNotif(key)} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #E8E6DE" }} className="pt-5">
              <SectionLabel>Communication</SectionLabel>
              <div className="space-y-4">
                {([
                  { key: "weeklyDigest", label: "Résumé hebdomadaire", desc: "Récap de vos analyses et opportunités chaque lundi matin" },
                  { key: "newsletter", label: "Newsletter Werocity", desc: "Actus immobilières, nouveautés produit et guides investissement" },
                ] as const).map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#1A1916" }}>{label}</p>
                      <p className="text-xs" style={{ color: "#9E998A" }}>{desc}</p>
                    </div>
                    <Toggle enabled={notifs[key]} onChange={() => toggleNotif(key)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Préférences ── */}
        {section === "preferences" && (
          <div style={card} className="p-6">
            <h2 className="mb-1 text-base font-semibold" style={{ color: "#1A1916" }}>Préférences</h2>
            <p className="mb-6 text-sm" style={{ color: "#9E998A" }}>
              Personnalisez l&apos;affichage et le comportement de l&apos;application.
            </p>

            <div className="space-y-5">
              {[
                {
                  label: "Langue",
                  value: prefs.language,
                  options: [{ value: "fr", label: "Français" }, { value: "en", label: "English" }],
                  onChange: (v: string) => setPrefs((p) => ({ ...p, language: v })),
                },
                {
                  label: "Fuseau horaire",
                  value: prefs.timezone,
                  options: [
                    { value: "Europe/Paris", label: "Paris (UTC+1)" },
                    { value: "Europe/London", label: "Londres (UTC+0)" },
                    { value: "America/New_York", label: "New York (UTC-5)" },
                  ],
                  onChange: (v: string) => setPrefs((p) => ({ ...p, timezone: v })),
                },
                {
                  label: "Devise",
                  value: prefs.currency,
                  options: [{ value: "EUR", label: "Euro (€)" }, { value: "USD", label: "Dollar ($)" }],
                  onChange: (v: string) => setPrefs((p) => ({ ...p, currency: v })),
                },
                {
                  label: "Vue par défaut (historique)",
                  value: prefs.defaultView,
                  options: [
                    { value: "list", label: "Tableau" },
                    { value: "grid", label: "Grille" },
                  ],
                  onChange: (v: string) => setPrefs((p) => ({ ...p, defaultView: v })),
                },
              ].map(({ label, value, options, onChange }) => (
                <div key={label}>
                  <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                    {label}
                  </label>
                  <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="py-2.5 pl-3 pr-8 text-sm outline-none"
                    style={{ ...inputStyle, padding: "10px 14px" }}
                  >
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              className="mt-6 rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
            >
              Enregistrer
            </button>
          </div>
        )}

        {/* ── Sécurité ── */}
        {section === "securite" && (
          <div className="space-y-5">
            <div style={card} className="p-6">
              <h2 className="mb-1 text-base font-semibold" style={{ color: "#1A1916" }}>
                Changer le mot de passe
              </h2>
              <p className="mb-6 text-sm" style={{ color: "#9E998A" }}>
                Utilisez un mot de passe fort de 12 caractères minimum.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Mot de passe actuel", key: "current" as const, placeholder: "••••••••••••" },
                  { label: "Nouveau mot de passe", key: "newPwd" as const, placeholder: "••••••••••••" },
                  { label: "Confirmer le nouveau mot de passe", key: "confirm" as const, placeholder: "••••••••••••" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#1A1916" }}>
                      {label}
                    </label>
                    <input
                      type="password"
                      placeholder={placeholder}
                      style={inputStyle}
                      value={security[key]}
                      onChange={(e) => setSecurity((p) => ({ ...p, [key]: e.target.value }))}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#E8A020")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E6DE")}
                    />
                  </div>
                ))}
              </div>
              <button
                className="mt-6 rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#E8A020", color: "#1A1916" }}
              >
                Mettre à jour le mot de passe
              </button>
            </div>

            <div style={card} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold" style={{ color: "#1A1916" }}>
                    Double authentification (2FA)
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: "#9E998A" }}>
                    Sécurisez votre compte avec une application d&apos;authentification (TOTP).
                  </p>
                </div>
                <Toggle
                  enabled={security.twoFactor}
                  onChange={() => setSecurity((p) => ({ ...p, twoFactor: !p.twoFactor }))}
                />
              </div>
              {security.twoFactor && (
                <div
                  className="mt-4 rounded-lg p-4 text-sm"
                  style={{ backgroundColor: "#F0FDF4", border: "1px solid #86EFAC" }}
                >
                  <p className="font-semibold" style={{ color: "#22A060" }}>2FA activée ✓</p>
                  <p className="mt-0.5" style={{ color: "#1A1916", opacity: 0.7 }}>
                    Votre compte est protégé par une double authentification.
                  </p>
                </div>
              )}
            </div>

            <div style={card} className="p-6">
              <h2 className="mb-1 text-base font-semibold" style={{ color: "#EF4444" }}>
                Zone de danger
              </h2>
              <p className="mb-4 text-sm" style={{ color: "#9E998A" }}>
                Ces actions sont irréversibles. Procédez avec prudence.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-red-50"
                  style={{ border: "1px solid #FCA5A5", color: "#EF4444" }}
                >
                  Exporter mes données
                </button>
                <button
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-red-50"
                  style={{ border: "1px solid #FCA5A5", color: "#EF4444" }}
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
