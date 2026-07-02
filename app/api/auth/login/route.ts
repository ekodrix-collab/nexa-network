import { NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    const cleanUsername = username?.trim()

    // 1. Check if user exists
    console.log('DEBUG: Login attempt for username:', cleanUsername)
    let user = await queryOne('SELECT * FROM AdminUser WHERE username = ?', [cleanUsername])
    console.log('DEBUG: User found in DB:', user ? { id: user.id, username: user.username } : 'NOT_FOUND')

    if (!user) {
      // If no admin user exists at all in the DB, create the first one with the provided credentials.
      const countRes = await query('SELECT COUNT(*) AS count FROM AdminUser')
      const count = countRes && countRes[0] ? countRes[0].count : 0
      
      if (count === 0) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const id = randomUUID()
        await execute('INSERT INTO AdminUser (id, username, password) VALUES (?, ?, ?)', [
          id,
          cleanUsername,
          hashedPassword
        ])
        user = { id, username: cleanUsername, password: hashedPassword }
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('DEBUG: Password comparison result:', isPasswordValid)
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
