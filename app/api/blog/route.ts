export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const posts = await query('SELECT * FROM BlogPost ORDER BY createdAt DESC')
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
