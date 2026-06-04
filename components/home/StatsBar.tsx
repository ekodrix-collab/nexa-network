'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function StatsBar() {
  const logos = [
    {
      id: 'fedex',
      render: () => (
        <svg className="h-7 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fed (Purple/Navy) */}
          <path d="M0 20V4h10c2.5 0 4 .5 5 1.5s1.5 2.5 1.5 4.5c0 1.8-.4 3.1-1.2 4s-2.1 1.5-3.8 1.5H4v4.5H0zm4-9h5.5c1.8 0 2.5-.8 2.5-2.2 0-1.3-.7-2-2.5-2H4v4.2z" fill="#4D148C" />
          <path d="M22 13h10v2.2H22v2.5h10.8V20H18V4h14.8v2.3H22V13z" fill="#4D148C" />
          <path d="M36.5 20V4h6c3.2 0 5 1.2 5 4.2 0 1.8-1 3-2.5 3.6 1.8.5 2.8 1.8 2.8 3.8v1.2c0 1.2.2 2 .5 2.2V20h-4.2c-.3-.5-.4-1.3-.4-2.2v-1.2c0-1.8-.8-2.5-2.8-2.5h-1.4V20h-4zm4-10.8h2c1.8 0 2.5-.6 2.5-2 0-1.2-.7-1.8-2.5-1.8h-2V9.2z" fill="#4D148C" />
          {/* Ex (Orange) */}
          <path d="M50 20l5.8-8.2-5.5-7.8h4.8l3 4.5 3.2-4.5h4.6l-5.6 7.8 6 8.2h-4.8l-3.4-4.8-3.4 4.8H50z" fill="#FF6600" />
          {/* Star Icon */}
          <g transform="translate(85, 2)">
            <path d="M8 0l1.8 4.2L14 3l-2.8 3.8L15 10l-4.5-.5L9 14l-1.8-4.2L3 11l-2.8-3.8L2 4l4.5.5L8 0z" fill="#FF6600" />
          </g>
          <text x="85" y="23" fill="#FF6600" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Office</text>
        </svg>
      )
    },
    {
      id: 'mot',
      render: () => (
        <svg className="h-9 w-auto" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Traditional Qatar emblem */}
          <g transform="translate(112, 4)">
            <circle cx="15" cy="15" r="14" stroke="#8A1538" strokeWidth="1.2" fill="none" />
            <path d="M8 20c4-1 10-3 14-3M22 20c-4-1-10-3-14-3" stroke="#8A1538" strokeWidth="1.2" />
            <path d="M15 17V6M12 9c1-1 3-1 3-1s2 0 3 1" stroke="#8A1538" strokeWidth="1.2" />
          </g>
          {/* Texts */}
          <text x="5" y="16" fill="#1C3F60" fontSize="9" fontWeight="bold" fontFamily="sans-serif">وزارة المـواصـلات</text>
          <line x1="5" y1="21" x2="105" y2="21" stroke="#8A1538" strokeWidth="0.8" />
          <text x="5" y="31" fill="#1C3F60" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.2">Ministry of Transport</text>
        </svg>
      )
    },
    {
      id: 'katara',
      render: () => (
        <svg className="h-9 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 12c10-4 20-4 30 0M45 12c10-4 20-4 30 0M75 12c10-4 20-4 30 0" stroke="#7A1C29" strokeWidth="2" strokeLinecap="round" />
          <text x="22" y="27" fill="#7A1C29" fontSize="14" fontWeight="900" fontFamily="serif" letterSpacing="2.5">katara</text>
          <text x="22" y="34" fill="#7A1C29" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.8">valley of cultures</text>
        </svg>
      )
    },
    {
      id: 'embassy',
      render: () => (
        <svg className="h-9 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crest Seal */}
          <g transform="translate(4, 5)">
            <circle cx="15" cy="15" r="13" fill="#EAF3FA" stroke="#006699" strokeWidth="1" />
            <path d="M7 15c0 4 3 8 8 8s8-4 8-8" stroke="#339933" strokeWidth="1.2" fill="none" />
            <path d="M10 10l10 10M20 10L10 20" stroke="#777" strokeWidth="0.8" />
            <rect x="11" y="9" width="8" height="12" rx="1" fill="#fff" stroke="#996600" strokeWidth="0.8" />
          </g>
          <text x="38" y="18" fill="#0F4C81" fontSize="9.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.2">EMBAJADA DE</text>
          <text x="38" y="30" fill="#0F4C81" fontSize="11.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">GUATEMALA</text>
        </svg>
      )
    },
    {
      id: 'pantone',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="5" y="17" fill="#111111" fontSize="17" fontWeight="bold" fontFamily="sans-serif" letterSpacing="-0.5">pantone</text>
          <text x="5" y="26" fill="#666666" fontSize="7" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1.8">ADVERTISING</text>
          {/* Swatch */}
          <rect x="95" y="3" width="18" height="23" fill="#E02424" rx="1" />
          <rect x="95" y="17" width="18" height="9" fill="#FFFFFF" />
        </svg>
      )
    },
    {
      id: 'carmel',
      render: () => (
        <svg className="h-8 w-auto" viewBox="0 0 130 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#E02424" />
          <text x="8" y="21" fill="#FFFFFF" fontSize="15" fontWeight="black" fontFamily="sans-serif">C</text>
          <text x="16" y="22" fill="#FFFFFF" fontSize="10" fontWeight="black" fontFamily="sans-serif">G</text>
          
          <text x="35" y="13" fill="#111" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.2">CARMEL</text>
          <text x="35" y="21" fill="#111" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.2">GROUP W.L.L.</text>
          <text x="35" y="27" fill="#E02424" fontSize="5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">DOHA - QATAR</text>
        </svg>
      )
    }
  ]

  return (
    <section className="relative bg-white dark:bg-[#070f12] py-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal
          direction="up"
          className="relative bg-gradient-to-br from-[#E24611] via-[#F36F35] to-[#E04B0B] rounded-[32px] p-8 md:p-12 lg:py-16 lg:px-8 overflow-hidden shadow-2xl shadow-[#F05B1B]/15"
        >
          {/* Tech Dotted Mesh & Circuit Trace Background representing IT Networking Infrastructure */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Base micro dot grid */}
            <div 
              className="absolute inset-0 opacity-[0.06]" 
              style={{
                backgroundImage: 'radial-gradient(circle, white 1.2px, transparent 1.2px)',
                backgroundSize: '16px 16px'
              }} 
            />

            {/* Custom SVG Networking Nodes & Circuit board traces */}
            <svg className="absolute inset-0 w-full h-full opacity-45" viewBox="0 0 1000 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="network-line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.05" />
                  <stop offset="30%" stopColor="#FFE082" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#FF8A65" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
                </linearGradient>
                <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="#FF8A65" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#E24611" stopOpacity="0" />
                </radialGradient>
                <filter id="blur-filter">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              {/* Circuit board trace lines (45-degree angle paths representing hardware routing) */}
              <path d="M-20,40 L180,40 L210,70 L380,70 L410,40 L620,40 L650,70 L800,70 L830,40 L1020,40" stroke="url(#network-line-glow)" strokeWidth="1.2" />
              <path d="M-20,160 L140,160 L170,130 L420,130 L450,160 L680,160 L710,130 L870,130 L900,160 L1020,160" stroke="url(#network-line-glow)" strokeWidth="1.2" />
              
              {/* Wavy Dotted data stream overlay */}
              <path 
                d="M-50,80 C150,155 320,20 500,115 C680,210 830,55 1050,135" 
                stroke="url(#network-line-glow)" 
                strokeWidth="4.5" 
                strokeDasharray="2.5 16" 
                strokeLinecap="round" 
              />

              {/* Data packet pulses along circuit routes */}
              <circle cx="260" cy="70" r="3" fill="#FFFFFF" />
              <circle cx="510" cy="40" r="2.5" fill="#FFE082" />
              <circle cx="700" cy="160" r="3.2" fill="#FFFFFF" />
              <circle cx="850" cy="130" r="2" fill="#FFE082" />

              {/* Left Side Networking Node Mesh */}
              <g opacity="0.45" transform="translate(10, 0)">
                <line x1="40" y1="60" x2="100" y2="40" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="40" y1="60" x2="70" y2="100" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="100" y1="40" x2="70" y2="100" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="100" y1="40" x2="130" y2="90" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="70" y1="100" x2="130" y2="90" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="70" y1="100" x2="90" y2="140" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="130" y1="90" x2="90" y2="140" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />

                <circle cx="40" cy="60" r="3.5" fill="white" />
                <circle cx="100" cy="40" r="4.5" fill="#FFE082" />
                <circle cx="70" cy="100" r="3.5" fill="white" />
                <circle cx="130" cy="90" r="4" fill="#FFE082" />
                <circle cx="90" cy="140" r="3.5" fill="white" />
              </g>

              {/* Right Side Networking Node Mesh */}
              <g opacity="0.45" transform="translate(760, 20)">
                <line x1="40" y1="110" x2="90" y2="70" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="40" y1="110" x2="60" y2="40" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="90" y1="70" x2="60" y2="40" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="90" y1="70" x2="120" y2="50" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="60" y1="40" x2="120" y2="50" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="90" y1="70" x2="110" y2="110" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="120" y1="50" x2="110" y2="110" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />

                <circle cx="40" cy="110" r="3.5" fill="white" />
                <circle cx="90" cy="70" r="4.5" fill="#FFE082" />
                <circle cx="60" cy="40" r="3.5" fill="white" />
                <circle cx="120" cy="50" r="4" fill="#FFE082" />
                <circle cx="110" cy="110" r="3.5" fill="white" />
              </g>

              {/* Blurry Networking Orbs/Bubbles */}
              <circle cx="530" cy="90" r="32" fill="url(#orb-glow)" filter="url(#blur-filter)" />
              <circle cx="530" cy="90" r="37" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.15" />
              <circle cx="280" cy="130" r="18" fill="url(#orb-glow)" filter="url(#blur-filter)" opacity="0.5" />
              <circle cx="280" cy="130" r="22" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />

              {/* Tiny Technical Monospace Text Overlays */}
              <text x="180" y="30" fill="white" fillOpacity="0.15" fontSize="7" fontFamily="monospace" letterSpacing="1">10G_FIBER_BACKBONE_ACTIVE</text>
              <text x="430" y="120" fill="white" fillOpacity="0.15" fontSize="7" fontFamily="monospace" letterSpacing="1">SUBNET_10.0.4.0/24</text>
              <text x="680" y="150" fill="white" fillOpacity="0.15" fontSize="7" fontFamily="monospace" letterSpacing="1">SECURE_NODE_LINK_ESTABLISHED</text>
              <text x="400" y="20" fill="white" fillOpacity="0.1" fontSize="8" fontFamily="monospace" fontWeight="bold">RJ45</text>
              <text x="890" y="80" fill="white" fillOpacity="0.1" fontSize="8" fontFamily="monospace" fontWeight="bold">SFP+_10G_SR</text>
            </svg>
          </div>
          
          {/* Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Trusted by Leading Organizations Across Qatar
            </h2>
          </div>

          {/* Infinite Auto-Scrolling Brands Marquee Container */}
          <div className="relative z-10 w-full overflow-hidden">
            {/* Inject local style for infinite scroll marquee */}
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-logos {
                display: flex;
                width: max-content;
                animation: marquee 35s linear infinite;
              }
              .animate-marquee-logos:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            {/* Soft Edge Gradient Masks Fading into the Orange Banner Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-r from-[#E24611] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-l from-[#E04B0B] to-transparent pointer-events-none" />

            <div className="animate-marquee-logos gap-5 flex py-2">
              {/* Copy 1 */}
              {logos.map((logo) => (
                <motion.div 
                  key={`copy1-${logo.id}`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl p-4 flex items-center justify-center min-h-[80px] shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer"
                >
                  {logo.render()}
                </motion.div>
              ))}
              
              {/* Copy 2 (Duplicated for Seamless Loop) */}
              {logos.map((logo) => (
                <motion.div 
                  key={`copy2-${logo.id}`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl p-4 flex items-center justify-center min-h-[80px] shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer"
                >
                  {logo.render()}
                </motion.div>
              ))}

              {/* Copy 3 (Extra buffer to ensure screen width coverage on large viewports) */}
              {logos.map((logo) => (
                <motion.div 
                  key={`copy3-${logo.id}`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl p-4 flex items-center justify-center min-h-[80px] shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer"
                >
                  {logo.render()}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
