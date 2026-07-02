import { NextResponse } from 'next/server'
import { queryOne, execute, buildUpdateQuery } from '@/lib/db'
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
    
    const existing = await queryOne('SELECT imageUrl FROM BlogPost WHERE id = ?', [params.id])

    if (!updateData.slug && updateData.title) {
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    const updateQuery = buildUpdateQuery('BlogPost', params.id, updateData)
    if (updateQuery) {
      await execute(updateQuery.sql, updateQuery.values)
    }

    if (existing && existing.imageUrl && existing.imageUrl !== updateData.imageUrl) {
      await deleteUploadedFile(existing.imageUrl)
    }

    return NextResponse.json({ id: params.id, ...updateData })
  } catch (error) {
    console.error('Admin PUT blog post error:', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const post = await queryOne('SELECT imageUrl FROM BlogPost WHERE id = ?', [params.id])

    await execute('DELETE FROM BlogPost WHERE id = ?', [params.id])

    if (post && post.imageUrl) {
      await deleteUploadedFile(post.imageUrl)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin DELETE blog post error:', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
