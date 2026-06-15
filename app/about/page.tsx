import AboutClient from './AboutClient'
import { getAboutPageContent } from '@/lib/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Nexa Network Solutions',
  description: "Learn about Nexa Network Solutions, Qatar's leading systems integrator delivering network infrastructure, threat defense, and smart cloud architectures.",
}

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const content = await getAboutPageContent()
  return <AboutClient content={content} />
}
