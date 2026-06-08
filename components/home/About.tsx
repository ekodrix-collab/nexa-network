'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function About() {
  const stats = [
    { val: 10, suffix: '+', label: 'Years of Excellence', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { val: 150, suffix: '+', label: 'Projects Delivered', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { val: 50, suffix: '+', label: 'Business Clients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { val: 25, suffix: '+', label: 'Technology Experts', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
  ]

  return (
    <section className="py-24 bg-[#F4F6F8] dark:bg-[#070A11] relative overflow-hidden transition-colors duration-300 min-h-[500px] flex items-center border-b border-black/5 dark:border-white/5">
      {/* High-Tech Background Elements */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none transition-opacity duration-300" 
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />

      {/* Decorative Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#F05B1B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
          
          {/* LEFT COLUMN: Section Title */}
          <ScrollReveal direction="right" className="lg:w-1/3">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F05B1B]/60" />
                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.2em] uppercase">
                  Our Impact
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6 tracking-tight transition-colors duration-300">
                Numbers that reflect our <span className="text-[#F05B1B]">commitment</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8 transition-colors duration-300">
                We deliver robust IT infrastructure and cutting-edge digital solutions, backed by years of enterprise experience and a dedicated team of experts.
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-[#F05B1B] to-[#FF6B2B] rounded-full" />
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: Premium Stats Cards */}
          <ScrollReveal direction="left" className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative bg-white dark:bg-[#111824]/60 dark:backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-3xl p-8 hover:border-[#F05B1B]/30 dark:hover:bg-[#111824]/80 transition-all duration-500 shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 overflow-hidden"
                >
                  {/* Subtle hover gradient inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F05B1B]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col">
                    {/* Tech Icon */}
                    <div className="w-10 h-10 rounded-xl bg-[#F4F6F8] dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center mb-6 text-[#F05B1B] group-hover:scale-110 group-hover:bg-[#F05B1B]/10 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                      </svg>
                    </div>

                    {/* Animated Number */}
                    <div className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white leading-none mb-3 tracking-tighter transition-colors duration-300">
                      <AnimatedCounter target={stat.val} suffix={stat.suffix} />
                    </div>
                    
                    {/* Label */}
                    <div className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-[0.15em] group-hover:text-[#F05B1B] dark:group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
