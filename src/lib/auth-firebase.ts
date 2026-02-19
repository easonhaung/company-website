import { signInWithGoogle, signOutUser, onAuthStateChanged, getCurrentUser } from './firebase'

export interface AdminUser {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: 'admin' | 'editor'
}

// 管理員用戶列表 (可以從資料庫獲取)
const ADMIN_USERS = [
  {
    uid: 'admin-uid-1',
    email: 'y.m.huang0128@gmail.com',
    displayName: 'Admin User',
    role: 'admin' as const
  }
]

// Google 登入並驗證管理員權限
export async function signInAdmin() {
  try {
    const user = await signInWithGoogle()
    
    // 檢查是否為管理員
    const adminUser = ADMIN_USERS.find(admin => admin.email === user.email)
    
    if (!adminUser) {
      await signOutUser()
      throw new Error('無權限訪問管理後台')
    }
    
    return {
      ...user,
      role: adminUser.role
    }
  } catch (error) {
    console.error('管理員登入失敗:', error)
    throw error
  }
}

// 登出
export async function signOutAdmin() {
  return await signOutUser()
}

// 獲取當前管理員用戶
export function getCurrentAdminUser(): AdminUser | null {
  const user = getCurrentUser()
  if (!user) return null
  
  const adminUser = ADMIN_USERS.find(admin => admin.email === user.email)
  if (!adminUser) return null
  
  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || undefined,
    role: adminUser.role
  }
}

// 監聽認證狀態
export function onAdminAuthStateChanged(callback: (user: AdminUser | null) => void): () => void {
  return onAuthStateChanged((user) => {
    if (!user) {
      callback(null)
      return
    }
    
    const adminUser = ADMIN_USERS.find(admin => admin.email === user.email)
    if (!adminUser) {
      callback(null)
      return
    }
    
    callback({
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || undefined,
      role: adminUser.role
    })
  })
}
