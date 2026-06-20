'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollProgress() {
  const pathname = usePathname()
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname?.startsWith('/admin')) return null

  return <div id="scroll-progress" className="fixed top-0 left-0 right-0 h-0.5
    bg-gradient-to-r from-[#F05B1B] to-[#FF8C5A] z-[9999] origin-left scale-x-0" />
}
