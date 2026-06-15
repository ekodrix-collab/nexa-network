import { NextResponse } from 'next/server'
import { 
  getHomePageContent, saveHomePageContent,
  getAboutPageContent, saveAboutPageContent,
  getContactInfo, saveContactInfo
} from '@/lib/settings'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')

  if (page === 'home') {
    const data = await getHomePageContent()
    return NextResponse.json(data)
  }
  if (page === 'about') {
    const data = await getAboutPageContent()
    return NextResponse.json(data)
  }
  if (page === 'contact') {
    const data = await getContactInfo()
    return NextResponse.json(data)
  }

  return NextResponse.json({ error: 'Page not found' }, { status: 404 })
}

export async function POST(request: Request) {
  try {
    const token = cookies().get('admin_token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const data = await request.json()

    if (page === 'home') {
      await saveHomePageContent(data)
      return NextResponse.json({ success: true })
    }
    if (page === 'about') {
      await saveAboutPageContent(data)
      return NextResponse.json({ success: true })
    }
    if (page === 'contact') {
      await saveContactInfo(data)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 })
  } catch (error) {
    console.error('Settings save error:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
