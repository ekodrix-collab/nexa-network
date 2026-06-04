'use client'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function About() {
  return (
    <section className="py-24 bg-[#070f12] relative overflow-hidden border-b border-white/5">
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
          
          {/* LEFT COLUMN: Section Title and Subtitle */}
          <div>
            <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6 max-w-sm">
              Numbers that reflect our commitment
            </h2>
            <div className="w-12 h-1 bg-[#F05B1B]" />
          </div>

          {/* RIGHT COLUMN: Grid of 4 Stats Counters */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-12">
            {[
              { val: 10, suffix: '+', label: 'Years of Excellence' },
              { val: 150, suffix: '+', label: 'Projects Delivered' },
              { val: 50, suffix: '+', label: 'Business Clients' },
              { val: 25, suffix: '+', label: 'Technology Experts' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl font-black text-white leading-none mb-3">
                  <AnimatedCounter target={stat.val} suffix={stat.suffix} />
                </div>
                <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
