import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { deleteUploadedFile } from '@/lib/uploads'

function isAuthenticated() {
  const token = cookies().get('admin_token')?.value
  return token && verifyToken(token)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const { id, ...updateData } = data
    
    const existing = await prisma.service.findUnique({
      where: { id: params.id },
      select: { imageUrl: true }
    })

    const service = await prisma.service.update({
      where: { id: params.id },
      data: updateData
    })

    if (existing && existing.imageUrl && existing.imageUrl !== data.imageUrl) {
      await deleteUploadedFile(existing.imageUrl)
    }

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
      select: { imageUrl: true }
    })

    await prisma.service.delete({
      where: { id: params.id }
    })

    if (service && service.imageUrl) {
      await deleteUploadedFile(service.imageUrl)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
