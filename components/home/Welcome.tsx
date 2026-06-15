'use client'
import { motion } from 'framer-motion'
import { Network, Shield, Cloud, Check } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const cards = [
  {
    icon: Network,
    title: 'Network Infrastructure',
    description: 'Secure and scalable network infrastructure solutions that enable seamless connectivity, efficient operations, and reliable business communication.'
  },
  {
    icon: Shield,
    title: 'Cyber Security Solutions',
    description: 'Advanced cybersecurity solutions designed to protect your systems, data, and digital assets from evolving cyber threats.'
  },
  {
    icon: Cloud,
    title: 'Cloud & IT Services',
    description: 'Flexible and secure cloud services that help businesses store, manage, and access data efficiently while improving productivity.'
  }
]

const checklist = [
  'Network Infrastructure & Passive Infrastructure',
  'Cyber Security & IT Integration Services',
  'Cloud Computing & IT Software Services',
  'Smart Entry & Access Control Systems',
  'CCTV & Surveillance Solutions'
]

export default function Welcome({ settings }: { settings?: any }) {
  const s = settings || {}
  const welcomeTitle = s.welcomeTitle || s.welcome_title || "Welcome to Nexa Network Solutions"
  const welcomeDescription = s.welcomeDescription || s.welcome_description || "Nexa Network Solutions provides end-to-end IT services and technology solutions that help businesses leverage advanced technologies for efficiency, security, and growth. With strong industry expertise, we deliver reliable and scalable solutions tailored to modern business needs."
  const welcomeImage = s.welcomeImage || s.welcome_image || "/images/service_security.jpg"

  return (
    <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] relative overflow-hidden transition-colors duration-300">
      {/* Background ambient glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#F05B1B]/[0.02] rounded-[5px] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#F05B1B]/[0.02] rounded-[5px] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* 1. TOP CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <ScrollReveal
                key={card.title}
                direction="up"
                delay={idx * 0.08}
                className="group relative bg-white dark:bg-[#0d1619]/40 backdrop-blur-md rounded-[5px] border border-black/5 dark:border-white/[0.04] p-8 hover:-translate-y-1.5 hover:border-[#F05B1B]/20 dark:hover:bg-[#0d1619]/60 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-[#F05B1B]/8 transition-all duration-300 flex flex-col items-start"
              >
                {/* Glowing bottom border effect */}
                <div className="absolute bottom-0 left-0 h-[2.5px] bg-[#F05B1B] w-0 group-hover:w-full transition-all duration-500 rounded-b-[24px]" />

                {/* Framed Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#F05B1B]/10 border border-[#F05B1B]/20 flex items-center justify-center text-[#F05B1B] mb-6 group-hover:bg-[#F05B1B] group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 group-hover:text-[#F05B1B] transition-colors duration-300">
                  {card.title}
                </h3>

                <p className="text-slate-500 dark:text-white/60 text-sm leading-relaxed">
                  {card.description}
                </p>
              </ScrollReveal>
            )
          })}
        </div>

        {/* 2. BOTTOM DETAILS ROW (2 columns with smooth split left/right reveals) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Premium visual frame (Slides in from Left) */}
          <ScrollReveal
            direction="right"
            className="lg:col-span-5 relative group"
          >
            <div className="absolute inset-0 bg-[#F05B1B] rounded-[28px] blur-xl opacity-[0.08] group-hover:opacity-12 transition-opacity duration-500" />
            <div className="relative rounded-[5px] overflow-hidden border border-black/5 dark:border-white/5 bg-[#F4F6F8] dark:bg-[#0a1113] aspect-[4/3] sm:aspect-square">
              <img
                src={welcomeImage}
                alt="Security Operation Command Center"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070f12]/60 via-[#070f12]/20 to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>

          {/* Right Column: Title, Copy, Checklist (Slides in from Right) */}
          <ScrollReveal
            direction="left"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
              Pioneering IT Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-6 leading-tight">
              {welcomeTitle}
            </h2>
            <p className="text-slate-600 dark:text-white/70 text-base leading-relaxed mb-8">
              {welcomeDescription}
            </p>

            {/* Glowing outlined checklist container */}
            <div className="bg-[#F05B1B]/[0.02] border border-[#F05B1B]/15 rounded-[5px] p-6 sm:p-8 shadow-inner shadow-black/5 dark:shadow-black/20">
              <ul className="space-y-4">
                {checklist.map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-center gap-4 text-slate-700 dark:text-white/80 group/item"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-[5px] bg-[#F05B1B]/10 border border-[#F05B1B]/30 flex items-center justify-center text-[#F05B1B] group-hover/item:bg-[#F05B1B] group-hover/item:text-white transition-all duration-300">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  )
}
