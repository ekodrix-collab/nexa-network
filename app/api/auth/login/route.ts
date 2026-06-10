import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    // 1. Check if user exists
    let user = await prisma.adminUser.findUnique({ where: { username } })

    // If no admin user exists at all in the DB, create the first one with the provided credentials.
    // This makes the initial setup easy, but is a bit of a security risk if left exposed in production.
    // For a simple lightweight panel, we allow initial creation if count === 0
    const count = await prisma.adminUser.count()
    if (count === 0) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await prisma.adminUser.create({
        data: {
          username,
          password: hashedPassword,
        }
      })
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // 3. Generate token
    const token = signToken({ id: user.id, username: user.username })

    // 4. Set cookie
    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
