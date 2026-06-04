import Link from 'next/link'
import {
  Phone, Mail, MapPin, Linkedin, Facebook,
  Instagram, Youtube
} from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact Us', href: '/contact' },
]

const services = [
  { label: 'Network Infrastructure', href: '/services#network' },
  { label: 'Cyber Security Solutions', href: '/services#security' },
  { label: 'Cloud & IT Services', href: '/services#cloud' },
  { label: 'Smart Entry Management', href: '/services#access' },
  { label: 'CCTV & Surveillance', href: '/services#cctv' },
  { label: 'Vehicle Tracking Solutions', href: '/services#tracking' },
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
  return (
    <footer className="bg-[#070f12] relative overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px
                     bg-gradient-to-r from-transparent via-[#F05B1B]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                     w-[600px] h-[200px] bg-[#F05B1B]/3 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Footer */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10">

          {/* Brand col — 2 units */}
          <div className="xl:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <img 
                src="/images/logo.png" 
                alt="Nexa Network Solutions Logo" 
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
            {/* Old footer logo elements hidden below */}
            <div className="hidden">
              <div className="w-11 h-11 bg-[#F05B1B] rounded-xl flex items-center">
                <span className="text-white font-black text-lg">N</span>
              </div>
              <div>
                <div className="text-white font-black text-lg leading-none">nexa</div>
                <div className="text-[#F05B1B] text-[9px] font-bold tracking-[0.25em] uppercase">
                  Network Solutions
                </div>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering businesses through smart infrastructure, secure solutions,
              and innovative technology across Qatar.
            </p>

            {/* Certifications */}
            <div className="flex gap-2 mb-6">
              {['ISO 27001', 'CNIA', 'Microsoft Partner'].map((cert) => (
                <div
                  key={cert}
                  className="px-2.5 py-1 rounded-lg border border-white/8 bg-white/3
                             text-[10px] text-white/40 font-semibold"
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
                  className="w-9 h-9 rounded-xl bg-white/4 border border-white/8
                             flex items-center justify-center text-white/40
                             hover:text-white hover:bg-[#F05B1B]/15 hover:border-[#F05B1B]/30
                             transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-white/40 hover:text-white
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
            <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-white/40 hover:text-white
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
            <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-5">
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
                    <div className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5">
                      Phone
                    </div>
                    <div className="text-white/70 text-sm font-medium
                                   group-hover:text-white transition-colors">
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
                    <div className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5">
                      Email
                    </div>
                    <div className="text-white/70 text-sm font-medium
                                   group-hover:text-white transition-colors">
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
                    <div className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5">
                      Office
                    </div>
                    <div className="text-white/60 text-xs leading-relaxed">
                      Hilalyton Tower, Floor 7 – Office 33<br />
                      Al Saflya St · Doha – Qatar
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Resources */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-4">
                Resources
              </h4>
              <div className="flex flex-wrap gap-2">
                {resources.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-white/35 hover:text-white text-xs transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row
                       items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2025 Nexa Network Solutions. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/20 hover:text-white/60
                                            text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/20 hover:text-white/60
                                          text-xs transition-colors">
              Terms & Conditions
            </Link>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/20 text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
