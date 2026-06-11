import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

function isAuthenticated() {
  const token = cookies().get('admin_token')?.value
  return token && verifyToken(token)
}

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { orderIndex: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(request: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const service = await prisma.service.create({ data })
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
