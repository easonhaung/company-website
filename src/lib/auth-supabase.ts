import { supabase, signInWithEmail, signOut, getCurrentUser, getUserRole } from './supabase'

export interface AdminUser {
  id: string
  email: string
  name?: string
  role: 'admin' | 'editor'
}

// 伺服器端認證函數
export async function authenticateUser(email: string, password: string): Promise<AdminUser | null> {
  try {
    const authData = await signInWithEmail(email, password)
    
    if (!authData.user) {
      return null
    }
    
    // 檢查是否為管理員
    const role = await getUserRole(authData.user.id)
    
    if (!role) {
      return null
    }
    
    return {
      id: authData.user.id,
      email: authData.user.email || email,
      name: authData.user.user_metadata?.name || authData.user.email || email,
      role: role
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

// 驗證 Session Token
export async function verifyAuthToken(token: string): Promise<AdminUser | null> {
  try {
    // 使用 Supabase 驗證 token
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return null
    }
    
    // 檢查用戶角色
    const role = await getUserRole(user.id)
    
    if (!role) {
      return null
    }
    
    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email || '',
      role: role
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

// 創建 Session Token
export async function createSessionToken(user: AdminUser): Promise<{ token: string; expiresAt: Date }> {
  try {
    // 獲取當前 session
    const { data: { session } } = await supabase.auth.setSession({
      access_token: '', // Supabase 會自動處理
      refresh_token: '',
    })
    
    // 使用 Supabase 的 session
    const { data: currentSession } = await supabase.auth.getSession()
    
    if (!currentSession.session) {
      throw new Error('Failed to create session')
    }
    
    return {
      token: currentSession.session.access_token,
      expiresAt: new Date(currentSession.session.expires_at! * 1000)
    }
  } catch (error) {
    console.error('Error creating session token:', error)
    throw error
  }
}

// 登出用戶
export async function logoutUser(): Promise<void> {
  try {
    await signOut()
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

// 取得當前用戶
export async function getCurrentAuthenticatedUser(): Promise<AdminUser | null> {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return null
    }
    
    const role = await getUserRole(user.id)
    
    if (!role) {
      return null
    }
    
    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email || '',
      role: role
    }
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

// 檢查用戶權限
export async function requireAuth(minRole: 'admin' | 'editor' = 'editor'): Promise<{ user: AdminUser; role: 'admin' | 'editor' } | null> {
  const user = await getCurrentAuthenticatedUser()
  
  if (!user) {
    return null
  }
  
  // 檢查角色權限層級
  if (minRole === 'admin' && user.role !== 'admin') {
    return null
  }
  
  return { user, role: user.role }
}

// 舊版相容性函數
export function getAllUsers(): AdminUser[] {
  console.warn('getAllUsers() is deprecated. Use Supabase admin_users table instead.')
  return []
}

export function generateSessionToken(): string {
  console.warn('generateSessionToken() is deprecated. Use Supabase session instead.')
  return ''
}

export function createSession(user: AdminUser): string {
  console.warn('createSession() is deprecated. Use Supabase session instead.')
  return ''
}

export function validateSession(token: string): AdminUser | null {
  console.warn('validateSession() is deprecated. Use verifyAuthToken() instead.')
  return null
}

export function destroySession(token: string): void {
  console.warn('destroySession() is deprecated. Use logoutUser() instead.')
}
