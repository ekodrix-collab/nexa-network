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
    
    const existing = await prisma.project.findUnique({
      where: { id: params.id },
      select: { imageUrl: true }
    })

    const project = await prisma.project.update({
      where: { id: params.id },
      data
    })

    if (existing && existing.imageUrl && existing.imageUrl !== data.imageUrl) {
      await deleteUploadedFile(existing.imageUrl)
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      select: { imageUrl: true }
    })

    await prisma.project.delete({
      where: { id: params.id }
    })

    if (project && project.imageUrl) {
      await deleteUploadedFile(project.imageUrl)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
