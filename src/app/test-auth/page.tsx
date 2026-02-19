"use client";
import { useState, useEffect } from 'react';

export default function TestAuth() {
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/user');
      const data = await res.json();
      setAuthStatus({
        status: res.status,
        data,
        cookies: document.cookie
      });
    } catch (error: any) {
      setAuthStatus({
        error: error?.message || 'Unknown error',
        cookies: document.cookie
      });
    } finally {
      setLoading(false);
    }
  }

  async function testLogin() {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'NewSecurePassword2024!' }),
      });
      const data = await res.json();
      console.log('Login response:', data);
      
      if (res.ok) {
        // 等待一下再檢查
        setTimeout(checkAuth, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  if (loading) {
    return <div>載入中...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">認證測試</h1>
      
      <div className="mb-6">
        <button 
          onClick={testLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded mr-4"
        >
          測試登入
        </button>
        
        <button 
          onClick={checkAuth}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          檢查認證
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">認證狀態：</h2>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(authStatus, null, 2)}
        </pre>
      </div>

      <div className="bg-gray-100 p-4 rounded mt-4">
        <h2 className="font-bold mb-2">當前 Cookies：</h2>
        <pre className="text-xs">
          {document.cookie}
        </pre>
      </div>
    </div>
  );
}
