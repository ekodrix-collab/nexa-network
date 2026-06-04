'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CinemaIntro() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState(0)
  // phase 0: dark void
  // phase 1: logo fades in with scale + glow
  // phase 2: light sweep across logo
  // phase 3: fade out entire overlay

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('nexa_seen_intro')
    if (hasSeen) {
      setVisible(false)
      return
    }

    const t1 = setTimeout(() => setPhase(1), 300)   // logo appears
    const t2 = setTimeout(() => setPhase(2), 1600)   // light sweep
    const t3 = setTimeout(() => setPhase(3), 2800)   // begin fade out
    const t4 = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('nexa_seen_intro', 'true')
      window.dispatchEvent(new CustomEvent('nexa-intro-done'))
    }, 3600)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinema-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(12px)',
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #0a1418 0%, #050b0d 60%, #020506 100%)',
          }}
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(240,91,27,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240,91,27,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* Ambient glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: phase >= 1 ? [0, 0.5, 0.35] : 0,
              scale: phase >= 1 ? [0.5, 1.3, 1.1] : 0.5,
            }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(240,91,27,0.25) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Secondary ring pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: phase >= 1 ? [0, 0.15, 0] : 0,
              scale: phase >= 1 ? [0.3, 2.5] : 0.3,
            }}
            transition={{ duration: 2.5, ease: 'easeOut', delay: 0.5 }}
            className="absolute w-[200px] h-[200px] rounded-full border border-[#F05B1B]/30 pointer-events-none"
          />

          {/* Logo Container */}
          <div className="relative flex items-center justify-center">

            {/* The actual logo image */}
            <motion.img
              src="/images/logo.png"
              alt="Nexa Network Solutions"
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px) brightness(0.5)' }}
              animate={{
                opacity: phase >= 1 ? 1 : 0,
                scale: phase >= 1 ? (phase >= 3 ? 1.05 : 1) : 0.7,
                filter: phase >= 1
                  ? (phase >= 2
                    ? 'blur(0px) brightness(1.1) drop-shadow(0 0 30px rgba(240,91,27,0.4))'
                    : 'blur(0px) brightness(1)')
                  : 'blur(8px) brightness(0.5)',
              }}
              transition={{
                duration: phase >= 3 ? 0.6 : 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 h-20 md:h-24 w-auto object-contain select-none"
              draggable={false}
            />

            {/* Cinematic light sweep across logo */}
            {phase >= 2 && (
              <motion.div
                initial={{ left: '-30%', opacity: 0 }}
                animate={{ left: '130%', opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-8 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  transform: 'skewX(-15deg)',
                }}
              />
            )}
          </div>

          {/* Horizontal accent lines */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase >= 1 ? 1 : 0,
              opacity: phase >= 1 ? 0.15 : 0,
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="absolute bottom-[42%] left-1/2 -translate-x-1/2 w-[400px] h-px origin-center"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(240,91,27,0.5), transparent)',
            }}
          />

          {/* Flash overlay at sweep moment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? [0, 0.06, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
