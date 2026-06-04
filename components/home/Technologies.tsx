'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

const partners = [
  { name: 'Cisco', label: 'CISCO' },
  { name: 'Fortinet', label: 'FORTINET' },
  { name: 'Microsoft', label: 'Microsoft' },
  { name: 'VMware', label: 'vmware' },
  { name: 'Dell Technologies', label: 'DELL Technologies' },
  { name: 'Hewlett Packard Enterprise', label: 'Hewlett Packard Enterprise' },
  { name: 'Sophos', label: 'SOPHOS' },
  { name: 'Huawei', label: 'HUAWEI' }
]

export default function Technologies() {
  return (
    <section className="py-16 bg-white dark:bg-[#070f12] relative overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-slate-400 dark:text-white/30 text-[9px] font-black tracking-[0.25em] uppercase">
            Technology Partners
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 dark:opacity-50">
          {partners.map((partner, index) => (
            <ScrollReveal
              key={partner.name}
              direction="up"
              delay={index * 0.05}
              className="flex items-center gap-2 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              {/* Custom SVG logo paths for the partner brands */}
              {partner.name === 'Cisco' && (
                <svg className="w-5 h-5 text-slate-700 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 14V10M8 17V7M12 20V4M16 17V7M20 14V10" />
                </svg>
              )}
              {partner.name === 'Fortinet' && (
                <svg className="w-5 h-5 text-slate-700 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M21 12H3" />
                </svg>
              )}
              {partner.name === 'Microsoft' && (
                <svg className="w-5 h-5 text-slate-700 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="8" height="8" />
                  <rect x="13" y="3" width="8" height="8" />
                  <rect x="3" y="13" width="8" height="8" />
                  <rect x="13" y="13" width="8" height="8" />
                </svg>
              )}
              {partner.name === 'VMware' && (
                <svg className="w-5 h-5 text-slate-700 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
                </svg>
              )}
              {partner.name === 'Dell Technologies' && (
                <svg className="w-5 h-5 text-slate-700 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 9h4a2 2 0 1 1 0 4H9V9Z" />
                </svg>
              )}
              {partner.name === 'Hewlett Packard Enterprise' && (
                <svg className="w-5 h-3 text-slate-700 dark:text-white" viewBox="0 0 24 12" fill="currentColor">
                  <rect width="24" height="12" rx="1" />
                </svg>
              )}
              {partner.name === 'Sophos' && (
                <svg className="w-5 h-5 text-slate-700 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              )}
              {partner.name === 'Huawei' && (
                <svg className="w-5 h-5 text-slate-700 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6" />
                </svg>
              )}
              <span className="text-slate-700 dark:text-white text-xs font-black tracking-[0.2em] uppercase whitespace-nowrap">
                {partner.label}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
