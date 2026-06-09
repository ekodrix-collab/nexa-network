'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  Phone, Mail, MapPin, Linkedin, Facebook,
  Instagram, Youtube, Network, ArrowRight,
  FileText, BookOpen, Briefcase, LifeBuoy, BookMarked
} from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
]

const services = [
  { label: 'Network Infrastructure & Passive', href: '/services/network-infrastructure' },
  { label: 'IT Solutions & Integration', href: '/services/cyber-security' },
  { label: 'Cloud Computing & IT Software', href: '/services/cloud-computing' },
  { label: 'Conference Room & Office IT', href: '/services/conference-room' },
  { label: 'Smart Entry Management', href: '/services/smart-entry' },
  { label: 'Website & Digital Solutions', href: '/services/web-development' },
  { label: 'Vehicle Tracking Solutions', href: '/services/vehicle-tracking' },
  { label: 'CCTV & Surveillance Systems', href: '/services/cctv-surveillance' },
]

const resources = [
  { label: 'Blog', href: '/blog', icon: FileText },
  { label: 'Case Studies', href: '/case-studies', icon: BookMarked },
  { label: 'Whitepapers', href: '/resources', icon: BookOpen },
  { label: 'Careers', href: '/careers', icon: Briefcase },
  { label: 'Support', href: '/support', icon: LifeBuoy },
]

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

// Reusable animated underline link — orange line slides in from left on hover
function NavLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#F05B1B] after:transition-[width] after:duration-300 hover:after:w-full ${className}`}
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <footer className="bg-white dark:bg-[#070f12] border-t border-black/5 dark:border-white/5 font-sans transition-colors duration-300 relative overflow-hidden">

      {/* Top accent bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#F05B1B]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y xl:divide-y-0 xl:divide-x divide-black/5 dark:divide-white/5">

          {/* ── Col 1: Brand ── */}
          <div className="py-10 xl:pr-8">

            {/* Logomark */}
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-[10px] bg-[#F05B1B] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Network className="w-[18px] h-[18px] text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[15px] font-medium text-slate-900 dark:text-white leading-none">Nexa</p>
                <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5 leading-none">Network Solutions</p>
              </div>
            </Link>

            <p className="text-[12px] text-slate-500 dark:text-white/40 leading-relaxed mb-5 max-w-[200px]">
              Empowering businesses through smart infrastructure, secure solutions, and innovative technology across Qatar.
            </p>

            {/* Certs */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {['ISO 27001', 'CNIA', 'Microsoft Partner'].map((cert) => (
                <span
                  key={cert}
                  className="text-[10px] font-medium px-2 py-1 rounded border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-white/50 transition-colors"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-1.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/5
                             flex items-center justify-center text-slate-400 dark:text-white/40
                             hover:text-[#F05B1B] hover:border-[#F05B1B]/40 hover:bg-[#F05B1B]/10 dark:hover:bg-[#F05B1B]/10
                             transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Services ── */}
          <div className="py-10 xl:px-8">
            <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-slate-400 dark:text-white/30 mb-4">
              Our services
            </p>
            <ul className="space-y-2.5">
              {services.map(({ label, href }) => (
                <li key={label}>
                  {/* dot + label together as a group, underline only under the text */}
                  <Link
                    href={href}
className="group flex items-center gap-2 text-[13px] text-slate-500 dark:text-white/40 hover:text-[#F05B1B] dark:hover:text-[#F05B1B] transition-colors duration-200"                  >
                    <span className="w-1 h-1 rounded-full bg-[#F05B1B]/40 group-hover:bg-[#F05B1B] shrink-0 transition-colors" />
                    <span className="relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#F05B1B] after:transition-[width] after:duration-300 group-hover:after:w-full">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Quick Links + Resources ── */}
          <div className="py-10 xl:px-8">
            <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-slate-400 dark:text-white/30 mb-4">
              Quick links
            </p>
            <ul className="space-y-2.5 mb-6">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-[13px] text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#F05B1B]/40 group-hover:bg-[#F05B1B] shrink-0 transition-colors" />
                    <span className="relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#F05B1B] after:transition-[width] after:duration-300 group-hover:after:w-full">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-black/5 dark:border-white/5 pt-6">
              <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-slate-400 dark:text-white/30 mb-4">
                Resources
              </p>
              <ul className="space-y-2.5">
                {resources.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 text-[13px] text-slate-500 dark:text-white/40 hover:text-[#F05B1B] transition-colors duration-200"
                    >
                      <Icon className="w-3.5 h-3.5 opacity-60 shrink-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#F05B1B] after:transition-[width] after:duration-300 group-hover:after:w-full">
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Col 4: Contact ── */}
          <div className="py-10 xl:pl-8">
            <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-slate-400 dark:text-white/30 mb-4">
              Contact info
            </p>

            <ul className="space-y-4 mb-6">
              <li>
                <a href="tel:+97441459393" className="group flex items-start gap-2.5">
                  <div className="w-[30px] h-[30px] rounded-lg bg-[#F05B1B]/10 flex items-center justify-center shrink-0 group-hover:bg-[#F05B1B]/20 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#F05B1B]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-slate-400 dark:text-white/25 mb-0.5">Phone</p>
                    <p className="relative inline-block text-[12px] font-medium text-slate-700 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#F05B1B] after:transition-[width] after:duration-300 group-hover:after:w-full">
                      +974 4145 9393
                    </p>
                  </div>
                </a>
              </li>

              <li>
                <a href="mailto:support@nexa.com.qa" className="group flex items-start gap-2.5">
                  <div className="w-[30px] h-[30px] rounded-lg bg-[#F05B1B]/10 flex items-center justify-center shrink-0 group-hover:bg-[#F05B1B]/20 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#F05B1B]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-slate-400 dark:text-white/25 mb-0.5">Email</p>
                    <p className="relative inline-block text-[12px] font-medium text-slate-700 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#F05B1B] after:transition-[width] after:duration-300 group-hover:after:w-full">
                      support@nexa.com.qa
                    </p>
                  </div>
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-[30px] h-[30px] rounded-lg bg-[#F05B1B]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#F05B1B]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-slate-400 dark:text-white/25 mb-0.5">Office</p>
                  <p className="text-[11px] text-slate-500 dark:text-white/50 leading-relaxed">
                    Hilalyton Tower, Floor 7 – Office 33<br />
                    Al Saflya St · Doha, Qatar
                  </p>
                </div>
              </li>
            </ul>

            {/* CTA card */}
            <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] p-4">
              <p className="text-[12px] font-medium text-slate-800 dark:text-white mb-1">Ready to get started?</p>
              <p className="text-[11px] text-slate-400 dark:text-white/30 mb-3">Talk to our team about your next project.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#F05B1B]
                           bg-[#F05B1B]/10 hover:bg-[#F05B1B]/20 border border-[#F05B1B]/25
                           px-3 py-1.5 rounded-lg transition-colors duration-200"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Get in touch
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/5 dark:border-white/5 py-5 flex flex-col-reverse md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400 dark:text-white/20">
            © 2026 Nexa Network Solutions. All rights reserved. ·{' '}
            Crafted by{' '}
            <a
              href="https://ekodrix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F05B1B] font-bold hover:underline"
            >
              Ekodrix
            </a>
          </p>
          <div className="flex items-center gap-5">
            <NavLink
              href="#"
              className="text-[11px] text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/50 transition-colors"
            >
              Privacy policy
            </NavLink>
            <NavLink
              href="#"
              className="text-[11px] text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/50 transition-colors"
            >
              Terms & conditions
            </NavLink>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-slate-400 dark:text-white/20">All systems operational</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}