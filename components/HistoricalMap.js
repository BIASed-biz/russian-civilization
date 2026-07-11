import { useState } from 'react'

// Three era maps, all CC-licensed on Wikimedia Commons, loaded via Special:FilePath
// (same deterministic method as photos — no API, no CORS).
const ERA_MAPS = {
  empire: {
    file: 'Russian Empire (1914).svg',
    label: 'Russian Empire',
    period: 'c. 1721–1917',
    caption: 'At the time, this region lay within the Russian Empire, which spanned from Poland to the Pacific.',
  },
  ussr: {
    file: 'Map of USSR with SSR names.svg',
    label: 'Soviet Union (USSR)',
    period: '1922–1991',
    caption: 'At the time, this region was one of the fifteen republics of the Soviet Union.',
  },
  post: {
    file: 'USSR Republics numbered by alphabet.svg',
    label: 'Post-Soviet states',
    period: 'since 1991',
    caption: 'Today, the former Soviet space comprises fifteen sovereign independent states.',
  },
}

// Decide which era map fits a profile, from its historicalEntity + origin text.
function pickEra(profile) {
  const e = (profile.historicalEntity || '').toLowerCase()
  const blob = (e + ' ' + (profile.migrationStory || '') + ' ' + (profile.ancestralLevel || '')).toLowerCase()

  // Explicit empire signal
  if (e.includes('empire')) return 'empire'
  // Explicit USSR / Soviet signal
  if (e.includes('ussr') || e.includes('soviet')) return 'ussr'
  // Modern Russia / Federation
  if (e.includes('federation') || e === 'russia') return 'post'

  // Fallback: infer from any 4-digit year we can find in the story/origin
  const m = blob.match(/\b(18|19|20)\d{2}\b/)
  if (m) {
    const yr = parseInt(m[0], 10)
    if (yr < 1917) return 'empire'
    if (yr < 1991) return 'ussr'
    return 'post'
  }
  return null  // not confident → render nothing
}

export default function HistoricalMap({ profile }) {
  const [failed, setFailed] = useState(false)
  const era = pickEra(profile)
  if (!era || failed) return null

  const map = ERA_MAPS[era]
  const src = 'https://commons.wikimedia.org/wiki/Special:FilePath/'
    + encodeURIComponent(map.file) + '?width=900'

  return (
    <div style={{margin:'32px 0',border:'1px solid var(--ivory-rule)',background:'var(--ivory-warm)'}}>
      <div style={{padding:'16px 20px 0'}}>
        <div style={{fontFamily:'var(--font-ui)',fontSize:9,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--bordeaux)',marginBottom:6}}>
          Historical context
        </div>
        <div style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:500,color:'var(--ink)'}}>
          {map.label} <span style={{color:'var(--ink-light)',fontWeight:400,fontSize:15}}>· {map.period}</span>
        </div>
      </div>
      <div style={{padding:'12px 20px'}}>
        <img
          src={src}
          alt={`Map of the ${map.label}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          style={{width:'100%',height:'auto',display:'block',background:'#fff',border:'1px solid var(--ivory-rule)'}}
        />
      </div>
      <div style={{padding:'0 20px 16px'}}>
        <p style={{fontFamily:'var(--font-body)',fontSize:13.5,lineHeight:1.6,color:'var(--ink-mid)',margin:0}}>
          {profile.origin ? <strong>{profile.origin}.</strong> : null} {map.caption}
        </p>
        <div style={{fontFamily:'var(--font-ui)',fontSize:10,color:'var(--ink-light)',marginTop:8}}>
          Map: Wikimedia Commons (CC BY-SA)
        </div>
      </div>
    </div>
  )
}
