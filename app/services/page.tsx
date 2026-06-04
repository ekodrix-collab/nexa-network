'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Network, Shield, Cloud, DoorOpen, Camera, Truck, ArrowRight, CheckCircle2 } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const services = [
  { id: 'network', icon: Network, title: 'Network Infrastructure', subtitle: 'Passive & Active Networks', description: 'Design and implement reliable, scalable, and secure network infrastructure that ensures seamless connectivity and efficient business operations across your organization.', features: ['Structured Cabling (Cat6/Cat6a/Fiber)', 'LAN/WAN Design & Implementation', 'Enterprise WiFi Solutions', 'Network Monitoring & Management', 'Switch & Router Configuration', 'Network Security Appliances'], accent: '#3B82F6' },
  { id: 'security', icon: Shield, title: 'Cyber Security Solutions', subtitle: 'IT Security & Protection', description: 'Advanced cybersecurity solutions designed to protect your systems, data, and digital assets from evolving cyber threats and sophisticated attacks.', features: ['Next-Gen Firewall & UTM', 'Endpoint Detection & Response', 'Security Operations Center (SOC)', 'Penetration Testing & Audits', 'Email Security & Anti-Phishing', 'Security Awareness Training'], accent: '#EF4444' },
  { id: 'cloud', icon: Cloud, title: 'Cloud Computing Services', subtitle: 'Cloud & IT Solutions', description: 'Scalable cloud solutions to store, manage, and access your data and applications efficiently from anywhere in the world.', features: ['Cloud Migration Strategy', 'Microsoft Azure & AWS Setup', 'Backup & Disaster Recovery', 'SaaS Application Setup', 'Hybrid Cloud Architecture', 'Cloud Cost Optimization'], accent: '#A855F7' },
  { id: 'access', icon: DoorOpen, title: 'Smart Entry Management', subtitle: 'Access Control Systems', description: 'Intelligent access control systems for modern workplaces ensuring secure and efficient entry management for your facilities.', features: ['Biometric Access Control', 'RFID Card Systems', 'Time & Attendance Tracking', 'Visitor Management Systems', 'Turnstile & Barrier Gates', 'Mobile Credentialing'], accent: '#22C55E' },
  { id: 'cctv', icon: Camera, title: 'CCTV & Surveillance', subtitle: 'Smart Video Security', description: 'High-definition surveillance solutions that provide real-time monitoring, remote access, and AI-powered analytics for enhanced security.', features: ['HD/4K IP Camera Systems', 'NVR & Storage Solutions', 'Remote Monitoring Apps', 'AI Video Analytics', 'License Plate Recognition', 'Thermal Cameras'], accent: '#EAB308' },
  { id: 'tracking', icon: Truck, title: 'Vehicle Tracking Solutions', subtitle: 'GPS Fleet Management', description: 'Real-time GPS tracking and fleet management solutions to optimize vehicle performance, reduce costs, and ensure fleet security.', features: ['Real-time GPS Tracking', 'Fleet Analytics & Reports', 'Route Optimization', 'Driver Behavior Scoring', 'Fuel Monitoring', 'Geo-fencing & Alerts'], accent: '#F97316' },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-[#0D1C22] overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F05B1B]/5 rounded-full blur-[150px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4"><div className="w-8 h-px bg-[#F05B1B]" /><span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Our Services</span></div>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">Comprehensive IT <span className="text-[#F05B1B]">Solutions</span></h1>
              <p className="text-white/50 text-lg leading-relaxed">End-to-end technology services designed to empower your business with reliable, secure, and future-ready IT infrastructure.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#0a1518]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <ScrollReveal key={service.title} delay={0.1}>
                <div id={service.id} className="glass rounded-3xl p-8 lg:p-10 border border-white/8 hover:border-white/15 transition-all duration-300 scroll-mt-24">
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${service.accent}18` }}>
                        <Icon className="w-7 h-7" style={{ color: service.accent }} />
                      </div>
                      <div className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: service.accent }}>{service.subtitle}</div>
                      <h2 className="text-3xl font-black text-white mb-4">{service.title}</h2>
                      <p className="text-white/45 leading-relaxed mb-6">{service.description}</p>
                      <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-bold text-sm rounded-xl transition-all duration-300 hover:shadow-orange">Get a Quote<ArrowRight className="w-4 h-4" /></Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: service.accent }} />
                          <span className="text-white/60 text-sm">{f}</span>
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
