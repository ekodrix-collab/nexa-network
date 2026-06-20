export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const career = await prisma.career.findUnique({
      where: { id: params.id }
    })
    if (!career) {
      return NextResponse.json({ error: 'Career opening not found' }, { status: 404 })
    }
    return NextResponse.json(career)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch career details' }, { status: 500 })
  }
}
