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
    const posts = await query('SELECT * FROM BlogPost ORDER BY createdAt DESC')
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Admin GET blog posts error:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const { id: inputId, createdAt, updatedAt, ...createData } = data
    const id = inputId || randomUUID()
    
    if (!createData.slug && createData.title) {
      createData.slug = createData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }
    
    const insertQuery = buildInsertQuery('BlogPost', { id, ...createData })
    if (insertQuery) {
      await execute(insertQuery.sql, insertQuery.values)
    }
    
    return NextResponse.json({ id, ...createData })
  } catch (error) {
    console.error('Admin POST blog post error:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
