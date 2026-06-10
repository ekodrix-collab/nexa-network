import { NextResponse } from 'next/server'
import { setSetting, getSettings } from '@/lib/settings'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keys = searchParams.get('keys')?.split(',') || []
  const data = await getSettings(keys)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const token = cookies().get('admin_token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    // data is an object: { "hero_title": "...", "hero_description": "..." }
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        await setSetting(key, value)
      }
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings save error:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
