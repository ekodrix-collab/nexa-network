'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Network, Cloud, Key, Camera, MapPin } from 'lucide-react'

const services = [
  {
    num: '01',
    title: 'Network Infrastructure',
    description: 'Design and implement reliable network infrastructure that ensures secure connectivity, seamless communication, and efficient business operations.',
    icon: Network,
    bgImage: '/images/service_network.jpg',
    href: '/services/network',
    tag: 'Enterprise Connectivity'
  },
  {
    num: '02',
    title: 'Cyber Security Solutions',
    description: 'Protect your IT systems and digital assets with advanced cybersecurity solutions designed to prevent threats and data breaches.',
    icon: Shield,
    bgImage: '/images/service_security.jpg',
    href: '/services/security',
    tag: 'Advanced Threat Defense'
  },
  {
    num: '03',
    title: 'Cloud Computing Services',
    description: 'Secure and scalable cloud solutions that enable businesses to securely store, manage, and access data efficiently from anywhere.',
    icon: Cloud,
    bgImage: '/images/service_cloud.jpg',
    href: '/services/cloud',
    tag: 'Virtual Infrastructure'
  },
  {
    num: '04',
    title: 'Smart Entry Management',
    description: 'Advanced access control systems that help organizations manage entry points, monitor attendance, and maintain workplace security.',
    icon: Key,
    bgImage: '/images/service_access.jpg',
    href: '/services/access',
    tag: 'Biometric & RFID Access'
  },
  {
    num: '05',
    title: 'CCTV & Surveillance Systems',
    description: 'High-definition surveillance solutions that provide real-time monitoring, remote access, and enhanced security for business environments.',
    icon: Camera,
    bgImage: '/images/service_cctv.jpg',
    href: '/services/cctv',
    tag: 'High-Definition Vision'
  },
  {
    num: '06',
    title: 'Vehicle Tracking Solutions',
    description: 'Smart GPS tracking systems that allow businesses to monitor fleets, optimize routes, and improve operational efficiency and productivity.',
    icon: MapPin,
    bgImage: '/images/service_tracking.jpg',
    href: '/services/tracking',
    tag: 'Real-time GPS Analytics'
  }
]

export default function Services() {
  return (
    <section className="py-28 bg-[#070f12] relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#F05B1B]/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#F05B1B]/[0.03] rounded-full blur-[180px] pointer-events-none" />
      
      {/* Tech Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section with "More Details" button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F05B1B]/10 border border-[#F05B1B]/20 text-[#F05B1B] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              What We Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Innovative IT Solutions for Secure and Connected Businesses
            </h2>
          </div>
          
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#F05B1B] to-[#FF6B2B] text-white px-7 py-3.5 rounded-full text-sm font-extrabold tracking-wider uppercase shadow-lg shadow-[#F05B1B]/25 hover:shadow-xl hover:shadow-[#F05B1B]/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            More Details
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Grid (3x2 layout with standard visual cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative bg-[#0d1619]/50 backdrop-blur-md rounded-[28px] border border-white/[0.04] p-5 hover:border-[#F05B1B]/30 hover:bg-[#0d1619]/85 hover:shadow-2xl hover:shadow-[#F05B1B]/8 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image & Icon Wrapper */}
                  <div className="relative mb-8">
                    {/* Standard Image Container at the top of the card */}
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden">
                      {/* The Background Photo at full visibility */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                        style={{ backgroundImage: `url(${service.bgImage})` }} 
                      />
                      
                      {/* Subtle vignette gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                      {/* Monospace Translucent Badge (Serial Number) */}
                      <div className="absolute top-3 left-3 bg-[#070f12]/75 backdrop-blur-md text-white/95 text-xs font-bold font-mono px-3 py-1 rounded-full border border-white/10 shadow-lg">
                        {service.num}
                      </div>
                    </div>

                    {/* Floating Icon Box over the bottom-left corner of the image */}
                    <div className="absolute -bottom-6 left-5 w-12 h-12 rounded-xl bg-[#0d1619] border border-white/[0.08] flex items-center justify-center text-[#F05B1B] shadow-xl group-hover:bg-[#F05B1B] group-hover:text-white group-hover:border-transparent transition-all duration-300 z-10">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Title & Tag Content */}
                  <div className="px-2 mt-2">
                    <span className="text-white/40 text-[9px] font-black tracking-[0.2em] uppercase block mb-1.5">
                      {service.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-[#F05B1B] transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed mb-6 min-h-[72px] group-hover:text-white/80 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-2 pb-2 flex items-center gap-4 pt-4 border-t border-white/[0.04]">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center bg-[#F05B1B]/10 hover:bg-[#F05B1B] text-[#F05B1B] hover:text-white border border-[#F05B1B]/25 hover:border-transparent px-4.5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#F05B1B]/5 hover:shadow-lg hover:shadow-[#F05B1B]/20"
                  >
                    Enquire now
                  </Link>
                  
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#F05B1B] text-xs font-extrabold tracking-wider uppercase transition-colors duration-300 ml-auto"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
