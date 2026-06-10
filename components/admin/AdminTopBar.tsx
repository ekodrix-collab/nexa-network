'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Bell, ChevronRight } from 'lucide-react'

const pageTitles: Record<string, { title: string; desc: string }> = {
  '/admin': { title: 'Dashboard', desc: 'Overview of your website' },
  '/admin/home': { title: 'Home Page', desc: 'Hero, Welcome & CTA sections' },
  '/admin/about': { title: 'About Page', desc: 'Company stats & description' },
  '/admin/services': { title: 'Services', desc: 'Manage service offerings' },
  '/admin/projects': { title: 'Projects', desc: 'Portfolio & case studies' },
  '/admin/contact': { title: 'Contact', desc: 'Contact details & social links' },
}

export default function AdminTopBar() {
  const pathname = usePathname()
  if (pathname === '/admin/login') return null

  const page = pageTitles[pathname] || { title: 'Admin', desc: '' }

  return (
    <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/[0.06] bg-[#080F13]/80 backdrop-blur-md sticky top-0 z-10">
      {/* Left: Breadcrumb + Page title */}
      <div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/25 mb-1">
          <span>Admin</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/50">{page.title}</span>
        </div>
        <h1 className="text-white font-bold text-lg leading-none">{page.title}</h1>
        {page.desc && <p className="text-white/35 text-xs mt-0.5">{page.desc}</p>}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.07] text-white/50 hover:text-white/80 text-xs font-medium transition-all duration-200"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Site
        </Link>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F05B1B] to-[#FF8C42] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-[#F05B1B]/20 cursor-pointer">
          A
        </div>
      </div>
    </header>
  )
}
