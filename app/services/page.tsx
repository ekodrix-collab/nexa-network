'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Network, Shield, Cloud, DoorOpen, Camera, Truck, ArrowRight, CheckCircle2, Monitor, Globe } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const services = [
  { slug: 'network-infrastructure', icon: Network, title: 'Network Infrastructure & Passive Infrastructure', subtitle: 'Passive & Active Networks', description: 'Design and implement reliable, scalable, and secure network infrastructure that ensures seamless connectivity and efficient business operations across your organization.', features: ['Structured Cabling (Cat6/Cat6a/Fiber)', 'LAN/WAN Design & Implementation', 'Enterprise WiFi Solutions', 'Network Monitoring & Management', 'Switch & Router Configuration', 'Network Security Appliances'], accent: '#3B82F6' },
  { slug: 'cyber-security', icon: Shield, title: 'IT Solutions & Integration Services', subtitle: 'IT Security & Integration', description: 'Advanced cybersecurity solutions designed to protect your systems, data, and digital assets from evolving cyber threats and sophisticated attacks.', features: ['Next-Gen Firewall & UTM', 'Endpoint Detection & Response', 'Security Operations Center (SOC)', 'Penetration Testing & Audits', 'Email Security & Anti-Phishing', 'Security Awareness Training'], accent: '#EF4444' },
  { slug: 'cloud-computing', icon: Cloud, title: 'Cloud Computing & IT Software Services', subtitle: 'Cloud & IT Solutions', description: 'Scalable cloud solutions to store, manage, and access your data and applications efficiently from anywhere in the world.', features: ['Cloud Migration Strategy', 'Microsoft Azure & AWS Setup', 'Backup & Disaster Recovery', 'SaaS Application Setup', 'Hybrid Cloud Architecture', 'Cloud Cost Optimization'], accent: '#A855F7' },
  { slug: 'conference-room', icon: Monitor, title: 'Conference Room & Office IT Services', subtitle: 'Smart Office Collaboration', description: 'Deploy next-generation conference room audio-visual setups, smart projectors, interactive displays, and robust office IT integration for modern hybrid workspaces.', features: ['AV Conference Systems', 'Smart Interactive Displays', 'Workspace Scheduling', 'PA & Sound Systems', 'Wireless Presentation Tools', 'IT Hardware Procurement'], accent: '#D946EF' },
  { slug: 'smart-entry', icon: DoorOpen, title: 'Smart Entry Management', subtitle: 'Access Control Systems', description: 'Intelligent access control systems for modern workplaces ensuring secure and efficient entry management for your facilities.', features: ['Biometric Access Control', 'RFID Card Systems', 'Time & Attendance Tracking', 'Visitor Management Systems', 'Turnstile & Barrier Gates', 'Mobile Credentialing'], accent: '#22C55E' },
  { slug: 'web-development', icon: Globe, title: 'Website Development & Digital Solutions', subtitle: 'Custom Software & Web Apps', description: 'Establish a powerful online presence with bespoke website design, enterprise web applications, e-commerce stores, and digital marketing optimizations tailored to your brand.', features: ['Custom Web Development', 'E-commerce Platforms', 'UI/UX Design Systems', 'SEO & Digital Marketing', 'Web Hosting & Support', 'Custom API Integrations'], accent: '#06B6D4' },
  { slug: 'vehicle-tracking', icon: Truck, title: 'Vehicle Tracking Solutions', subtitle: 'GPS Fleet Management', description: 'Real-time GPS tracking and fleet management solutions to optimize vehicle performance, reduce costs, and ensure fleet security.', features: ['Real-time GPS Tracking', 'Fleet Analytics & Reports', 'Route Optimization', 'Driver Behavior Scoring', 'Fuel Monitoring', 'Geo-fencing & Alerts'], accent: '#F97316' },
  { slug: 'cctv-surveillance', icon: Camera, title: 'CCTV & Surveillance Systems', subtitle: 'Smart Video Security', description: 'High-definition surveillance solutions that provide real-time monitoring, remote access, and AI-powered analytics for enhanced security.', features: ['HD/4K IP Camera Systems', 'NVR & Storage Solutions', 'Remote Monitoring Apps', 'AI Video Analytics', 'License Plate Recognition', 'Thermal Cameras'], accent: '#EAB308' },
]

export default function ServicesPage() {
  return (
    <div className="pt-20 bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      <section className="relative py-24 bg-white dark:bg-[#0D1C22] border-b border-black/5 dark:border-white/[0.03] overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F05B1B]/5 rounded-full blur-[150px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4"><div className="w-8 h-px bg-[#F05B1B]" /><span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Our Services</span></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">Comprehensive IT <span className="text-[#F05B1B]">Solutions</span></h1>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed">End-to-end technology services designed to empower your business with reliable, secure, and future-ready IT infrastructure.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <ScrollReveal key={service.title} delay={0.1}>
                <div id={service.slug} className="bg-white dark:bg-[#0d1c22]/60 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/15 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300 scroll-mt-24">
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${service.accent}18` }}>
                        <Icon className="w-7 h-7" style={{ color: service.accent }} />
                      </div>
                      <div className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: service.accent }}>{service.subtitle}</div>
                      <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">{service.title}</h2>
                      <p className="text-slate-500 dark:text-white/45 leading-relaxed mb-6">{service.description}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold text-sm rounded-xl transition-all duration-300">View Details</Link>
                        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-bold text-sm rounded-xl transition-all duration-300 hover:shadow-orange">Get a Quote<ArrowRight className="w-4 h-4" /></Link>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 transition-colors duration-300">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: service.accent }} />
                          <span className="text-slate-600 dark:text-white/60 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>
    </div>
  )
}
