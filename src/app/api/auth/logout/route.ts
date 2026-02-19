import { NextResponse } from 'next/server'
import { logoutUser } from '@/lib/auth-supabase'

export async function GET() {
  try {
    // 登出 Supabase 用戶
    await logoutUser()
    
    const response = NextResponse.redirect(new URL('/admin', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
    
    // 清除 Supabase session cookie
    response.cookies.set('supabase_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
