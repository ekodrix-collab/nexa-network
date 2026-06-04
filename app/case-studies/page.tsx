'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Trophy, Briefcase, Zap } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const cases = [
  {
    title: 'Qatar West Bay Corporate HQ Redeployment',
    description: 'Nexa executed an active networking and cybersecurity migration for a prominent investment enterprise, securing 300+ nodes.',
    impact: '99.99% Network Uptime & Zero Data Breach occurrences.',
    tag: 'Corporate Enterprise'
  },
  {
    title: 'Integrated Access Gates at Lusail Stadium District',
    description: 'We installed turnstiles, biometric gates, and ANPR license plate reader cameras connected to SSD operations.',
    impact: 'Under 1.2s verification time & 40,000+ daily checks handled.',
    tag: 'Public Security & CCTV'
  },
  {
    title: 'High-Density Campus WiFi for Al-Khor Academy',
    description: 'Designed WiFi 6 network coverage for 2,500+ simultaneous student connections across classrooms and sports arenas.',
    impact: '100% campus wireless coverage with adaptive bandwidth control.',
    tag: 'Campus Networks'
  }
]

export default function CaseStudiesPage() {
  return (
    <div className="pt-20 bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      <section className="relative py-24 bg-white dark:bg-[#0D1C22] border-b border-black/5 dark:border-white/[0.03] overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F05B1B]/5 rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#F05B1B]" />
                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Success Stories</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">
                Our Case <span className="text-[#F05B1B]">Studies</span>
              </h1>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed">
                Demonstrated technology solutions that improve security, reliability, and network connectivity across Qatar.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          {cases.map((cs, i) => (
            <ScrollReveal key={cs.title} delay={i * 0.08}>
              <div className="bg-white dark:bg-[#0d1c22]/60 rounded-3xl p-8 border border-black/5 dark:border-white/10 hover:border-[#F05B1B]/20 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <span className="text-[#F05B1B] text-[10px] font-bold tracking-widest uppercase block mb-2">{cs.tag}</span>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3">{cs.title}</h3>
                    <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed mb-4">{cs.description}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-[#070f12]/50 p-5 rounded-2xl border border-black/5 dark:border-white/5 transition-colors duration-300">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm mb-2"><Trophy className="w-4 h-4 text-[#F05B1B]" />Proven Impact</div>
                    <div className="text-slate-600 dark:text-white/80 text-xs leading-relaxed">{cs.impact}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
