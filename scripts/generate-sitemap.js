const fs = require('fs')
const path = require('path')

const BASE = 'https://russian-civilization.org'

const profiles = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/profiles.json'), 'utf8')).profiles
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/countries.json'), 'utf8'))

const CATEGORY_SLUGS = [
  'cinema-tv',
  'music-performing-arts',
  'science-academia',
  'tech-business',
  'business-moguls',
  'politics-public-figures',
  'sports',
  'writers-intellectuals',
  'classical-music-high-culture',
  'fashion-entertainment',
  'other',
]

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const urls = []

// Static top-level pages
;['', 'about', 'faq', 'profiles', 'countries', 'search'].forEach(p => {
  urls.push({ loc: `${BASE}/${p ? p + '/' : ''}`, priority: p === '' ? '1.0' : '0.8' })
})

// Category pages
CATEGORY_SLUGS.forEach(slug => {
  urls.push({ loc: `${BASE}/category/${slug}/`, priority: '0.7' })
})

// Country pages
Object.keys(countries).forEach(name => {
  urls.push({ loc: `${BASE}/country/${slugify(name)}/`, priority: '0.6' })
})

// Profile pages
profiles.forEach(p => {
  if (p.slug) urls.push({ loc: `${BASE}/p/${p.slug}/`, priority: '0.5' })
})

// Russian mirror — duplicate every URL under /ru/ for Russian-language SEO
const ruUrls = urls.map(u => ({
  loc: u.loc.replace(BASE + '/', BASE + '/ru/').replace(BASE + '/ru//', BASE + '/ru/'),
  priority: u.priority,
}))
// fix the homepage case (BASE/ → BASE/ru/)
ruUrls.forEach(u => { if (u.loc === BASE + '/ru') u.loc = BASE + '/ru/' })
urls.push(...ruUrls)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml)
console.log(`Sitemap written with ${urls.length} URLs`)
