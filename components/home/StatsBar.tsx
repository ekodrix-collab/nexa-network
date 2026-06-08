'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function StatsBar() {
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(2)
      else if (window.innerWidth < 1024) setItemsPerPage(4)
      else setItemsPerPage(6)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const logos = [
    {
      id: 'fedex',
      render: () => (
        <svg className="h-7 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20V4h10c2.5 0 4 .5 5 1.5s1.5 2.5 1.5 4.5c0 1.8-.4 3.1-1.2 4s-2.1 1.5-3.8 1.5H4v4.5H0zm4-9h5.5c1.8 0 2.5-.8 2.5-2.2 0-1.3-.7-2-2.5-2H4v4.2z" fill="#4D148C" />
          <path d="M22 13h10v2.2H22v2.5h10.8V20H18V4h14.8v2.3H22V13z" fill="#4D148C" />
          <path d="M36.5 20V4h6c3.2 0 5 1.2 5 4.2 0 1.8-1 3-2.5 3.6 1.8.5 2.8 1.8 2.8 3.8v1.2c0 1.2.2 2 .5 2.2V20h-4.2c-.3-.5-.4-1.3-.4-2.2v-1.2c0-1.8-.8-2.5-2.8-2.5h-1.4V20h-4zm4-10.8h2c1.8 0 2.5-.6 2.5-2 0-1.2-.7-1.8-2.5-1.8h-2V9.2z" fill="#4D148C" />
          <path d="M50 20l5.8-8.2-5.5-7.8h4.8l3 4.5 3.2-4.5h4.6l-5.6 7.8 6 8.2h-4.8l-3.4-4.8-3.4 4.8H50z" fill="#FF6600" />
          <g transform="translate(85, 2)">
            <path d="M8 0l1.8 4.2L14 3l-2.8 3.8L15 10l-4.5-.5L9 14l-1.8-4.2L3 11l-2.8-3.8L2 4l4.5.5L8 0z" fill="#FF6600" />
          </g>
          <text x="85" y="23" fill="#FF6600" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Express</text>
        </svg>
      )
    },
    {
      id: 'katara',
      render: () => (
        <svg className="h-9 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 12c10-4 20-4 30 0M45 12c10-4 20-4 30 0M75 12c10-4 20-4 30 0" stroke="#7A1C29" strokeWidth="2" strokeLinecap="round" />
          <text x="22" y="27" fill="#7A1C29" fontSize="14" fontWeight="900" fontFamily="serif" letterSpacing="2.5">katara</text>
        </svg>
      )
    },
    {
      id: 'embassy',
      render: () => (
        <svg className="h-9 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(4, 5)">
            <circle cx="15" cy="15" r="13" fill="#EAF3FA" stroke="#006699" strokeWidth="1" />
            <path d="M7 15c0 4 3 8 8 8s8-4 8-8" stroke="#339933" strokeWidth="1.2" fill="none" />
            <path d="M10 10l10 10M20 10L10 20" stroke="#777" strokeWidth="0.8" />
            <rect x="11" y="9" width="8" height="12" rx="1" fill="#fff" stroke="#996600" strokeWidth="0.8" />
          </g>
          <text x="38" y="18" fill="#0F4C81" fontSize="9.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.2">EMBAJADA DE</text>
          <text x="38" y="30" fill="#0F4C81" fontSize="11.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">GUATEMALA</text>
        </svg>
      )
    },
    {
      id: 'almana',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="60" y="15" fill="#111" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">AL MANA</text>
          <text x="60" y="25" fill="#111" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">GROUP</text>
        </svg>
      )
    },
    {
      id: 'emax',
      render: () => (
        <svg className="h-10 w-auto" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="16" r="14" fill="#E02424" />
          <text x="20" y="21" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fontStyle="italic">E</text>
          <text x="38" y="21" fill="#111" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fontStyle="italic">max</text>
          <text x="50" y="34" fill="#111" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">ماكس</text>
          <circle cx="85" cy="16" r="6" fill="#E02424" />
          <text x="85" y="20" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">!</text>
        </svg>
      )
    },
    {
      id: 'carmel',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 130 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#E02424" />
          <text x="8" y="21" fill="#FFFFFF" fontSize="15" fontWeight="black" fontFamily="sans-serif">C</text>
          <text x="16" y="22" fill="#FFFFFF" fontSize="10" fontWeight="black" fontFamily="sans-serif">G</text>
          
          <text x="35" y="13" fill="#111" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.2">CARMEL</text>
          <text x="35" y="21" fill="#111" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.2">GROUP W.L.L.</text>
          <text x="35" y="27" fill="#111" fontSize="5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">DOHA - QATAR</text>
        </svg>
      )
    },
    {
      id: 'mot',
      render: () => (
        <svg className="h-9 w-auto" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(112, 4)">
            <circle cx="15" cy="15" r="14" stroke="#8A1538" strokeWidth="1.2" fill="none" />
            <path d="M8 20c4-1 10-3 14-3M22 20c-4-1-10-3-14-3" stroke="#8A1538" strokeWidth="1.2" />
            <path d="M15 17V6M12 9c1-1 3-1 3-1s2 0 3 1" stroke="#8A1538" strokeWidth="1.2" />
          </g>
          <text x="5" y="16" fill="#1C3F60" fontSize="9" fontWeight="bold" fontFamily="sans-serif">وزارة المـواصـلات</text>
          <line x1="5" y1="21" x2="105" y2="21" stroke="#8A1538" strokeWidth="0.8" />
          <text x="5" y="31" fill="#1C3F60" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.2">Ministry of Transport</text>
        </svg>
      )
    },
    {
      id: 'pantone',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="5" y="17" fill="#111111" fontSize="17" fontWeight="bold" fontFamily="sans-serif" letterSpacing="-0.5">pantone</text>
          <text x="5" y="26" fill="#666666" fontSize="7" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1.8">ADVERTISING</text>
          <rect x="95" y="3" width="18" height="23" fill="#E02424" rx="1" />
          <rect x="95" y="17" width="18" height="9" fill="#FFFFFF" />
        </svg>
      )
    },
    {
      id: 'atlassian',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5C10 5 10 15 15 25C20 15 20 5 15 5Z" fill="#0052cc" />
          <path d="M25 10C22 10 22 18 25 25C28 18 28 10 25 10Z" fill="#2684ff" />
          <text x="35" y="20" fill="#111" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Atlassian</text>
        </svg>
      )
    },
    {
      id: 'cloudflare',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5L30 25H10L20 5Z" fill="#F26522" />
          <text x="35" y="20" fill="#111" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Cloudflare</text>
        </svg>
      )
    },
    {
      id: 'ecotech',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="10" fill="#34A853" />
          <text x="35" y="20" fill="#111" fontSize="12" fontWeight="bold" fontFamily="sans-serif">EcoTech</text>
        </svg>
      )
    },
    {
      id: 'globalnet',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="10" height="10" fill="#4285F4" rx="2" />
          <rect x="18" y="5" width="10" height="10" fill="#EA4335" rx="2" />
          <rect x="5" y="18" width="10" height="10" fill="#FBBC05" rx="2" />
          <rect x="18" y="18" width="10" height="10" fill="#34A853" rx="2" />
          <text x="35" y="22" fill="#111" fontSize="12" fontWeight="bold" fontFamily="sans-serif">GlobalNet</text>
        </svg>
      )
    }
  ]

  const totalPages = Math.ceil(logos.length / itemsPerPage)

  // Autoplay functionality
  useEffect(() => {
    if (isPaused || totalPages <= 1) return
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 3500) // 3.5 seconds interval for smooth UX
    return () => clearInterval(timer)
  }, [totalPages, isPaused])

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(Math.max(0, totalPages - 1))
    }
  }, [totalPages, currentPage])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const visibleLogos = logos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <section className="relative bg-[#070A11] py-20 overflow-hidden min-h-[500px]">
      {/* Generated Map Background with subtle orange glows */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 bg-center bg-cover mix-blend-lighten"
        style={{ backgroundImage: 'url(/map-bg.png)' }}
      />
      
      {/* Base micro dot grid for extra tech texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Decorative gradient glowing spots behind main content */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FF5A20]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#E24611]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="flex flex-col items-center">
          
          {/* Top Shield Icon */}
          <div className="mb-5 flex items-center justify-center w-12 h-12 bg-[#FF5A20]/10 rounded-full border border-[#FF5A20]/20 shadow-[0_0_15px_rgba(255,90,32,0.15)]">
            <svg className="w-6 h-6 text-[#FF5A20]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>

          {/* TRUSTED PARTNERS text */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#FF5A20]/60" />
            <span className="text-[#FF5A20] text-sm font-bold tracking-[0.2em] uppercase">
              Trusted Partners
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#FF5A20]/60" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-6 max-w-3xl tracking-tight leading-tight">
            Trusted by Leading Organizations <span className="text-[#FF5A20]">Across Qatar</span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-center max-w-2xl text-sm md:text-base mb-12 leading-relaxed">
            We are proud to collaborate with top organizations and deliver secure, reliable, and future-ready IT solutions.
          </p>

          {/* Carousel Container */}
          <div 
            className="w-full bg-[#111824]/60 backdrop-blur-md border border-[#FF5A20]/30 rounded-3xl p-4 md:p-6 lg:p-8 flex flex-col relative group shadow-2xl shadow-black/50"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            
            <div className="flex items-center justify-between w-full relative z-10">
              
              {/* Left Arrow Button */}
              <button 
                type="button"
                onClick={prevPage}
                className="relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#FF5A20]/40 bg-white/5 flex items-center justify-center text-white/50 hover:text-[#FF5A20] hover:border-[#FF5A20] hover:bg-[#FF5A20]/10 transition-all z-50 focus:outline-none focus:ring-2 focus:ring-[#FF5A20]/50 active:scale-90 cursor-pointer"
                aria-label="Previous page"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Logos Grid/Row */}
              <div className="flex-1 overflow-hidden px-4 md:px-6 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 w-full place-items-center"
                  >
                    {visibleLogos.map((logo) => (
                      <div 
                        key={logo.id} 
                        className="bg-white border border-[#FF5A20]/30 rounded-2xl w-full h-20 md:h-24 flex items-center justify-center p-4 shadow-lg shadow-black/20 hover:shadow-xl hover:border-[#FF5A20]/60 hover:shadow-[#FF5A20]/10 transition-all duration-300"
                      >
                        {logo.render()}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Arrow Button */}
              <button 
                type="button"
                onClick={nextPage}
                className="relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#FF5A20]/40 bg-white/5 flex items-center justify-center text-white/50 hover:text-[#FF5A20] hover:border-[#FF5A20] hover:bg-[#FF5A20]/10 transition-all z-50 focus:outline-none focus:ring-2 focus:ring-[#FF5A20]/50 active:scale-90 cursor-pointer"
                aria-label="Next page"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index)}
                className={`relative transition-all duration-300 rounded-full cursor-pointer z-50 ${
                  currentPage === index 
                    ? 'w-6 h-2 bg-[#FF5A20]' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

        </ScrollReveal>
      </div>
    </section>
  )
}
