export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const career = await queryOne('SELECT * FROM Career WHERE id = ?', [params.id])
    if (!career) {
      return NextResponse.json({ error: 'Career opening not found' }, { status: 404 })
    }
    return NextResponse.json(career)
  } catch (error) {
    console.error('Failed to fetch career details:', error)
    return NextResponse.json({ error: 'Failed to fetch career details' }, { status: 500 })
  }
}
