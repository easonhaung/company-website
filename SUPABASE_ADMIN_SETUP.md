# Supabase 管理員系統設置指南

## 🚀 快速開始

### 1. 環境變數配置

你已經在 Vercel 配置了 Supabase，確保本地也有相同的環境變數：

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://fdvnqlolqgqmpicezpt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_rWvTfOSxyq-jovLILib84w_gZxO62P1
```

### 2. Supabase 資料庫設置

在 Supabase SQL Editor 中執行以下 SQL：

```sql
-- 創建管理員用戶表
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 啟用 RLS (Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 創建政策 (只有管理員可以查看)
CREATE POLICY "Admins can view all users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- 創建政策 (只有管理員可以修改)
CREATE POLICY "Admins can manage users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

### 3. 創建管理員用戶

#### 方法一：使用 Supabase Console
1. 進入 Supabase Console → Authentication → Users
2. 手動創建管理員用戶
3. 記錄用戶的 UUID

#### 方法二：使用設置腳本
```bash
npm run setup-supabase
```

### 4. 添加管理員角色

在 Supabase SQL Editor 中執行：

```sql
-- 添加管理員角色 (替換為實際的用戶 UUID)
INSERT INTO admin_users (user_id, email, role) 
VALUES ('用戶的UUID', 'admin@example.com', 'admin')
ON CONFLICT (user_id) DO UPDATE SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  updated_at = NOW();

-- 添加編輯角色 (可選)
INSERT INTO admin_users (user_id, email, role) 
VALUES ('用戶的UUID', 'editor@example.com', 'editor')
ON CONFLICT (user_id) DO UPDATE SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  updated_at = NOW();
```

## 📁 檔案結構

```
src/
├── lib/
│   ├── supabase.ts              # Supabase 客戶端配置
│   ├── auth-supabase.ts         # 認證服務
│   └── admin-supabase.ts        # 管理員功能
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/           # 登入 API
│   │       ├── logout/          # 登出 API
│   │       ├── user/            # 用戶驗證 API
│   │       └── debug/           # 調試 API
│   └── admin/
│       ├── page.tsx             # 登入頁面
│       ├── dashboard/           # 管理控制台
│       └── content/             # 內容管理
└── scripts/
    └── setup-supabase.ts        # 設置腳本
```

## 🔐 認證流程

### 1. 登入流程
1. 用戶在 `/admin` 提交電子郵件和密碼
2. 前端調用 `/api/auth/login`
3. 伺服器驗證 Supabase 認證
4. 檢查用戶是否在 `admin_users` 表中
5. 設置 `supabase_session` Cookie

### 2. 權限檢查
- **Admin**: 完全權限，可以管理所有內容和用戶
- **Editor**: 有限權限，只能編輯內容

### 3. Session 管理
- 使用 Supabase 的 Session Token
- Cookie 名稱: `supabase_session`
- 有效期: 24 小時

## 🧪 測試步驟

### 1. 啟動開發伺服器
```bash
npm run dev
```

### 2. 測試認證
```bash
# 測試調試端點
curl "http://localhost:3000/api/auth/debug"
```

### 3. 測試登入
1. 訪問 `http://localhost:3000/admin`
2. 使用創建的管理員帳號登入
3. 應該會重定向到 `/admin/dashboard`

### 4. 測試內容管理
1. 登入後訪問 `/admin/content`
2. 查看內容列表
3. 測試刪除功能

## 🛠️ API 端點

### 認證 API
- `POST /api/auth/login` - 登入
- `GET /api/auth/logout` - 登出
- `GET /api/auth/user` - 獲取當前用戶
- `GET /api/auth/debug` - 調試認證狀態

### 管理員 API
- `GET /api/admin/content` - 獲取內容列表
- `PUT /api/admin/content` - 更新內容
- `POST /api/admin/content` - 創建/刪除內容
- `GET /api/admin/images` - 獲取圖片列表

## 🔧 故障排除

### 常見問題

1. **認證失敗**
   - 檢查 Supabase 環境變數
   - 確認用戶在 `admin_users` 表中
   - 檢查 RLS 政策設置

2. **權限錯誤**
   - 確認用戶角色設置正確
   - 檢查 RLS 政策是否生效

3. **Session 過期**
   - 自動重定向到登入頁面
   - 重新登入即可

### 調試工具
- `/api/auth/debug` - 檢查認證狀態
- 瀏覽器開發者工具 - 查看 Cookie
- Supabase Console - 檢查用戶和資料庫

## 🎉 完成！

現在你就有一個完整的 Supabase 管理員系統！🚀

主要功能：
- ✅ 安全的 Supabase 認證
- ✅ 角色權限管理
- ✅ 內容管理系統
- ✅ 現代化管理界面
- ✅ 完整的錯誤處理
