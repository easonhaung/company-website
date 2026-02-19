import { NextResponse } from 'next/server'
import { verifyAuthToken } from '@/lib/auth-supabase'

export async function GET(request: Request) {
  const token = request.headers.get('cookie')
    ?.split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('supabase_session='))
    ?.split('=')[1]

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const user = await verifyAuthToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
