import { NextResponse } from 'next/server'
import { authenticateUser, createSessionToken } from '@/lib/auth-supabase'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // 驗證使用者
    const user = await authenticateUser(email, password)
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // 創建 Supabase session token
    const { token, expiresAt } = await createSessionToken(user)

    // 設定安全 Cookie
    const res = NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      expiresAt: expiresAt.toISOString()
    })

    // HttpOnly, Secure, SameSite=Lax 防護
    res.cookies.set('supabase_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 小時
    })

    // 設定安全標頭
    res.headers.set('X-Content-Type-Options', 'nosniff')
    res.headers.set('X-Frame-Options', 'DENY')
    res.headers.set('X-XSS-Protection', '1; mode=block')
    res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

    return res

  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
