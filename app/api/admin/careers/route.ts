export const dynamic = 'force-dynamic'

// Trigger IDE type definition refresh after Prisma schema updates (refreshed)
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

function isAuthenticated() {
  const token = cookies().get('admin_token')?.value
  return token && verifyToken(token)
}

export async function GET() {
  try {
    const careers = await prisma.career.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(careers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const { id, createdAt, updatedAt, ...createData } = data
    const career = await prisma.career.create({ data: createData })
    return NextResponse.json(career)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create career opening' }, { status: 500 })
  }
}
