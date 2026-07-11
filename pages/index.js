import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import CardPhoto from '../components/CardPhoto'
import profilesData from '../data/profiles-index.json'
import categoriesData from '../data/categories.json'
import countriesData from '../data/countries.json'
import { langFromPath, t, categoryRu, countryRu, entityRu, originRu } from '../lib/i18n'

const CAT_SLUG = {
  'Cinema & TV': 'cinema-tv',
  'Music & Performing Arts': 'music-performing-arts',
  'Science & Academia': 'science-academia',
  'Tech & Business': 'tech-business',
  'Business Moguls': 'business-moguls',
  'Politics & Public Figures': 'politics-public-figures',
  'Sports': 'sports',
  'Writers & Intellectuals': 'writers-intellectuals',
  'Classical Music & High Culture': 'classical-music-high-culture',
  'Fashion & Entertainment': 'fashion-entertainment',
  'Digital & Social Media': 'digital-social-media',
  'Cultural Phenomenon': 'cultural-phenomenon',
  'Other': 'other',
}

const BG_COLORS = [
  'linear-gradient(135deg,#2C4A72,#1B2E4B)',
  'linear-gradient(135deg,#7A1E2E,#4A0E1C)',
  'linear-gradient(135deg,#1B3A1F,#375623)',
  'linear-gradient(135deg,#4A3A10,#B8952A)',
  'linear-gradient(135deg,#2A2A4A,#1B1B3A)',
  'linear-gradient(135deg,#3A1520,#7A1E2E)',
]

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Home({ tierA, topCountries, categories, stats }) {
  const router = useRouter()
  const lang = langFromPath(router.pathname, router.asPath)
  const tr = t(lang)
  const L = (href) => (lang === 'ru' ? '/ru' + href : href)
  const hero = tierA[0]
  const cards = tierA.slice(1, 13)
  const heroName = lang==='ru' && hero.nameRu ? hero.nameRu : hero.name
  const heroTagline = lang==='ru' ? (hero.taglineRu || hero.tagline) : hero.tagline

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">{lang==='ru'?'Избранное · Уровень A':'Featured · Tier A'}</div>
            <h1 className="hero-title">
              {lang==='ru'
                ? <>Как {heroName} несёт корни, уходящие в <em>{entityRu(hero.historicalEntity,lang) || 'Российскую империю'}</em></>
                : <>How a grandmother from <em>{hero.origin?.split(' ')[0] || 'Russia'}</em> shaped one of the world's greatest careers</>}
            </h1>
            <p className="hero-deck">
              {lang==='ru'
                ? <>{heroName} — {hero.profession} — с корнями глубоко в {entityRu(hero.historicalEntity,lang) || 'Российской империи'}. {heroTagline ? heroTagline : ''}</>
                : <>{hero.name} — {hero.profession} — carries roots deep in the {hero.historicalEntity || 'Russian Empire'}.{hero.ancestryNote ? ' ' + hero.ancestryNote.slice(0, 120) + '…' : ''}</>}
            </p>
            <div className="hero-meta">
              <Link href={L(`/p/${hero.slug}`)} className="hero-read">
                {lang==='ru'?'Читать профиль':'Read full profile'} &nbsp;→
              </Link>
              {hero.countryFlag && (
                <span className="hero-chip">{hero.countryFlag} {lang==='ru'?'Известность':'Fame'}: {countryRu(hero.country,lang)}</span>
              )}
              <span className="hero-chip">🇷🇺 {lang==='ru'?'Происхождение':'Origin'}: {entityRu(hero.historicalEntity,lang)}</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo" style={{ background: BG_COLORS[0], position: 'relative', overflow: 'hidden' }}>
              <CardPhoto profile={hero} bg={BG_COLORS[0]} />
              <div className="hero-photo-overlay">
                <div className="hero-photo-name">{heroName}</div>
                <div className="hero-photo-sub">{hero.profession} · {countryRu(hero.country,lang)}</div>
              </div>
            </div>
            <p className="hero-photo-caption">
              {lang==='ru'?'Происхождение':'Origin'}: {hero.origin} · {entityRu(hero.historicalEntity,lang)}
            </p>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--ivory-rule)', margin: '0 24px' }} />

      {/* ── Category strip ── */}
      <div className="cat-strip">
        <div className="cat-strip-inner">
          <div className="cat-strip-label">{tr.browseByCategory}</div>
          <div className="cat-grid">
            {categories.map(cat => (
              <Link href={L(`/category/${CAT_SLUG[cat.name] || 'other'}`)} key={cat.name} className="cat-pill">
                <span className="cat-pill-name">{categoryRu(cat.name, lang)}</span>
                <span className="cat-pill-count">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <section className="cards-section">
        <div className="section-header">
          <span className="section-title">{lang==='ru'?'Выдающиеся личности — Уровень A':'Notable Figures — Tier A'}</span>
        </div>
        <div className="cards-grid">
          {cards.map((p, i) => (
            <Link href={L(`/p/${p.slug}`)} key={p.slug} className="card">
              <div className="card-img">
                <CardPhoto profile={p} bg={BG_COLORS[i % BG_COLORS.length]} />
                <span className="card-tier">{p.tier}</span>
              </div>
              <div className="card-category">{categoryRu(p.category, lang)}</div>
              <h3 className="card-title">{lang==='ru' && p.nameRu ? p.nameRu : p.name}</h3>
              {(lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline) && <p className="card-excerpt">{lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline}</p>}
              <div className="card-foot">
                <span className="card-origin">
                  {p.countryFlag} {countryRu(p.country, lang)} · {originRu(p.origin, lang)}
                </span>
                <span className="card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="stats-section">
        <div className="stats-inner">
          <div className="stats-eyebrow">{lang==='ru'?'Архив':'The Archive'}</div>
          <h2 className="stats-title">
            {lang==='ru'
              ? <>Три волны эмиграции, которые <em>переделали западный мир</em></>
              : <>Three waves of emigration that <em>remade the Western world</em></>}
          </h2>
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-num">978</span>
              <span className="stat-label">{lang==='ru'?'Профилей задокументировано':'Profiles documented'}</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">109<span>+</span></span>
              <span className="stat-label">{lang==='ru'?'Стран представлено':'Countries represented'}</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">50</span>
              <span className="stat-label">{lang==='ru'?'Мировых икон уровня A':'Tier A global icons'}</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">11</span>
              <span className="stat-label">{lang==='ru'?'Категорий достижений':'Categories of achievement'}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allProfiles = profilesData.profiles
  const tierA = allProfiles.filter(p => p.tier === 'A').slice(0, 30)

  const categories = Object.entries(categoriesData)
    .map(([name, data]) => ({ name, count: data.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 9)

  const topCountries = Object.entries(countriesData)
    .slice(0, 8)
    .map(([name, data]) => ({ name, count: data.count, flag: data.flag }))

  return {
    props: { tierA, topCountries, categories, stats: profilesData.meta }
  }
}
