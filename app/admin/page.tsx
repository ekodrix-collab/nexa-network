import Link from 'next/link'
import { LayoutDashboard, Home, Info, Briefcase, FolderKanban, Phone, ArrowRight, Globe } from 'lucide-react'

const modules = [
  {
    title: 'Home Page',
    desc: 'Hero headline, subtitle, background video and CTA section',
    href: '/admin/home',
    icon: Home,
    color: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/10 hover:border-blue-400/30',
    iconColor: 'text-blue-400',
  },
  {
    title: 'About Page',
    desc: 'Company stats, experience count, and about description',
    href: '/admin/about',
    icon: Info,
    color: 'from-violet-500/10 to-violet-600/5',
    border: 'border-violet-500/10 hover:border-violet-400/30',
    iconColor: 'text-violet-400',
  },
  {
    title: 'Services',
    desc: 'Manage service cards, descriptions, icons, and features',
    href: '/admin/services',
    icon: Briefcase,
    color: 'from-amber-500/10 to-amber-600/5',
    border: 'border-amber-500/10 hover:border-amber-400/30',
    iconColor: 'text-amber-400',
  },
  {
    title: 'Projects',
    desc: 'Portfolio projects, client names, categories, and images',
    href: '/admin/projects',
    icon: FolderKanban,
    color: 'from-emerald-500/10 to-emerald-600/5',
    border: 'border-emerald-500/10 hover:border-emerald-400/30',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Contact',
    desc: 'Contact details, phone, email, address, and social links',
    href: '/admin/contact',
    icon: Phone,
    color: 'from-rose-500/10 to-rose-600/5',
    border: 'border-rose-500/10 hover:border-rose-400/30',
    iconColor: 'text-rose-400',
  },
]

export default function AdminDashboard() {
  return (
    <div>
      {/* Welcome Banner */}
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[#F05B1B]/10 via-[#F05B1B]/5 to-transparent border border-[#F05B1B]/10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#F05B1B] text-xs font-bold tracking-widest uppercase mb-1">Welcome back</p>
            <h2 className="text-white text-2xl font-bold">Nexa Admin Dashboard</h2>
            <p className="text-white/40 text-sm mt-1">
              Manage all website content from one place. Changes are saved directly to your database.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.07] text-white/60 hover:text-white text-xs font-medium transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5" />
            View Live Site
          </Link>
        </div>
      </div>

      {/* Section Label */}
      <div className="mb-4">
        <p className="text-white/25 text-[10px] font-bold tracking-[0.2em] uppercase">Content Modules</p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map(({ title, desc, href, icon: Icon, color, border, iconColor }) => (
          <Link
            key={href}
            href={href}
            className={`group relative p-5 rounded-xl bg-gradient-to-br ${color} border ${border} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 block`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg bg-white/[0.05] border border-white/[0.07] ${iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors duration-200 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
            <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
