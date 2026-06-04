'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function CTA() {
  return (
    <section className="relative py-32 bg-white dark:bg-[#070f12] overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      {/* Doha Skyline Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
      />
      {/* Theme-dependent overlays to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4F6F8] via-[#F4F6F8]/75 to-[#F4F6F8]/55 dark:from-[#070f12] dark:via-[#070f12]/90 dark:to-[#070f12]/80 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#F4F6F8] via-transparent to-[#F4F6F8]/50 dark:from-[#070f12] dark:via-transparent dark:to-[#070f12]/80 transition-colors duration-300" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal direction="up" duration={0.8}>
          <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6 max-w-2xl mx-auto">
            Let&apos;s build a smarter, safer future together.
          </h2>
          <p className="text-slate-600 dark:text-white/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
            Partner with Nexa Network Solutions to transform your enterprise IT infrastructure with Qatar&apos;s leading systems integrator.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#F05B1B] hover:bg-[#FF6B2B] text-white text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 shadow-lg shadow-[#F05B1B]/25 hover:shadow-xl hover:shadow-[#F05B1B]/35 hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Schedule a Consultation
            </Link>
            <a
              href="tel:+97441459393"
              className="px-8 py-4 border border-black/10 dark:border-white/15 hover:border-[#F05B1B] text-slate-800 dark:text-white text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 bg-white/40 dark:bg-[#070f12]/40 backdrop-blur-sm hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Call +974 4145 9393
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
