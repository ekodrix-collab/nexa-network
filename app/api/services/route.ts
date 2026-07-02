import { NextResponse } from 'next/server'
import { query, parseRowsJson } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const services = await query('SELECT * FROM service WHERE active = 1 ORDER BY orderIndex ASC')
    const parsedServices = parseRowsJson(services, ['features', 'stats', 'partners', 'projects', 'faqs'])
    return NextResponse.json(parsedServices)
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}
