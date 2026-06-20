'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ChevronLeft } from 'lucide-react'

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

export default function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setPost(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.slug])

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-[#F4F6F8] dark:bg-[#070f12] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#F05B1B] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-32 min-h-screen bg-[#F4F6F8] dark:bg-[#070f12] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-white/40 mb-6">The blog post you are looking for does not exist.</p>
        <Link href="/blog" className="px-5 py-2.5 bg-[#F05B1B] text-white rounded-xl text-sm font-bold">
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-24 bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-1 text-[#F05B1B] hover:text-[#FF6B2B] text-xs font-bold uppercase tracking-wider mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Cover Photo */}
        {post.imageUrl && (
          <div className="h-[400px] w-full rounded-3xl overflow-hidden mb-10 border border-black/5 dark:border-white/10">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-800 dark:text-white mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-white/40 border-b border-black/5 dark:border-white/5 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F05B1B]" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F05B1B]" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg font-medium text-slate-600 dark:text-white/60 mb-10 leading-relaxed italic border-l-2 border-[#F05B1B] pl-4">
          {post.description}
        </p>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-white/70 leading-loose text-base whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </div>
  )
}
