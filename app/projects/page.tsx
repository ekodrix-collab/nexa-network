'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import ScrollReveal from '@/components/ui/ScrollReveal'

const categories = ['All', 'Network', 'Security', 'Cloud', 'CCTV', 'Access Control', 'Fleet']

const projects = [
  { id: 1, title: 'FedEx Qatar Infrastructure Upgrade', client: 'FedEx Qatar', category: 'Network', description: 'Complete network overhaul with structured cabling and WiFi.', color: '#3B82F6', result: '99.9% Uptime', tags: ['Network', 'WiFi'] },
  { id: 2, title: 'Katara Village Surveillance', client: 'Katara Cultural Village', category: 'CCTV', description: 'End-to-end CCTV with HD cameras and remote monitoring.', color: '#EAB308', result: '200+ Cameras', tags: ['CCTV', 'NVR'] },
  { id: 3, title: 'Aida Clinic Cloud Migration', client: 'Aida Clinic', category: 'Cloud', description: 'Cloud migration to secure HIPAA-compliant infrastructure.', color: '#A855F7', result: '40% Cost Saved', tags: ['Cloud', 'Healthcare'] },
  { id: 4, title: 'Government Cybersecurity', client: 'Government Entity', category: 'Security', description: 'SOC implementation and firewall deployment.', color: '#EF4444', result: '0 Breaches', tags: ['Security', 'SOC'] },
  { id: 5, title: 'Embassy Access Control', client: 'Embassy Doha', category: 'Access Control', description: 'Biometric access and visitor management.', color: '#22C55E', result: '24/7 Security', tags: ['Biometric', 'Access'] },
  { id: 6, title: 'Logistics Fleet Tracking', client: 'Qatar Logistics', category: 'Fleet', description: 'GPS tracking for 100+ vehicles.', color: '#F97316', result: '30% Fuel Saved', tags: ['GPS', 'Fleet'] },
]

export default function ProjectsPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? theme : 'dark'
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <div className="pt-20 bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      <section className="relative py-24 bg-white dark:bg-[#0D1C22] border-b border-black/5 dark:border-white/[0.03] overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4"><div className="w-8 h-px bg-[#F05B1B]" /><span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Our Projects</span></div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">Solutions That <span className="text-[#F05B1B]">Deliver</span></h1>
              <p className="text-slate-600 dark:text-white/50 text-lg">Explore our portfolio of successful projects across Qatar.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)} 
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeFilter === cat 
                    ? 'bg-[#F05B1B] text-white' 
                    : 'bg-white dark:bg-[#0d1c22]/60 text-slate-500 dark:text-white/50 hover:bg-[#F05B1B]/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white dark:bg-[#0d1c22]/60 backdrop-blur-md rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/15 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300">
                  <div className="relative h-48 flex items-center justify-center" style={{ background: currentTheme === 'light' ? `linear-gradient(135deg, ${project.color}15, #f8fafc)` : `linear-gradient(135deg, ${project.color}20, #0D1C22)` }}>
                    <div className="text-7xl font-black" style={{ color: `${project.color}15` }}>{project.client.charAt(0)}</div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold border" style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}15` }}>{project.category}</div>
                    <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1"><span className="text-slate-700 dark:text-white/70 text-xs font-semibold">{project.result}</span></div>
                  </div>
                  <div className="p-6">
                    <div className="text-slate-400 dark:text-white/35 text-xs font-semibold mb-1">{project.client}</div>
                    <h3 className="text-slate-800 dark:text-white font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-slate-500 dark:text-white/40 text-sm mb-4">{project.description}</p>
                    <div className="flex gap-1.5">{project.tags.map(t => (<span key={t} className="px-2 py-0.5 rounded-md text-[10px] border border-black/5 dark:border-white/10 text-slate-500 dark:text-white/30">{t}</span>))}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
