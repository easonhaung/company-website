import { NextResponse } from 'next/server'
import { getContentList, getContentItem, updateContentItem, deleteContentItem, createContentItem, authenticateRequest, checkPermission } from '@/lib/admin-supabase'

export async function GET(request: Request) {
  const user = await authenticateRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const path = searchParams.get('path')

  try {
    if (path) {
      // Get single content item
      const item = await getContentItem(user.email, path)
      if (!item) {
        return NextResponse.json({ error: 'Content not found' }, { status: 404 })
      }
      return NextResponse.json(item)
    } else {
      // Get content list
      const items = await getContentList(user.email, type || undefined)
      return NextResponse.json(items)
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const user = await authenticateRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  if (!checkPermission(user, 'editor')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const updated = await updateContentItem(user.email, body)
    return NextResponse.json({ success: updated })
  } catch (error: any) {
    console.error('Update error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const user = await authenticateRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  if (!checkPermission(user, 'editor')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case 'create':
        const created = await createContentItem(user.email, data)
        return NextResponse.json({ success: created })
      
      case 'delete':
        const deleted = await deleteContentItem(user.email, data.filename)
        return NextResponse.json({ success: deleted })
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Action error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const runtime = 'nodejs'
