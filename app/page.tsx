import Hero from '@/components/home/Hero'
import Welcome from '@/components/home/Welcome'
import StatsBar from '@/components/home/StatsBar'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import Projects from '@/components/home/Projects'
import CTA from '@/components/home/CTA'
import type { Metadata } from 'next'
import { getHomePageContent } from '@/lib/settings'

export const metadata: Metadata = {
  title: 'Nexa Network Solutions | Enterprise IT Infrastructure Qatar',
  description: "Qatar's leading enterprise IT company delivering network infrastructure, cybersecurity, cloud computing, CCTV, smart entry management, and vehicle tracking solutions.",
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const settings = await getHomePageContent()

  return (
    <div>
      <Hero settings={settings} />
      <Welcome settings={settings} />
      <StatsBar />
      <Services />
      <About settings={settings} />
      <Projects />
      <CTA settings={settings} />
    </div>
  )
}
