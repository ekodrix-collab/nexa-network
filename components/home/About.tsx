'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function About() {
  return (
    <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] relative overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      {/* Background Graphic: Futuristic Earth Globe Network connections grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
          <circle cx="200" cy="500" r="180" stroke="rgba(240,91,27,0.15)" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="200" cy="500" r="280" stroke="rgba(59,130,246,0.1)" strokeWidth="1" />
          <circle cx="200" cy="500" r="380" stroke="rgba(240,91,27,0.05)" strokeWidth="1" />
          {/* Animated node connections */}
          <path d="M 200,120 C 350,120 400,500 200,880" stroke="rgba(240,91,27,0.1)" strokeWidth="1.5" />
          <path d="M 200,220 C 310,220 300,500 200,780" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />
          {/* Nodes */}
          <circle cx="280" cy="300" r="3" fill="#F05B1B" />
          <circle cx="340" cy="450" r="4" fill="#3B82F6" />
          <circle cx="330" cy="600" r="3" fill="#F05B1B" />
          <circle cx="240" cy="750" r="3.5" fill="#3B82F6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Section Title and Subtitle (Slides in from Left) */}
          <ScrollReveal direction="right">
            <div>
              <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
                Our Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6 max-w-sm">
                Numbers that reflect our commitment
              </h2>
              <div className="w-12 h-1 bg-[#F05B1B]" />
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: Grid of 4 Stats Counters (Slides in from Right) */}
          <ScrollReveal direction="left" className="grid grid-cols-2 gap-x-12 gap-y-12">
            {[
              { val: 10, suffix: '+', label: 'Years of Excellence' },
              { val: 150, suffix: '+', label: 'Projects Delivered' },
              { val: 50, suffix: '+', label: 'Business Clients' },
              { val: 25, suffix: '+', label: 'Technology Experts' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white leading-none mb-3">
                  <AnimatedCounter target={stat.val} suffix={stat.suffix} />
                </div>
                <div className="text-slate-500 dark:text-white/40 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
