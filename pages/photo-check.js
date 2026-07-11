import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import indexData from '../data/profiles-index.json'

// Internal QA page: loads every profile and flags which have NO photo
// (neither a baked-in photoFile nor a Wikipedia auto-fetch hit).
// Visit /photo-check/ to get a copy-paste list of names still missing a picture.
export default function PhotoCheck() {
  const profiles = (indexData.profiles || indexData)
  const [missing, setMissing] = useState([])
  const [done, setDone] = useState(0)
  const [running, setRunning] = useState(false)

  const cleanName = (s) => s.replace(/\s*\([^)]*\)\s*$/, '').trim()

  async function hasPhoto(p) {
    if (p.photoFile) return true
    const trySummary = async (title) => {
      const enc = encodeURIComponent(title.replace(/ /g, '_'))
      const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${enc}`)
      if (!r.ok) throw 0
      const d = await r.json()
      if (d?.type === 'disambiguation') throw 0
      if (d?.thumbnail?.source) return true
      throw 0
    }
    const trySearch = async (q) => {
      const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*'
        + '&generator=search&gsrlimit=1&gsrsearch=' + encodeURIComponent(q)
        + '&prop=pageimages&piprop=thumbnail&pithumbsize=240'
      const r = await fetch(url); if (!r.ok) throw 0
      const d = await r.json()
      const pg = d?.query?.pages
      if (pg && Object.values(pg)[0]?.thumbnail?.source) return true
      throw 0
    }
    try { return await trySummary(p.wikiTitle || cleanName(p.name)) }
    catch { try { return await trySearch(cleanName(p.name)) } catch { return false } }
  }

  async function run() {
    setRunning(true); setMissing([]); setDone(0)
    const miss = []
    for (let i = 0; i < profiles.length; i++) {
      const p = profiles[i]
      try { if (!(await hasPhoto(p))) miss.push(p) } catch { miss.push(p) }
      setDone(i + 1)
      if (i % 10 === 0) setMissing([...miss])
    }
    setMissing(miss); setRunning(false)
  }

  return (
    <Layout title="Photo Coverage Check" description="Internal QA">
      <div style={{maxWidth:760, margin:'0 auto', padding:'40px 24px'}}>
        <h1 style={{fontFamily:'var(--font-display)', fontSize:32, marginBottom:8}}>Photo Coverage Check</h1>
        <p style={{color:'var(--ink-mid)', marginBottom:20}}>
          Scans all {profiles.length} profiles for a working photo (baked-in or Wikipedia auto-fetch).
          Runs in your browser — may take a few minutes. The list below = profiles still showing initials.
        </p>
        <button onClick={run} disabled={running}
          style={{fontFamily:'var(--font-ui)', fontSize:13, padding:'12px 28px', background:'var(--navy)',
                  color:'#fff', border:'none', cursor: running?'wait':'pointer', marginBottom:24}}>
          {running ? `Checking… ${done}/${profiles.length}` : 'Start scan'}
        </button>
        {missing.length > 0 && (
          <div>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:20, margin:'16px 0'}}>
              Missing photos: {missing.length}
            </h2>
            <textarea readOnly value={missing.map(p => `${p.name} | ${p.slug}`).join('\n')}
              style={{width:'100%', height:400, fontFamily:'monospace', fontSize:12, padding:12,
                      border:'1px solid var(--ivory-rule)'}} />
          </div>
        )}
      </div>
    </Layout>
  )
}
