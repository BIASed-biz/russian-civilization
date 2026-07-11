# Russian Civilization — Website

**russian-civilization.org** — The Global Diaspora Archive  
978 profiles · 109 countries · Non-political · Non-commercial

---

## Setup (einmalig, ~5 Minuten)

### 1. GitHub Repository
1. Gehe zu github.com → "New repository"
2. Name: `russian-civilization`
3. Public ✓ → "Create repository"
4. Alle Dateien dieses Ordners hochladen (drag & drop)

### 2. Vercel Deploy
1. vercel.com → "Add New Project"
2. Dein GitHub Repo auswählen
3. Framework: **Next.js** (wird automatisch erkannt)
4. "Deploy" klicken → fertig in ~2 Minuten

### 3. Domain verbinden (IONOS)
In IONOS Control Center → Domain → DNS:
- Typ: `CNAME`
- Name: `@` (oder `www`)
- Wert: `cname.vercel-dns.com`

---

## Lokal testen

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Profile hinzufügen / updaten

Alle Profile sind in `data/profiles.json`.  
Für neue Profile: Eintrag in der JSON-Liste hinzufügen, dann GitHub pushen → Vercel deployt automatisch.

**v1 (aktuell):** Nur Tier A (30 Profile) als Seiten generiert.  
**v2:** In `pages/p/[slug].js` Zeile `filter(p => p.tier === 'A')` entfernen → alle 978 Profile.

---

## Daten-Struktur

```
data/
├── profiles.json          # Alle 978 Profile, vollständig
├── profiles-index.json    # Alle 978, slim (für Listings)
├── profiles-tier-a.json   # Top 30 (Tier A)
├── categories.json        # 11 Kategorien
└── countries.json         # 109 Länder
```

---

## Tech Stack

- **Next.js 14** — React Framework
- **Vercel** — Hosting (kostenlos)
- **GitHub** — Code-Verwaltung
- **Kein Backend, keine Datenbank** — 100% statisch, schnell und sicher

---

© 2025 RussianCivilization.org
