import { NextResponse } from 'next/server'
import { getImagesList, authenticateRequest } from '@/lib/admin-supabase'

export async function GET(request: Request) {
  const user = await authenticateRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const images = await getImagesList()
    return NextResponse.json(images)
  } catch (error: any) {
    console.error('獲取圖片列表失敗:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const runtime = 'nodejs'
