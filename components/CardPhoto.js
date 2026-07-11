import { useState, useEffect, useRef } from 'react'

function initials(name) {
  return name.replace(/\s*\([^)]*\)\s*$/, '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const cleanName = (s) => s.replace(/\s*\([^)]*\)\s*$/, '').trim()

// Action API with origin=* returns CORS headers → NOT blocked by CORB.
// (The REST /page/summary endpoint does NOT support origin=* and gets CORB-blocked.)
function fetchThumb({ title, search, size, name }) {
  const base = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*'
    + `&prop=pageimages&piprop=thumbnail&pithumbsize=${size}&redirects=1`
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
      if (search && name) {
        const surname = name.split(' ').pop().toLowerCase()
        const ttl = (page.title || '').toLowerCase()
        if (surname.length > 2 && !ttl.includes(surname)) throw 0
      }
      return src
    })
}

// Lazy grid avatar. Resolves a photo when scrolled into view; initials fallback.
export default function CardPhoto({ profile, bg }) {
  const [imgUrl, setImgUrl] = useState(null)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setInView(true); obs.disconnect() }
    }, { rootMargin: '300px' })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    if (profile.noPhoto) return
    let cancelled = false
    const set = (u) => { if (!cancelled) setImgUrl(u) }

    const name = cleanName(profile.name)
    const title = profile.wikiTitle || name
    const qualified = [name, profile.profession, profile.country].filter(Boolean).join(' ')

    const autoFetch = () =>
      fetchThumb({ title, size: 240 }).then(set)
        .catch(() => fetchThumb({ search: name, size: 240, name }).then(set)
          .catch(() => fetchThumb({ search: qualified, size: 240, name }).then(set)
            .catch(() => {})))

    // Verified Commons filename → direct <img> (CORB-immune). Probe it loads, else auto-fetch.
    if (profile.photoFile) {
      const direct = 'https://commons.wikimedia.org/wiki/Special:FilePath/'
        + encodeURIComponent(profile.photoFile) + '?width=240'
      const im = new Image()
      im.referrerPolicy = 'no-referrer'
      im.onload = () => (im.naturalWidth > 1 ? set(direct) : autoFetch())
      im.onerror = () => autoFetch()
      im.src = direct
    } else {
      autoFetch()
    }
    return () => { cancelled = true }
  }, [inView, profile.name, profile.wikiTitle, profile.profession, profile.country, profile.photoFile])

  return (
    <div className="card-img-bg" ref={ref} style={{ background: bg, position: 'relative', overflow: 'hidden' }}>
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={profile.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                   objectFit: 'cover', objectPosition: 'center top' }}
          onError={() => setImgUrl(null)}
        />
      ) : initials(profile.name)}
    </div>
  )
}
