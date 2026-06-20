'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Target, Eye, Gem, CheckCircle2, Award, Cpu, Users, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'

// Icon helper to resolve dynamic icon strings to Lucide components
function getIconComponent(iconName: string) {
  const Icon = (LucideIcons as any)[iconName]
  return Icon || LucideIcons.HelpCircle
}

interface ValueItem {
  title: string
  desc: string
  icon: string
}

interface BenefitItem {
  title: string
  desc: string
  icon: string
}

interface TestimonialItem {
  name: string
  role: string
  stars: number
  quote: string
}

interface AboutClientProps {
  content: {
    title: string
    subtitle?: string | null
    description: string
    bgImage?: string | null
    whoWeAreTitle?: string | null
    whoWeAreDescription1?: string | null
    whoWeAreDescription2?: string | null
    whoWeAreDescription3?: string | null
    whoWeAreImage?: string | null
    values?: any // ValueItem[] | null
    whyChooseUsTitle?: string | null
    whyChooseUsImage?: string | null
    benefits?: any // BenefitItem[] | null
    testimonials?: any // TestimonialItem[] | null
    ctaTitle?: string | null
    ctaDescription?: string | null
  }
}

export default function AboutClient({ content }: AboutClientProps) {
  // Use fallbacks from database content or static values
  const heroTitle = content.title || 'Securing Your Digital Future'
  const heroSubtitle = content.subtitle || 'About Us'
  const heroDescription = content.description || ''
  const bgImage = content.bgImage || '/images/cyber-future.png'

  const whoWeAreTitle = content.whoWeAreTitle || 'Providing Enterprise-Grade Connectivity & Defense'
  const whoWeAreDescription1 = content.whoWeAreDescription1 || ''
  const whoWeAreDescription2 = content.whoWeAreDescription2 || ''
  const whoWeAreDescription3 = content.whoWeAreDescription3 || ''
  const whoWeAreImage = content.whoWeAreImage || '/images/about_who_we_are.png'

  const values: ValueItem[] = Array.isArray(content.values) ? content.values : []
  const whyChooseUsTitle = content.whyChooseUsTitle || 'Your Trusted Partner for Technology-Driven Transformation'
  const whyChooseUsImage = content.whyChooseUsImage || '/images/about_why_choose_us.png'
  const benefits: BenefitItem[] = Array.isArray(content.benefits) ? content.benefits : []
  const testimonials: TestimonialItem[] = Array.isArray(content.testimonials) ? content.testimonials : []

  const ctaTitle = content.ctaTitle || 'Ready to Get Started?'
  const ctaDescription = content.ctaDescription || ''

  // Split title into styled version if it matches the original or format it nicely.
  const titleParts = heroTitle.split(' ')
  const lastWord = titleParts.pop() || ''
  const mainTitle = titleParts.join(' ')

  return (
    <div className="bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      {/* 1. Hero Section */}
      <section className="relative py-16 min-h-[450px] overflow-hidden border-b border-black/5 dark:border-white/[0.03] transition-colors duration-300">
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt="About Background"
            fill
            priority
            className="object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Glowing backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#F05B1B]/10 to-transparent blur-3xl pointer-events-none z-[1]" />

        {/* Micro tech grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            <div className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
              {heroSubtitle}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none mb-6 text-white">
              {mainTitle}{' '}
              <span className="text-[#F05B1B]">{lastWord}</span>
            </h1>

            <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Who We Are Section */}
      <section className="py-24 relative overflow-hidden bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Professional Photo with glow border */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative group"
            >
              <div className="absolute inset-0 bg-[#F05B1B] rounded-[28px] blur-xl opacity-10 group-hover:opacity-15 transition-opacity duration-500" />
              <div className="relative rounded-[5px] overflow-hidden border border-black/5 dark:border-white/5 bg-[#F4F6F8] dark:bg-[#0a1113] aspect-[4/3] sm:aspect-square">
                <img
                  src={whoWeAreImage}
                  alt="Nexa Network Engineers"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F4F6F8]/50 dark:from-[#070f12]/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Right: Text Copy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-3">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-6">
                {whoWeAreTitle}
              </h2>
              {whoWeAreDescription1 && (
                <p className="text-slate-600 dark:text-white/70 text-sm leading-relaxed mb-6">
                  {whoWeAreDescription1}
                </p>
              )}
              {whoWeAreDescription2 && (
                <p className="text-slate-600 dark:text-white/70 text-sm leading-relaxed mb-6">
                  {whoWeAreDescription2}
                </p>
              )}
              {whoWeAreDescription3 && (
                <p className="text-slate-600 dark:text-white/70 text-sm leading-relaxed">
                  {whoWeAreDescription3}
                </p>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values Section */}
      {values.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0d1619]/30 border-y border-black/5 dark:border-white/[0.03] transition-colors duration-300">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 80 L300 80 L350 130 L700 130 L750 80 L900 80" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="1.5" strokeDasharray="6 6" />
              <path d="M50 250 L200 250 L250 200 L600 200 L650 250 L950 250" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="350" cy="130" r="4" fill="currentColor" className="text-slate-200 dark:text-white/10" />
              <circle cx="650" cy="250" r="4" fill="currentColor" className="text-slate-200 dark:text-white/10" />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, idx) => {
                const Icon = getIconComponent(val.icon)
                return (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative bg-[#F4F6F8] dark:bg-[#0a1113]/60 backdrop-blur-md border border-black/5 dark:border-white/[0.04] p-8 rounded-[5px] hover:border-[#F05B1B]/20 hover:bg-white dark:hover:bg-[#0a1113]/90 transition-all duration-400 flex flex-col items-start min-h-[250px] shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none"
                  >
                    <div className="w-12 h-12 rounded-[5px] bg-[#F05B1B]/10 border border-[#F05B1B]/20 flex items-center justify-center text-[#F05B1B] mb-6 group-hover:bg-[#F05B1B] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-[#F05B1B] transition-colors duration-300">
                      {val.title}
                    </h3>
                    <p className="text-slate-500 dark:text-white/60 text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Why Choose Us Section */}
      <section className="py-24 relative overflow-hidden bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Benefits copy list */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1"
            >
              <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-3">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-10 leading-tight">
                {whyChooseUsTitle}
              </h2>

              <div className="space-y-8">
                {benefits.map((benefit) => {
                  const Icon = getIconComponent(benefit.icon)
                  return (
                    <div key={benefit.title} className="flex gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 border border-black/5 dark:bg-white/[0.02] dark:border-white/[0.05] flex items-center justify-center text-[#F05B1B] shadow-inner">
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{benefit.title}</h4>
                        <p className="text-slate-500 dark:text-white/60 text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Right: Tech Photo with glowing border */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative group order-1 lg:order-2"
            >
              <div className="absolute inset-0 bg-[#F05B1B] rounded-[28px] blur-xl opacity-10 group-hover:opacity-15 transition-opacity duration-500" />
              <div className="relative rounded-[5px] overflow-hidden border border-black/5 dark:border-white/5 bg-[#F4F6F8] dark:bg-[#0a1113] aspect-[4/3] sm:aspect-square">
                <img
                  src={whyChooseUsImage}
                  alt="Hands typing on laptop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F4F6F8]/50 dark:from-[#070f12]/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white dark:bg-[#0d1619]/20 border-t border-black/5 dark:border-white/[0.03] relative overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase block mb-3">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white tracking-tight leading-tight">
                What Our Happy Clients Are Saying
              </h2>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((test, index) => (
                <motion.div
                  key={test.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-[#F4F6F8] dark:bg-[#0a1113]/55 backdrop-blur-md rounded-[24px] border border-black/5 dark:border-white/[0.04] p-8 hover:border-[#F05B1B]/20 hover:bg-white dark:hover:bg-[#0a1113]/80 transition-all duration-300 flex flex-col justify-between min-h-[250px] shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none"
                >
                  <div>
                    {/* Five Stars layout */}
                    <div className="flex gap-1 mb-5 text-[#F05B1B]">
                      {Array.from({ length: test.stars || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current stroke-[1.5]" />
                      ))}
                    </div>

                    {/* Client quote */}
                    <p className="text-slate-600 dark:text-white/70 text-sm italic leading-relaxed mb-6">
                      &quot;{test.quote}&quot;
                    </p>
                  </div>

                  {/* Footer details */}
                  <div className="pt-4 border-t border-black/5 dark:border-white/[0.04] flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-[#F05B1B]">{test.name}</h5>
                      <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">{test.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 6. Call to Action (CTA) Section */}
      <section className="py-24 relative overflow-hidden bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F05B1B]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 dark:text-white mb-6 tracking-tight leading-tight">
            {ctaTitle.includes('Ready to') ? (
              <>
                Ready to <span className="text-[#F05B1B]">Get Started?</span>
              </>
            ) : (
              ctaTitle
            )}
          </h2>
          <p className="text-slate-600 dark:text-white/60 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
            {ctaDescription}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F05B1B] to-[#FF6B2B] text-white font-extrabold rounded-2xl shadow-lg shadow-[#F05B1B]/25 hover:shadow-xl hover:shadow-[#F05B1B]/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  )
}
