'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, FileText, HelpCircle, PhoneCall, ArrowRight, ExternalLink } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const resourceCards = [
  {
    icon: BookOpen,
    title: 'Infrastructure Deployment Guides',
    description: 'Technical documents detailing active networks setup, CCTV analytics integration, and cloud migrations.',
    linkText: 'Browse Guides',
    href: '/resources'
  },
  {
    icon: HelpCircle,
    title: 'Nexa FAQ Hub',
    description: 'Answers to frequently asked questions about SLAs, support ticketing, system installations, and hardware warranty.',
    linkText: 'View FAQs',
    href: '/resources'
  },
  {
    icon: PhoneCall,
    title: '24/7 SLA Support Portal',
    description: 'Access the dedicated helpdesk, submit maintenance tickets, or dial the emergency system-down hotline directly.',
    linkText: 'Support Portal',
    href: '/support'
  }
]

export default function ResourcesPage() {
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
                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Resource Center</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">
                Knowledge & <span className="text-[#F05B1B]">SLA Support</span>
              </h1>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed">
                Access technical documentation, browse deployment guides, or enter our support portal for priority system assistance.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid List */}
      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {resourceCards.map((res, i) => {
              const Icon = res.icon
              return (
                <ScrollReveal key={res.title} delay={i * 0.05}>
                  <div className="bg-white dark:bg-[#0d1c22]/60 rounded-3xl p-8 border border-black/5 dark:border-white/10 hover:border-[#F05B1B]/30 hover:bg-white dark:hover:bg-[#0d1619]/80 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#F05B1B]/10 flex items-center justify-center text-[#F05B1B] mb-6">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                        {res.title}
                      </h3>
                      <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed mb-8">
                        {res.description}
                      </p>
                    </div>
                    <Link
                      href={res.href}
                      className="group inline-flex items-center gap-2 text-slate-700 dark:text-white hover:text-[#F05B1B] dark:hover:text-[#F05B1B] text-xs font-bold uppercase tracking-wider transition-colors duration-200 mt-auto"
                    >
                      {res.linkText}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Quick FAQ preview */}
          <div className="bg-white dark:bg-[#0d1c22]/60 rounded-[32px] p-8 lg:p-12 border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none transition-all duration-300">
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-8">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-800 dark:text-white font-bold text-base mb-2">What is Nexa&apos;s standard SLA response window?</h4>
                <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed">
                  For priority contract clients, we support 24/7/365 assistance with guaranteed on-site arrival within 2 to 4 hours depending on incident severity.
                </p>
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-white font-bold text-base mb-2">Are CCTV systems CNIA and Civil Defense compliant?</h4>
                <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed">
                  Yes, all our CCTV design and installations comply fully with Qatar Civil Defense, SSD, and CNIA regulations to pass SSD inspections seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
