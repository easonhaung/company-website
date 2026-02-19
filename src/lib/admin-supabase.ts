import { readdir, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { verifyAuthToken } from './auth-supabase'

// 內容管理函數
export async function getContentList(username: string, type?: string) {
  try {
    const contentDir = path.join(process.cwd(), 'content')
    const files = await readdir(contentDir)
    
    let filteredFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    
    if (type) {
      filteredFiles = filteredFiles.filter(file => file.includes(type))
    }
    
    const contentList = []
    
    for (const file of filteredFiles) {
      const filePath = path.join(contentDir, file)
      const stats = await import('fs').then(fs => fs.statSync(filePath))
      
      contentList.push({
        filename: file,
        title: file.replace(/[-_]/g, ' ').replace(/\.(mdx|md)$/, '').replace(/\b\w/g, l => l.toUpperCase()),
        size: stats.size,
        modified: stats.mtime,
        type: file.includes('news') ? 'news' : 'page'
      })
    }
    
    return contentList.sort((a, b) => b.modified.getTime() - a.modified.getTime())
  } catch (error) {
    console.error('獲取內容列表失敗:', error)
    throw new Error('獲取內容列表失敗')
  }
}

export async function getContentItem(username: string, filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), 'content', filePath)
    const { readFile } = await import('fs/promises')
    const content = await readFile(fullPath, 'utf-8')
    
    return {
      filename: filePath,
      content: content,
      title: filePath.replace(/[-_]/g, ' ').replace(/\.(mdx|md)$/, '').replace(/\b\w/g, l => l.toUpperCase())
    }
  } catch (error) {
    console.error('獲取內容項目失敗:', error)
    throw new Error('內容不存在')
  }
}

export async function updateContentItem(username: string, data: { filename: string; content: string }) {
  try {
    const fullPath = path.join(process.cwd(), 'content', data.filename)
    await writeFile(fullPath, data.content, 'utf-8')
    return true
  } catch (error) {
    console.error('更新內容失敗:', error)
    throw new Error('更新內容失敗')
  }
}

export async function createContentItem(username: string, data: { filename: string; content: string }) {
  try {
    const fullPath = path.join(process.cwd(), 'content', data.filename)
    await writeFile(fullPath, data.content, 'utf-8')
    return true
  } catch (error) {
    console.error('創建內容失敗:', error)
    throw new Error('創建內容失敗')
  }
}

export async function deleteContentItem(username: string, filename: string) {
  try {
    const fullPath = path.join(process.cwd(), 'content', filename)
    const { unlink } = await import('fs/promises')
    await unlink(fullPath)
    return true
  } catch (error) {
    console.error('刪除內容失敗:', error)
    throw new Error('刪除內容失敗')
  }
}

// 圖片管理函數
export async function getImagesList() {
  try {
    const newsDir = path.join(process.cwd(), 'public', 'news')
    const files = await readdir(newsDir)
    
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map(file => {
        const filePath = path.join(newsDir, file)
        return {
          filename: file,
          url: `/news/${file}`,
          size: 0 // 可以在需要時添加文件大小
        }
      })
    
    return imageFiles
  } catch (error) {
    console.error('獲取圖片列表失敗:', error)
    throw new Error('獲取圖片列表失敗')
  }
}

// 認證中間件
export async function authenticateRequest(request: Request) {
  const cookie = request.headers.get('cookie')
  if (!cookie) return null
  
  const token = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('supabase_session='))
    ?.split('=')[1]
    
  if (!token) return null
  
  return await verifyAuthToken(token)
}

// 權限檢查
export function checkPermission(user: any, requiredRole: 'admin' | 'editor' = 'editor') {
  if (!user) return false
  
  if (requiredRole === 'admin' && user.role !== 'admin') {
    return false
  }
  
  return true
}
