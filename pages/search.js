import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import indexData from '../data/profiles-index.json'
import { langFromPath, t, categoryRu, countryRu, originRu } from '../lib/i18n'

const BG = ['linear-gradient(135deg,#2C4A72,#1B2E4B)','linear-gradient(135deg,#7A1E2E,#4A0E1C)',
  'linear-gradient(135deg,#1B3A1F,#375623)','linear-gradient(135deg,#4A3A10,#B8952A)',
  'linear-gradient(135deg,#2A2A4A,#1B1B3A)','linear-gradient(135deg,#3A1520,#7A1E2E)']
function initials(n){ return n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() }

export default function Search({ profiles }) {
  const router = useRouter()
  const lang = langFromPath(router.pathname, router.asPath)
  const tr = t(lang)
  const L = (href) => (lang === 'ru' ? '/ru' + href : href)
  const [q, setQ]       = useState('')
  const [active, setActive] = useState(false)

  const results = q.trim().length > 1
    ? profiles.filter(p => {
        const s = [p.name,p.nameRu,p.country,p.origin,p.profession,p.category,
                   p.historicalEntity,p.ancestralLevel,...(p.tags||[])].join(' ').toLowerCase()
        return q.toLowerCase().split(' ').every(term => s.includes(term))
      }).slice(0, 60)
    : []

  return (
    <Layout title={tr.search} description={lang==='ru'?'Поиск по архиву русской цивилизации — 1017 профилей.':"Search the Russian Civilization archive — 1,017 profiles."}>
      <div style={{background:'var(--navy)',padding:'56px 24px 52px'}}>
        <div className="container" style={{maxWidth:680}}>
          <div style={{fontFamily:'var(--font-ui)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:16}}>{tr.searchArchive}</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(28px,4vw,46px)',fontWeight:300,color:'var(--ivory)',marginBottom:28,letterSpacing:'-0.01em'}}>
            {lang==='ru'?'Найти профиль':'Find a profile'}
          </h1>
          <div style={{position:'relative'}}>
            <input
              type="text"
              autoFocus
              placeholder={lang==='ru'?'Имя, страна, происхождение, профессия…':'Name, country, origin, profession…'}
              value={q}
              onChange={e=>{ setQ(e.target.value); setActive(true) }}
              style={{
                width:'100%',padding:'18px 56px 18px 20px',
                border:'none',background:'rgba(255,255,255,0.07)',
                fontFamily:'var(--font-body)',fontSize:18,color:'var(--ivory)',
                outline:'none',letterSpacing:'0.01em',
                borderBottom:'2px solid rgba(247,244,238,0.2)',
              }}
            />
            <span style={{position:'absolute',right:18,top:'50%',transform:'translateY(-50%)',color:'rgba(247,244,238,0.3)',fontSize:20}}>⌕</span>
          </div>
          {q && (
            <div style={{fontFamily:'var(--font-ui)',fontSize:12,color:'rgba(247,244,238,0.4)',marginTop:12,letterSpacing:'0.05em'}}>
              {results.length} {lang==='ru'?'результатов для':('result'+(results.length!==1?'s':'')+' for')} «{q}»
            </div>
          )}
        </div>
      </div>

      {q.trim().length > 1 ? (
        <section className="cards-section">
          {results.length > 0 ? (
            <div className="cards-grid">
              {results.map((p,i) => (
                <Link href={L(`/p/${p.slug}`)} key={p.slug} className="card">
                  <div className="card-img">
                    <div className="card-img-bg" style={{background:BG[i%BG.length]}}>{initials(p.name)}</div>
                    <span className="card-tier">{p.tier}</span>
                  </div>
                  <div className="card-category">{categoryRu(p.category, lang)}</div>
                  <h3 className="card-title">{lang==='ru' && p.nameRu ? p.nameRu : p.name}</h3>
                  {(lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline) && <p className="card-excerpt">{lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline}</p>}
                  <div className="card-foot">
                    <span className="card-origin">{p.countryFlag} {countryRu(p.country, lang)} · {originRu(p.origin, lang)?.slice(0,28)}</span>
                    <span className="card-arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{textAlign:'center',padding:'80px 24px',fontFamily:'var(--font-display)',fontSize:24,fontWeight:300,color:'var(--ink-light)'}}>
              {lang==='ru'?`Профили не найдены по запросу «${q}»`:`No profiles found for "${q}"`}
            </div>
          )}
        </section>
      ) : (
        <div style={{padding:'56px 24px',maxWidth:680,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:300,fontStyle:'italic',color:'var(--ink-light)',marginBottom:24}}>
            {lang==='ru'?'Например: «Спилберг», «Москва», «Нобель», «Теннис», «Франция»':'Try: "Spielberg", "Moscow", "Nobel", "Tennis", "France"'}
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center'}}>
            {['Leonardo DiCaprio','Sergey Brin','Garry Kasparov','Anna Pavlova','Marc Chagall','Billy Wilder','Maria Sharapova'].map(name=>(
              <button key={name} onClick={()=>setQ(name)}
                style={{fontFamily:'var(--font-ui)',fontSize:12,color:'var(--navy)',background:'var(--ivory-warm)',border:'1px solid var(--ivory-rule)',padding:'7px 14px',cursor:'pointer',transition:'all 0.2s'}}
                onMouseOver={e=>{e.target.style.background='var(--navy)';e.target.style.color='var(--ivory)'}}
                onMouseOut={e=>{e.target.style.background='var(--ivory-warm)';e.target.style.color='var(--navy)'}}>
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  return { props: { profiles: indexData.profiles } }
}
