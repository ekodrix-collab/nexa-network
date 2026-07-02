export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await queryOne('SELECT * FROM BlogPost WHERE slug = ?', [params.slug])
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}
