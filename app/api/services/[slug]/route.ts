import { NextResponse } from 'next/server'
import { queryOne, parseRowJson } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const service = await queryOne('SELECT * FROM service WHERE slug = ?', [params.slug])

    if (!service || !service.active) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const parsedService = parseRowJson(service, ['features', 'stats', 'partners', 'projects', 'faqs'])
    return NextResponse.json(parsedService)
  } catch (error) {
    console.error('Failed to fetch service:', error)
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
  }
}
