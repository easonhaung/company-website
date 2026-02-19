import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase 配置
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

function assertFirebaseClientConfig() {
  const missingKeys: string[] = []

  if (!firebaseConfig.apiKey) missingKeys.push('NEXT_PUBLIC_FIREBASE_API_KEY')
  if (!firebaseConfig.authDomain) missingKeys.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN')
  if (!firebaseConfig.projectId) missingKeys.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID')
  if (!firebaseConfig.appId) missingKeys.push('NEXT_PUBLIC_FIREBASE_APP_ID')

  if (missingKeys.length > 0) {
    throw new Error(
      `Firebase env is missing: ${missingKeys.join(', ')}. ` +
        `Check your .env.local and restart \"npm run dev\".`
    )
  }
}

// 初始化 Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

let auth: ReturnType<typeof getAuth> | null = null
let googleProvider: GoogleAuthProvider | null = null

function getClientAuth() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth is only available in the browser')
  }

  assertFirebaseClientConfig()

  if (!auth) {
    auth = getAuth(app)
  }

  return auth
}

function getGoogleProvider() {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider()
  }

  return googleProvider
}

// Google 登入
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(getClientAuth(), getGoogleProvider())
    return result.user
  } catch (error) {
    console.error('Google 登入失敗:', error)
    throw error
  }
}

// 登出
export async function signOutUser() {
  try {
    await signOut(getClientAuth())
  } catch (error) {
    console.error('登出失敗:', error)
    throw error
  }
}

// 監聽認證狀態
export function onAuthStateChanged(callback: (user: any) => void) {
  return firebaseOnAuthStateChanged(getClientAuth(), callback)
}

// 獲取當前用戶
export function getCurrentUser() {
  try {
    return getClientAuth().currentUser
  } catch {
    return null
  }
}

export { db }
export default app
