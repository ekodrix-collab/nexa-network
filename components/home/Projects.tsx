'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

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
    <section className="py-24 bg-white dark:bg-[#070f12] relative overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="relative flex flex-col z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header Block */}
        <div className="flex items-start justify-between mb-16">

          {/* LEFT: Label + Heading + Link */}
          <div>
            <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              Featured Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight">
              Real solutions Real results.
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#F05B1B] hover:text-[#FF6B2B] text-xs font-bold tracking-wider uppercase mt-4 transition-colors"
            >
              View All Projects
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* RIGHT: Nav Buttons — hidden on mobile, visible md+ */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-black/15 text-slate-700 hover:border-[#F05B1B] hover:bg-[#F05B1B] hover:text-white dark:border-white/15 dark:text-white dark:hover:border-[#F05B1B] dark:hover:bg-[#F05B1B]'
                  : 'border-black/5 text-slate-300 dark:border-white/5 dark:text-white/20 cursor-not-allowed'
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
                  ? 'border-black/15 text-slate-700 hover:border-[#F05B1B] hover:bg-[#F05B1B] hover:text-white dark:border-white/15 dark:text-white dark:hover:border-[#F05B1B] dark:hover:bg-[#F05B1B]'
                  : 'border-black/5 text-slate-300 dark:border-white/5 dark:text-white/20 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile: 2-column grid */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              direction="up"
              delay={index * 0.08}
              className="group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Cover Photo */}
              <div className="relative h-36 rounded-[5px] overflow-hidden border border-black/5 dark:border-white/5 mb-3">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute inset-0 bg-[#070f12]/15 group-hover:bg-[#070f12]/5 transition-colors duration-300" />
              </div>

              {/* Title & Info */}
              <div>
                <h3 className="text-slate-800 dark:text-white font-bold text-xs leading-snug mb-1 group-hover:text-[#F05B1B] transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>
                <span className="text-[#F05B1B] text-[9px] font-bold tracking-wider uppercase">
                  {project.category}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop: Horizontal Carousel (md and above) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="hidden md:flex gap-6 overflow-x-auto pb-6 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              direction="up"
              delay={index * 0.08}
              className="flex-shrink-0 w-80 group cursor-pointer hover:-translate-y-1.5 transition-transform duration-300"
            >
              {/* Cover Photo */}
              <div className="relative h-56 rounded-[5px] overflow-hidden border border-black/5 dark:border-white/5 mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute inset-0 bg-[#070f12]/15 group-hover:bg-[#070f12]/5 transition-colors duration-300" />
              </div>

              {/* Title & Info Underneath */}
              <div className="px-2">
                <h3 className="text-slate-800 dark:text-white font-bold text-sm leading-snug mb-1 group-hover:text-[#F05B1B] transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>
                <span className="text-[#F05B1B] text-[10px] font-bold tracking-wider uppercase">
                  {project.category}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}