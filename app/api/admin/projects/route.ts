import { NextResponse } from 'next/server'
// import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

function isAuthenticated() {
  const token = cookies().get('admin_token')?.value
  return token && verifyToken(token)
}

export async function GET() {
  // const projects = await prisma.project.findMany({ orderBy: { orderIndex: 'asc' } })
  return NextResponse.json([])
}

export async function POST(request: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    // const project = await prisma.project.create({ data })
    return NextResponse.json({ ...data, id: 'mock-project-id' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
