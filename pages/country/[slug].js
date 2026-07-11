import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import CardPhoto from '../../components/CardPhoto'
import indexData from '../../data/profiles-index.json'
import countriesData from '../../data/countries.json'
import { COUNTRY_INTROS, genericIntro } from '../../data/country-intros'
import { COUNTRY_INTROS_RU, genericIntroRu } from '../../data/country-intros-ru'
import { langFromPath, t, countryRu, categoryRu, entityRu, originRu } from '../../lib/i18n'

const BG = ['linear-gradient(135deg,#2C4A72,#1B2E4B)','linear-gradient(135deg,#7A1E2E,#4A0E1C)',
  'linear-gradient(135deg,#1B3A1F,#375623)','linear-gradient(135deg,#4A3A10,#B8952A)',
  'linear-gradient(135deg,#2A2A4A,#1B1B3A)','linear-gradient(135deg,#3A1520,#7A1E2E)']

function initials(n){ return n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() }

export default function CountryPage({ country, flag, profiles }) {
  const router = useRouter()
  const lang = langFromPath(router.pathname, router.asPath)
  const tr = t(lang)
  const L = (href) => (lang === 'ru' ? '/ru' + href : href)
  const cName = countryRu(country, lang)

  const intro = lang === 'ru'
    ? (COUNTRY_INTROS_RU[country] || genericIntroRu(cName, profiles.length))
    : (COUNTRY_INTROS[country] || genericIntro(country, profiles.length))

  const metaDesc = lang === 'ru'
    ? `${intro.h}: ${profiles.length} заметных фигур в стране ${cName} с корнями в Российской империи, СССР или современной России — актёры, учёные, основатели, спортсмены и художники, каждый со ссылкой на источник.`
    : `${intro.h}: ${profiles.length} notable figures in ${country} with roots in the Russian Empire, USSR, or modern Russia — actors, scientists, founders, athletes and artists, each sourced.`

  return (
    <Layout title={lang==='ru' ? `${cName} — фигуры с русскими и советскими корнями` : `${country} — Figures with Russian & Soviet Roots`} description={metaDesc}>
      <div style={{background:'var(--navy)',padding:'44px 24px 40px'}}>
        <div className="container">
          <div style={{fontFamily:'var(--font-ui)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:12}}>{tr.byCountry}</div>
          <div style={{display:'flex',alignItems:'center',gap:20,marginBottom:14}}>
            <span style={{fontSize:56,lineHeight:1}}>{flag}</span>
            <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(28px,5vw,52px)',fontWeight:300,color:'var(--ivory)',letterSpacing:'-0.01em',lineHeight:1.1}}>
              {cName}
            </h1>
          </div>
          <p style={{fontFamily:'var(--font-body)',fontSize:16,color:'rgba(247,244,238,0.5)'}}>
            {profiles.length} {profiles.length!==1 ? tr.profilesWithFameIn : tr.profileWithFameIn} {cName}
          </p>
        </div>
      </div>

      {/* SEO / GEO intro — answers "americans with russian roots" style queries */}
      <div style={{background:'var(--ivory-warm)',borderBottom:'1px solid var(--ivory-rule)'}}>
        <div className="container" style={{maxWidth:760,padding:'36px 24px'}}>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:500,color:'var(--ink)',marginBottom:16,lineHeight:1.3}}>
            {intro.h}
          </h2>
          {intro.p.map((para,idx)=>(
            <p key={idx} style={{fontFamily:'var(--font-body)',fontSize:16,lineHeight:1.8,color:'var(--ink-mid)',marginBottom:14,maxWidth:680}}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <section className="cards-section">
        <div className="cards-grid">
          {profiles.map((p,i) => (
            <Link href={L(`/p/${p.slug}`)} key={p.slug} className="card">
              <div className="card-img">
                <CardPhoto profile={p} bg={BG[i%BG.length]} />
                <span className="card-tier">{p.tier}</span>
              </div>
              <div className="card-category">{categoryRu(p.category, lang)}</div>
              <h3 className="card-title">{lang==='ru' && p.nameRu ? p.nameRu : p.name}</h3>
              {(lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline) && <p className="card-excerpt">{lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline}</p>}
              <div className="card-foot">
                <span className="card-origin">🇷🇺 {originRu(p.origin, lang)?.slice(0,32)}</span>
                <span className="card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = Object.keys(countriesData).map(name => ({
    params: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const country = Object.keys(countriesData).find(name =>
    name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') === params.slug
  )
  if (!country) return { notFound: true }
  const data     = countriesData[country]
  const profiles = indexData.profiles.filter(p => data.slugs.includes(p.slug))
  return { props: { country, flag: data.flag, profiles } }
}
