import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import CardPhoto from '../../components/CardPhoto'
import indexData from '../../data/profiles-index.json'
import categoriesData from '../../data/categories.json'
import { CAT_DESCRIPTIONS_RU, CAT_INTRO_RU } from '../../data/category-intros-ru'
import { langFromPath, t, categoryRu, countryRu, entityRu, originRu } from '../../lib/i18n'

const CAT_FROM_SLUG = {
  'cinema-tv':                    'Cinema & TV',
  'music-performing-arts':        'Music & Performing Arts',
  'science-academia':             'Science & Academia',
  'tech-business':                'Tech & Business',
  'business-moguls':              'Business Moguls',
  'politics-public-figures':      'Politics & Public Figures',
  'sports':                       'Sports',
  'writers-intellectuals':        'Writers & Intellectuals',
  'classical-music-high-culture': 'Classical Music & High Culture',
  'fashion-entertainment':        'Fashion & Entertainment',
  'other':                        'Other',
}

const CAT_DESCRIPTIONS = {
  'Cinema & TV':                   'Actors, directors, producers and screenwriters whose roots trace back to the Russian Empire, USSR or Russia.',
  'Music & Performing Arts':       'Singers, musicians, comedians and performers who carry Russian civilizational heritage.',
  'Science & Academia':            'Nobel laureates, physicists, mathematicians, and scientists shaped by Russian and Soviet intellectual tradition.',
  'Tech & Business':               'Founders, CEOs and technologists with roots in the Russian world — from Google to Telegram to Ethereum.',
  'Business Moguls':               'Billionaires, industrialists and business leaders whose family stories begin in the Russian Empire or USSR.',
  'Politics & Public Figures':     'Prime ministers, senators, presidents, judges and activists with Russian heritage.',
  'Sports':                        'Olympic champions, chess grandmasters, hockey legends and tennis stars from the Russian world.',
  'Writers & Intellectuals':       'Authors, poets, philosophers, journalists and designers shaped by Russian civilization.',
  'Classical Music & High Culture':'Composers, conductors, ballet dancers and opera singers from the Russian classical tradition.',
  'Fashion & Entertainment':       'Models, dancers, photographers and entertainers with roots in Russia or the Soviet Union.',
}

// Expanded SEO/GEO body text — answers "hollywood celebrities with russian background",
// "russian scientists who changed the world" style queries with real names and history.
const CAT_INTRO = {
  'Cinema & TV': "Hollywood was, to a remarkable degree, an invention of immigrants from the Russian Empire. The founders of MGM, Warner Bros., Paramount, Universal, and Fox were born in the Empire or to families who fled it. That founding DNA continues through generations of actors and directors with Russian, Ukrainian, and Jewish roots — from golden-age stars to today\u2019s leading names. This category documents film and television figures whose heritage traces to the Russian civilizational space.",
  'Science & Academia': "Few traditions have shaped modern science as deeply as the Russian and Soviet scientific schools. This heritage produced the vaccines that ended polio and hepatitis, foundational work in physics and mathematics, and a stream of Nobel laureates and Fields medalists. Many emigrated west during the great waves of the twentieth century, carrying that rigorous tradition into American, Israeli, and European institutions. This category documents scientists, mathematicians, and scholars with roots in the Russian world.",
  'Tech & Business': "The modern technology world carries an outsized imprint from the Russian civilizational diaspora. Google was co-founded by Moscow-born Sergey Brin; WhatsApp by Kyiv-born Jan Koum; Telegram by the Durov brothers; Ethereum by Vitalik Buterin. The blend of world-class mathematical education and entrepreneurial migration produced founders and technologists across Silicon Valley and beyond. This category documents them.",
  'Sports': "From chess to the Olympic arena, the Russian and Soviet sporting tradition set global standards. This category documents champions with roots in the Russian world — chess grandmasters who dominated the game for decades, Olympic gold medalists, hockey and tennis legends, and world champions in combat sport, wherever they now compete or hold citizenship.",
  'Music & Performing Arts': "The songbook of the modern West was substantially written by children of the Russian Empire — Irving Berlin, George Gershwin, and countless others. This category documents singers, musicians, and performers whose heritage traces to the Russian civilizational space, across every genre from Broadway to pop to hip-hop.",
  'Classical Music & High Culture': "Russian classical culture — the composers, the conductors, and above all the ballet — reshaped world art. From the Ballets Russes that stunned Paris to the virtuosos who filled Western concert halls after emigrating, this tradition remains one of the civilization\u2019s most visible global exports. This category documents its figures.",
  'Writers & Intellectuals': "Russian literature and thought — Dostoevsky, Tolstoy, Nabokov — form one of humanity\u2019s great intellectual traditions. This category documents writers, poets, philosophers, and journalists shaped by that tradition, including the many who carried it into exile and wrote in new languages while never losing its imprint.",
  'Business Moguls': "This category documents billionaires, industrialists, and business leaders whose family stories begin in the Russian Empire or the Soviet Union — figures whose enterprises span finance, real estate, media, and industry across the world.",
  'Fashion & Entertainment': "This category documents models, dancers, photographers, and entertainers with roots in Russia or the Soviet Union whose work shapes global fashion and popular culture.",
}


const BG = ['linear-gradient(135deg,#2C4A72,#1B2E4B)','linear-gradient(135deg,#7A1E2E,#4A0E1C)',
  'linear-gradient(135deg,#1B3A1F,#375623)','linear-gradient(135deg,#4A3A10,#B8952A)',
  'linear-gradient(135deg,#2A2A4A,#1B1B3A)','linear-gradient(135deg,#3A1520,#7A1E2E)']

function initials(n){ return n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() }

export default function CategoryPage({ catName, profiles }) {
  const router = useRouter()
  const lang = langFromPath(router.pathname, router.asPath)
  const tr = t(lang)
  const L = (href) => (lang === 'ru' ? '/ru' + href : href)
  const catDisplay = categoryRu(catName, lang)
  const desc = lang==='ru' ? (CAT_DESCRIPTIONS_RU[catName] || '') : (CAT_DESCRIPTIONS[catName] || '')
  const introBody = lang==='ru' ? CAT_INTRO_RU[catName] : CAT_INTRO[catName]
  return (
    <Layout
      title={catDisplay}
      description={`${profiles.length} ${lang==='ru'?'профилей':'profiles'} — ${desc}`}
    >
      {/* Header */}
      <div style={{background:'var(--navy)',padding:'44px 24px 40px'}}>
        <div className="container">
          <div style={{fontFamily:'var(--font-ui)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:12}}>
            {tr.category}
          </div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(30px,5vw,54px)',fontWeight:300,color:'var(--ivory)',marginBottom:14,letterSpacing:'-0.01em',lineHeight:1.1}}>
            {catDisplay}
          </h1>
          <p style={{fontFamily:'var(--font-body)',fontSize:17,color:'rgba(247,244,238,0.55)',maxWidth:560,lineHeight:1.65,marginBottom:18}}>
            {desc || (lang==='ru' ? `${profiles.length} профилей в этой категории.` : `${profiles.length} profiles in this category.`)}
          </p>
          <div style={{fontFamily:'var(--font-ui)',fontSize:12,color:'rgba(247,244,238,0.35)',letterSpacing:'0.06em'}}>
            {profiles.length} {lang==='ru'?'профилей':'profiles'} · {profiles.filter(p=>p.tier==='A').length} {tr.tierACount}
          </div>
        </div>
      </div>

      {/* SEO / GEO intro body */}
      {introBody && (
        <div style={{background:'var(--ivory-warm)',borderBottom:'1px solid var(--ivory-rule)'}}>
          <div className="container" style={{maxWidth:760,padding:'32px 24px'}}>
            <p style={{fontFamily:'var(--font-body)',fontSize:16,lineHeight:1.8,color:'var(--ink-mid)',margin:0,maxWidth:680}}>
              {introBody}
            </p>
          </div>
        </div>
      )}

      {/* Cards */}
      <section className="cards-section">
        <div className="cards-grid">
          {profiles.map((p, i) => (
            <Link href={L(`/p/${p.slug}`)} key={p.slug} className="card">
              <div className="card-img">
                <CardPhoto profile={p} bg={BG[i % BG.length]} />
                <span className="card-tier">{p.tier}</span>
              </div>
              <div className="card-category">{entityRu(p.historicalEntity, lang)}</div>
              <h3 className="card-title">{lang==='ru' && p.nameRu ? p.nameRu : p.name}</h3>
              {(lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline) && <p className="card-excerpt">{lang==='ru' ? (p.taglineRu||p.tagline) : p.tagline}</p>}
              <div className="card-foot">
                <span className="card-origin">{p.countryFlag} {countryRu(p.country, lang)} · {originRu(p.origin, lang)?.slice(0,28)}</span>
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
  return {
    paths: Object.keys(CAT_FROM_SLUG).map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const catName  = CAT_FROM_SLUG[params.slug]
  const profiles = indexData.profiles.filter(p => p.category === catName)
  return { props: { catName, profiles } }
}
