import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { langFromPath, localizeHref, t } from '../lib/i18n'

const NAV_SLUGS = [
  'cinema-tv','science-academia','music-performing-arts','business-moguls',
  'politics-public-figures','sports','writers-intellectuals','tech-business',
  'classical-music-high-culture',
]

export default function Layout({ children, title, description }) {
  const router = useRouter()
  const lang = langFromPath(router.pathname, router.asPath)
  const tr = t(lang)
  const L = (href) => localizeHref(href, lang)

  const brandTitle = lang === 'ru' ? 'Русская Цивилизация' : 'Russian Civilization'
  const pageTitle = title ? `${title} — ${brandTitle}` : `${brandTitle} — ${tr.tagline}`
  const pageDesc  = description || `${tr.ribbon} — ${tr.profilesCountries}.`

  // href to switch language: same page, other language prefix
  const stripRu = (p) => (p === '/ru' ? '/' : p.startsWith('/ru/') ? p.slice(3) : p)
  const base = stripRu(router.asPath || '/')
  const switchHref = lang === 'ru' ? base : localizeHref(base === '' ? '/' : base, 'ru')

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B2E4B" />
      </Head>

      <div className="ribbon">
        {tr.ribbon} &nbsp;·&nbsp; {tr.profilesCountries} &nbsp;·&nbsp;
        <Link href={L('/about')} style={{color:'var(--gold)',textDecoration:'none'}}>{tr.aboutThisProject}</Link>
      </div>

      <div className="masthead">
        <div className="masthead-top">
          <span className="masthead-date">{tr.volYear}</span>
          <div className="masthead-logo">
            <span className="masthead-ru">{lang==='ru' ? 'Russian Civilization' : 'Русская Цивилизация'}</span>
            <Link href={L('/')} style={{textDecoration:'none'}}>
              <span className="masthead-wordmark">{lang==='ru' ? <>Русская<span>Цивилизация</span></> : <>Russian<span>Civilization</span></>}</span>
            </Link>
            <span className="masthead-tagline">{tr.tagline}</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6,alignItems:'flex-end'}}>
            <Link href={switchHref} style={{fontFamily:'var(--font-ui)',fontSize:11,color:'var(--gold)',textDecoration:'none',whiteSpace:'nowrap'}}>
              {tr.langName}
            </Link>
            <Link href={L('/search')} style={{fontFamily:'var(--font-ui)',fontSize:11,color:'var(--navy)',textDecoration:'none',borderBottom:'1px solid var(--navy)',paddingBottom:1,whiteSpace:'nowrap'}}>
              {tr.searchArchive}
            </Link>
          </div>
        </div>
      </div>
      <hr className="masthead-rule-double" />
      <hr className="masthead-rule" />

      <div className="nav-wrapper">
        <nav className="nav">
          <Link href={L('/')} className="nav-home">RC</Link>
          <Link href={L('/profiles')} className={`nav-item${router.pathname==='/profiles'?' active':''}`}>{tr.allProfiles}</Link>
          {NAV_SLUGS.map(slug => (
            <Link key={slug} href={L(`/category/${slug}`)}
              className={`nav-item${router.asPath===L(`/category/${slug}`)?' active':''}`}>
              {tr.nav[slug]}
            </Link>
          ))}
          <Link href={L('/countries')} className={`nav-item${router.pathname==='/countries'?' active':''}`}>{tr.byCountry}</Link>
          <Link href={L('/about')} className={`nav-item${router.pathname==='/about'?' active':''}`}>{tr.about}</Link>
          <Link href={L('/faq')} className={`nav-item${router.pathname==='/faq'?' active':''}`}>{tr.faq}</Link>
        </nav>
      </div>

      <main>{children}</main>

      <footer className="footer">
        <div>
          <div className="footer-logo">Russian<span>Civilization</span>.org</div>
          <div style={{fontFamily:'var(--font-ui)',fontSize:10,color:'rgba(247,244,238,0.2)',marginTop:4,letterSpacing:'0.05em'}}>
            {tr.footerNote}
          </div>
        </div>
        <div style={{display:'flex',gap:20,flexWrap:'wrap',alignItems:'center'}}>
          {[[tr.allProfiles,'/profiles'],[tr.byCountry,'/countries'],[tr.search,'/search'],[tr.about,'/about'],[tr.faq,'/faq']].map(([label,href])=>(
            <Link key={href} href={L(href)} style={{fontFamily:'var(--font-ui)',fontSize:11,color:'rgba(247,244,238,0.4)',textDecoration:'none'}}>{label}</Link>
          ))}
        </div>
        <div className="footer-copy">{tr.footerCopy}</div>
      </footer>
    </>
  )
}
