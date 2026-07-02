import { NextResponse } from 'next/server'
import { execute, buildUpdateQuery } from '@/lib/db'
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
    
    const updateQuery = buildUpdateQuery('Career', params.id, updateData)
    if (updateQuery) {
      await execute(updateQuery.sql, updateQuery.values)
    }
    
    return NextResponse.json({ id: params.id, ...updateData })
  } catch (error) {
    console.error('Admin PUT career error:', error)
    return NextResponse.json({ error: 'Failed to update career' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await execute('DELETE FROM Career WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin DELETE career error:', error)
    return NextResponse.json({ error: 'Failed to delete career' }, { status: 500 })
  }
}
