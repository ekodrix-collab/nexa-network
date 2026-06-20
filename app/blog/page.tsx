'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

type BlogPost = {
  id: string
  slug: string
  title: string
  description: string
  content: string
  readTime: string
  imageUrl: string | null
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-72 rounded-3xl bg-white dark:bg-[#0d1c22]/40 border border-black/5 dark:border-white/10 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <BookOpen className="w-12 h-12 text-[#F05B1B] mb-4 opacity-55" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Posts Available</h3>
              <p className="text-slate-500 dark:text-white/40 text-sm">We haven't published any blog posts yet. Please check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08}>
                  <div className="bg-white dark:bg-[#0d1c22]/60 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-[#F05B1B]/30 hover:bg-white dark:hover:bg-[#0d1619]/80 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300 flex flex-col h-full group">
                    {/* Cover Image */}
                    {post.imageUrl && (
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 hover:text-[#F05B1B] dark:hover:text-[#F05B1B] transition-colors cursor-pointer line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed mb-6 line-clamp-3">
                          {post.description}
                        </p>
                      </div>
                      <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-white/30">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#F05B1B]" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#F05B1B]" />
                            {post.readTime}
                          </span>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="text-[#F05B1B] hover:text-[#FF6B2B] flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
