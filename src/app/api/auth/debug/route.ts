import { NextResponse } from 'next/server'
import { verifyAuthToken } from '@/lib/auth-supabase'

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie')
  if (!cookie) {
    return NextResponse.json({ error: 'No cookies found' })
  }
  
  const token = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('supabase_session='))
    ?.split('=')[1]
    
  if (!token) {
    return NextResponse.json({ error: 'No session token found' })
  }

  try {
    const user = await verifyAuthToken(token)
    
    return NextResponse.json({
      token: token.substring(0, 20) + '...',
      user,
      tokenLength: token.length,
      isAuthenticated: !!user
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Token verification failed',
      token: token.substring(0, 20) + '...',
      tokenLength: token.length,
      isAuthenticated: false
    })
  }
}

export const runtime = 'nodejs'
