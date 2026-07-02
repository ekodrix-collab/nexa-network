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
    const { id, ...updateData } = data
    
    const existing = await queryOne('SELECT imageUrl FROM Service WHERE id = ?', [params.id])

    const updateQuery = buildUpdateQuery('Service', params.id, updateData)
    if (updateQuery) {
      await execute(updateQuery.sql, updateQuery.values)
    }

    if (existing && existing.imageUrl && existing.imageUrl !== data.imageUrl) {
      await deleteUploadedFile(existing.imageUrl)
    }

    return NextResponse.json({ id: params.id, ...updateData })
  } catch (error) {
    console.error('Admin PUT service error:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const service = await queryOne('SELECT imageUrl FROM Service WHERE id = ?', [params.id])

    await execute('DELETE FROM Service WHERE id = ?', [params.id])

    if (service && service.imageUrl) {
      await deleteUploadedFile(service.imageUrl)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin DELETE service error:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
