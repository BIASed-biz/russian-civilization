import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react'
import { langFromPath } from '../lib/i18n'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  // Set <html lang> the valid way (Pages Router can't set it in next/head).
  useEffect(() => {
    const lang = langFromPath(router.pathname, router.asPath)
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [router.pathname, router.asPath])

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
