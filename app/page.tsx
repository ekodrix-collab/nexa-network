import Hero from '@/components/home/Hero'
import Welcome from '@/components/home/Welcome'
import StatsBar from '@/components/home/StatsBar'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import Projects from '@/components/home/Projects'

import CTA from '@/components/home/CTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nexa Network Solutions | Enterprise IT Infrastructure Qatar',
  description: "Qatar's leading enterprise IT company delivering network infrastructure, cybersecurity, cloud computing, CCTV, smart entry management, and vehicle tracking solutions.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <StatsBar />
      <Services />
      <About />
      <Projects />

      <CTA />
    </>
  )
}
