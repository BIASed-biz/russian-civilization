// SEO / GEO intro text for country pages. Written to answer the questions people
// actually search — "americans with russian roots", "german celebrities russian background",
// "israeli figures from soviet union" — in a factual, neutral voice with real names.
// Keys are the country name as stored in countries.json.

export const COUNTRY_INTROS = {
  'USA': {
    h: 'Americans with Russian and Soviet roots',
    p: [
      "The United States is home to the largest and most influential branch of the Russian civilizational diaspora outside the former Soviet space. From the great waves of Jewish emigration that fled the Russian Empire\u2019s pogroms between 1881 and 1914, to the Soviet refuseniks of the 1970s and the post-1991 exodus of scientists and entrepreneurs, millions of people carrying roots in the Empire, the USSR, and modern Russia helped shape American life.",
      "Their imprint is everywhere. Hollywood itself was largely built by immigrants from the Russian Empire \u2014 the founders of MGM, Warner Bros., Paramount, and Universal. Google was co-founded by Moscow-born Sergey Brin; Wikipedia\u2019s culture of free knowledge, the polio and hepatitis vaccines, the theory of the transistor, and the music of Irving Berlin and George Gershwin all trace back to this heritage. This page documents notable Americans \u2014 actors, scientists, founders, athletes, and artists \u2014 whose family stories begin in the Russian world.",
    ],
  },
  'Israel': {
    h: 'Israelis with roots in the Russian Empire and USSR',
    p: [
      "No country was shaped by the Russian-Jewish diaspora more profoundly than Israel. The founders of the state \u2014 David Ben-Gurion, Golda Meir, Shimon Peres, Chaim Weizmann \u2014 were born in the Russian Empire, and the Hebrew revival, the kibbutz movement, and Israeli political culture were carried directly from the Pale of Settlement.",
      "The post-1989 wave brought over a million Russian-speaking immigrants from the collapsing Soviet Union, reshaping Israeli science, music, chess, and technology within a single generation. This page documents Israeli figures \u2014 statesmen, scientists, artists, and athletes \u2014 whose roots lie in the Russian and Soviet world.",
    ],
  },
  'Germany': {
    h: 'Germans with Russian and Soviet roots',
    p: [
      "Germany hosts one of the largest Russian-speaking communities in Western Europe, built from several distinct migrations: the Russian \u00e9migr\u00e9s of the 1920s who made Berlin a capital of exile, the Volga Germans (Sp\u00e4taussiedler) whose families had lived in Russia since Catherine the Great and who returned after the USSR collapsed, and the Jewish and professional emigration of the 1990s.",
      "Today their descendants are prominent in German music, film, sport, and business. This page documents notable figures in Germany whose heritage traces to the Russian Empire, the Soviet Union, or modern Russia.",
    ],
  },
  'United Kingdom': {
    h: 'British figures with Russian and Soviet roots',
    p: [
      "Britain\u2019s connection to the Russian civilizational space runs from the aristocratic \u00e9migr\u00e9s who fled the 1917 Revolution to the Jewish families who escaped the Empire\u2019s pogroms and the post-Soviet generation of the 1990s and 2000s.",
      "Their descendants and successors shaped British cinema, science, literature, and public life. This page documents notable figures in the United Kingdom with roots in the Russian Empire, the USSR, or modern Russia.",
    ],
  },
  'France': {
    h: 'French figures with Russian roots',
    p: [
      "Paris was the heart of the Russian emigration after 1917, home to writers, artists, dancers, and philosophers who kept Russian culture alive in exile \u2014 from the Ballets Russes to the \u00e9migr\u00e9 literary salons. Later waves of Jewish and Soviet emigration deepened the connection.",
      "This page documents notable French figures \u2014 in cinema, music, literature, and the arts \u2014 whose heritage traces to the Russian Empire and the Soviet Union.",
    ],
  },
  'Canada': {
    h: 'Canadians with Russian and Soviet roots',
    p: [
      "Canada received major waves of emigration from the Russian Empire and Soviet Union \u2014 including Jewish families fleeing persecution, Doukhobor and Mennonite religious communities, and the post-1991 professional diaspora.",
      "This page documents notable Canadians \u2014 in entertainment, business, science, and sport \u2014 whose family roots lie in the Russian world.",
    ],
  },
  'Australia': {
    h: 'Australians with Russian and Soviet roots',
    p: [
      "Australia\u2019s Russian-heritage community grew from post-revolutionary \u00e9migr\u00e9s, Jewish refugees from the Empire and USSR, and later Soviet and post-Soviet arrivals.",
      "This page documents notable Australians whose heritage traces to the Russian Empire, the Soviet Union, or modern Russia.",
    ],
  },
}

// Fallback generator for countries without a hand-written intro.
export function genericIntro(country, count) {
  return {
    h: `${country} \u2014 figures with Russian and Soviet roots`,
    p: [
      `This page documents ${count} notable figure${count !== 1 ? 's' : ''} based in ${country} whose biographies connect to the Russian Empire, the Soviet Union, or the states that succeeded them \u2014 through birth, parentage, or earlier ancestry. Each profile is sourced and records the specific origin and connection.`,
    ],
  }
}
