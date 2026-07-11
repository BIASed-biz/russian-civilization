import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import CardPhoto from '../components/CardPhoto'
import indexData from '../data/profiles-index.json'
import { langFromPath, t, categoryRu, countryRu, originRu } from '../lib/i18n'

const CATS = ['All','Cinema & TV','Music & Performing Arts','Science & Academia',
  'Tech & Business','Business Moguls','Politics & Public Figures','Sports',
  'Writers & Intellectuals','Classical Music & High Culture','Fashion & Entertainment','Other']

const TIERS = ['All','A','B']

const BG = [
  'linear-gradient(135deg,#2C4A72,#1B2E4B)',
  'linear-gradient(135deg,#7A1E2E,#4A0E1C)',
  'linear-gradient(135deg,#1B3A1F,#375623)',
  'linear-gradient(135deg,#4A3A10,#B8952A)',
  'linear-gradient(135deg,#2A2A4A,#1B1B3A)',
  'linear-gradient(135deg,#3A1520,#7A1E2E)'
]

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const PAGE_SIZE = 60

export default function Profiles({ profiles, total }) {
  const router = useRouter()
  const lang = langFromPath(router.pathname, router.asPath)
  const tr = t(lang)
  const L = (href) => (lang === 'ru' ? '/ru' + href : href)
  const [filter, setFilter] = useState({ cat: 'All', tier: 'All', q: '' })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return profiles.filter(p => {
      if (filter.cat !== 'All' && p.category !== filter.cat) return false
      if (filter.tier !== 'All' && p.tier !== filter.tier) return false
      if (filter.q) {
        const q = filter.q.toLowerCase()
        return (
          p.name?.toLowerCase().includes(q) ||
          p.origin?.toLowerCase().includes(q) ||
          p.country?.toLowerCase().includes(q) ||
          p.profession?.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [profiles, filter])

  const paginated = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < filtered.length

  const handleFilterChange = (key, value) => {
    setFilter(f => ({ ...f, [key]: value }))
    setPage(1)
  }

  return (
    <Layout title={tr.allProfilesTitle} description={`Browse all ${total} profiles in the Russian Civilization archive.`}>
      {/* Header */}
      <div style={{ background: 'var(--navy)', padding: '40px 24px 36px' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>{lang==='ru'?'Архив':'Archive'}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--ivory)', marginBottom: 12, letterSpacing: '-0.01em' }}>
            {tr.allProfilesTitle}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(247,244,238,0.55)', maxWidth: 520 }}>
            {lang==='ru'
              ? `${total} человек с документированными корнями в Российской империи, СССР или России — в 39 странах и 11 категориях.`
              : `${total} individuals with documented roots in the Russian Empire, USSR or Russia — spanning 39 countries and 11 categories.`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--ivory-warm)', borderBottom: '1px solid var(--ivory-rule)', padding: '14px 24px', position: 'sticky', top: 48, zIndex: 90 }}>
        <div className="container" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder={lang==='ru'?'Поиск по имени, стране, происхождению…':'Search by name, country, origin…'}
            value={filter.q}
            onChange={e => handleFilterChange('q', e.target.value)}
            style={{ padding: '8px 14px', border: '1px solid var(--ivory-rule)', background: 'var(--white)', fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--ink)', flex: '1', minWidth: 180, maxWidth: 300, outline: 'none' }}
          />
          <select value={filter.cat} onChange={e => handleFilterChange('cat', e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--ivory-rule)', background: 'var(--white)', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--ink)', cursor: 'pointer' }}>
            {CATS.map(c => <option key={c} value={c}>{c==='All' ? (lang==='ru'?'Все категории':'All') : categoryRu(c, lang)}</option>)}
          </select>
          <select value={filter.tier} onChange={e => handleFilterChange('tier', e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--ivory-rule)', background: 'var(--white)', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--ink)', cursor: 'pointer' }}>
            {TIERS.map(tv => <option key={tv} value={tv}>{tv === 'All' ? (lang==='ru'?'Все уровни':'All Tiers') : `${lang==='ru'?'Уровень':'Tier'} ${tv}`}</option>)}
          </select>
          {(filter.cat !== 'All' || filter.tier !== 'All' || filter.q) && (
            <button onClick={() => { setFilter({ cat: 'All', tier: 'All', q: '' }); setPage(1) }}
              style={{ padding: '8px 14px', background: 'var(--bordeaux)', color: 'var(--white)', border: 'none', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {lang==='ru'?'Сброс':'Clear'}
            </button>
          )}
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--ink-light)', marginLeft: 'auto' }}>
            {filtered.length} {lang==='ru'?'профилей':('profile'+(filtered.length !== 1 ? 's' : ''))}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="cards-section">
        <div className="cards-grid">
          {paginated.map((p, i) => (
            <Link href={L(`/p/${p.slug}`)} key={p.slug} className="card">
              <div className="card-img">
                <CardPhoto profile={p} bg={BG[i % BG.length]} />
                <span className="card-tier">{p.tier}</span>
              </div>
              <div className="card-category">{categoryRu(p.category, lang)}</div>
              <h3 className="card-title">{lang==='ru' && p.nameRu ? p.nameRu : p.name}</h3>
              {(lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline) && <p className="card-excerpt">{lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline}</p>}
              <div className="card-foot">
                <span className="card-origin">{p.countryFlag} {countryRu(p.country, lang)} · {originRu(p.origin, lang)?.slice(0, 28)}</span>
                <span className="card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button
              onClick={() => setPage(p => p + 1)}
              style={{ padding: '14px 40px', background: 'var(--navy)', color: 'var(--ivory)', border: 'none', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {lang==='ru'?'Показать ещё':'Load more'} · {filtered.length - paginated.length} {lang==='ru'?'осталось':'remaining'}
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      profiles: indexData.profiles,
      total: indexData.profiles.length,
    }
  }
}
