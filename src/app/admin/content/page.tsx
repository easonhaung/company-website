'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ContentItem {
  filename: string
  title: string
  size: number
  modified: Date
  type: 'news' | 'page'
}

export default function ContentManagement() {
  const [contents, setContents] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    try {
      const response = await fetch('/api/admin/content')
      if (response.ok) {
        const data = await response.json()
        setContents(data)
      } else {
        setError('獲取內容失敗')
      }
    } catch (error) {
      setError('網路錯誤')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (filename: string) => {
    if (!confirm(`確定要刪除 ${filename} 嗎？`)) {
      return
    }

    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', filename })
      })

      if (response.ok) {
        setContents(contents.filter(c => c.filename !== filename))
      } else {
        setError('刪除失敗')
      }
    } catch (error) {
      setError('網路錯誤')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">載入中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">內容管理</h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              ← 返回控制台
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  內容列表 ({contents.length})
                </h3>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
              <select
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  const type = e.target.value
                  if (type) {
                    router.push(`/admin/content?type=${type}`)
                  } else {
                    router.push('/admin/content')
                  }
                }}
              >
                <option value="">全部</option>
                <option value="news">新聞</option>
                <option value="page">頁面</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          檔案名稱
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          類型
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          大小
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          修改時間
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">操作</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contents.map((content) => (
                        <tr key={content.filename}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {content.filename}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              content.type === 'news' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {content.type === 'news' ? '新聞' : '頁面'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(content.size / 1024).toFixed(1)} KB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {content.modified.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDelete(content.filename)}
                              className="text-red-600 hover:text-red-900"
                            >
                              刪除
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
