import Link from 'next/link'
import Layout from '../components/Layout'
import ContactSlider from '../components/ContactSlider'

const S = {
  h2: {fontFamily:'var(--font-display)',fontSize:28,fontWeight:400,color:'var(--ink)',marginBottom:18,marginTop:8},
  p:  {fontFamily:'var(--font-body)',fontSize:17,lineHeight:1.82,color:'var(--ink-mid)',marginBottom:16},
  em: {fontStyle:'italic'},
  kicker: {fontFamily:'var(--font-ui)',fontSize:9,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--bordeaux)',marginBottom:14},
  card: {background:'var(--ivory-warm)',border:'1px solid var(--ivory-rule)',padding:'28px 32px',marginBottom:18},
}

export default function About() {
  return (
    <Layout
      title="Why This Archive Exists"
      description="The scientific case for documenting the global diaspora of the Russian Empire, the USSR, and the post-Soviet space — grounded in 150 years of civilizational scholarship from Danilevsky to Toynbee to Huntington."
    >
      {/* ───────────────────────── HERO ───────────────────────── */}
      <div style={{background:'var(--navy)',padding:'64px 24px 60px'}}>
        <div className="container" style={{maxWidth:760}}>
          <div style={{fontFamily:'var(--font-ui)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:16}}>Manifesto</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,5vw,56px)',fontWeight:300,color:'var(--ivory)',lineHeight:1.1,letterSpacing:'-0.01em',marginBottom:24}}>
            A civilization, measured<br/>by its <em style={{fontStyle:'italic',color:'rgba(247,244,238,0.6)'}}>diaspora</em>
          </h1>
          <p style={{fontFamily:'var(--font-body)',fontSize:18,lineHeight:1.7,color:'rgba(247,244,238,0.75)',maxWidth:620}}>
            Why an archive of a thousand lives — and why the word “civilization” on the masthead
            is not a slogan but a term with a 150-year scholarly history.
          </p>
        </div>
      </div>

      <div style={{maxWidth:760,margin:'0 auto',padding:'64px 24px 80px'}}>

        {/* ───────────────────── 1. THE OBSERVATION ───────────────────── */}
        <div style={{borderLeft:'3px solid var(--bordeaux)',paddingLeft:24,marginBottom:56}}>
          <p style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:300,fontStyle:'italic',lineHeight:1.55,color:'var(--ink)'}}>
            Google was co-founded by a boy from Moscow. WhatsApp by a boy from Kyiv. Telegram by a boy
            from Leningrad. Ethereum by a boy from Kolomna. PayPal by a boy from Kyiv. MGM was built by a
            man from Minsk; Warner Bros. by the sons of a cobbler from the Russian Empire. “God Bless America”
            was written by a cantor’s son born near Mogilev. This archive exists because the pattern is too
            large to ignore — and too large to explain by coincidence.
          </p>
        </div>

        <h2 style={S.h2}>1. What this project is</h2>
        <p style={S.p}>
          Russian Civilization is a non-political, non-commercial documentary archive. It maps over a thousand
          notable individuals worldwide — scientists, artists, founders, athletes, statesmen — whose biographies
          connect, in a documented and sourced way, to a single historical-cultural space: the Russian Empire
          (1721–1917), the Soviet Union (1922–1991), and the states that succeeded it. The connection ranges from
          direct birth to great-grandparents, and in a small, explicitly labelled set of cases, to formation
          within the Russophone cultural sphere itself.
        </p>
        <p style={S.p}>
          The archive records facts: where a person or their ancestors were born, when the family left, what
          language was spoken at home, what was achieved. Every profile carries a source. Facts of this kind are
          verifiable and, where we err, correctable — corrections are invited, and entries have been removed when
          the evidence did not hold.
        </p>

        {/* ───────────────────── 2. THE TERM ───────────────────── */}
        <h2 style={S.h2}>2. “Civilization” — a term with a pedigree, not a slogan</h2>
        <p style={S.p}>
          The claim that the Russian-Eurasian space constitutes a distinct civilization is not a political invention
          of the present decade. It is one of the most consistent findings of comparative macro-history, made
          independently by thinkers of radically different nationalities, eras, and politics:
        </p>

        <div style={S.card}>
          <div style={S.kicker}>The scholarly lineage</div>
          {[
            ['Nikolai Danilevsky', 'Russia and Europe, 1869', 'Divided history into autonomous “cultural-historical types”; identified the Slavic-Russian world as one of them.'],
            ['Oswald Spengler', 'The Decline of the West, 1918–22', 'Treated the emerging Russian culture as fundamentally distinct from the Faustian West — a separate organism with its own soul and trajectory.'],
            ['Arnold J. Toynbee', 'A Study of History, 1934–61', 'Classified “Orthodox Christendom in Russia” as a distinct civilization, shaped by the challenge of defending an open frontier.'],
            ['Pitirim Sorokin', 'Social and Cultural Dynamics, 1937–41', 'Founder of Harvard’s sociology department — and himself an exile of 1922 — analysed civilizations as integrated cultural supersystems. He is, fittingly, a profile in this archive.'],
            ['Samuel P. Huntington', 'The Clash of Civilizations, 1996', 'Mapped the “Orthodox civilization,” with Russia as its core state, as one of the world’s eight or nine major cultural zones.'],
            ['Shmuel Eisenstadt', 'Multiple Modernities, 2000', 'Demonstrated that societies modernize without Westernizing — that modernity comes in civilizational variants, not one universal template.'],
          ].map(([name, work, note]) => (
            <div key={name} style={{display:'grid',gridTemplateColumns:'180px 1fr',gap:16,padding:'12px 0',borderBottom:'1px solid var(--ivory-rule)'}}>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:500,color:'var(--ink)'}}>{name}</div>
                <div style={{fontFamily:'var(--font-ui)',fontSize:11,color:'var(--ink-light)',fontStyle:'italic',marginTop:2}}>{work}</div>
              </div>
              <div style={{fontFamily:'var(--font-body)',fontSize:14.5,lineHeight:1.65,color:'var(--ink-mid)'}}>{note}</div>
            </div>
          ))}
        </div>

        <p style={S.p}>
          A Russian conservative, a German pessimist, a British liberal, a Russian-American exile, an American
          political scientist, and an Israeli sociologist — working across 130 years — each drew the same boundary
          on the map. One may dispute any single author; disputing all of them is no longer a critique of this
          project but of the entire field of comparative civilizational analysis, from Braudel’s
          <em style={S.em}> longue durée</em> to the present.
        </p>

        {/* ───────────────────── 3. WHAT MAKES IT ONE ───────────────────── */}
        <h2 style={S.h2}>3. What makes this space a civilization</h2>
        <p style={S.p}>
          Across the literature, four structural markers recur — and the Russian-Eurasian space carries all four:
        </p>
        <p style={S.p}>
          <strong>A distinct spiritual-institutional foundation.</strong> The Byzantine inheritance: Eastern Orthodoxy,
          Church Slavonic literacy, and a model of authority sacralized differently than in the Latin West.
          <strong> A distinct geographic matrix.</strong> The open Eurasian plain without natural barriers — the steppe
          frontier that, as Toynbee observed, demanded centralized mobilization and produced a centuries-long synthesis
          of Slavic, Finno-Ugric, Turkic, Caucasian, Jewish, German, and Siberian peoples.
          <strong> A supra-ethnic linguistic and literary high culture.</strong> The Russian language as lingua franca of
          a continent, and one of humanity’s great literary corpora — Pushkin to Dostoevsky to Akhmatova — absorbed by
          every people inside the space, whatever their mother tongue.
          <strong> A shared institutional experience.</strong> The Imperial and then Soviet single infrastructure of
          schools, conservatories, academies of science, cinema, and collective memory — above all of the Second World
          War — which formed everyone inside it, regardless of ethnicity and often regardless of consent.
        </p>
        <p style={S.p}>
          That last clause matters. <strong>A civilization is not an ethnicity, and it is not a state.</strong> A Jewish
          family in the Pale of Settlement, a Kazakh engineer, a Ukrainian poet, a Volga German farmer, and a Georgian
          banker were all formed inside this matrix — many as its subjects, some as its victims — and they carried its
          imprint across every border they crossed. This archive documents the matrix and its worldwide footprint,
          explicitly including those who fled it, opposed it, and survived it.
        </p>

        {/* ───────────────────── 4. HOW THE WORLD DEFINES BELONGING ───────────────────── */}
        <h2 style={S.h2}>4. How the world’s civilizations define belonging</h2>
        <p style={S.p}>
          A reasonable critic may ask: a person’s grandparents left Odessa in 1905 — in what sense do they still
          “belong” to anything? Here the honest answer is that humanity operates two competing models, and this
          archive is transparent about both.
        </p>
        <p style={S.p}>
          The <strong>civic-contractual model</strong>, rooted in the European Enlightenment, defines identity by
          citizenship, residence, and current language. Under it, assimilation completes within two or three
          generations, and ancestry becomes a line in a family tree.
        </p>
        <p style={S.p}>
          The <strong>civilizational-continuity model</strong> — the operating assumption of most of humanity — treats
          belonging as multi-generational and cultural. This is not exotic theory; it is codified law and formal
          doctrine across the planet:
        </p>

        <div style={S.card}>
          <div style={S.kicker}>Multi-generational belonging, codified</div>
          {[
            ['China', 'The concepts of huaqiao and huayi extend membership in the Chinese cultural world (Zhonghua minzu) to descendants of emigrants across generations, regardless of citizenship or language.'],
            ['India', 'The Overseas Citizen of India status legally codifies belonging down to the grandchildren of citizens — a “civilizational mandala” written into statute.'],
            ['Israel', 'The Law of Return extends the right of citizenship to the grandchildren of Jews — a Western-aligned democracy legislating third-generation civilizational belonging.'],
            ['Germany', 'The Spätaussiedler laws repatriated ethnic Germans from the former USSR whose families had lived in Russia for over two centuries — Catherine the Great’s settlers, returning after 200+ years.'],
            ['Ireland, Italy, Hungary, Poland', 'Citizenship by descent (jus sanguinis) grants membership through grandparents and beyond — in Italy’s case historically without generational limit.'],
            ['The African Union', 'Formally designates the global African diaspora — including families separated from the continent for four centuries — as the “Sixth Region” of Africa.'],
          ].map(([who, what]) => (
            <div key={who} style={{display:'grid',gridTemplateColumns:'180px 1fr',gap:16,padding:'12px 0',borderBottom:'1px solid var(--ivory-rule)'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:500,color:'var(--ink)'}}>{who}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:14.5,lineHeight:1.65,color:'var(--ink-mid)'}}>{what}</div>
            </div>
          ))}
        </div>

        <p style={S.p}>
          When the legal systems of Israel, Germany, Ireland, and Italy, the official doctrine of the African Union,
          and the formal frameworks of the world’s two most populous civilizations all recognize belonging across
          two, three, or ten generations, the multi-generational lens is not a fringe position. It is, empirically,
          the global norm — and the strictly contractual model is the historical outlier. This archive applies to the
          Russian-Eurasian diaspora exactly the standard the world already applies to every other.
        </p>

        {/* ───────────────────── 5. THE SCIENCE OF PERSISTENCE ───────────────────── */}
        <h2 style={S.h2}>5. What the research actually shows about persistence</h2>
        <p style={S.p}>
          Does anything really survive the second and third generation? The empirical literature is older and
          stronger than commonly assumed. In <em style={S.em}>Beyond the Melting Pot</em> (1963), Nathan Glazer and
          Daniel Patrick Moynihan demonstrated that ethnic groups in New York retained distinct family structures,
          occupational patterns, and communal habits long after losing the ancestral language — assimilation changed
          the surface and left the social grammar intact. A generation earlier, the historian Marcus Lee Hansen
          formulated what is still taught as Hansen’s law of third-generation return: <em style={S.em}>“what the son
          wishes to forget, the grandson wishes to remember.”</em> Modern diaspora studies — William Safran’s criteria,
          Robin Cohen’s <em style={S.em}>Global Diasporas</em> — treat collective memory of a homeland and boundary
          maintenance across generations as the defining, measurable features of a diaspora.
        </p>
        <p style={S.p}>
          We state our epistemics plainly. <strong>What this archive documents is biographical fact</strong> — verifiable,
          sourced, falsifiable. <strong>What the civilizational frame adds is an interpretive lens</strong> — one with a
          distinguished scholarly pedigree, openly debated, which the reader is free to adopt or decline. Whether a
          third generation “carries a cultural code” is a live academic question. That their grandmother came from
          Vitebsk is not.
        </p>

        {/* ───────────────────── 6. METHOD ───────────────────── */}
        <h2 style={S.h2}>6. Our method</h2>
        <p style={S.p}>
          Inclusion requires a documented connection at one of four levels: born within the space; parents born within
          it; grandparents or earlier ancestors born within it; or — in a small set of explicitly labelled cases —
          formation within the Russophone cultural sphere (language, education, career) without ancestry. A separate,
          clearly marked “Cultural Phenomenon” category holds the handful of figures with no roots at all whose public
          role is nonetheless built on the civilization’s image. Profiles are tiered by global significance, every
          entry carries at least one published source, ancestral level is stated on each page, unresolved questions are
          flagged rather than hidden, and entries are removed when evidence fails. Several have been.
        </p>

        {/* ───────────────────── 7. WHAT THIS IS NOT ───────────────────── */}
        <div style={{background:'var(--navy)',padding:'40px 36px',margin:'48px 0'}}>
          <div style={{fontFamily:'var(--font-ui)',fontSize:9,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--gold)',marginBottom:22}}>What this project is not</div>
          {[
            ['Not a state project.', 'This archive is independent, receives no funding from any government, and is affiliated with no party or movement.'],
            ['Not a political doctrine.', 'The analytical concept of a Russian civilization predates by a century — and is independent of — any contemporary state doctrine that uses civilizational language to justify territorial claims, including the doctrine known as “Russkiy Mir.” We document a historical-cultural space. We assert no claim on any person’s loyalty, any nation’s identity, or any country’s borders.'],
            ['Not a claim that those listed are “Russian.”', 'Most are not ethnic Russians. They are Jewish, Ukrainian, Georgian, Armenian, Kazakh, Tatar, German, Belarusian — and today they identify as Americans, Israelis, Germans, Ukrainians, Canadians. A profile records a documented biographical connection to a historical space. Nothing more is implied, and individual self-identification is respected absolutely.'],
            ['Not a denial of anyone’s nationhood.', 'Ukrainian, Baltic, Caucasian, and Central Asian national identities are real, distinct, and sovereign. For many peoples, Russian was the language of empire, not of choice. Documenting formation within a shared space — including coerced formation — neither erases nor subsumes the nations that space contained.'],
            ['Not blind to history.', 'The diaspora this archive documents did not arise by accident. Across three centuries, people left this space for many reasons — opportunity and ambition, but also pogroms, conscription, revolution, war, and persecution, under every era and every regime. We record the circumstances of departure as documented biographical fact, without political commentary on any government, past or present. A civilization’s diaspora includes its exiles; an honest archive simply records why they left and what they built.'],
            ['Not a hierarchy.', 'No claim of superiority over any other civilization is made or implied. The comparative frame exists to understand, not to rank.'],
          ].map(([head, body]) => (
            <div key={head} style={{marginBottom:18}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:17,fontWeight:500,color:'var(--ivory)',marginBottom:6}}>{head}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:15,lineHeight:1.7,color:'rgba(247,244,238,0.72)'}}>{body}</div>
            </div>
          ))}
        </div>

        {/* ───────────────────── 8. CRITIQUES ───────────────────── */}
        <h2 style={S.h2}>7. The critiques we take seriously</h2>
        <p style={S.p}>
          <strong>“The concept is essentialist.”</strong> Modern historians rightly warn against projecting artificial
          homogeneity onto a fractured history. We agree — which is why the frame here is a lens, not a law: persistence
          is documented case by case, never assumed, and the archive’s own pages display the space’s internal diversity
          more vividly than any critique could.
        </p>
        <p style={S.p}>
          <strong>“The term is politically instrumentalized.”</strong> It is — by states, today. So were the terms
          “Western civilization,” “the free world,” and “Europe” in their time. Instrumentalization of a concept by
          power is an argument for rigorous, independent, documentary use of it — not for abandoning the field to the
          instrumentalizers. Our position on that use is stated in the section above, in plain words.
        </p>
        <p style={S.p}>
          <strong>“Russian was an imposed lingua franca.”</strong> True, and stated openly on this page. Inclusion here
          documents formation within the space — voluntary or coerced — and the archive holds the imposed-upon and the
          imposers, the colonized and the commissars, side by side, each with their story sourced.
        </p>
        <p style={S.p}>
          <strong>“Selection is biased.”</strong> Possibly — every encyclopedia’s is. Our defense is procedural: public
          criteria, a stated ancestral level on every profile, a source on every profile, flags on every doubt, and a
          standing invitation to correct us. Entries have been challenged and removed before. They will be again.
        </p>

        {/* ───────────────────── 8.5 WHY — MIGRATION AS ENRICHMENT ───────────────────── */}
        <h2 style={S.h2}>8. Why this matters</h2>
        <p style={S.p}>
          Beyond the scholarship, this archive carries a simple, hopeful argument. The thousand lives
          collected here are evidence that the experience of migration — of leaving, adapting, and
          rebuilding in a new land — does not dilute a culture or its host. It enriches both.
        </p>
        <p style={S.p}>
          The people in this archive arrived as outsiders, often with nothing, often not speaking the
          language. They went on to co-found the companies, write the songs, prove the theorems, and
          direct the films that shaped their adopted homes — not despite carrying a second civilization
          inside them, but in large part because of it. The friction of holding two worlds at once is
          not a weakness to be assimilated away; it is, repeatedly and measurably, a source of
          resilience, perspective, and creative force. A society that welcomes the migrant does not
          lose itself. It gains a Brin, a Berlin, a Baryshnikov.
        </p>
        <p style={S.p}>
          That is the quiet thesis beneath the data: cultures are made stronger, not weaker, by the
          people who move between them.
        </p>

        {/* ───────────────────── 9. CLOSING ───────────────────── */}
        <div style={{borderLeft:'3px solid var(--bordeaux)',paddingLeft:24,margin:'48px 0'}}>
          <p style={{fontFamily:'var(--font-display)',fontSize:21,fontWeight:300,fontStyle:'italic',lineHeight:1.6,color:'var(--ink)'}}>
            Civilizations are best seen from outside themselves. This archive is, in effect, the portrait of one
            civilization painted on the canvas of all the others — in Hollywood and Tel Aviv, in Berlin and Almaty,
            in Buenos Aires and Toronto. Whether the reader holds Toynbee’s map, Huntington’s, or none at all, the
            names remain: documented, sourced, and remarkable.
          </p>
        </div>

        {/* ───────────────────── NUMBERS + CTA ───────────────────── */}
        <div style={{background:'var(--ivory-warm)',border:'1px solid var(--ivory-rule)',padding:'32px',marginTop:16}}>
          <div style={S.kicker}>Archive in Numbers</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {[['1,017','Profiles documented'],['39','Countries of the diaspora'],['100%','Profiles with sources']].map(([num,label])=>(
              <div key={label}>
                <div style={{fontFamily:'var(--font-display)',fontSize:44,fontWeight:300,color:'var(--ink)',lineHeight:1}}>{num}</div>
                <div style={{fontFamily:'var(--font-ui)',fontSize:11,color:'var(--ink-light)',marginTop:6,letterSpacing:'0.05em'}}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:48,paddingTop:32,borderTop:'1px solid var(--ivory-rule)',textAlign:'center',display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/profiles" style={{display:'inline-block',fontFamily:'var(--font-ui)',fontSize:12,fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--white)',background:'var(--navy)',padding:'14px 32px',textDecoration:'none'}}>
            Browse the Archive →
          </Link>
          <ContactSlider />
        </div>
      </div>
    </Layout>
  )
}
