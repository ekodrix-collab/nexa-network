'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  Phone, Mail, MapPin, Linkedin, Facebook,
  Instagram, Youtube
} from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
]

const services = [
  { label: 'Network Infrastructure & Passive Infrastructure', href: '/services/network-infrastructure' },
  { label: 'IT Solutions & Integration Services', href: '/services/cyber-security' },
  { label: 'Cloud Computing & IT Software Services', href: '/services/cloud-computing' },
  { label: 'Conference Room & Office IT Services', href: '/services/conference-room' },
  { label: 'Smart Entry Management', href: '/services/smart-entry' },
  { label: 'Website Development & Digital Solutions', href: '/services/web-development' },
  { label: 'Vehicle Tracking Solutions', href: '/services/vehicle-tracking' },
  { label: 'CCTV & Surveillance Systems', href: '/services/cctv-surveillance' },
]

const resources = [
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Whitepapers', href: '/resources' },
  { label: 'Careers', href: '/careers' },
  { label: 'Support', href: '/support' },
]

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export default function Footer() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? theme : 'dark'
  const logoSrc = currentTheme === 'light' ? '/images/logo-light.png' : '/images/logo.png'

  return (
    <footer className="bg-white dark:bg-[#070f12] relative overflow-hidden border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px
                     bg-gradient-to-r from-transparent via-[#F05B1B]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                     w-[600px] h-[200px] bg-[#F05B1B]/[0.02] blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Footer */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10">

          {/* Brand col — 2 units */}
          <div className="xl:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <img
                src={logoSrc}
                alt="Nexa Network Solutions Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>

            <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed mb-6 max-w-xs transition-colors duration-300">
              Empowering businesses through smart infrastructure, secure solutions,
              and innovative technology across Qatar.
            </p>

            {/* Certifications */}
            <div className="flex gap-2 mb-6">
              {['ISO 27001', 'CNIA', 'Microsoft Partner'].map((cert) => (
                <div
                  key={cert}
                  className="px-2.5 py-1 rounded-lg border border-black/10 bg-slate-50 dark:border-white/10 dark:bg-white/5
                             text-[10px] text-slate-500 dark:text-white/60 font-semibold transition-colors duration-300"
                >
                  {cert}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-slate-50 border border-black/10 dark:bg-white/5 dark:border-white/10
                             flex items-center justify-center text-slate-500 dark:text-white/60
                             hover:text-[#F05B1B] dark:hover:text-[#F05B1B] hover:bg-[#F05B1B]/10 dark:hover:bg-[#F05B1B]/15 hover:border-[#F05B1B]/30
                             transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-bold text-xs tracking-[0.2em] uppercase mb-5 transition-colors duration-300">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-white/40 dark:hover:text-white
                               text-sm transition-colors duration-200 group animated-underline"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#F05B1B]/40
                                   group-hover:bg-[#F05B1B] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-bold text-xs tracking-[0.2em] uppercase mb-5 transition-colors duration-300">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-white/40 dark:hover:text-white
                               text-sm transition-colors duration-200 group"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#F05B1B]/40
                                   group-hover:bg-[#F05B1B] transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-bold text-xs tracking-[0.2em] uppercase mb-5 transition-colors duration-300">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+97441459393"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 bg-[#F05B1B]/10 rounded-lg flex items-center
                                 justify-center flex-shrink-0 group-hover:bg-[#F05B1B]/20
                                 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#F05B1B]" />
                  </div>
                  <div>
                    <div className="text-slate-400 dark:text-white/25 text-[10px] uppercase tracking-widest mb-0.5 transition-colors duration-300">
                      Phone
                    </div>
                    <div className="text-slate-700 dark:text-white/70 text-sm font-medium
                                   group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                      +974 4145 9393
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@nexa.com.qa"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 bg-[#F05B1B]/10 rounded-lg flex items-center
                                 justify-center flex-shrink-0 group-hover:bg-[#F05B1B]/20
                                 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#F05B1B]" />
                  </div>
                  <div>
                    <div className="text-slate-400 dark:text-white/25 text-[10px] uppercase tracking-widest mb-0.5 transition-colors duration-300">
                      Email
                    </div>
                    <div className="text-slate-700 dark:text-white/70 text-sm font-medium
                                   group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                      support@nexa.com.qa
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#F05B1B]/10 rounded-lg flex items-center
                                 justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#F05B1B]" />
                  </div>
                  <div>
                    <div className="text-slate-400 dark:text-white/25 text-[10px] uppercase tracking-widest mb-0.5 transition-colors duration-300">
                      Office
                    </div>
                    <div className="text-slate-600 dark:text-white/60 text-xs leading-relaxed transition-colors duration-300">
                      Hilalyton Tower, Floor 7 – Office 33<br />
                      Al Saflya St · Doha – Qatar
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Resources */}
            <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
              <h4 className="text-slate-800 dark:text-white font-bold text-xs tracking-[0.2em] uppercase mb-4 transition-colors duration-300">
                Resources
              </h4>
              <div className="flex flex-wrap gap-2">
                {resources.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-slate-400 hover:text-slate-800 dark:text-white/35 dark:hover:text-white text-xs transition-colors duration-300"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/5 dark:border-white/5 py-6 flex flex-col-reverse md:flex-row
                       items-center justify-between gap-4 transition-colors duration-300">
          <p className="text-slate-400 dark:text-white/20 text-xs transition-colors duration-300">
            © 2026 Nexa Network Solutions. All Rights Reserved. • Crafted by <a href="https://ekodrix.com" target="_blank" rel="noopener noreferrer" className="text-[#F05B1B] font-bold hover:underline">Ekodrix</a>
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-slate-400 hover:text-slate-600 dark:text-white/20 dark:hover:text-white/60
                                            text-xs transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-400 hover:text-slate-600 dark:text-white/20 dark:hover:text-white/60
                                          text-xs transition-colors duration-300">
              Terms & Conditions
            </Link>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-slate-400 dark:text-white/20 text-xs transition-colors duration-300">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
