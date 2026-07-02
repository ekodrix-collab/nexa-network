export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const careers = await query('SELECT * FROM career WHERE active = 1 ORDER BY createdAt DESC')
    return NextResponse.json(careers)
  } catch (error) {
    console.error('Failed to fetch careers:', error)
    return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 })
  }
}
