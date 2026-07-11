import { useState, useEffect } from 'react'

export default function ContactSlider() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const email = 'hello@russian-civilization.org'

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          fontFamily:'var(--font-ui)',fontSize:12,fontWeight:500,letterSpacing:'0.1em',
          textTransform:'uppercase',color:'var(--navy)',background:'transparent',
          border:'1px solid var(--navy)',padding:'14px 32px',cursor:'pointer',
        }}
      >
        Contact
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position:'fixed',inset:0,background:'rgba(13,20,33,0.45)',
          opacity:open?1:0,visibility:open?'visible':'hidden',
          transition:'opacity 0.25s ease',zIndex:90,
        }}
      />

      {/* Slide-in panel */}
      <div
        role="dialog"
        aria-hidden={!open}
        style={{
          position:'fixed',top:0,right:0,height:'100%',width:'min(380px, 92vw)',
          background:'var(--navy)',zIndex:91,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition:'transform 0.3s ease',
          display:'flex',flexDirection:'column',padding:'40px 36px',
          boxShadow:'-12px 0 40px rgba(0,0,0,0.25)',
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{
            alignSelf:'flex-end',background:'none',border:'none',cursor:'pointer',
            color:'rgba(247,244,238,0.5)',fontSize:24,lineHeight:1,padding:4,marginBottom:24,
          }}
        >
          ×
        </button>

        <div style={{fontFamily:'var(--font-ui)',fontSize:9,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--gold)',marginBottom:18}}>
          Get in touch
        </div>

        <p style={{fontFamily:'var(--font-body)',fontSize:15,lineHeight:1.75,color:'rgba(247,244,238,0.72)',marginBottom:28}}>
          Corrections, source updates, or new profile suggestions — all welcome.
          We review every submission.
        </p>

        <a
          href={`mailto:${email}`}
          style={{
            fontFamily:'var(--font-display)',fontSize:20,fontWeight:400,color:'var(--ivory)',
            textDecoration:'none',borderBottom:'1px solid rgba(247,244,238,0.25)',
            paddingBottom:8,marginBottom:16,wordBreak:'break-all',
          }}
        >
          {email}
        </a>

        <button
          onClick={copyEmail}
          style={{
            fontFamily:'var(--font-ui)',fontSize:11,fontWeight:500,letterSpacing:'0.08em',
            textTransform:'uppercase',color:'var(--gold)',background:'none',border:'none',
            cursor:'pointer',padding:0,textAlign:'left',marginTop:4,
          }}
        >
          {copied ? '✓ Copied to clipboard' : 'Copy email address'}
        </button>

        <div style={{marginTop:'auto',paddingTop:32,borderTop:'1px solid rgba(247,244,238,0.1)'}}>
          <div style={{fontFamily:'var(--font-ui)',fontSize:10,color:'rgba(247,244,238,0.35)',letterSpacing:'0.05em'}}>
            Russian Civilization — The Global Diaspora Archive
          </div>
        </div>
      </div>
    </>
  )
}
