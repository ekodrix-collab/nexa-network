'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-32 bg-[#070f12] overflow-hidden border-b border-white/5">
      {/* Doha Skyline Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
      />
      {/* Dark overlays to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070f12] via-[#070f12]/90 to-[#070f12]/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070f12] via-transparent to-[#070f12]/80" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 max-w-2xl mx-auto">
            Let&apos;s build a smarter, safer future together.
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
            Partner with Nexa Network Solutions to transform your enterprise IT infrastructure with Qatar&apos;s leading systems integrator.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#F05B1B] hover:bg-[#FF6B2B] text-white text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 shadow-lg shadow-[#F05B1B]/20"
            >
              Schedule a Consultation
            </Link>
            <a
              href="tel:+97441459393"
              className="px-8 py-4 border border-white/15 hover:border-[#F05B1B] text-white text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 bg-[#070f12]/40 backdrop-blur-sm"
            >
              Call +974 4145 9393
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
