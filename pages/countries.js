import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import countriesData from '../data/countries.json'
import { langFromPath, t, countryRu } from '../lib/i18n'

export default function Countries({ countries }) {
  const router = useRouter()
  const lang = langFromPath(router.pathname, router.asPath)
  const tr = t(lang)
  const L = (href) => (lang === 'ru' ? '/ru' + href : href)
  return (
    <Layout title={tr.byCountry} description={lang==='ru'?'Просматривайте профили русской цивилизации по странам известности — 39 стран мира.':"Browse Russian civilization profiles by country of fame — 39 countries worldwide."}>
      <div style={{background:'var(--navy)',padding:'44px 24px 40px'}}>
        <div className="container">
          <div style={{fontFamily:'var(--font-ui)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:12}}>{tr.browse}</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(30px,5vw,54px)',fontWeight:300,color:'var(--ivory)',marginBottom:14,letterSpacing:'-0.01em'}}>
            {tr.byCountry}
          </h1>
          <p style={{fontFamily:'var(--font-body)',fontSize:17,color:'rgba(247,244,238,0.55)',maxWidth:520,lineHeight:1.65}}>
            {lang === 'ru'
              ? 'От Соединённых Штатов до Австралии — русская цивилизация оставила след в 39 странах. Просматривайте профили по стране, в которой пришла известность.'
              : 'From the United States to Australia — Russian civilization left its mark on 39 countries. Browse profiles by their country of fame.'}
          </p>
        </div>
      </div>

      <section style={{padding:'48px 24px',maxWidth:1140,margin:'0 auto'}}>
        <div className="section-header"><span className="section-title">{countries.length} {tr.countriesCount}</span></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:2}}>
          {countries.map(c => (
            <Link href={L(`/country/${c.slug}`)} key={c.slug}
              style={{background:'var(--ivory-warm)',border:'1px solid var(--ivory-rule)',padding:'20px 18px',textDecoration:'none',color:'inherit',display:'block',transition:'background 0.2s'}}
              onMouseOver={e=>e.currentTarget.style.background='var(--white)'}
              onMouseOut={e=>e.currentTarget.style.background='var(--ivory-warm)'}
            >
              <div style={{fontSize:28,marginBottom:8}}>{c.flag}</div>
              <div style={{fontFamily:'var(--font-display)',fontSize:17,fontWeight:500,color:'var(--ink)',marginBottom:4}}>{countryRu(c.name, lang)}</div>
              <div style={{fontFamily:'var(--font-ui)',fontSize:11,color:'var(--ink-light)'}}>{c.count} {lang==='ru'?'проф.':('profile'+(c.count!==1?'s':''))}</div>
              <div style={{height:2,background:'var(--ivory-rule)',marginTop:10,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,bottom:0,background:'var(--bordeaux)',width:`${Math.min(100,Math.round(c.count/5))}%`}}/>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const countries = Object.entries(countriesData)
    .map(([name, data]) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
      count: data.count,
      flag:  data.flag,
    }))
    .sort((a,b) => b.count - a.count)
  return { props: { countries } }
}
