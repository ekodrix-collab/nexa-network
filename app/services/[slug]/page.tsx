import { Metadata } from 'next'
import { serviceData } from '@/data/services'
import ClientPage from './ClientPage'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return serviceData.map((service) => ({
    slug: service.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = serviceData.find((s) => s.slug === params.slug)
  
  if (!service) {
    return {
      title: 'Service Not Found | Nexa Network Solutions',
    }
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const service = serviceData.find((s) => s.slug === params.slug)
  
  if (!service) {
    notFound()
  }

  return <ClientPage params={params} />
}
