'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, ChevronDown, Download, Headphones, Award, Briefcase, Users, Clock, Truck, Activity, TrendingDown, MapPin, DoorOpen, Camera, Monitor, Zap } from 'lucide-react'
import { serviceData } from '@/data/services'
import ScrollReveal from '@/components/ui/ScrollReveal'

// Map stat labels to icons for the Hero Section
const getStatIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('experience')) return Award
  if (l.includes('projects') || l.includes('secured') || l.includes('launched')) return Briefcase
  if (l.includes('clients') || l.includes('users')) return Users
  if (l.includes('tracked') || l.includes('vehicle')) return Truck
  if (l.includes('update') || l.includes('uptime')) return Activity
  if (l.includes('cost')) return TrendingDown
  if (l.includes('support') || l.includes('alert')) return Headphones
  if (l.includes('door')) return DoorOpen
  if (l.includes('camera')) return Camera
  if (l.includes('display') || l.includes('boardroom')) return Monitor
  if (l.includes('seo')) return Zap
  return Clock
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    setMounted(true)
    window.scrollTo(0, 0)
  }, [])

  const service = serviceData.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  if (!mounted) return null

  return (
    <div className="bg-[#F4F6F8] dark:bg-[#050505] text-slate-800 dark:text-white transition-colors duration-300 min-h-screen">

      {/* ── HERO SECTION ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-white dark:bg-[#080808] border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F05B1B]/5 blur-[150px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-start">
            {/* Left Content */}
            <div className="contents lg:block">
              {/* Heading - First on Mobile */}
              <div className="order-1 lg:order-none">
                <ScrollReveal>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#F05B1B] text-xs font-bold tracking-[0.2em] uppercase">
                      Our Services
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-bold lg:text-[54px] font-black leading-[1.1] mb-6 text-slate-900 dark:text-white">
                    {service.hero.title}
                    <br className="hidden sm:block" />
                    <span className="text-[#F05B1B]">{service.hero.highlight}</span>
                  </h1>
                </ScrollReveal>
              </div>

              {/* Image - Second on Mobile */}
              <div className="order-2 lg:hidden">
                <div className="relative rounded-[5px] overflow-hidden aspect-[4/3]">
                  <img
                    src={service.hero.image}
                    alt={service.slug}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

              {/* Description + Button + Stats */}
              <div className="order-3 lg:order-none">
                <ScrollReveal>
                  <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-10 max-w-xl mt-6 lg:mt-0">
                    {service.hero.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-16">
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-[#F05B1B] hover:bg-[#E04D12] text-white text-sm font-bold rounded-lg transition-all duration-300 hover:shadow-orange"
                    >
                      Get a Consultation
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {service.hero.stats.map((stat, i) => {
                      const StatIcon = getStatIcon(stat.label)

                      return (
                        <div key={i} className="flex flex-col gap-2">
                          {/* <StatIcon className="w-6 h-6 text-[#F05B1B]" /> */}
                          <div className="text-2xl sm:text-3xl font-black font-bold text-slate-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-white/50 font-medium uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Desktop Image Only */}
            <ScrollReveal
              direction="left"
              delay={0.2}
              className="hidden lg:block"
            >
              <div className="relative rounded-[5px] overflow-hidden aspect-[4/3] lg:aspect-square">
                <img
                  src={service.hero.image}
                  alt={service.slug}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW SECTION ── */}
      <section className="py-24 bg-[#F4F6F8] dark:bg-[#050505] transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <ScrollReveal>
              <div className="relative rounded-[5px] overflow-hidden aspect-[4/3] shadow-lg border border-black/5 dark:border-white/10">
                <img src={service.overview.image} alt="Overview" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </ScrollReveal>

            {/* Right Content */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="text-[#F05B1B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Overview</div>
              <h2 className="text-3xl sm:text-4xl font-black font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                {service.overview.title}
              </h2>
              <p className="text-slate-600 dark:text-white/60 text-[15px] leading-relaxed mb-10">
                {service.overview.description}
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
                {service.overview.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F05B1B] flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 dark:text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY PARTNERS ── */}
      <section className="py-16 bg-white dark:bg-[#080808] border-y border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-10">

            <span className="text-[#F05B1B] text-xs font-bold tracking-[0.2em] uppercase">Technology Partners</span>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['NORDEN', 'RAMCRO', 'COMMSCOPE', 'PANDUIT', 'HUBNETIX', 'CISCO'].map((partner, i) => (
              <ScrollReveal key={partner} delay={i * 0.05}>
                <div className="h-20 flex items-center justify-center border border-black/10 dark:border-white/10 rounded-xl hover:border-[#F05B1B]/50 transition-colors duration-300">
                  <span className="text-slate-700 dark:text-white/70 font-black tracking-wider text-sm uppercase">{partner}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      {service.projects && service.projects.length > 0 && (
        <section className="py-24 bg-[#F4F6F8] dark:bg-[#050505] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">

                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.2em] uppercase">Featured Projects</span>

              </div>
              <h2 className="text-3xl font-bold sm:text-4xl font-black text-slate-900 dark:text-white">Delivering Excellence Through Every Project</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {service.projects.map((project, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="group relative rounded-[5px] overflow-hidden aspect-[4/5] shadow-lg border border-black/5 dark:border-white/10">
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-4 border border-white/20 self-start">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 leading-snug">{project.title}</h3>
                      <p className="text-white/60 text-sm mb-6 line-clamp-3">{project.description}</p>
                      <Link href={project.link} className="inline-flex items-center gap-2 text-[#F05B1B] font-bold text-sm hover:text-[#FF6B2B] transition-colors">
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OUR PROCESS ── */}
      {service.process && service.process.length > 0 && (
        <section className="py-24 bg-white dark:bg-[#080808] border-y border-black/5 dark:border-white/5 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">

                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.2em] uppercase">Our Process</span>

              </div>
              <h2 className="text-3xl font-bold sm:text-4xl font-black text-slate-900 dark:text-white">How We Deliver Your Solutions</h2>
            </div>

            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-px border-t border-dashed border-[#F05B1B]/30" />

              <div className="grid lg:grid-cols-4 gap-8">
                {service.process.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <ScrollReveal key={i} delay={i * 0.1} className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#050505] border border-black/10 dark:border-white/10 flex flex-col items-center justify-center mb-6 shadow-xl dark:shadow-none group transition-all duration-300 hover:border-[#F05B1B]">
                        <div className="text-[#F05B1B] text-[10px] font-black tracking-widest mb-1">{step.num}</div>
                        <Icon className="w-6 h-6 text-slate-800 dark:text-white group-hover:text-[#F05B1B] transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                      <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed">{step.description}</p>
                    </ScrollReveal>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ & CTA ── */}
      <section className="py-24 bg-[#F4F6F8] dark:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left CTA Card */}
            <div className="lg:col-span-1">
              <ScrollReveal>
                <div className="bg-white dark:bg-[#080808] border border-black/10 dark:border-white/10 rounded-[5px] p-8 sticky top-32">
                  <div className="w-12 h-12 rounded-xl bg-[#F05B1B]/10 flex items-center justify-center mb-6">
                    <Headphones className="w-5 h-5 text-[#F05B1B]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-snug">Need a Custom Solution for Your Business?</h3>
                  <p className="text-slate-600 dark:text-white/60 text-sm mb-8 leading-relaxed">
                    Our experts are ready to help you build a secure, reliable, and scalable infrastructure.
                  </p>
                  <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-4 bg-[#F05B1B] hover:bg-[#E04D12] text-white text-sm font-bold rounded-[5px] transition-colors">
                    Talk to an Expert <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right FAQs */}
            <div className="lg:col-span-2 overflow-hidden">
              <ScrollReveal direction="left" delay={0.2}>
                <div className="flex items-center gap-4 mb-8">

                  <span className="text-[#F05B1B] text-xs font-bold tracking-[0.2em] uppercase">Frequently Asked Questions</span>
                </div>

                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="bg-white dark:bg-[#080808] border border-black/5 dark:border-white/5 rounded-[5px] overflow-hidden transition-colors duration-300">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="text-sm font-bold text-slate-900 dark:text-white pr-8">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 text-[#F05B1B] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 text-sm text-slate-600 dark:text-white/60 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
