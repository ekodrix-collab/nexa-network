'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/admin/LogoutButton'
import {
  LayoutDashboard,
  Home,
  Info,
  Briefcase,
  FolderKanban,
  Phone,
  ChevronRight,
  BookOpen,
  UserPlus,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/home', label: 'Home Page', icon: Home },
  { href: '/admin/about', label: 'About Page', icon: Info },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/careers', label: 'Careers', icon: UserPlus },
  { href: '/admin/contact', label: 'Contact', icon: Phone },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return null
  }

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#060D10] border-r border-white/[0.06] flex flex-col hidden md:flex flex-shrink-0">
      {/* Logo / Branding */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src="/icon.png" alt="Nexa" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Nexa Admin</p>
            <p className="text-white/30 text-[10px] mt-0.5">Content Management</p>
          </div>
        </div>
      </div>

      {/* Nav Label */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-white/25 text-[9px] font-bold tracking-[0.2em] uppercase">Navigation</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(href + '/')

          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'bg-[#F05B1B]/10 text-[#F05B1B]'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F05B1B] rounded-r-full" />
              )}
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#F05B1B]' : 'text-white/30 group-hover:text-white/60'}`} />
              <span className="text-sm font-medium flex-1">{label}</span>
              {isActive && <ChevronRight className="w-3 h-3 text-[#F05B1B]/60" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 pt-3 border-t border-white/[0.06] mt-auto">
        <div className="mb-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <p className="text-white/50 text-[10px] font-medium">Logged in as</p>
          <p className="text-white/80 text-xs font-bold mt-0.5">Administrator</p>
        </div>
        <LogoutButton />
      </div>
    </aside>
  )
}
