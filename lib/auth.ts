import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production')
  }
  console.warn('Warning: JWT_SECRET environment variable is not set. Using insecure default for development.')
}

const SECRET = JWT_SECRET || 'super-secret-key-for-nexa-admin-dashboard-123'

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch (error) {
    return null
  }
}
