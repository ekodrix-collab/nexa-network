'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Building2, Factory, Heart, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const industries = [
  {
    id: 'government',
    icon: Building2,
    title: 'Government & Public Sector',
    subtitle: 'Secure National Infrastructure',
    description: 'Compliant, resilient, and highly secure networking and surveillance solutions tailored for public sector operations, defense, and smart city infrastructure in Qatar.',
    features: [
      'CNIA Compliant Security Architecture',
      'Unified Smart City Operations Centers',
      'National Fiber Backbones & Active LANs',
      'Ultra-Secure CCTV Systems & AI Analytics',
      'Multi-Tier access privilege systems',
      'Disaster recovery & data localization'
    ],
    accent: '#3B82F6',
    bgImage: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(13,28,34,0.4) 100%)'
  },
  {
    id: 'corporate',
    icon: Factory,
    title: 'Corporate Enterprise',
    subtitle: 'Scalable Operations',
    description: 'Transforming corporate productivity and secure communication with hybrid cloud deployments, enterprise WiFi networks, and intelligent physical asset tracking.',
    features: [
      'Zero-Trust Cybersecurity & Firewalls',
      'High-Speed Structured Cabling systems',
      'Smart Entry Management & RFID Gates',
      'Enterprise cloud backup and migration',
      'Unified Communications & VoIP solutions',
      'Real-time IoT and asset telemetry'
    ],
    accent: '#10B981',
    bgImage: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(13,28,34,0.4) 100%)'
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare & Clinical',
    subtitle: 'Patient Safety & Compliance',
    description: 'Secure wireless networks for patient telemetry, HD camera feeds for safety, and strict biometric systems safeguarding data protection and medical assets.',
    features: [
      'HIPAA / Qatar NHRA Compliance audits',
      'Interference-free Medical Wireless bands',
      'Biometric access to pharmaceutical stores',
      'Patient ward HD CCTV surveillance',
      'Mission-critical UPS & power monitoring',
      'Patient tracking and locator tags'
    ],
    accent: '#EF4444',
    bgImage: 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(13,28,34,0.4) 100%)'
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education & Campus',
    subtitle: 'Connected Learning Spaces',
    description: 'Enabling campus-wide digital transformation with safe, filtered network access, secure surveillance systems, and automated student attendance tracking.',
    features: [
      'High-density auditorium WiFi planning',
      'Web filtering & cybersecurity guardrails',
      'RFID school bus and entry check-ins',
      'Classroom audiovisual network cabling',
      'Visitor and emergency lock-down systems',
      'Scalable multi-site campus intranets'
    ],
    accent: '#8B5CF6',
    bgImage: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(13,28,34,0.4) 100%)'
  }
]

import { useState, useEffect } from 'react'

export default function IndustriesPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? theme : 'dark'

  return (
    <div className="pt-20 bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative py-24 bg-white dark:bg-[#0D1C22] border-b border-black/5 dark:border-white/[0.03] overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F05B1B]/5 rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#F05B1B]" />
                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Industries We Serve</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">
                Tailored IT for Qatar&apos;s <span className="text-[#F05B1B]">Key Verticals</span>
              </h1>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed">
                Enterprise technology infrastructure designed, integrated, and supported to meet the unique challenges of Qatar&apos;s public, enterprise, and educational institutions.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Verticals List */}
      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          {industries.map((ind, i) => {
            const Icon = ind.icon
            const cardBgImage = currentTheme === 'light'
              ? `linear-gradient(135deg, ${ind.accent}08 0%, rgba(255,255,255,0.9) 100%)`
              : ind.bgImage

            return (
              <ScrollReveal key={ind.title} delay={0.1}>
                <div 
                  id={ind.id} 
                  className="bg-white dark:bg-transparent rounded-3xl p-8 lg:p-10 border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/15 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300 scroll-mt-24"
                  style={{ backgroundImage: cardBgImage }}
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" 
                        style={{ background: `${ind.accent}18` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: ind.accent }} />
                      </div>
                      <div className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: ind.accent }}>
                        {ind.subtitle}
                      </div>
                      <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">
                        {ind.title}
                      </h2>
                      <p className="text-slate-500 dark:text-white/50 leading-relaxed mb-6">
                        {ind.description}
                      </p>
                      <Link 
                        href="/contact" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-bold text-sm rounded-xl transition-all duration-300 hover:shadow-orange"
                      >
                        Enquire for this Vertical
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ind.features.map((f) => (
                        <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#070f12]/40 border border-black/5 dark:border-white/5 transition-colors duration-300">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: ind.accent }} />
                          <span className="text-slate-600 dark:text-white/70 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>
    </div>
  )
}
