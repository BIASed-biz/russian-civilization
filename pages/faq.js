import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import ContactSlider from '../components/ContactSlider'

// Q&A content. Answers are written in the site's neutral, documentary voice.
// Drawn from real questions that arose about the project after launch.
const FAQS = [
  {
    q: 'What is Russian Civilization — the Global Diaspora Archive?',
    a: 'It is a non-political, non-commercial documentary archive that maps over a thousand notable individuals worldwide whose biographies connect, in a documented and sourced way, to the Russian Empire, the Soviet Union, and the states that succeeded them. Each profile records where a person or their ancestors came from, when the family left, and what they achieved — with at least one published source.',
  },
  {
    q: 'How many people belong to the Russian civilizational diaspora worldwide?',
    a: 'This archive itself documents a curated index of just over a thousand notable figures across 39 countries. The broader global diaspora connected by ancestry, language, and heritage is far larger — scholarly estimates place the worldwide Russian-speaking and Russian-heritage diaspora at roughly 25 to 30 million people, with the largest concentrations in the post-Soviet states, followed by the United States, Germany, Israel, and the wider West.',
  },
  {
    q: 'Why are so many people in the archive Jewish, Ukrainian, Polish, or German rather than ethnically Russian?',
    a: 'This is the most important question the archive raises, and the answer is historical. The Russian Empire was a vast multi-ethnic state. It confined its Jewish population to a region called the Pale of Settlement — today\u2019s Ukraine, Belarus, Poland, Lithuania, and Moldova. When pogroms struck and when the Empire and later the USSR collapsed, millions emigrated. These communities — above all Ashkenazi Jews from the Pale — became among the most high-achieving immigrant groups in modern history, helping to found Hollywood, invent vaccines, create the comic-book industry, and reshape physics and music. A civilization is not an ethnicity: it is the shared historical and cultural space that formed these people, whatever their background.',
  },
  {
    q: 'Does being in this archive mean someone is "Russian"?',
    a: 'No. Most people in the archive are not ethnic Russians, and many today identify as American, Israeli, German, Canadian, Ukrainian, or other nationalities. A profile records a documented biographical connection to a historical and cultural space — nothing more. Individual self-identification is respected absolutely, and the archive includes many who fled that space, opposed it, or were persecuted by it.',
  },
  {
    q: 'Is this a political project? Is it connected to any government?',
    a: 'No. The archive is independent, receives no funding from any government, and is affiliated with no party or movement. The analytical concept of a "Russian civilization" predates by more than a century — and is independent of — any contemporary state doctrine. The project documents a historical-cultural space and asserts no claim on any person\u2019s loyalty, any nation\u2019s identity, or any country\u2019s borders. It explicitly respects the sovereignty and distinct nationhood of Ukraine, the Baltic states, the Caucasus, and Central Asia.',
  },
  {
    q: 'What does it mean to call this a "civilization" rather than a country?',
    a: 'The idea that the Russian-Eurasian space forms a distinct civilization is one of the most consistent findings of comparative macro-history, advanced independently by thinkers of very different politics — Nikolai Danilevsky, Oswald Spengler, Arnold Toynbee, Pitirim Sorokin, Samuel Huntington, and Shmuel Eisenstadt among them. A civilization, in this sense, is a long-lived cultural space with its own spiritual heritage, language of high culture, and historical experience — larger than any single nation-state and outlasting the regimes that govern it.',
  },
  {
    q: 'Can someone still "belong" if their family left generations ago and they no longer speak the language?',
    a: 'Humanity uses two competing models. The civic model defines belonging by current citizenship and language, under which assimilation completes in a few generations. The civilizational-continuity model treats belonging as multi-generational — and this is codified worldwide: Israel\u2019s Law of Return extends to grandchildren, Germany repatriated ethnic Germans whose families had lived in Russia for over two centuries, India\u2019s OCI status reaches grandchildren, and the African Union counts its centuries-old diaspora as a "Sixth Region." This archive applies to the Russian-Eurasian diaspora the same multi-generational lens the world already applies to every other.',
  },
  {
    q: 'How are people chosen for the archive, and how is accuracy maintained?',
    a: 'Inclusion requires a documented connection at one of four levels: born within the space; parents born within it; grandparents or earlier ancestors born within it; or, in a small explicitly-labelled set of cases, formation within the Russophone cultural sphere without ancestry. Every profile carries at least one published source, the ancestral level is stated on each page, and entries are removed when the evidence does not hold up. Corrections are welcomed.',
  },
  {
    q: 'Which countries are represented?',
    a: 'The archive spans 39 countries. The largest concentrations are in the United States, Germany, Israel, the United Kingdom, France, Canada, and Australia, reflecting the major waves of emigration after 1917 and 1991 — from White Russian aristocrats and Jewish émigrés of the Empire to the post-Soviet generation of scientists, founders, and artists.',
  },
  {
    q: 'The site is in English — is it available in other languages?',
    a: 'The archive is currently in English. Modern browsers such as Chrome and Yandex provide high-quality automatic translation for readers who prefer Russian, German, or another language.',
  },
]

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--ivory-rule)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
          padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35 }}>{q}</span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 22, color: 'var(--bordeaux)', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{open ? '\u2212' : '+'}</span>
      </button>
      {open && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: 'var(--ink-mid)', margin: '0 0 24px', maxWidth: 660 }}>{a}</p>
      )}
    </div>
  )
}

export default function FAQ() {
  // FAQPage schema → eligible for Google rich-result snippets.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <Layout
      title="Frequently Asked Questions"
      description="Answers to common questions about Russian Civilization — the Global Diaspora Archive: what it is, who belongs, why so many figures are not ethnically Russian, and whether the project is political."
    >
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div style={{ background: 'var(--navy)', padding: '56px 24px 52px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>Questions &amp; Answers</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4.5vw,46px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1.12, marginBottom: 18 }}>
            Frequently asked questions
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.7, color: 'rgba(247,244,238,0.75)', maxWidth: 600 }}>
            What the archive is, who belongs in it, and the history behind the questions it raises.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 72px' }}>
        {FAQS.map((f, i) => <Item key={i} {...f} />)}

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--ivory-rule)', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/about" style={{ display: 'inline-block', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white)', background: 'var(--navy)', padding: '14px 32px', textDecoration: 'none' }}>
            Read the full manifesto →
          </Link>
          <ContactSlider />
        </div>
      </div>
    </Layout>
  )
}
