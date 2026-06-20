import { NextResponse } from 'next/server'
// Trigger IDE type definition refresh after Prisma schema updates (refreshed)
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
    const { id, createdAt, updatedAt, ...updateData } = data
    
    const existing = await prisma.blogPost.findUnique({
      where: { id: params.id },
      select: { imageUrl: true }
    })

    if (!updateData.slug && updateData.title) {
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: updateData
    })

    if (existing && existing.imageUrl && existing.imageUrl !== updateData.imageUrl) {
      await deleteUploadedFile(existing.imageUrl)
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      select: { imageUrl: true }
    })

    await prisma.blogPost.delete({
      where: { id: params.id }
    })

    if (post && post.imageUrl) {
      await deleteUploadedFile(post.imageUrl)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
