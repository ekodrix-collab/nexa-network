'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    // If we are in the admin dashboard, bypass intro/animation and show content immediately
    if (pathname?.startsWith('/admin')) {
      setReady(true)
      return
    }

    // If intro was already seen, show content immediately
    const hasSeen = sessionStorage.getItem('nexa_seen_intro')
    if (hasSeen) {
      setReady(true)
      return
    } else {
      setReady(false)
    }

    const handler = () => setReady(true)
    window.addEventListener('nexa-intro-done', handler)
    return () => window.removeEventListener('nexa-intro-done', handler)
  }, [pathname])

  return (
    <motion.div
      initial={false}
      animate={
        ready
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 40, filter: 'blur(6px)' }
      }
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
