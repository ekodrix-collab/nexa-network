export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { query, execute, buildInsertQuery } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

function isAuthenticated() {
  const token = cookies().get('admin_token')?.value
  return token && verifyToken(token)
}

export async function GET() {
  try {
    const careers = await query('SELECT * FROM Career ORDER BY createdAt DESC')
    return NextResponse.json(careers)
  } catch (error) {
    console.error('Admin GET careers error:', error)
    return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const { id: inputId, createdAt, updatedAt, ...createData } = data
    const id = inputId || randomUUID()
    
    const insertQuery = buildInsertQuery('Career', { id, ...createData })
    if (insertQuery) {
      await execute(insertQuery.sql, insertQuery.values)
    }
    
    return NextResponse.json({ id, ...createData })
  } catch (error) {
    console.error('Admin POST career error:', error)
    return NextResponse.json({ error: 'Failed to create career opening' }, { status: 500 })
  }
}
