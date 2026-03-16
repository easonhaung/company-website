// src/lib/firebase.ts
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type Auth
} from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

type FirebaseWebConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket?: string
  messagingSenderId?: string
  appId: string
  measurementId?: string
}

function getFirebaseWebConfig(): FirebaseWebConfig {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

  const missing: string[] = []
  if (!apiKey) missing.push('NEXT_PUBLIC_FIREBASE_API_KEY')
  if (!authDomain) missing.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN')
  if (!projectId) missing.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID')
  if (!appId) missing.push('NEXT_PUBLIC_FIREBASE_APP_ID')

  if (missing.length) {
    throw new Error(
      `Firebase env is missing: ${missing.join(', ')}. ` +
        `Check your .env.local (project root) and restart "npm run dev".`
    )
  }

  return {
    apiKey: apiKey as string,
    authDomain: authDomain as string,
    projectId: projectId as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: appId as string,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  }
}

let app: FirebaseApp | null = null
let db: Firestore | null = null
let auth: Auth | null = null
let googleProvider: GoogleAuthProvider | null = null

export function getFirebaseApp() {
  if (!app) {
    const config = getFirebaseWebConfig()
    app = getApps().length ? getApp() : initializeApp(config)
  }
  return app
}

export function getDb() {
  if (!db) db = getFirestore(getFirebaseApp())
  return db
}

function getClientAuth() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth is only available in the browser')
  }
  if (!auth) auth = getAuth(getFirebaseApp())
  return auth
}

function getGoogleProvider() {
  if (!googleProvider) googleProvider = new GoogleAuthProvider()
  return googleProvider
}

// Google 登入
export async function signInWithGoogle() {
  const result = await signInWithPopup(getClientAuth(), getGoogleProvider())
  return result.user
}

// 登出
export async function signOutUser() {
  await signOut(getClientAuth())
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

// 兼容你原本用法：export { db }
export const dbCompat = () => getDb()
export default getFirebaseApp