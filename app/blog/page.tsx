'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const blogPosts = [
  {
    title: 'Future-proofing Qatar Enterprise Networks for 2026 and Beyond',
    excerpt: 'As business bandwidth demands surge, high-density structured cabling and active switches deployment are paramount. Discover how to plan your network backbone.',
    date: 'June 02, 2026',
    author: 'Nexa Engineering',
    category: 'Network Infrastructure',
    readTime: '6 min read'
  },
  {
    title: 'Zero-Trust Frameworks: Combating Modern Threats in the GCC Area',
    excerpt: 'Implementing next-generation firewalls and Endpoint Detection Response (EDR) is no longer optional. Discover modern enterprise cyber security approaches.',
    date: 'May 28, 2026',
    author: 'Nexa Security Team',
    category: 'Cyber Security',
    readTime: '8 min read'
  },
  {
    title: 'The SSD Compliance Checklist: Passing CCTV Audits Easily',
    excerpt: 'A comprehensive roadmap to designing CCTV storage, frame rates, and camera layouts that meet Qatar SSD and Civil Defense directives perfectly.',
    date: 'May 14, 2026',
    author: 'Nexa Compliance Dept',
    category: 'Surveillance',
    readTime: '5 min read'
  }
]

export default function BlogPage() {
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
                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Nexa Blog</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">
                Insights & Tech <span className="text-[#F05B1B]">Trends</span>
              </h1>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed">
                Stay updated with the latest in enterprise networks, compliance, and cybersecurity trends in Qatar.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.title} delay={i * 0.08}>
                <div className="bg-white dark:bg-[#0d1c22]/60 rounded-3xl p-6 border border-black/5 dark:border-white/10 hover:border-[#F05B1B]/30 hover:bg-white dark:hover:bg-[#0d1619]/80 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#F05B1B]/10 text-[#F05B1B] text-[10px] font-bold tracking-wider uppercase mb-4">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 hover:text-[#F05B1B] dark:hover:text-[#F05B1B] transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-white/30">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
