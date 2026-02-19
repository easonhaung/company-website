'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor'
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/user')
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        router.push('/admin')
      }
    } catch (error) {
      console.error('獲取用戶資料失敗:', error)
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout')
      router.push('/admin')
    } catch (error) {
      console.error('登出失敗:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">載入中...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">未授權存取</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">管理員控制台</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 sm:py-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 歡迎卡片 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1m0 0l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">歡迎回來</dt>
                      <dd className="text-lg font-medium text-gray-900">{user.name}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <div className="text-sm text-gray-500">
                  角色: <span className="font-medium text-gray-900">{user.role === 'admin' ? '系統管理員' : '內容編輯'}</span>
                </div>
              </div>
            </div>

            {/* 快速操作 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7m0 0l-3-3m3 3l3 3m-4-4h8" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">快速操作</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a href="/admin/content" className="font-medium text-indigo-600 hover:text-indigo-500">
                          管理內容 →
                        </a>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* 系統狀態 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a2 2 0 002-2h-4a2 2 0 00-2 2m4 0h8m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">系統狀態</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          運行正常
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 統計資訊 */}
          <div className="mt-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">系統資訊</h3>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="bg-gray-50 px-4 py-5 sm:px-6 sm:py-4 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">用戶 ID</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{user.id.substring(0, 8)}...</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:px-6 sm:py-4 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">電子郵件</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{user.email}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:px-6 sm:py-4 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">權限等級</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {user.role === 'admin' ? '最高' : '標準'}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
