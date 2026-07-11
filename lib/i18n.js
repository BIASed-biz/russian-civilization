// Lightweight i18n for the static export. Language is derived from the URL:
// paths starting with /ru are Russian; everything else is English.
// Profile bios remain English (browser auto-translation handles them for now — phase B
// will translate them properly). UI, About, and FAQ are fully translated here.

export const UI = {
  en: {
    ribbon: 'Documenting the global footprint of Russian civilization',
    profilesCountries: '1,017 profiles · 39 countries',
    aboutThisProject: 'About this project',
    tagline: 'The Global Diaspora Archive',
    searchArchive: 'Search Archive',
    allProfiles: 'All Profiles',
    byCountry: 'By Country',
    about: 'About',
    faq: 'FAQ',
    search: 'Search',
    volYear: 'Vol. I · 2026',
    footerNote: 'Non-political · Non-commercial · Documented ancestry only',
    footerCopy: '© 2026 · The Global Diaspora Archive',
    nav: {
      'cinema-tv': 'Cinema & TV', 'science-academia': 'Science',
      'music-performing-arts': 'Music', 'business-moguls': 'Business',
      'politics-public-figures': 'Politics', 'sports': 'Sports',
      'writers-intellectuals': 'Writers', 'tech-business': 'Tech',
      'classical-music-high-culture': 'Classical Arts',
    },
    browseByCategory: 'Browse by Category',
    browseByCountry: 'Browse by Country',
    featuredProfiles: 'Featured Profiles',
    viewAll: 'View all',
    profiles: 'profiles',
    profile: 'profile',
    tierA: 'Tier A',
    russianConnection: 'Russian Connection',
    historicalContext: 'Historical context',
    achievements: 'Achievements',
    source: 'Source',
    secondarySource: 'Secondary source',
    backTo: 'Back to',
    searchPlaceholder: 'Search by name, profession, origin…',
    noResults: 'No results found',
    browseArchive: 'Browse the Archive',
    contact: 'Contact',
    // page-level labels (countries / country / category / profiles / search)
    browse: 'Browse',
    byCategory: 'By Category',
    category: 'Category',
    countriesCount: 'Countries',
    profilesWithFameIn: 'profiles with fame based in',
    profileWithFameIn: 'profile with fame based in',
    tierACount: 'Tier A',
    allProfilesTitle: 'All Profiles',
    fameLabel: 'Fame',
    langName: 'Русский',   // link TO the other language
    langHref: '/ru',
  },
  ru: {
    ribbon: 'Документируем глобальный след русской цивилизации',
    profilesCountries: '1017 профилей · 39 стран',
    aboutThisProject: 'О проекте',
    tagline: 'Архив мировой диаспоры',
    searchArchive: 'Поиск по архиву',
    allProfiles: 'Все профили',
    byCountry: 'По странам',
    about: 'О проекте',
    faq: 'Вопросы',
    search: 'Поиск',
    volYear: 'Том I · 2026',
    footerNote: 'Вне политики · Некоммерческий · Только документированное происхождение',
    footerCopy: '© 2026 · Архив мировой диаспоры',
    nav: {
      'cinema-tv': 'Кино и ТВ', 'science-academia': 'Наука',
      'music-performing-arts': 'Музыка', 'business-moguls': 'Бизнес',
      'politics-public-figures': 'Политика', 'sports': 'Спорт',
      'writers-intellectuals': 'Литература', 'tech-business': 'Технологии',
      'classical-music-high-culture': 'Классика',
    },
    browseByCategory: 'По категориям',
    browseByCountry: 'По странам',
    featuredProfiles: 'Избранные профили',
    viewAll: 'Смотреть все',
    profiles: 'профилей',
    profile: 'профиль',
    tierA: 'Уровень A',
    russianConnection: 'Русская связь',
    historicalContext: 'Исторический контекст',
    achievements: 'Достижения',
    source: 'Источник',
    secondarySource: 'Дополнительный источник',
    backTo: 'Назад к',
    searchPlaceholder: 'Поиск по имени, профессии, происхождению…',
    noResults: 'Ничего не найдено',
    browseArchive: 'Открыть архив',
    contact: 'Связаться',
    // page-level labels (countries / country / category / profiles / search)
    browse: 'Обзор',
    byCategory: 'По категориям',
    category: 'Категория',
    countriesCount: 'Стран',
    profilesWithFameIn: 'профилей, прославившихся в стране:',
    profileWithFameIn: 'профиль, прославившийся в стране:',
    tierACount: 'Уровень A',
    allProfilesTitle: 'Все профили',
    fameLabel: 'Известность',
    langName: 'English',
    langHref: '/',
  },
}

// Get language from a Next.js router path.
export function langFromPath(pathname, asPath) {
  const p = asPath || pathname || ''
  return p === '/ru' || p.startsWith('/ru/') ? 'ru' : 'en'
}

// Prefix a route with /ru when in Russian. `/` → `/ru`.
export function localizeHref(href, lang) {
  if (lang !== 'ru') return href
  if (href === '/') return '/ru'
  return '/ru' + href
}

export function t(lang) { return UI[lang] || UI.en }

// ── Country names (keys exactly as stored in countries.json / data) ──
export const COUNTRY_RU = {
  'Argentina':'Аргентина','Armenia':'Армения','Australia':'Австралия','Austria':'Австрия',
  'Belgium':'Бельгия','Brazil':'Бразилия','Canada':'Канада','Chile':'Чили','Denmark':'Дания',
  'France':'Франция','Georgia':'Грузия','Germany':'Германия','Greece':'Греция','Iceland':'Исландия',
  'India':'Индия','Ireland':'Ирландия','Israel':'Израиль','Italy':'Италия','Japan':'Япония',
  'Kazakhstan':'Казахстан','Latvia':'Латвия','Lithuania':'Литва','Mexico':'Мексика','Moldova':'Молдова',
  'Monaco':'Монако','Netherlands':'Нидерланды','New Zealand':'Новая Зеландия','Poland':'Польша',
  'Russia':'Россия','Serbia':'Сербия','South Africa':'Южная Африка','Spain':'Испания','Sweden':'Швеция',
  'Switzerland':'Швейцария','UAE':'ОАЭ','UK':'Великобритания','United Kingdom':'Великобритания',
  'USA':'США','Ukraine':'Украина','Uruguay':'Уругвай',
}
export function countryRu(name, lang) {
  if (lang !== 'ru') return name
  return COUNTRY_RU[name] || name
}

// ── Region tags ──
export const REGION_RU = {
  'North America':'Северная Америка','Middle East':'Ближний Восток','Europe':'Европа',
  'CIS/Russia':'СНГ/Россия','Oceania':'Океания','Latin America':'Латинская Америка',
}
export function regionRu(tag, lang) {
  if (lang !== 'ru') return tag
  return REGION_RU[tag] || tag
}

// ── Historical-entity chips shown on cards (finite messy set → normalized RU) ──
export const ENTITY_RU = {
  'USSR':'СССР','Russian Empire':'Российская империя','Russia':'Россия','Fluent':'Владеет русским',
  'Russian Empire / USSR':'Российская империя / СССР','USSR Roots':'Корни в СССР','Empire':'Империя',
  'Russian Federation':'Российская Федерация','USSR (Kaz)':'СССР (Казахстан)','Poland/USSR':'Польша/СССР',
  'Russian Empire (in part)':'Российская империя (частично)','Empire Roots':'Корни в империи',
  'USSR (RSFSR)':'СССР (РСФСР)','USSR Bloc':'Соцблок СССР','USSR/Empire':'СССР/империя',
  'Russian Empire/USSR':'Российская империя/СССР','Empire Era':'Эпоха империи',
  'USSR (Ukraine)':'СССР (Украина)','(Rus connection)':'(русская связь)','USSR/Russia':'СССР/Россия',
  'Austro-Rus border':'Австро-русское пограничье','USSR influence':'Влияние СССР',
  'Rus/Aust-Hun':'Россия/Австро-Венгрия','Israel':'Израиль','USSR (Civil War)':'СССР (Гражданская война)',
}
export function entityRu(v, lang) {
  if (lang !== 'ru' || !v) return v
  return ENTITY_RU[v] || v
}

// ── Category display names (full form, as stored in p.category / catName) ──
export const CATEGORY_RU = {
  'Cinema & TV':'Кино и ТВ','Music & Performing Arts':'Музыка и исполнительское искусство',
  'Science & Academia':'Наука и академия','Tech & Business':'Технологии и бизнес',
  'Business Moguls':'Бизнес-магнаты','Politics & Public Figures':'Политика и общественные деятели',
  'Sports':'Спорт','Writers & Intellectuals':'Писатели и интеллектуалы',
  'Classical Music & High Culture':'Классическая музыка и высокая культура',
  'Fashion & Entertainment':'Мода и развлечения','Other':'Прочее',
}
export function categoryRu(v, lang) {
  if (lang !== 'ru' || !v) return v
  return CATEGORY_RU[v] || v
}

// ── Origin / place fragments shown on cards (e.g. "Odessa (Ukraine)", "Minsk / Belarus") ──
// Origins are semi-structured: a leading place, optional "/ X" and/or "(X)" tags.
// We translate each recognizable token and leave unknown ones as-is. High-frequency
// cities, countries, and parenthetical tags are mapped; the rare long tail stays Latin.
export const PLACE_RU = {
  // countries / regions
  'Russia':'Россия','USA':'США','UK':'Великобритания','Ukraine':'Украина','Belarus':'Беларусь',
  'Poland':'Польша','Lithuania':'Литва','Latvia':'Латвия','Estonia':'Эстония','Moldova':'Молдова',
  'Georgia':'Грузия','Armenia':'Армения','Azerbaijan':'Азербайджан','Kazakhstan':'Казахстан',
  'Kyrgyzstan':'Киргизия','Uzbekistan':'Узбекистан','Turkmenistan':'Туркменистан','Germany':'Германия',
  'France':'Франция','Austria':'Австрия','Netherlands':'Нидерланды','Switzerland':'Швейцария',
  'Sweden':'Швеция','Italy':'Италия','Spain':'Испания','Argentina':'Аргентина','Brazil':'Бразилия',
  'Australia':'Австралия','Japan':'Япония','India':'Индия','Greece':'Греция','Serbia':'Сербия',
  'Canada':'Канада','Israel':'Израиль','Romania':'Румыния','Hungary':'Венгрия','Yemen':'Йемен',
  'Iran':'Иран','China':'Китай','Turkey':'Турция','Czech':'Чехия','Slovakia':'Словакия',
  'Russian Empire':'Российская империя','USSR':'СССР','Empire':'Империя','Siberia':'Сибирь',
  'Galicia':'Галиция','Bessarabia':'Бессарабия','Crimea':'Крым','Bukovina':'Буковина',
  // cities
  'Moscow':'Москва','St. Petersburg':'Санкт-Петербург','Leningrad':'Ленинград','Kyiv':'Киев',
  'Odessa':'Одесса','Minsk':'Минск','Riga':'Рига','Warsaw':'Варшава','Baku':'Баку','Tbilisi':'Тбилиси',
  'Tiflis':'Тифлис','Vilnius':'Вильнюс','Kishinev':'Кишинёв','Chisinau':'Кишинёв','Tashkent':'Ташкент',
  'Yekaterinburg':'Екатеринбург','Sverdlovsk':'Свердловск','Rostov':'Ростов','Rostov-on-Don':'Ростов-на-Дону',
  'Kazan':'Казань','Samara':'Самара','Perm':'Пермь','Chelyabinsk':'Челябинск','Novosibirsk':'Новосибирск',
  'Omsk':'Омск','Gorky':'Горький','Vitebsk':'Витебск','Gomel':'Гомель','Grodno':'Гродно','Lviv':'Львов',
  'Donetsk':'Донецк','Kherson':'Херсон','Zhytomyr':'Житомир','Berdychiv':'Бердичев','Vinnytsia':'Винница',
  'Mykolaiv':'Николаев','Dnipro':'Днепр','Dnipropetrovsk':'Днепропетровск','Kharkiv':'Харьков',
  'Ufa':'Уфа','Nizhny Novgorod':'Нижний Новгород','Berlin':'Берлин','Paris':'Париж','London':'Лондон',
  'Vienna':'Вена','Kraków':'Краков','Krakow':'Краков','Bialystok':'Белосток','Brest':'Брест',
  'Kaunas':'Каунас','Pinsk':'Пинск','Tula':'Тула','Sochi':'Сочи','Chernivtsi':'Черновцы','Lodz':'Лодзь',
  'Zaporizhzhia':'Запорожье','Berdyansk':'Бердянск','Simferopol':'Симферополь','Sevastopol':'Севастополь',
  'Kremenchuk':'Кременчуг','Pinsk (Belarus)':'Пинск (Беларусь)',
  // frequent descriptive leads
  'Born there':'Родился там','Jewish':'еврейские корни','Unspecified':'Не указано',
}
// parenthetical / slash tag translations (short forms used in origins)
export const PLACE_TAG_RU = {
  'Ukraine':'Украина','Ukr':'Украина','Belarus':'Беларусь','Russia':'Россия','Jewish':'еврейские',
  'Georgia':'Грузия','Latvia':'Латвия','Moldova':'Молдова','Azerbaijan':'Азербайджан','Siberia':'Сибирь',
  'General':'общее','Lithuania':'Литва','Poland':'Польша','Pol':'Польша','Rus roots':'русские корни',
  'Rus Roots':'русские корни','St. Pete':'Санкт-Петербург','Bashkortostan':'Башкортостан',
  'Rus ties':'русские связи','Germany':'Германия','USSR':'СССР','Ancestry':'происхождение',
  'Uzbek':'Узбекистан','Galicia':'Галиция','Armenia':'Армения','Kazakh':'Казахстан','Ukr/Rus':'Укр/Рос',
  'Rus Ed.':'рус. образование','Rus Culture':'рус. культура','Rus connection':'русская связь',
  'Roots?':'корни?','Belarus)':'Беларусь',
}
function trPlaceToken(tok) {
  const s = tok.trim()
  if (!s) return tok
  if (PLACE_RU[s]) return PLACE_RU[s]
  return s // leave unknown places in Latin
}
export function originRu(v, lang) {
  if (lang !== 'ru' || !v) return v
  let out = v
  // translate "(Tag)" parts
  out = out.replace(/\(([^)]+)\)/g, (m, inner) => {
    const t = inner.trim()
    return '(' + (PLACE_TAG_RU[t] || PLACE_RU[t] || inner) + ')'
  })
  // split leading place on "/" and translate each side's leading token
  out = out.replace(/^([^/(]+)/, (m) => trPlaceToken(m))
  out = out.replace(/\/\s*([^/(]+)/g, (m, seg) => '/ ' + (PLACE_TAG_RU[seg.trim()] || trPlaceToken(seg)))
  return out
}
