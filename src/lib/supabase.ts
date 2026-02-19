import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 認證相關函數
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(error.message)
  }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return session
}

// 管理員角色檢查
export async function checkAdminRole(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', userId)
    .single()
  
  if (error || !data) {
    return false
  }
  
  return data.role === 'admin'
}

export async function getUserRole(userId: string): Promise<'admin' | 'editor' | null> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', userId)
    .single()
  
  if (error || !data) {
    return null
  }
  
  return data.role as 'admin' | 'editor'
}

// 創建管理員用戶
export async function createAdminUser(email: string, role: 'admin' | 'editor') {
  // 首先創建 Supabase 用戶
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  })
  
  if (authError) {
    throw new Error(`創建用戶失敗: ${authError.message}`)
  }
  
  // 然後添加到管理員表
  const { data: roleData, error: roleError } = await supabase
    .from('admin_users')
    .insert({
      user_id: authData.user.id,
      email,
      role,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()
  
  if (roleError) {
    // 如果角色設置失敗，刪除用戶
    await supabase.auth.admin.deleteUser(authData.user.id)
    throw new Error(`設置管理員角色失敗: ${roleError.message}`)
  }
  
  return roleData
}

// 獲取所有管理員用戶
export async function getAdminUsers() {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    throw new Error(`獲取管理員列表失敗: ${error.message}`)
  }
  
  return data
}

// 更新用戶角色
export async function updateUserRole(userId: string, role: 'admin' | 'editor') {
  const { data, error } = await supabase
    .from('admin_users')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single()
  
  if (error) {
    throw new Error(`更新用戶角色失敗: ${error.message}`)
  }
  
  return data
}

// 刪除管理員用戶
export async function deleteAdminUser(userId: string) {
  const { error } = await supabase
    .from('admin_users')
    .delete()
    .eq('user_id', userId)
  
  if (error) {
    throw new Error(`刪除管理員失敗: ${error.message}`)
  }
  
  // 同時刪除 Supabase 用戶
  await supabase.auth.admin.deleteUser(userId)
}
