import { NextResponse } from 'next/server'
// Trigger IDE type definition refresh after Prisma schema updates (refreshed)
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

function isAuthenticated() {
  const token = cookies().get('admin_token')?.value
  return token && verifyToken(token)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const { id, createdAt, updatedAt, ...updateData } = data
    const career = await prisma.career.update({
      where: { id: params.id },
      data: updateData
    })
    return NextResponse.json(career)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update career' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await prisma.career.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete career' }, { status: 500 })
  }
}
