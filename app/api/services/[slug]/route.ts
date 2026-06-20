import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { slug: params.slug }
    })

    if (!service || !service.active) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
  }
}
