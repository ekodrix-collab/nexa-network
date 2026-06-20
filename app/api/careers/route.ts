export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(careers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 })
  }
}
