import { NextResponse } from 'next/server'
import { query, execute, buildInsertQuery, parseRowsJson } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

export const dynamic = 'force-dynamic'

function isAuthenticated() {
  const token = cookies().get('admin_token')?.value
  return token && verifyToken(token)
}

export async function GET() {
  try {
    const services = await query('SELECT * FROM Service ORDER BY orderIndex ASC')
    const parsedServices = parseRowsJson(services, ['features', 'stats', 'partners', 'projects', 'faqs'])
    return NextResponse.json(parsedServices)
  } catch (error) {
    console.error('Admin GET services error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const { id: inputId, ...createData } = data
    const id = inputId || randomUUID()
    
    const insertQuery = buildInsertQuery('Service', { id, ...createData })
    if (insertQuery) {
      await execute(insertQuery.sql, insertQuery.values)
    }
    
    return NextResponse.json({ id, ...createData })
  } catch (error) {
    console.error('Admin POST service error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
