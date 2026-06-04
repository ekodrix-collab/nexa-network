'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'FedEx Qatar Infrastructure Upgrade',
    category: 'Network & Infrastructure',
    image: '/images/projects/fedex.jpg'
  },
  {
    id: 2,
    title: 'Katara Cultural Village Smart Surveillance System',
    category: 'CCTV & Security',
    image: '/images/projects/katara.jpg'
  },
  {
    id: 3,
    title: 'Aida Clinic Cloud Migration',
    category: 'Cloud Solutions',
    image: '/images/projects/aida-clinic.jpg'
  },
  {
    id: 4,
    title: 'Government Sector Cybersecurity Enhancement',
    category: 'Cyber Security',
    image: '/images/projects/government.jpg'
  }
]

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 340
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    handleScroll()
  }, [])

  return (
    <section className="py-24 bg-[#070f12] relative overflow-hidden border-b border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              Featured Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Real solutions.<br />Real results.
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#F05B1B] hover:text-[#FF6B2B] text-xs font-bold tracking-wider uppercase mt-4 transition-colors"
            >
              View All Projects
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-white/15 text-white hover:border-[#F05B1B] hover:bg-[#F05B1B] hover:text-white'
                  : 'border-white/5 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'border-white/15 text-white hover:border-[#F05B1B] hover:bg-[#F05B1B] hover:text-white'
                  : 'border-white/5 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 group cursor-pointer"
            >
              {/* Cover Photo */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-white/5 mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                {/* Subtle dark overlay */}
                <div className="absolute inset-0 bg-[#070f12]/15 group-hover:bg-[#070f12]/5 transition-colors duration-300" />
              </div>

              {/* Title & Info Underneath */}
              <div className="px-2">
                <h3 className="text-white font-bold text-sm leading-snug mb-1 group-hover:text-[#F05B1B] transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>
                <span className="text-[#F05B1B] text-[10px] font-bold tracking-wider uppercase">
                  {project.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
