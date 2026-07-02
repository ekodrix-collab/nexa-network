import { NextRequest, NextResponse } from 'next/server'
import { execute, buildInsertQuery } from '@/lib/db'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, '').substring(0, 1000)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown'

    const id = randomUUID()
    const insertQuery = buildInsertQuery('contact', {
      id,
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : null,
      company: company ? sanitize(company) : null,
      service: service ? sanitize(service) : null,
      message: sanitize(message),
      status: 'new',
      ipAddress: ip,
    })

    if (insertQuery) {
      await execute(insertQuery.sql, insertQuery.values)
    }

    return NextResponse.json({ success: true, message: 'Thank you! We will contact you within 24 hours.' }, { status: 200 })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 })
  }
}
