'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Menu, X, ChevronDown, Phone, ArrowRight,
  Network, Shield, Cloud, DoorOpen, Camera, Truck,
  Building2, Factory, Heart, GraduationCap
} from 'lucide-react'

const serviceItems = [
  { icon: Network, label: 'Network Infrastructure', desc: 'Active & passive enterprise backbones', href: '/services#network', color: '#3B82F6' },
  { icon: Shield, label: 'Cyber Security Solutions', desc: 'Zero-trust threat protection & compliance', href: '/services#security', color: '#EF4444' },
  { icon: Cloud, label: 'Cloud Computing Services', desc: 'SaaS setup, Azure, AWS & migrations', href: '/services#cloud', color: '#A855F7' },
  { icon: DoorOpen, label: 'Smart Entry Management', desc: 'RFID cards, biometrics & barrier gates', href: '/services#access', color: '#22C55E' },
  { icon: Camera, label: 'CCTV & Surveillance Systems', desc: 'SSD-compliant HD video feeds', href: '/services#cctv', color: '#EAB308' },
  { icon: Truck, label: 'Vehicle Tracking Solutions', desc: 'GPS fleet telemetry & route optimization', href: '/services#tracking', color: '#F97316' },
]

const industryItems = [
  { icon: Building2, label: 'Government & Public Sector', desc: 'Compliant municipal infrastructures', href: '/industries#government' },
  { icon: Factory, label: 'Corporate Enterprise', desc: 'Secure environments for smart offices', href: '/industries#corporate' },
  { icon: Heart, label: 'Healthcare', desc: 'Patient telemetry & secure clinical networks', href: '/industries#healthcare' },
  { icon: GraduationCap, label: 'Education', desc: 'High-density school campus WiFi networks', href: '/industries#education' },
]

const navLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Solutions', href: '/services', hasDropdown: true, items: serviceItems },
  { label: 'Industries', href: '/industries', hasDropdown: true, items: industryItems },
  { label: 'Projects', href: '/projects' },
  { label: 'Resources', href: '/resources', hasDropdown: false },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownTimer, setDropdownTimer] = useState<NodeJS.Timeout | null>(null)

  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
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

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimer) clearTimeout(dropdownTimer)
    setActiveDropdown(label)
  }, [dropdownTimer])

  const handleDropdownLeave = useCallback(() => {
    const timer = setTimeout(() => setActiveDropdown(null), 150)
    setDropdownTimer(timer)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-[padding] duration-300 ${
          scrolled ? 'py-0' : 'py-2'
        }`}
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0 bg-[#0D1C22]/95 backdrop-blur-2xl
                     border-b border-white/5"
          style={{ opacity: navOpacity }}
        />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <img 
                src="/images/logo.png" 
                alt="Nexa Network Solutions Logo" 
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
            {/* Old logo elements removed below */}
            <div className="hidden">
              <div className="relative">
                <div className="w-10 h-10 bg-[#F05B1B] rounded-xl flex items-center
                               justify-center shadow-orange transition-all duration-300
                               group-hover:scale-110 group-hover:rotate-6">
                  {/* Distinct White Icon on Orange */}
                  <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
                    <path d="M12 12 C12 12, 16 8, 20 12 C24 16, 28 20, 28 28 C28 28, 24 32, 20 28 C16 24, 12 20, 12 12 Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 24 C20 20, 24 16, 24 16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-[#F05B1B]/20 rounded-xl blur-sm
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-lg leading-none tracking-tight">
                  nexa
                </span>
                <span className="text-[#F05B1B] text-[9px] font-bold tracking-[0.25em] uppercase">
                  Network Solutions
                </span>
              </div>
            </div>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && handleDropdownEnter(link.label)}
                  onMouseLeave={() => link.hasDropdown && handleDropdownLeave()}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm
                               font-medium transition-all duration-200 group
                               ${activeDropdown === link.label
                                 ? 'text-white bg-white/5'
                                 : 'text-white/65 hover:text-white hover:bg-white/5'
                                }`}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          activeDropdown === link.label ? 'rotate-180 text-[#F05B1B]' : ''
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
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3
                                   bg-[#070e10]/98 backdrop-blur-2xl border border-white/10
                                   rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden
                                   z-50 flex ${
                                     link.label === 'Solutions' ? 'w-[780px]' : 'w-[680px]'
                                   }`}
                        onMouseEnter={() => handleDropdownEnter(link.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {/* Main Grid Area */}
                        <div className="flex-1 p-6">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 text-left">
                            {link.label === 'Solutions' ? 'Our Technology Verticals' : 'Nexa Specialized Sectors'}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {link.items?.map((item) => {
                              const itemAny = item as any
                              const Icon = itemAny.icon || Building2
                              return (
                                <Link
                                  key={itemAny.label}
                                  href={itemAny.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-start gap-4 p-3 rounded-xl
                                             text-white/65 hover:text-white hover:bg-white/[0.03]
                                             transition-all duration-200 group/item border border-transparent hover:border-white/5"
                                >
                                  {/* Icon Container */}
                                  <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center
                                               flex-shrink-0 transition-all duration-300
                                               group-hover/item:scale-110 shadow-lg"
                                    style={{
                                      background: itemAny.color
                                        ? `${itemAny.color}15`
                                        : 'rgba(240,91,27,0.08)',
                                      border: `1px solid ${itemAny.color ? `${itemAny.color}25` : 'rgba(240,91,27,0.15)'}`
                                    }}
                                  >
                                    <Icon
                                      className="w-4.5 h-4.5 transition-transform duration-300 group-hover/item:rotate-3"
                                      style={{
                                        color: itemAny.color || '#F05B1B'
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Label and Description */}
                                  <div className="flex flex-col gap-0.5 mt-0.5 text-left">
                                    <span className="font-bold text-xs text-white/90 group-hover/item:text-[#F05B1B] transition-colors duration-200">
                                      {itemAny.label}
                                    </span>
                                    <span className="text-[10px] text-white/45 font-medium leading-normal max-w-[240px]">
                                      {itemAny.desc}
                                    </span>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>

                        {/* Side Feature Panel (Premium Callout) */}
                        <div className="w-[240px] bg-white/[0.01] border-l border-white/5 p-6 flex flex-col justify-between text-left">
                          <div>
                            <div className="text-[10px] font-bold text-[#F05B1B] uppercase tracking-[0.25em] mb-3">
                              {link.label === 'Solutions' ? 'Featured Tech' : 'Qatar Compliance'}
                            </div>
                            
                            <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                              {link.label === 'Solutions' 
                                ? 'State-Of-The-Art Systems Integration' 
                                : 'SSD & QCDD Certified Standards'}
                            </h4>
                            
                            <p className="text-[10px] text-white/45 leading-relaxed mb-4">
                              {link.label === 'Solutions'
                                ? 'End-to-end active networks, cybersecurity audits, and storage setup for Qatar enterprises.'
                                : 'Tailored designs that satisfy Civil Defense regulations for immediate operational approval.'}
                            </p>
                          </div>

                          <Link
                            href={link.label === 'Solutions' ? '/contact' : '/case-studies'}
                            onClick={() => setActiveDropdown(null)}
                            className="group inline-flex items-center gap-1.5 py-2.5 px-4 bg-[#F05B1B]/10 hover:bg-[#F05B1B] text-[#F05B1B] hover:text-white border border-[#F05B1B]/20 hover:border-transparent rounded-xl text-[10px] font-black tracking-wider uppercase transition-all duration-300 mt-4 text-center justify-center shadow-lg hover:shadow-[#F05B1B]/20"
                          >
                            {link.label === 'Solutions' ? 'Consult An Expert' : 'View Success Stories'}
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* ── RIGHT CTA ── */}
            <div className="hidden xl:flex items-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-2.5 border border-[#F05B1B] text-white text-xs
                           font-bold rounded-full transition-all duration-300
                           hover:bg-[#F05B1B] hover:shadow-orange"
              >
                Schedule a Meeting
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white/20
                           flex items-center justify-center text-white transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {/* ── MOBILE TOGGLE ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden relative w-10 h-10 flex flex-col items-center
                         justify-center gap-1.5 rounded-full border border-white/10
                         hover:border-white/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[99] bg-[#0a1518] flex flex-col xl:hidden"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-5
                           border-b border-white/5">
              <Link href="/" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3">
                <img 
                  src="/images/logo.png" 
                  alt="Nexa Network Solutions Logo" 
                  className="h-8.5 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg
                           border border-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 border-b
                               border-white/5 text-white/70 hover:text-white
                               text-lg font-medium transition-colors"
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4 text-[#F05B1B]" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="px-6 py-6 border-t border-white/5 space-y-3">
              <a
                href="tel:+97441459393"
                className="flex items-center gap-3 text-white/60 text-sm"
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
