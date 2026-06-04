'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const openings = [
  {
    title: 'Senior Network Infrastructure Engineer',
    department: 'Engineering',
    location: 'Doha, Qatar',
    type: 'Full-time'
  },
  {
    title: 'Cybersecurity Threat Analyst',
    department: 'Security Operations',
    location: 'Doha, Qatar',
    type: 'Full-time'
  },
  {
    title: 'CCTV & Systems Integration Technician',
    department: 'Field Installations',
    location: 'Doha, Qatar',
    type: 'Full-time'
  }
]

export default function CareersPage() {
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
                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Join Our Team</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">
                Build the Future of <span className="text-[#F05B1B]">IT Infrastructure</span>
              </h1>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed">
                Join Qatar's leading systems integrator. Work with state-of-the-art enterprise networks, access controls, and security systems.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-10">Current Openings</h2>
          <div className="space-y-6">
            {openings.map((job, i) => (
              <ScrollReveal key={job.title} delay={i * 0.08}>
                <div className="bg-white dark:bg-[#0d1c22]/60 rounded-3xl p-6 lg:p-8 border border-black/5 dark:border-white/10 hover:border-[#F05B1B]/30 hover:bg-white dark:hover:bg-[#0d1619]/80 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-white/40">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all duration-300"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
