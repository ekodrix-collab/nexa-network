'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // If intro was already seen, show content immediately
    const hasSeen = sessionStorage.getItem('nexa_seen_intro')
    if (hasSeen) {
      setReady(true)
      return
    }

    const handler = () => setReady(true)
    window.addEventListener('nexa-intro-done', handler)
    return () => window.removeEventListener('nexa-intro-done', handler)
  }, [])

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
