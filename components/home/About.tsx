'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { Clock, BadgeCheck, Users, Code2 } from 'lucide-react'

const stats = [
  { val: 10,  suffix: '+', label: 'Years of excellence',   icon: Clock      },
  { val: 150, suffix: '+', label: 'Projects delivered',    icon: BadgeCheck },
  { val: 50,  suffix: '+', label: 'Business clients',      icon: Users      },
  { val: 25,  suffix: '+', label: 'Technology experts',    icon: Code2      },
]

export default function About() {
  return (
    <section className="md:pt-5 pb-10 bg-[#F4F6F8] dark:bg-[#070A11]  transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Single unified panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2  rounded-2xl overflow-hidden">

          {/* ── Left: Editorial copy ── */}
          <ScrollReveal direction="right">
            <div className="flex flex-col justify-between h-full p-10 bg-white/60 dark:bg-white/[0.02]
                            ">
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="text-[#F05B1B] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
                    Our impact
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight mb-5">
                  Numbers that reflect our{' '}
                  <span className="text-[#F05B1B]">commitment</span>
                </h2>

                {/* Body */}
                <p className="text-[13px] text-slate-500 dark:text-white/40 leading-relaxed max-w-sm">
                  We deliver robust IT infrastructure and cutting-edge digital solutions,
                  backed by years of enterprise experience and a dedicated team of experts.
                </p>
              </div>

              {/* Accent bar */}
              <div className="mt-10 w-9 h-[3px] bg-[#F05B1B] rounded-full" />
            </div>
          </ScrollReveal>

          {/* ── Right: 2×2 stat grid ── */}
          <ScrollReveal direction="left">
            <div className="grid grid-cols-2 h-full">
              {stats.map(({ val, suffix, label, icon: Icon }, i) => (
                <div
                  key={label}
                  className={`
                    group flex flex-col justify-center items-center gap-3 p-8 cursor-default
                    hover:bg-white dark:hover:bg-white/[0.04] border border-black/8 dark:border-black transition-colors duration-200
                  `}
                >
                  {/* Icon */}
                  <div className="w-[34px] h-[34px] rounded-[10px] border border-black/8 dark:border-white/8
                                  bg-white dark:bg-white/5 flex items-center justify-center text-[#F05B1B]
                                  group-hover:bg-[#F05B1B]/10  transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Number */}
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[42px] font-black font-bold  dark:text-white">
                      <AnimatedCounter target={val} suffix="" />
                    </span>
                    <span className="text-[26px] font-black leading-none text-[#F05B1B]">{suffix}</span>
                  </div>

                  {/* Label */}
                  <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-slate-400 dark:text-white/30
                                group-hover:text-[#F05B1B] transition-colors duration-200">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}