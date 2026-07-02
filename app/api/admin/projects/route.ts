export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { query, execute, buildInsertQuery, parseRowsJson } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

function isAuthenticated() {
  const token = cookies().get('admin_token')?.value
  return token && verifyToken(token)
}

export async function GET() {
  try {
    const projects = await query('SELECT * FROM Project ORDER BY orderIndex ASC')
    const parsedProjects = parseRowsJson(projects, ['tags'])
    return NextResponse.json(parsedProjects)
  } catch (error) {
    console.error('Admin GET projects error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const { id: inputId, ...createData } = data
    const id = inputId || randomUUID()
    
    const insertQuery = buildInsertQuery('Project', { id, ...createData })
    if (insertQuery) {
      await execute(insertQuery.sql, insertQuery.values)
    }
    
    return NextResponse.json({ id, ...createData })
  } catch (error) {
    console.error('Admin POST project error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
