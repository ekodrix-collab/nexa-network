'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import {
  Menu, X, ChevronDown, Phone, ArrowRight, Sun, Moon,
  Network, Shield, Cloud, DoorOpen, Camera, Truck, Monitor, Globe,
  Building2, Factory, Heart, GraduationCap
} from 'lucide-react'

const serviceItems = [
  { icon: Network, label: 'Network Infrastructure & Passive Infrastructure', desc: 'Active & passive enterprise backbones', href: '/services/network-infrastructure', color: '#3B82F6' },
  { icon: Shield, label: 'IT Solutions & Integration Services', desc: 'Zero-trust threat protection & compliance', href: '/services/cyber-security', color: '#EF4444' },
  { icon: Cloud, label: 'Cloud Computing & IT Software Services', desc: 'SaaS setup, Azure, AWS & migrations', href: '/services/cloud-computing', color: '#A855F7' },
  { icon: Monitor, label: 'Conference Room & Office IT Services', desc: 'Office AV systems & hardware procurement', href: '/services/conference-room', color: '#D946EF' },
  { icon: DoorOpen, label: 'Smart Entry Management', desc: 'RFID cards, biometrics & barrier gates', href: '/services/smart-entry', color: '#22C55E' },
  { icon: Globe, label: 'Website Development & Digital Solutions', desc: 'Custom web platforms, apps & SEO tools', href: '/services/web-development', color: '#06B6D4' },
  { icon: Truck, label: 'Vehicle Tracking Solutions', desc: 'GPS fleet telemetry & route optimization', href: '/services/vehicle-tracking', color: '#F97316' },
  { icon: Camera, label: 'CCTV & Surveillance Systems', desc: 'SSD-compliant HD video feeds', href: '/services/cctv-surveillance', color: '#EAB308' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services', hasDropdown: true, items: serviceItems },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownTimer, setDropdownTimer] = useState<NodeJS.Timeout | null>(null)
  const [hidden, setHidden] = useState(false)

  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1])

  const lastScrollYRef = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Update scrolled state for background opacity
      setScrolled(currentScrollY > 30)

      // Calculate how much was scrolled since last check
      const scrollDifference = Math.abs(currentScrollY - lastScrollYRef.current)

      // Only toggle hidden state if we scrolled more than 10px (prevents flickering)
      if (scrollDifference > 10) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
          // Scrolling down past 100px: hide navbar
          setHidden(true)
        } else {
          // Scrolling up: show navbar
          setHidden(false)
        }
        lastScrollYRef.current = currentScrollY
      }

      // Safety check: always show navbar when at the very top of the page
      if (currentScrollY < 50) {
        setHidden(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    // Automatically close mobile menu when route changes
    setMobileOpen(false)
  }, [pathname])

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimer) clearTimeout(dropdownTimer)
    setActiveDropdown(label)
  }, [dropdownTimer])

  const handleDropdownLeave = useCallback(() => {
    const timer = setTimeout(() => setActiveDropdown(null), 150)
    setDropdownTimer(timer)
  }, [])

  const currentTheme = mounted ? theme : 'dark'
  const isHome = pathname === '/'
  const isTransparentPage = pathname === '/' || pathname === '/about' || pathname === '/services' || pathname === '/contact'
  const useDarkStyle = isTransparentPage && !scrolled
  const logoSrc = (currentTheme === 'light' && !useDarkStyle) ? '/images/logo-light.png' : '/images/logo.png'
  const themeLogoSrc = currentTheme === 'light' ? '/images/logo-light.png' : '/images/logo.png'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'py-0' : 'py-2'
          }`}
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0 bg-white dark:bg-[#0D1C22]/95 backdrop-blur-2xl
                     border-b border-black/5 dark:border-white/5 transition-colors duration-300"
          style={{ opacity: navOpacity }}
        />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <img
                src={logoSrc}
                alt="Nexa Network Solutions Logo"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.hasDropdown && handleDropdownEnter(link.label)}
                    onMouseLeave={() => link.hasDropdown && handleDropdownLeave()}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px]
                               font-medium transition-all duration-200 group
                               ${activeDropdown === link.label
                          ? 'text-[#F05B1B] dark:text-white '
                          : isActive
                            ? (useDarkStyle ? 'text-[#F05B1B]' : 'text-[#F05B1B]  dark:text-[#F05B1B]')
                            : (useDarkStyle
                              ? 'text-white/70 hover:text-white '
                              : 'text-slate-700 hover:text-[#F05B1B] dark:text-white/65 dark:hover:text-white')
                        }`}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180 text-[#F05B1B]' : (useDarkStyle ? 'text-white/40' : 'text-slate-400 dark:text-white/45')
                            }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {link.hasDropdown && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full left-[-250%] mt-3
                                   backdrop-blur-2xl overflow-hidden
                                   rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                                   z-50 flex transition-colors duration-300 ${link.label === 'Our Services' ? 'w-[780px]' : 'w-[680px]'}
                                   ${useDarkStyle
                              ? 'bg-[#070e10]/95 border border-white/10'
                              : 'bg-white/95 dark:bg-[#070e10]/95 border border-black/10 dark:border-white/10'
                            }`}
                          onMouseEnter={() => handleDropdownEnter(link.label)}
                          onMouseLeave={handleDropdownLeave}
                        >
                          {/* Main Grid Area */}
                          <div className="flex-1 p-6">
                            <div className="grid grid-cols-2 gap-2">
                              {link.items?.map((itemAny) => {
                                const IconComponent = (itemAny as any).icon
                                const isDropdownItemActive = pathname === itemAny.href;
                                return (
                                  <Link
                                    key={itemAny.label}
                                    href={itemAny.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className={`flex gap-4 p-4 rounded-2xl transition-all duration-300 group/item text-left ${isDropdownItemActive
                                      ? (useDarkStyle ? 'bg-white/10' : 'bg-black/5 dark:bg-white/10')
                                      : (useDarkStyle ? 'hover:bg-white/5' : 'hover:bg-black/5 dark:hover:bg-white/5')
                                      }`}
                                  >
                                    {/* Icon container */}
                                    <div
                                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                                      style={{
                                        backgroundColor: `${(itemAny as any).color || '#F05B1B'}12`,
                                      }}
                                    >
                                      <IconComponent
                                        className="w-5 h-5"
                                        style={{ color: (itemAny as any).color || '#F05B1B' }}
                                      />
                                    </div>

                                    <div className="flex flex-col">
                                      <span className={`text-xs font-bold group-hover/item:text-[#F05B1B] transition-colors flex items-center gap-1.5 ${useDarkStyle ? 'text-white' : 'text-slate-800 dark:text-white'
                                        }`}>
                                        {itemAny.label}
                                        <ArrowRight className="w-3.5 h-3.5 text-[#F05B1B] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                                      </span>
                                      <span className={`text-[10px] mt-1 leading-relaxed ${useDarkStyle ? 'text-white/45' : 'text-slate-500 dark:text-white/45'
                                        }`}>
                                        {itemAny.desc}
                                      </span>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>

                          {/* Side Feature Panel (Premium Callout) */}
                          <div className={`w-[240px] p-6 flex flex-col justify-between text-left transition-colors duration-300 border-l ${useDarkStyle
                            ? 'bg-white/[0.01] border-white/5'
                            : 'bg-slate-50/50 dark:bg-white/[0.01] border-slate-200 dark:border-white/5'
                            }`}>
                            <div>
                              <div className="text-[10px] font-bold text-[#F05B1B] uppercase tracking-[0.25em] mb-3">
                                {link.label === 'Our Services' ? 'Featured Tech' : 'Qatar Compliance'}
                              </div>

                              <h4 className={`text-sm font-bold mb-2 leading-snug ${useDarkStyle ? 'text-white' : 'text-slate-800 dark:text-white'
                                }`}>
                                {link.label === 'Our Services'
                                  ? 'State-Of-The-Art Systems Integration'
                                  : 'SSD & QCDD Certified Standards'}
                              </h4>

                              <p className={`text-[10px] leading-relaxed mb-4 ${useDarkStyle ? 'text-white/45' : 'text-slate-500 dark:text-white/45'
                                }`}>
                                {link.label === 'Our Services'
                                  ? 'End-to-end active networks, cybersecurity audits, and storage setup for Qatar enterprises.'
                                  : 'Tailored designs that satisfy Civil Defense regulations for immediate operational approval.'}
                              </p>
                            </div>

                            <Link
                              href={link.label === 'Our Services' ? '/contact' : '/case-studies'}
                              onClick={() => setActiveDropdown(null)}
                              className="group inline-flex items-center gap-1.5 py-2.5 px-4 bg-[#F05B1B]/10 hover:bg-[#F05B1B] text-[#F05B1B] hover:text-white border border-[#F05B1B]/20 hover:border-transparent rounded-xl text-[10px] font-black tracking-wider uppercase transition-all duration-300 mt-4 text-center justify-center shadow-lg hover:shadow-[#F05B1B]/20"
                            >
                              {link.label === 'Our Services' ? 'Consult An Expert' : 'View Success Stories'}
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* ── RIGHT CTA (Desktop) ── */}
            <div className="hidden xl:flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${useDarkStyle
                  ? 'border border-white/10 hover:bg-white/5 text-white'
                  : 'border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-white'
                  }`}
                aria-label="Toggle theme"
              >
                {currentTheme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
              </button>

              <Link
                href="/contact"
                className={`px-6 py-2.5 border border-[#F05B1B] text-xs font-bold rounded-full transition-all duration-300 hover:bg-[#F05B1B] hover:text-white hover:shadow-orange ${useDarkStyle ? 'text-white' : 'text-slate-800 dark:text-white'
                  }`}
              >
                Schedule a Meeting
              </Link>
            </div>

            {/* ── MOBILE TOGGLE & THEME ── */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${useDarkStyle
                  ? 'border border-white/10 hover:bg-white/5 text-white'
                  : 'border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-white'
                  }`}
                aria-label="Toggle theme"
              >
                {currentTheme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full transition-all duration-300 ${useDarkStyle
                  ? 'border border-white/10 hover:border-white/20'
                  : 'border border-black/10 dark:border-white/10 hover:border-black/15 dark:hover:border-white/20'
                  }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className={`w-4 h-4 ${useDarkStyle ? 'text-white' : 'text-slate-700 dark:text-white'}`} />
                ) : (
                  <Menu className={`w-4 h-4 ${useDarkStyle ? 'text-white' : 'text-slate-700 dark:text-white'}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[110] bg-white dark:bg-[#0a1518] flex flex-col xl:hidden transition-colors duration-300"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-5
                           border-b border-black/5 dark:border-white/5">
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3">
                <img
                  src={themeLogoSrc}
                  alt="Nexa Network Solutions Logo"
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg
                           border border-black/10 dark:border-white/10 text-slate-700 dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
              {navLinks.map((link, index) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-black/5 dark:border-white/5"
                  >
                    <div className="flex items-center justify-between">
                      {link.hasDropdown ? (
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                          className={`flex-1 flex items-center justify-between py-4 text-left w-full text-lg font-medium transition-colors ${activeDropdown === link.label || isActive
                            ? 'text-[#F05B1B] dark:text-[#F05B1B]'
                            : 'text-slate-700 dark:text-white/70 hover:text-[#F05B1B] dark:hover:text-white'
                            }`}
                        >
                          {link.label}
                          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180 text-[#F05B1B]' : ''}`} />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex-1 flex items-center justify-between py-4 w-full text-lg font-medium transition-colors ${isActive
                            ? 'text-[#F05B1B] dark:text-[#F05B1B]'
                            : 'text-slate-700 dark:text-white/70 hover:text-[#F05B1B] dark:hover:text-white'
                            }`}
                        >
                          {link.label}
                          <ArrowRight className="w-4 h-4 text-[#F05B1B]" />
                        </Link>
                      )}
                    </div>

                    {/* Mobile Sub-menu items */}
                    <AnimatePresence>
                      {link.hasDropdown && activeDropdown === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 pl-4 space-y-4 border-l border-black/5 dark:border-white/10 ml-2">
                            {link.items?.map((sub) => {
                              const SubIcon = sub.icon as any
                              return (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-3 py-2 text-sm text-slate-600 dark:text-white/60 hover:text-[#F05B1B] dark:hover:text-[#F05B1B] transition-colors w-full"
                                >
                                  <SubIcon className="w-4 h-4 text-[#F05B1B]" />
                                  <span className="leading-tight">{sub.label}</span>
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile Footer */}
            <div className="px-6 py-6 border-t border-black/5 dark:border-white/5 space-y-3">
              <a
                href="tel:+97441459393"
                className="flex items-center gap-3 text-slate-500 dark:text-white/60 text-sm"
              >
                <Phone className="w-4 h-4 text-[#F05B1B]" />
                +974 4145 9393
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4
                           bg-[#F05B1B] text-white font-bold rounded-2xl text-sm"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
