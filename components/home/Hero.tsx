'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import ParticleCanvas from '@/components/ui/ParticleCanvas'

// ... in the component body ...
// We will target the replace range to cover lines 1 to 154, so let's write the complete replacement block here.
export default function Hero({ settings }: { settings?: Record<string, string> }) {
  const s = settings || {}
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1C22]"
    >
      {/* ── LAYERED BACKGROUNDS ── */}
      <div className="absolute inset-0 z-0">
        {/* Base dark cover */}
        <div className="absolute inset-0 bg-[#0D1C22]" />

        {/* Video Background (highly optimized 3.7MB, no audio, styled blur layer) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 filter blur-[2px] scale-[1.01] pointer-events-none"
        >
          <source src={s.hero_video || "/videos/hero-bg-compressed.mp4"} type="video/mp4" />
        </video>

        {/* Fallback Static background image if video doesn't load */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
          style={{ backgroundImage: `url('${s.hero_image || "/images/hero-bg.jpg"}')`, zIndex: -1 }}
        />

        {/* Gradient overlays matching layout */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1C22]/95 via-[#0D1C22]/60 to-[#0D1C22]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1C22] via-transparent to-[#0D1C22]/20 pointer-events-none" />
      </div>

      {/* ── PARTICLE CANVAS ── */}
      <div className="absolute inset-0 opacity-40 z-1">
        <ParticleCanvas count={60} color="240,91,27" interactive />
      </div>

      {/* ── AMBIENT GLOWS ── */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none z-1"
      >
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px]
                       bg-[#F05B1B]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px]
                       bg-blue-500/3 rounded-full blur-[130px]" />
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full 
                         border border-[#F05B1B]/25 bg-[#F05B1B]/[0.06] backdrop-blur-md
                         text-[#F05B1B] text-[10px] font-mono font-bold tracking-[0.3em] uppercase mb-6
                         shadow-[0_0_20px_rgba(240,91,27,0.12)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F05B1B] animate-pulse" />
              {s.hero_subtitle || 'Empowering Businesses'}
            </motion.div>
 
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6.5xl lg:text-7xl font-black text-white
                             leading-[1.1] tracking-tight mb-8 font-bold select-none">
                <span className="block text-white filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                  {s.hero_title ? s.hero_title.split(' ')[0] : 'INFRASTRUCTURE'}
                </span>
                <span 
                  className="block bg-gradient-to-r from-[#F05B1B] via-[#FF7D44] to-[#F05B1B] bg-clip-text text-transparent
                             tracking-wide py-1"
                  style={{ 
                    textShadow: '0 0 40px rgba(240, 91, 27, 0.4), 0 0 10px rgba(240, 91, 27, 0.2)'
                  }}
                >
                  {s.hero_title ? s.hero_title.substring(s.hero_title.indexOf(' ') + 1) : 'FOR THE FUTURE'}
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md mb-8 whitespace-pre-wrap">
                {s.hero_description || 'Secure. Scalable. Intelligent.\nBuilt for enterprises that demand excellence.'}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                href="/contact"
                className="group relative flex items-center gap-3 px-6 py-3.5
                           bg-[#F05B1B] text-white font-bold text-xs rounded-full
                           overflow-hidden transition-all duration-300
                           hover:shadow-[0_0_30px_rgba(240,91,27,0.4)] hover:scale-105"
              >
                <span className="relative z-10">Schedule a Consultation</span>
                <div className="relative z-10 w-6 h-6 bg-white/20 rounded-full
                               flex items-center justify-center transition-transform duration-300
                               group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
                <div className="absolute inset-0 bg-[#FF6B2B] translate-y-full
                               group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <a
                href="/documents/nexa-brochure.pdf"
                download
                className="group flex items-center gap-3 text-white font-bold text-xs
                           hover:text-[#F05B1B] transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-white/10 rounded-full
                               flex items-center justify-center transition-all duration-300
                               group-hover:border-[#F05B1B]/40 group-hover:bg-white/5">
                  <Download className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                Download Brochure
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Advanced Floating Tech Hologram & Radar Dashboard */}
          <div className="hidden lg:flex items-center justify-center relative">
            
            {/* Ambient Background Glow behind the hologram (Cyan/Orange contrast) */}
            <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-[#F05B1B]/10 to-cyan-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

            {/* Futuristic Corner Lock Target Brackets */}
            <div className="absolute -top-6 -left-6 w-8 h-8 border-t-2 border-l-2 border-[#F05B1B]/45 rounded-tl-xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-8 h-8 border-t-2 border-r-2 border-[#F05B1B]/45 rounded-tr-xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-8 h-8 border-b-2 border-l-2 border-cyan-500/35 rounded-bl-xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-8 h-8 border-b-2 border-r-2 border-cyan-500/35 rounded-br-xl pointer-events-none" />

            {/* Small Monospace Tech Status Labels */}
            <div className="absolute -top-12 left-4 px-2 py-0.5 rounded border border-white/5 bg-[#070f12]/80 backdrop-blur-md text-[8px] font-mono tracking-widest text-[#F05B1B] animate-pulse">
              SYS.LOC: DOHA_HQ
            </div>
            <div className="absolute -bottom-12 right-4 px-2 py-0.5 rounded border border-white/5 bg-[#070f12]/80 backdrop-blur-md text-[8px] font-mono tracking-widest text-cyan-400 animate-pulse" style={{ animationDelay: '1s' }}>
              QATAR_SYS_UP: 99.9%
            </div>

            {/* Main floating wrapper */}
            <motion.div
              animate={{ 
                y: [-8, 8],
                rotate: [0, 0.5, -0.5, 0]
              }}
              transition={{ 
                y: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
              }}
              className="relative w-[380px] h-[380px] flex items-center justify-center"
            >
              {/* Ring 1: Outer rotating solid orange indicator ring */}
              <div
                className="absolute inset-0 rounded-full border border-[#F05B1B]/20 animate-spin-slow opacity-60"
                style={{ animationDuration: '40s', borderWidth: '1.2px' }}
              >
                {/* Micro tech nodes mounted on the outer ring */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#F05B1B] rounded-full shadow-[0_0_8px_#F05B1B]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#F05B1B] rounded-full shadow-[0_0_8px_#F05B1B]" />
              </div>

              {/* Ring 2: Dotted Cyan Ring spinning reverse */}
              <div
                className="absolute inset-4 rounded-full border border-dashed border-cyan-500/25 animate-spin-reverse opacity-70"
                style={{ animationDuration: '24s' }}
              />

              {/* Ring 3: Radar Sweep Gradient Slice */}
              <div 
                className="absolute inset-10 rounded-full opacity-[0.12] animate-spin"
                style={{
                  background: 'conic-gradient(from 0deg, #F05B1B, transparent 55%)',
                  animationDuration: '7s'
                }}
              />

              {/* Ring 4: Pulsing Outer Border Halo */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-14 rounded-full border border-[#F05B1B]/40 pointer-events-none z-1"
              />

              {/* Center Cutout Server Room Sphere (Slow rotation) */}
              <div className="absolute inset-[68px] rounded-full overflow-hidden border-2 border-[#F05B1B]/35 bg-[#070f12] shadow-[0_0_50px_rgba(240,91,27,0.25)] flex items-center justify-center group cursor-pointer z-10">
                <motion.img 
                  src="/images/hero_cutout.png" 
                  alt="Futuristic Network Infrastructure" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Tech overlay tint & glassy glares */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#F05B1B]/15 via-transparent to-white/10 pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 bg-[#070f12]/15 pointer-events-none" />
                <div className="absolute inset-0 border border-white/10 rounded-full pointer-events-none" />
              </div>

              {/* Ring 5: Rotating Monospace SVG Technical Text */}
              <svg className="absolute w-full h-full animate-spin-slow pointer-events-none" style={{ animationDuration: '50s' }} viewBox="0 0 200 200">
                <path
                  id="textCirclePath"
                  d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                  fill="none"
                />
                <text className="text-[5.5px] font-mono font-black fill-white/30 tracking-[0.28em] uppercase">
                  <textPath href="#textCirclePath" startOffset="0%">
                    • NEXA SECURITY INTEGRATION • 10G BACKBONE DATA LINK • DOHA ENTERPRISE NETWORK •
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* ── SCROLL TO DISCOVER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-8 left-6 md:left-12 flex items-center gap-4 cursor-pointer z-10 group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-white/30 text-[9px] font-bold tracking-[0.25em] uppercase transition-colors group-hover:text-white/60">
          Scroll to Discover
        </span>
        <div className="w-16 h-px bg-white/15 relative overflow-hidden group-hover:bg-white/30 transition-colors">
          <motion.div
            animate={{ x: [-16, 64] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 top-0 bottom-0 w-4 bg-[#F05B1B]/80"
          />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#F05B1B]" />
      </motion.div>
    </section>
  )
}
