import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import HistoricalMap from '../../components/HistoricalMap'
import profilesData from '../../data/profiles.json'
import { langFromPath, countryRu, entityRu, originRu, categoryRu, regionRu } from '../../lib/i18n'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function AncestryTree({ profile, lang }) {
  const parts = profile.parents
    ? profile.parents.split(/[,;&]/).map(s => s.trim()).filter(Boolean)
    : []

  return (
    <div className="ancestry-tree">
      <span className="ancestry-tree-title">{lang==='ru'?'Родословная':'Family Tree'}</span>
      <div className="tree-level">
        <div className="tree-level-label">{lang==='ru'?'Персона':'Subject'}</div>
        <div className="tree-nodes">
          <div className="tree-node key">
            <span className="tree-node-name">{lang==='ru' && profile.nameRu ? profile.nameRu : profile.name}</span>
            <span className="tree-node-detail">{profile.countryFlag || '🌍'} {countryRu(profile.country, lang)}</span>
          </div>
        </div>
      </div>
      <div className="tree-connector">↑</div>
      {parts.length > 0 && (
        <>
          <div className="tree-level">
            <div className="tree-level-label">{profile.ancestralLevel || 'Ancestors'}</div>
            <div className="tree-nodes">
              {parts.map((p, i) => (
                <div key={i} className="tree-node">
                  <span className="tree-node-name">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="tree-connector">↑</div>
        </>
      )}
      <div className="tree-level">
        <div className="tree-level-label">{lang==='ru'?'Происхождение':'Origin'}</div>
        <div className="tree-nodes">
          <div className="tree-node origin">
            <span className="tree-node-name">{originRu(profile.origin, lang) || '—'}</span>
            <span className="tree-node-detail">🇷🇺 {entityRu(profile.historicalEntity, lang)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfilePhoto({ profile }) {
  const [imgUrl, setImgUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    if (profile.noPhoto) { setLoading(false); return () => { cancelled = true } }

    const cleanName = (s) => s.replace(/\s*\([^)]*\)\s*$/, '').trim()

    // Action API with origin=* returns CORS headers → NOT blocked by CORB.
    const fetchThumb = ({ title, search }) => {
      const base = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*'
        + '&prop=pageimages&piprop=thumbnail&pithumbsize=400&redirects=1'
      const url = search
        ? `${base}&generator=search&gsrlimit=1&gsrsearch=${encodeURIComponent(search)}`
        : `${base}&titles=${encodeURIComponent(title.replace(/ /g, '_'))}`
      return fetch(url)
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(d => {
          const pages = d?.query?.pages
          if (!pages) throw 0
          const page = Object.values(pages)[0]
          const src = page?.thumbnail?.source
          if (!src) throw 0
          // Guard: when using loose search, only accept if the matched page title
          // shares a surname with the person — prevents grabbing a wrong person's photo.
          if (search) {
            const surname = cleanName(profile.name).split(' ').pop().toLowerCase()
            const ttl = (page.title || '').toLowerCase()
            if (surname.length > 2 && !ttl.includes(surname)) throw 0
          }
          return src
        })
    }

    const set = (src) => { if (!cancelled) { setImgUrl(src); setLoading(false) } }
    const fail = () => { if (!cancelled) setLoading(false) }

    const title = profile.wikiTitle || cleanName(profile.name)
    const name  = cleanName(profile.name)
    const qualified = [name, profile.profession, profile.country].filter(Boolean).join(' ')

    const runApiChain = () => {
      fetchThumb({ title })
        .then(set)
        .catch(() => fetchThumb({ search: name })
          .then(set)
          .catch(() => fetchThumb({ search: qualified })
            .then(set)
            .catch(fail)))
    }

    // Verified Commons filename → direct <img> (CORB-immune). Probe, else auto-fetch.
    if (profile.photoFile) {
      const url = 'https://commons.wikimedia.org/wiki/Special:FilePath/'
        + encodeURIComponent(profile.photoFile) + '?width=400'
      const im = new Image()
      im.referrerPolicy = 'no-referrer'
      im.onload = () => (im.naturalWidth > 1 ? set(url) : runApiChain())
      im.onerror = () => runApiChain()
      im.src = url
      return () => { cancelled = true }
    }

    runApiChain()
    return () => { cancelled = true }
  }, [profile.name, profile.wikiTitle, profile.photoFile, profile.profession, profile.country])

  return (
    <div className="profile-photo">
      {loading ? (
        // Subtle loading shimmer
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(110deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)',
          animation: 'shimmer 1.5s infinite',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 76, fontWeight: 300,
            color: 'rgba(247,244,238,0.05)', letterSpacing: '-0.04em'
          }}>{initials(profile.name)}</div>
        </div>
      ) : imgUrl ? (
        <img
          src={imgUrl}
          alt={profile.name}
          referrerPolicy="no-referrer"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            display: 'block'
          }}
          onError={() => setImgUrl(null)}
        />
      ) : (
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 76, fontWeight: 300,
          color: 'rgba(247,244,238,0.1)', letterSpacing: '-0.04em', userSelect: 'none'
        }}>
          {initials(profile.name)}
        </div>
      )}
      <div className="profile-photo-cap">
        {imgUrl ? '© Wikimedia Commons' : `Profile #${profile.id}`}
      </div>
    </div>
  )
}

export default function ProfilePage({ profile, prev, next, related }) {
  const [scrollPct, setScrollPct] = useState(0)
  const router = useRouter()
  const lang = langFromPath(router.pathname, router.asPath)
  // Pick Russian field when in RU mode and a translation exists; else English.
  const f = (key) => (lang === 'ru' && profile[key + 'Ru']) ? profile[key + 'Ru'] : profile[key]
  const L = (href) => (lang === 'ru' ? '/ru' + href : href)

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('article')
      if (!article) return
      const top = article.getBoundingClientRect().top + window.scrollY
      const pct = Math.max(0, Math.min(100,
        ((window.scrollY - top) / article.offsetHeight) * 100))
      setScrollPct(pct)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bioText = f('bio') ||
    `${profile.name} is a renowned ${profile.profession?.toLowerCase() || 'figure'} with roots tracing back to the ${profile.historicalEntity || 'Russian Empire'}. Their heritage has shaped a remarkable career and global impact.`

  const connectionText = f('connectionNote') || (
    profile.russianProficiency === 'Fluent'
      ? `${profile.name} speaks fluent Russian, maintaining a living connection to their heritage.`
      : profile.ancestralLevel
        ? `Through ${profile.ancestralLevel?.toLowerCase()}, ${profile.name} carries a direct link to the ${profile.historicalEntity || 'Russian world'}.`
        : ''
  )

  return (
    <Layout
      title={profile.name}
      description={profile.tagline || `${profile.name} — ${profile.profession} with roots in ${profile.historicalEntity || 'Russia'}.`}
    >
      <div className="reading-bar" style={{ width: `${scrollPct}%` }} />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--ivory-rule)', padding: '10px 24px' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href={lang==='ru'?'/ru':'/'}>{lang==='ru'?'Главная':'Home'}</Link>
            <span>›</span>
            <Link href={(lang==='ru'?'/ru':'')+`/category/${profile.category?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
              {categoryRu(profile.category, lang)}
            </Link>
            <span>›</span>
            <span style={{ color: 'var(--ink)', fontWeight: 400 }}>{lang==='ru' && profile.nameRu ? profile.nameRu : profile.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="profile-hero">
        <div className="profile-hero-bg" />
        <div className="profile-hero-inner">
          <div>
            <span className="profile-tier-badge">{lang==='ru'?'Уровень':'Tier'} {profile.tier}</span>
            <div className="profile-cat-line">
              {profile.category} · {profile.country} · {profile.historicalEntity}
            </div>
            <h1 className="profile-name">{lang==='ru' && profile.nameRu ? profile.nameRu : profile.name}</h1>
            {lang==='ru'
              ? (profile.name && <span className="profile-name-ru">{profile.name}</span>)
              : (profile.nameRu && <span className="profile-name-ru">{profile.nameRu}</span>)}
            {f('tagline') && <p className="profile-tagline">{f('tagline')}</p>}
            <div className="profile-chips">
              {profile.countryFlag && (
                <span className="chip">{profile.countryFlag} {lang==='ru'?'Известность':'Fame'}: {profile.country}</span>
              )}
              <span className="chip">🇷🇺 {lang==='ru'?'Происхождение':'Origin'}: {profile.historicalEntity}</span>
              {profile.ancestralLevel && (
                <span className="chip">👤 {profile.ancestralLevel}</span>
              )}
              {f('migrationStory') && (
                <span className="chip">🗓 {f('migrationStory')}</span>
              )}
              {profile.russianProficiency && profile.russianProficiency !== 'Unknown' && (
                <span className="chip">🗣 {lang==='ru'?'Русский':'Russian'}: {profile.russianProficiency}</span>
              )}
            </div>
          </div>
          <ProfilePhoto profile={profile} />
        </div>
      </header>

      {/* Stats band */}
      <div className="stats-band">
        <div className="stats-band-inner">
          <div className="stats-band-item">
            <span className="stats-band-label">{lang==='ru'?'Профессия':'Profession'}</span>
            <span className="stats-band-value">{profile.profession}</span>
          </div>
          <div className="stats-band-item">
            <span className="stats-band-label">{lang==='ru'?'Русское происхождение':'Russian origin'}</span>
            <span className="stats-band-value">{originRu(profile.origin, lang) || '—'}</span>
            <span className="stats-band-sub">{entityRu(profile.historicalEntity, lang)}</span>
          </div>
          <div className="stats-band-item">
            <span className="stats-band-label">{lang==='ru'?'Родословная':'Ancestry'}</span>
            <span className="stats-band-value">{profile.ancestralLevel || '—'}</span>
            {profile.parents && (
              <span className="stats-band-sub" style={{ fontSize: 10 }}>
                {profile.parents.slice(0, 40)}{profile.parents.length > 40 ? '…' : ''}
              </span>
            )}
          </div>
          <div className="stats-band-item">
            <span className="stats-band-label">{lang==='ru'?'Русский язык':'Russian'}</span>
            <span className="stats-band-value">{profile.russianProficiency || '—'}</span>
          </div>
          <div className="stats-band-item">
            <span className="stats-band-label">{lang==='ru'?'Категория':'Category'}</span>
            <span className="stats-band-value">{categoryRu(profile.category, lang)}</span>
            <span className="stats-band-sub">{lang==='ru'?'Уровень':'Tier'} {profile.tier}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="profile-layout">
        <article id="article">

          <div className="prose-section">
            <div className="prose-label">{lang==='ru'?'Биография':'Biography'}</div>
            <h2 className="prose-h2">
              {lang==='ru' && profile.nameRu ? profile.nameRu : profile.name} — {profile.profession?.toLowerCase()} {lang==='ru'?'с корнями из':'with roots in the'} {profile.historicalEntity || 'Russian Empire'}
            </h2>
            <p className="prose-p">{bioText}</p>
            {f('migrationStory') && (
              <div className="pull">
                <p className="pull-text">"{f('migrationStory')}"</p>
                <span className="pull-attr">{lang==='ru'?'История миграции':'Migration story'}</span>
              </div>
            )}
          </div>

          <div className="prose-section">
            <div className="prose-label">{lang==='ru'?'Русская связь':'Russian Connection'}</div>
            <h2 className="prose-h2">{lang==='ru'?'Прослеживая корни':'Tracing the roots'} — {profile.origin || profile.historicalEntity}</h2>
            {connectionText && <p className="prose-p">{connectionText}</p>}
            {f('ancestryNote') && <p className="prose-p">{f('ancestryNote')}</p>}
            <AncestryTree profile={profile} lang={lang} />
            <HistoricalMap profile={profile} />
          </div>

          {profile.achievements && profile.achievements.length > 0 && (
            <div className="prose-section">
              <div className="prose-label">{lang==='ru'?'Ключевые достижения':'Key Achievements'}</div>
              <h2 className="prose-h2">{lang==='ru'?'Карьера, определённая амбициями':'A career defined by ambition'}</h2>
              <div>
                {(f('achievements') || profile.achievements).map((ach, i) => (
                  <div key={i} className="achievement">
                    <div className="achievement-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="achievement-text">{ach}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.quote && profile.quote !== 'NONE' && (
            <div className="quote-box">
              <p className="quote-text">"{f('quote')}"</p>
              <div className="quote-attr">{lang==='ru' && profile.nameRu ? profile.nameRu : profile.name}</div>
            </div>
          )}

          {profile.tags && profile.tags.length > 0 && (
            <div className="tags">
              {profile.tags.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          )}

          {(profile.source1 || profile.source2) && (
            <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--ivory-warm)', borderLeft: '3px solid var(--gold)' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{lang==='ru'?'Источники':'Sources'}</div>
              {profile.source1 && (
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--navy)', marginBottom: 4 }}>
                  <a href={profile.source1} target="_blank" rel="noopener noreferrer">{profile.sourceType || 'Wikipedia'} ↗</a>
                </div>
              )}
              {profile.source2 && (
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--navy)' }}>
                  <a href={profile.source2} target="_blank" rel="noopener noreferrer">{lang==='ru'?'Дополнительный источник':'Secondary source'} ↗</a>
                </div>
              )}
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-block">
            <div className="sidebar-title">{lang==='ru'?'Данные профиля':'Profile Data'}</div>
            <table className="data-table">
              <tbody>
                <tr><td>{lang==='ru'?'ID профиля':'Profile ID'}</td><td>#{profile.id}</td></tr>
                <tr><td>{lang==='ru'?'Уровень':'Tier'}</td><td style={{ color: 'var(--bordeaux)', fontWeight: 500 }}>{lang==='ru'?'Уровень':'Tier'} {profile.tier}</td></tr>
                <tr><td>{lang==='ru'?'Страна':'Country'}</td><td>{profile.countryFlag} {countryRu(profile.country, lang)}</td></tr>
                <tr><td>{lang==='ru'?'Происхождение':'Origin'}</td><td>{originRu(profile.origin, lang) || '—'}</td></tr>
                <tr><td>{lang==='ru'?'Государство':'Entity'}</td><td>{entityRu(profile.historicalEntity, lang) || '—'}</td></tr>
                <tr><td>{lang==='ru'?'Родословная':'Ancestry'}</td><td>{profile.ancestralLevel || '—'}</td></tr>
                <tr><td>{lang==='ru'?'Русский язык':'Russian'}</td><td>{profile.russianProficiency || '—'}</td></tr>
                <tr><td>{lang==='ru'?'Категория':'Category'}</td><td>{categoryRu(profile.category, lang)}</td></tr>
                <tr><td>{lang==='ru'?'Регион':'Region'}</td><td>{regionRu(profile.regionTag, lang) || '—'}</td></tr>
              </tbody>
            </table>
          </div>

          {related && related.length > 0 && (
            <div className="sidebar-block">
              <div className="sidebar-title">{lang==='ru'?'Похожие профили':'Similar Profiles'}</div>
              {related.map(r => (
                <Link href={(lang==='ru'?'/ru':'')+`/p/${r.slug}`} key={r.slug} className="related-card">
                  <div className="related-thumb">{initials(r.name)}</div>
                  <div>
                    <span className="related-name">{lang==='ru' && r.nameRu ? r.nameRu : r.name}</span>
                    <span className="related-meta">{r.profession} · {countryRu(r.country, lang)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="sidebar-block">
            <div className="sidebar-title">{lang==='ru'?'Навигация':'Browse'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href={(lang==='ru'?'/ru':'')+"/profiles"} style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--navy)' }}>→ {lang==='ru'?'Все профили':'All Profiles'}</Link>
              <Link href={(lang==='ru'?'/ru':'')+"/countries"} style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--navy)' }}>→ {lang==='ru'?'По странам':'By Country'}</Link>
              <Link href={(lang==='ru'?'/ru':'')+"/search"} style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--navy)' }}>→ {lang==='ru'?'Поиск по архиву':'Search Archive'}</Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <div className="profile-nav">
          <div className="profile-nav-inner">
            {prev ? (
              <Link href={(lang==='ru'?'/ru':'')+`/p/${prev.slug}`} className="profile-nav-item">
                <span className="profile-nav-dir">← {lang==='ru'?'Предыдущий':'Previous'}</span>
                <span className="profile-nav-name">{lang==='ru' && prev.nameRu ? prev.nameRu : prev.name}</span>
                <span className="profile-nav-sub">{prev.profession} · {countryRu(prev.country, lang)}</span>
              </Link>
            ) : <div />}
            {next && (
              <Link href={(lang==='ru'?'/ru':'')+`/p/${next.slug}`} className="profile-nav-item">
                <span className="profile-nav-dir">{lang==='ru'?'Следующий':'Next'} →</span>
                <span className="profile-nav-name">{lang==='ru' && next.nameRu ? next.nameRu : next.name}</span>
                <span className="profile-nav-sub">{next.profession} · {countryRu(next.country, lang)}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const profiles = profilesData.profiles
  // Generate pages for all enriched profiles (has bio) + all Tier A
  const toGenerate = profiles.filter(p =>
    p.tier === 'A' || (p.bio && p.bio.length > 20)
  )
  return {
    paths: toGenerate.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const profiles = profilesData.profiles
  const idx = profiles.findIndex(p => p.slug === params.slug)
  if (idx === -1) return { notFound: true }

  const profile = profiles[idx]

  // Related: same category, has bio, different person
  const related = profiles
    .filter(p =>
      p.category === profile.category &&
      p.slug !== profile.slug &&
      p.bio && p.bio.length > 20
    )
    .slice(0, 4)
    .map(p => ({ name: p.name, slug: p.slug, profession: p.profession, country: p.country }))

  // Prev/next among all enriched profiles
  const enriched = profiles.filter(p => p.tier === 'A' || (p.bio && p.bio.length > 20))
  const enrichedIdx = enriched.findIndex(p => p.slug === params.slug)
  const prev = enrichedIdx > 0 ? enriched[enrichedIdx - 1] : null
  const next = enrichedIdx < enriched.length - 1 ? enriched[enrichedIdx + 1] : null

  const slim = (p) => p ? { name: p.name, slug: p.slug, profession: p.profession, country: p.country } : null

  return {
    props: { profile, related, prev: slim(prev), next: slim(next) }
  }
}
