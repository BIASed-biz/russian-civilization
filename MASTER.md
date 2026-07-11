# MASTER REFERENCE — Russian Civilization Archive
**Live site:** https://russian-civilization.org
**Last updated:** July 2026 · Vol. I

This is the single source of truth for the project: what it is, how the data is shaped, how the site is built and deployed, and the exact procedures for the recurring tasks (photos, maps, profile edits). Keep this file in the repo root.

---

## 1. WHAT THE PROJECT IS

A non-political, non-commercial documentary archive mapping **notable individuals worldwide whose biographies connect to the Russian Empire / USSR / post-Soviet space** — from direct birth there to great-grandparents, plus a small explicitly-labelled set formed within the Russophone cultural sphere.

**Core principles (unchanged from origin):**
- **Verification first** — only documented ancestry (Wikipedia, biographies). No rumors.
- **Specific connection** — must trace to a city/region + a Historical_entity (Russian Empire / USSR / Russia).
- **Tiered by global significance** — A = global icon, B = niche/notable.
- **Sources mandatory** — at least one published source per profile.
- **Remove when evidence fails** — thin/unverifiable entries are deleted, not hedged. (Several have been; see §7.)

**Why it exists (the thesis, now on the About page):** migration enriches both the migrant's adopted home and the cultures that meet — "cultures are made stronger, not weaker, by the people who move between them." The archive is also the scientific case that a "Russian civilization" is a legitimate macro-historical concept (Danilevsky → Spengler → Toynbee → Sorokin → Huntington → Eisenstadt), applying to this diaspora the same multi-generational lens the world already applies to the Chinese, Indian, Israeli, German, and African diasporas.

---

## 2. CURRENT STATE (July 2026)

| Metric | Value |
|---|---|
| Profiles | **1,016** |
| Tier A | 117 |
| Tier B | 900 |
| Countries | 39 |
| Profiles with sources | 100% |
| Profiles with `nameRu` (Cyrillic) | 100% |
| Profiles with verified `photoFile` | ~29 (rest via auto-fetch) |
| Profiles with `wikiTitle` override | 23 |
| **Russian site (`/ru/`)** | **LIVE — full UI/About/FAQ + all technical pages translated** |
| **Profiles with full Russian bio** (`bioRu` etc.) | **111 / 1,016** |
| Static pages built | ~2,105 (EN + RU mirror) |

---

## 3. TECH STACK & REPO LAYOUT

- **Next.js 14**, static export (`output:'export'`, `trailingSlash:true`), no database.
- **Deploy:** push ZIP contents to GitHub → Vercel auto-builds → live on russian-civilization.org.
- **Domain:** registered at IONOS, pointed to Vercel via **A record `76.76.21.21`** (@) + **CNAME `cname.vercel-dns.com`** (www). IONOS kept for email (MX/SPF/DKIM/DMARC records untouched).

```
data/profiles.json          → 1,017 profiles (MASTER data file)
data/profiles-index.json    → lightweight index used by grids/search (MUST stay in sync)
data/countries.json         → 39 countries
data/categories.json        → category index
pages/index.js              → homepage (hero + featured cards)
pages/profiles.js           → All Profiles grid
pages/search.js             → search
pages/countries.js          → country directory
pages/about.js              → manifesto / why / about (9 sections + ContactSlider)
pages/faq.js                → FAQ page (10 Q&A) with schema.org FAQPage markup (SEO rich-results)
pages/_app.js               → mounts Vercel <Analytics/> (@vercel/analytics/react — Pages Router import!)
pages/category/[slug].js    → per-category grid
pages/country/[slug].js     → per-country grid
pages/p/[slug].js           → profile page — contains ProfilePhoto + HistoricalMap + AncestryTree
components/Layout.js         → masthead, ribbon, footer (year + counts live here)
components/CardPhoto.js      → lazy grid avatar (IntersectionObserver) — photos in grids
components/ContactSlider.js  → slide-in contact panel (hello@russian-civilization.org)
components/HistoricalMap.js  → era map panel on profile pages
components/CardPhoto.js      → also: pages/photo-check.js = in-browser photo-coverage diagnostic
public/robots.txt, favicon.svg, sitemap.xml
scripts/generate-sitemap.js → runs automatically on build
```

**Build / deploy pipeline:**
```bash
cd rc-site-v3 && npm install && npm run build   # build auto-runs generate-sitemap.js first
# zip everything EXCEPT .next, node_modules, out  →  upload to GitHub  →  Vercel deploys
```
*Note: build prints a harmless `CssSyntaxError: Unknown word` / Google-Fonts minify warning — ignore, build succeeds.*

---

## 4. DATA SCHEMA (per profile in profiles.json)

Current fields (superset of the original 28-column schema):

| Field | Req? | Notes |
|---|---|---|
| `id` | yes | sequential integer |
| `slug` | yes | URL: lowercase, hyphenated name → `/p/{slug}/` |
| `tier` | yes | `A` (global icon) or `B` (notable) |
| `status` | yes | workflow status |
| `name` | yes | English display name |
| `nameRu` | yes | Cyrillic name |
| `tagline` | no | one-line hook |
| `profession` | yes | raw profession |
| `category` | yes | one of the standard buckets (Cinema & TV, Music & Performing Arts, Tech & Business, Science & Academia, Sports, Writers & Intellectuals, Business Moguls, Politics & Public Figures, Classical Music & High Culture, Fashion & Entertainment, Digital & Social Media, Cultural Phenomenon, Other) |
| `categoryIcon` | — | emoji/icon |
| `country` | yes | country of fame |
| `countryFlag` | — | flag emoji |
| `regionTag` | yes | region |
| `ancestralLevel` | yes | "Self (born there)", "Parents", "Grandmother", etc. |
| `origin` | yes | place of origin (city + modern country) |
| `historicalEntity` | yes | **"Russian Empire" / "USSR" / "Russia"** — drives the map picker (§6) |
| `migrationStory` | no | short migration note (may contain a year) |
| `ancestryNote` | no | detailed ancestry story |
| `parents` | — | parent/ancestor names |
| `russianProficiency` | yes | "Fluent" / "No" / "Basic" |
| `bio` | no | 2–3 sentence career summary |
| `connectionNote` | no | personalizes the Russian link |
| `achievements` | no | list of 3–5 bullets |
| `quote` | no | verified quote on roots |
| `tags` | yes | includes "Russian diaspora" + others |
| `source1/2/3` | 1 req | published source URLs (Wikipedia first) |
| `sourceType` | no | "Wikipedia" / "Biography" |
| `searchText` | — | precomputed search blob |
| **`photoFile`** | no | **NEW** — exact Wikimedia Commons filename → direct photo (§5) |
| **`wikiTitle`** | no | **NEW** — exact Wikipedia article title override for photo auto-fetch (§5) |

⚠️ **Whenever you edit profiles.json, mirror the change into profiles-index.json** (add/remove the entry; copy `photoFile` and `wikiTitle` across). The grids and search read the index, not the master.

---

## 5. PHOTO SYSTEM (how images work)

Photos come from **Wikimedia Commons** (royalty-free, CC). Two methods, in priority order:

### Method A — `photoFile` (PRIMARY, bulletproof)
A hard-coded Commons filename baked into the profile. The component builds a **deterministic direct URL** — no API, no CORS, no guessing:
```
https://commons.wikimedia.org/wiki/Special:FilePath/{photoFile}?width=400   (profile page)
https://commons.wikimedia.org/wiki/Special:FilePath/{photoFile}?width=240   (grid card)
```
`photoFile` is the exact filename **without** the `File:` prefix, with underscores, e.g. `Leonardo_DiCaprio_2010.jpg`. This is the method to expand for the remaining ~900 profiles.

### Method B — live Wikipedia auto-fetch (FALLBACK, now the workhorse)
If no `photoFile`, the browser fetches the lead image from Wikipedia. **CRITICAL ARCHITECTURE (learned the hard way):**
- **Use ONLY the Action API with `origin=*`:** `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail&titles=...&origin=*`. The `origin=*` makes Wikipedia return CORS headers, which prevents **CORB (Cross-Origin Read Blocking)**.
- **Do NOT use the REST `/api/rest_v1/page/summary/` endpoint** — it does NOT support `origin=*`, so the browser's CORB silently blocks the JS from reading the response. This was the bug that made *most* photos fail to load even though the fetch "succeeded." (Diagnosed from a user console screenshot showing "Response blocked by CORB".)
- **`fetch()` for JSON is fine via Action API; images themselves are shown as plain `<img>`** (img tags are never CORB/CORS-restricted — that's why direct `photoFile` URLs always worked).
- **Surname guard:** the loose `generator=search` fallback only accepts a result if the matched page title contains the person's surname — prevents grabbing the wrong person's photo (e.g. "David Copperfield" → the Dickens character).
- **Chain:** exact `titles=` (wikiTitle or clean name) → search by clean name → search by name+profession+country, each guarded.

### `noPhoto` field (NEW)
Set `noPhoto: true` on a profile to **suppress all photo logic** and show a clean monogram. Used for: (a) people with no free portrait whose loose-search would grab a wrong image; (b) group/duo profiles (Check Point Founders, Warner Brothers, Komar & Melamid) where one face misrepresents the entry.

### Method A — `photoFile` (PRIMARY, bulletproof) — unchanged
Verified Commons filename → `https://commons.wikimedia.org/wiki/Special:FilePath/{photoFile}?width=400`. Shown via `<img>`, probed with a JS `Image()` first; on failure falls through to Method B. **Only ~29 are verified** — the dozens of guessed filenames from early AI batches were removed because wrong filenames 404'd AND blocked the auto-fetch (worse than nothing).

### `/photo-check/` diagnostic page (NEW)
Visit `/photo-check/` → "Start scan" → runs the real fetch logic in-browser across all profiles → outputs a copy-paste list of profiles with NO working photo. This is the authoritative way to find the true missing set (Wikimedia is IP-blocked from the build container, so filenames can't be bulk-verified server-side).

### `wikiTitle` — verified disambiguations (do NOT guess these)
A wrong guessed title = no photo. Only set `wikiTitle` when verified. Known-good examples:
`Alexander Popov (swimmer)`, `Andrei Kirilenko (basketball)`, `Valentina Shevchenko (fighter)`, `Volker Beck (politician)`, `Ben Cohen (businessman)`, `Alexander Ovechkin`, `William Fox (producer)`, `Rita (Israeli singer)`, `Drake (musician)`, `Pink (singer)`, `Peaches (musician)`, `Oonagh (singer)`, `Chaim Topol`, `Anne Vyalitsyna`, `Zedd`, `Andrey Rublev` (plain — the tennis player has no suffix).

### PROCEDURE — adding more photos (the recurring task)
1. Pull a batch of names without `photoFile` (Tier A first, then B), with their `wikiTitle`/origin as hints.
2. Feed to a free AI with this prompt (cuts hallucinated guesses):
   > *For each name, give the exact Wikimedia Commons filename of their main Wikipedia infobox portrait, as `Name | Filename.jpg`. ONLY give a filename if you can confirm the full working URL `https://commons.wikimedia.org/wiki/File:...` exists; otherwise write `Name | UNSURE`. Don't invent year-based filenames. Exact underscores/capitalization, no `File:` prefix.*
3. **Triage the result** — past batches repeatedly returned (a) bare guesses and (b) "verified" links pointing to the WRONG person (e.g. a Jovovich row linking to a DiCaprio file). Always check the label vs the URL. Use the displayed filename label; discard wrong-person links.
4. Bake into `profiles.json` as `photoFile`, sync into `profiles-index.json`, rebuild, deploy.
5. Wrong filenames fall back gracefully — but verify the high-traffic ones.

---

## 6. HISTORICAL MAP SYSTEM

Each profile page shows a "Historical context" map panel (`components/HistoricalMap.js`), auto-selected by era. Maps are CC-licensed Commons SVGs via the same `Special:FilePath` method.

| Era | Trigger (`historicalEntity` / year) | Commons file |
|---|---|---|
| Russian Empire (c.1721–1917) | contains "empire", or year < 1917 | `Russian Empire (1914).svg` |
| Soviet Union (1922–1991) | contains "ussr"/"soviet", or 1917 ≤ year < 1991 | `Map of USSR with SSR names.svg` |
| Post-Soviet states (since 1991) | contains "federation"/"russia", or year ≥ 1991 | `USSR Republics numbered by alphabet.svg` |

- **Design decision:** historical maps (Empire, USSR) show full historical territory (factual). The **modern map shows all 15 sovereign successor states** (option A) — NOT a "Russia + allies" bloc — to preserve neutrality and match the About page's respect for Ukrainian/Baltic/etc. nationhood.
- If the era can't be confidently determined, the panel renders nothing (no wrong map).
- **Possible future upgrade:** pinned city markers (needs per-profile coordinates — a separate project).

---

## 7. EDITORIAL DECISIONS LOG

**Removed for being non-Russian / too thin / duplicate (credibility risk):**
Catherine O'Hara; Dmitri Tiomkin (duplicate of Dimitri Tiomkin — kept `dimitri-tiomkin`, matching his Wikipedia article); Arianna Huffington (Greek; father merely "covered the region"); Elia Kazan (Greek from Constantinople); Gene Roddenberry ("remote/distant"); Dove Cameron ("diffuse"); Facundo Cabral; Galen Gering. Earlier sessions also removed ~24 others (Bebe Rexha, Rita Ora, Dua Lipa, The Weeknd, etc. — no real connection).

**Kept as defensible** (specific Russian-Empire/Pale-of-Settlement ancestor, even if thin): Inbar Lavi (Polish-Jewish), Erykah Badu, Cheryl Burke, Courtney Love, Lily Collins.

**Rule of thumb for borderline cases:** a *specific named ancestor + specific place inside the Empire/USSR* = keep. Vague "family connections" / "distant heritage" with no place or name = remove. These thin entries are exactly what a hostile critic screenshots to discredit the whole archive.

---

## 8. ABOUT / MANIFESTO PAGE (structure)

`pages/about.js` — nine movements, each closing an attack vector:
1. The Observation (undeniable founder/artist facts)
2. The scholarly lineage table (Danilevsky → Eisenstadt)
3. Four structural civilizational markers
4. Belonging codified worldwide (China/India/Israel/Germany/Ireland-Italy/African Union)
5. The science of persistence (Glazer & Moynihan, Hansen's law, Safran/Cohen)
6. Method
7. "What this project is NOT" (navy block — independent of any state; explicitly distanced from "Russkiy Mir"; respects all successor nations; lists exiles/victims; the "Not blind to history" sub-block is neutral/symmetric — "under every era and every regime… without political commentary on any government")
8. **Why this matters** (migration as enrichment — "It gains a Brin, a Berlin, a Baryshnikov")
9. Closing + stats (1,017 / 39 / 100%)
Plus the **ContactSlider** (hello@russian-civilization.org).

### FAQ page (`pages/faq.js`) — NEW
10 Q&A in the site's neutral voice, with **schema.org FAQPage structured data** (eligible for Google rich-result snippets). Linked in nav (desktop + mobile) and sitemap. Built to intercept the predictable debates (esp. "why are they not ethnically Russian?" → Pale of Settlement) and pull organic search traffic. After deploy: submit URL in Google Search Console + test in Rich Results Test.

### Analytics — NEW
Vercel Web Analytics via `@vercel/analytics/react` mounted in `_app.js` (cookie-free, GDPR-friendly). Must click **Enable** once in Vercel dashboard → Analytics tab. Only activates when served from Vercel.

---

## 9. INCLUSION CRITERIA (the growth rulebook — DECIDED)

The archive grows by **rule, not whim**. A person is eligible if they pass the CONNECTION test, clear at least one NOTABILITY threshold, and hit none of the EXCLUSIONS.

### A. Connection (must have ONE; unchanged core)
Born in / formed within the Russian Empire → USSR → modern Russia → wider Russophone space, at one of five `ancestralLevel`s:
`Self (born there)` · `Parents` · `Grandparents` · `Ancestors` (great-grandparents or earlier) · **`Russophone sphere`** (NEW — formed by the Russian-speaking cultural/educational/professional space without Russian ancestry; e.g. an ethnic-Armenian or other athlete/figure shaped within it). Ethnicity is irrelevant — Jewish, Ukrainian, Georgian, Armenian, Kazakh, Tatar, German, etc. all qualify.

### B. Notability — meet ANY ONE (the "would Berlin/New York know them?" test)
- **Top honors:** Nobel, Fields Medal, Turing Award, or equivalent peak award in any field.
- **Sport:** Olympic / World / Continental champion (medal-level); world champion in a globally-followed discipline (chess, UFC/MMA title, Grand Slam, etc.).
- **Culture:** Oscar / Grammy / Booker / Pulitzer / Palme d'Or-level award, or globally-recognized body of work.
- **Wealth:** verified billionaire (e.g. Forbes) **and not sanctioned**.
- **Reach (social-media age):** ≥1M followers on a major platform, OR ≥100M total views/streams. **NOTE: thresholds are a DISCOVERY/radar filter only — they put a name on the shortlist; they are NOT auto-include.** Every social-media figure is still hand-picked 1-by-1 and must clear Connection + Exclusions. They enter at **Tier B/C** so the archive's "face" stays laureates & champions.
- **Founders:** co-founder of a globally-recognized / unicorn+ company.
- **Historical (pre-metrics):** established encyclopedic entry for a globally-recognized contribution.

### C. Exclusions (the neutrality firewall)
- **Politicians & state/government officials** (skip entirely).
- **Active-duty military / war-associated figures.**
- **Sanctioned individuals** — verify against EU / US / UK / UN lists → if listed, **skip**. DECIDED public framing for the FAQ (do NOT phrase it as "because they're sanctioned"): *"We avoid figures who are the subject of active international legal measures, to keep the archive focused on cultural and scientific contribution rather than current geopolitics."* This uses sanctions as a practical filter without endorsing them as a political stance.
- **Purely-domestic fame** (famous only inside Russia/CIS → fails the global test).

### D. "People who stayed" — the contemporary-resident expansion (NEW DIRECTION)
The archive has leaned toward *diaspora* (people who left). It should also document globally-famous figures **formed within / resident in the modern Russian-Russophone space** who don't hide their roots — they make waves worldwide and there's no reason to omit them. ~37 Russia-resident profiles already exist (chess GMs, Kaspersky, etc.); this formalizes & expands the pattern.
- **Safe, rich veins:** Sport (esp. MMA/wrestling — chamption-level, apolitical), Science, émigré Literature.
- **Minefields (handle carefully):** Culture (many globally-famous conductors/figures are pro-Kremlin → neutrality risk) and Business (most globally-known Russian businesspeople are sanctioned). Often end up skipped under the Exclusions.
- **Starter roster to verify & build (Sport-led):** Khabib Nurmagomedov, Alexander Karelin, Islam Makhachev, Petr Yan, Arman Tsarukyan (Armenian citizen — `Russophone sphere`), Zabit Magomedsharipov, Fedor Emelianenko; Science: Artem Oganov, Konstantin Novoselov; Literature (émigré): Lyudmila Ulitskaya, Vladimir Sorokin. **VERIFY each person's citizenship/ethnicity/sanction status before writing — do not guess.**
- **Influencers as allies:** giving SM creators (Marina Mogilko, Lex Fridman type) a clear, criteria-based path to inclusion turns them into organic promoters. Inclusion must still be earned via the thresholds above.

## 10. OPEN TASKS

1. **§9 criteria FINALIZED** ✓ — (a) sanctions → soft "active legal measures" FAQ framing, DECIDED; (b) influencers = discovery filter only, hand-picked 1-by-1, tier B/C, DECIDED.
2. **RUSSIAN SITE — Phase A DONE** ✓ — full `/ru/` mirror, translated UI/About/FAQ, language switcher, favicon, sitemap. See §12. *After deploy: submit `/ru/` in Google Search Console + add site to Yandex Webmaster.*
3. **RUSSIAN BIOS — Phase B IN PROGRESS** — translating all profile bios into native Russian, ~50/session. **Done 111 profiles (through #115). NEXT STARTS AT #116.** Full procedure + validation + known traps in §12. Always save/download the ZIP before starting the next batch.
4. **RUSSIAN SITE — sticky-language fix (TODO, its own step)** — language is currently pure path-based (`/ru/...`). Internal links on RU pages (profile cards, category tiles, some nav) still point to bare `/p/…`, `/category/…` etc., so a RU user clicking them **falls back to English**. Fix: make internal links language-aware site-wide (prefix `/ru` when in RU mode) so RU stays RU until the user picks EN. Touches the link-generating components (cards, grids, nav) + rebuild. Deferred deliberately so translation batches ship independently.
5. **Build the "people who stayed" batch** — Sport first (cleanest), then Science, then careful Literature; verify citizenship + sanctions per person. Add a `Russophone sphere` explainer line to About/FAQ when first such profiles go live.
6. **FAQ addition** — "Why aren't some famous names included?" → neutrality / active-legal-measures framing.
7. **More photos** — continue `photoFile` batches; use §5 procedure + triage warning. Re-run `/photo-check/` after each deploy to get the true missing list.
8. **DATA HYGIENE** — `ancestralLevel` field has import junk in some rows ("Teddy Bear", "MGM", "Co-founder of Veeam Software.russoft+2", company names, etc.). Needs a cleanup pass to normalize to the five canonical levels. *Also: run a duplicate-ID / near-duplicate-slug scan across the whole dataset — the Solzhenitsyn dupe (see §12) suggests others may exist.*
9. **Structural: group profiles** — split `Check Point Founders` (Gil Shwed individually famous) and consider splitting `Warner Brothers` into the four brothers; keep `Komar & Melamid` as a duo. Currently set `noPhoto`.
10. **Map upgrade (optional)** — pinned city markers.
11. **Always keep profiles.json ↔ profiles-index.json in sync.**

---

## 11. CATEGORY MAPPING (profession → primary category)
Actor/Actress/Director → Cinema & TV · Singer/Musician → Music & Performing Arts · Tech/Crypto → Tech & Business · Politician/Judge → Politics & Public Figures · Physics/Nobel → Science & Academia · Composer/Conductor → Classical Music & High Culture · Writer/Novelist → Writers & Intellectuals · Chess/Boxer/athlete → Sports · Billionaire/VC → Business Moguls · Model/Dancer → Fashion & Entertainment · Influencer/YouTuber → Digital & Social Media · (no ancestry, cultural impact only) → Cultural Phenomenon.

---

## 12. RUSSIAN LOCALIZATION (`/ru/`) — how it works & how to continue

The site is bilingual. A Russian visitor lands on `/ru` and navigates an entirely Russian site; profiles show Cyrillic names and (where translated) Russian bios, falling back to English where a translation doesn't yet exist. Built because of strong positive feedback from Russian-speaking users.

### Phase A½ — technical (non-profile) pages fully translated (DONE, July 2026)
Everything except profile *bios/taglines* now renders Russian on `/ru/` and stays English on EN. Implemented via `lib/i18n.js` helpers consumed by every page component:
- **`countryRu`** (39 country names), **`regionRu`** (region tags), **`entityRu`** (historical-entity chips), **`categoryRu`** (category names) — maps + helpers in `lib/i18n.js`.
- **`originRu`** (NEW this pass) — translates the messy `origin` place-fragments shown on cards and profile pages (e.g. "Odessa (Ukraine)" → "Одесса (Украина)"). Uses `PLACE_RU` (cities+countries), `PLACE_TAG_RU` (parenthetical/slash tags); leaves the rare long-tail place names in Latin (~80%+ of visible card origins covered). To extend coverage, add entries to those two maps.
- **Country SEO intros:** `data/country-intros-ru.js` (7 hand-written: USA, Israel, Germany, UK, France, Canada, Australia) + `genericIntroRu` fallback for the rest.
- **Category descriptions + SEO intros:** `data/category-intros-ru.js` (`CAT_DESCRIPTIONS_RU`, `CAT_INTRO_RU`).
- **About & FAQ:** standalone fully-translated RU files at `pages/ru/about.js` and `pages/ru/faq.js` (NOT re-exports — edit these directly for RU; edit `pages/about.js`/`pages/faq.js` for EN). FAQ has RU schema.org markup.
- **Profile detail page** (`pages/p/[slug].js`): all chrome translated — breadcrumb, Family Tree/Родословная, stats band, Profile Data table (labels + values), Sources, Similar Profiles, Browse, prev/next nav. Internal links localized to `/ru` when in RU.
- **Meta descriptions** made language-aware on countries + search pages.
- **What's still English on RU by design:** profile `bio`/`tagline` where `bioRu`/`taglineRu` not yet filled (that's Phase B). Everything else is RU.
- **Note:** the sticky-language routing leak (Open Tasks #4) is now largely closed on the profile page and card grids (links localized via `L()`/`localizeHref`/inline `/ru` prefix). Worth a final site-wide audit for any remaining bare links.

### Phase A — UI/site shell (DONE)
- **URL-driven i18n**, no database. Language is read from the path: anything under `/ru/...` renders Russian chrome. A translation dictionary + helper drives it. Every EN route has a RU twin (`/ru`, `/ru/profiles`, `/ru/about`, `/ru/faq`, `/ru/category/*`, `/ru/country/*`, `/ru/p/*`). Build produces ~2,107 pages (EN + RU mirror).
- **Fully translated by hand:** nav, ribbon, masthead, footer, all category names (Кино и ТВ, Наука, Музыка, Спорт…), buttons, labels, search; the **About/manifesto** (all 9 sections incl. the scholarly table Данилевский → Эйзенштадт) and the **FAQ** (with Russian schema.org FAQPage markup for Yandex/Google rich results).
- **Language switcher** in the masthead ("Русский" ↔ "English") jumps between the same page in each language.
- **`lang` attribute** is set per-page the CORRECT way: `<Html lang="en">` default in `_document.js`, updated to `ru` on RU pages via an effect in `_app.js` (`document.documentElement.lang`).
  - ⚠️ **KNOWN TRAP (cost us a crash once):** NEVER put `<html lang=…>` inside `next/head` (`<Head>`) in the Pages Router — it throws a client-side exception on load (page flashes then dies). The valid approaches are `_document.js` + the `_app.js` effect above.
- **Sitemap** includes all `/ru/` URLs (~2,146 total) for Russian-language search discovery.
- **After deploy:** submit `/ru/` in Google Search Console AND add the site to **Yandex Webmaster** (yandex.com/webmaster) — the key tool for Russian-language reach.

### Phase B — translating the 1,017 profile bios (IN PROGRESS)
Parallel Russian fields hold the translations; the profile page picks them in RU mode and falls back to EN where absent, so **every batch ships live immediately** — no need to wait for completion.

- **Data model — parallel `*Ru` fields on each profile** (in `data/profiles.json`, the master data file):
  `nameRu` (100% present), `taglineRu`, `bioRu`, `connectionNoteRu`, `migrationStoryRu`, `ancestryNoteRu`, `quoteRu`, `achievementsRu` (a list mirroring `achievements` order). Only write a `*Ru` field when its English source exists.
- **Rendering:** `pages/p/[slug].js` imports the full `data/profiles.json` and uses an `f('fieldName')` helper that returns `fieldNameRu` in Russian mode, else the English. Section labels/chips on the profile page are also translated (Биография, Русская связь, Ключевые достижения, Происхождение, Известность). In RU mode the **Cyrillic name is the headline**, Latin name the subtitle (reversed from EN).
- **`profiles-index.json` does NOT need the prose `*Ru` fields** — it only carries `nameRu`, and the grids/search read the index (which shows names, not bios). So a bio batch touches `profiles.json` only. (The general "keep index in sync" rule still applies to structural changes — adds/removes, `photoFile`, `wikiTitle`.)

### PROCEDURE — translating the next bio batch (the recurring Phase-B task)
1. Work on the **latest ZIP's** `data/profiles.json`. Find the resume point: `[p for p in profiles if p.get('bioRu')]` → translate the next contiguous IDs after the highest translated one.
2. Batch size: **~50 per session** is the quality ceiling for hand-translation; 100 forces rushing and these bios are credibility-critical (ethnicities, place names, dates, historical entities). Quality over speed.
3. Translate into **native, encyclopedic Russian** — not machine-literal. Match register. Use correct historical terms: **черта оседлости** (Pale of Settlement), **большевистская/Октябрьская революция**, **еврейские погромы**, **белоэмигрант**, **ГУЛАГ**, **Российская империя / СССР / Украинская ССР**, **Война Судного дня**, **Армия обороны Израиля**. Render known quotes in their established Russian form.
4. Write with a small Python script keyed by profile `id`; only set `*Ru` where the EN source exists.
5. **VALIDATE before shipping** (both bugs below have bitten us):
   - **Stray foreign characters** — scan every `*Ru` value for CJK/Hangul (`[\u3000-\u9fff\uac00-\ud7af]`). A stray Chinese char once slipped into a translation ("源ником").
   - **Counts + completeness** — confirm the new total and that each new profile has the core `*Ru` fields.
   - **JSON validity**, then **`npm run build`** (expect ~2,107 pages), then grep the built `out/ru/p/<slug>/index.html` to confirm Russian text is present AND the EN page still shows English.
6. **Package the ZIP and confirm it's downloaded BEFORE starting the next batch.** (A previous session's batch of 50 was lost because the chat hit its length limit mid-write and the ZIP was never produced — always save first.)

### Resume pointer
- **Translated so far: 111 profiles** — ids #1–115 in order, minus the ones that don't exist / were removed (#52 never existed; #69 removed in Solzhenitsyn dedup; #107, #114 not in set).
- **NEXT BATCH STARTS AT #116.** Continue in database `id` order (alphabetical Tier-B from here).
- To find the exact resume point programmatically: `sorted([p for p in profiles if not p.get('bioRu')], key=lambda p: p['id'])[:50]`.

### Data-integrity notes (found during translation — keep watching for these)
- **Solzhenitsyn dedup (DONE this session):** there were TWO Solzhenitsyn profiles — id 69 `aleksandr-solzhenitsyn` (miscategorized under Science & Academia) and id 100 `aleksander-solzhenitsyn` (correct: Writers & Intellectuals). Also id 100 **collided** with Alexei Yashin's id. Fix applied: dropped the id-69 duplicate; reassigned the kept Solzhenitsyn to **id 1079**; Yashin keeps id 100. Both `profiles.json` and `profiles-index.json` updated. Total profiles 1017 → **1016**.
- **Watch for more duplicate IDs / near-duplicate slugs** when translating future batches — run a `Counter(p['id'])` and slug check per batch. (Method: see this section's validation step.)
