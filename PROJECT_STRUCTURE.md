# 📁 專案結構

## 🎯 簡潔的專案結構

```
company-website/
├── 📄 配置檔案
│   ├── .env.local              # 本地環境變數（不提交到 Git）
│   ├── .env.local.example      # 環境變數範本
│   ├── .gitignore           # Git 忽略規則
│   ├── package.json          # 專案依賴和腳本
│   └── tsconfig.json         # TypeScript 配置
│
├── 🔒 安全認證
│   └── src/lib/
│       ├── auth-jwt.ts      # JWT 認證 + bcrypt 密碼
│       └── admin-simple.ts    # 內容管理
│
├── 🌐 API 路由
│   └── src/app/api/
│       ├── auth/
│       │   ├── login/     # 登入 API
│       │   ├── user/      # 用戶驗證
│       │   └── logout/    # 登出 API
│       └── admin/
│           ├── content/    # 內容 CRUD API
│           ├── upload/     # 圖片上傳 API
│           └── images/     # 圖片列表 API
│
├── 🎨 管理後台
│   └── src/app/admin/
│       └── dashboard/    # 管理介面
│
├── 📝 內容管理
│   └── src/lib/admin-simple.ts  # 內容讀取和寫入
│
├── 🖼️ 圖片管理
│   ├── public/news/          # 圖片儲存目錄
│   └── scripts/
│       ├── sync-images.ts  # 圖片同步工具
│       └── change-password-secure.ts  # 安全密碼變更
│
├── 📄 內容
│   └── content/            # MDX 內容檔案
│       ├── news/            # 新聞內容
│       ├── page/            # 頁面內容
│       ├── product/         # 產品內容
│       └── technology/     # 技術內容
│
├── 🎨 前端頁面
│   ├── src/app/page.tsx      # 首頁
│   ├── src/app/news/          # 新聞列表頁
│   └── src/app/admin/      # 管理後台
│
├── 🛠️ 安全工具
│   └── scripts/
│       ├── security-check.ts  # 安全檢查工具
│       └── clean-all-content.ts  # 內容清理工具
│
├── 📚 文檔
│   ├── README.md            # 專案說明
│   ├── SECURITY_GUIDE.md    # 安全指南
│   └── ADMIN_USER_GUIDE.md # 使用指南
│
└── 🗂️ 版本控制
    └── .git/               # Git 版本管理
```

## 🔒 安全特色

### 三層安全防護

1. **密碼安全層**
   - bcrypt 雜湊 (10 rounds)
   - 環境變數保護
   - 自動備份機制

2. **認證安全層**
   - JWT Token 認證
   - HTTP-only Cookies
   - CSRF 防護
   - 24小時過期

3. **傳輸安全層**
   - HTTPS 強制（生產）
   - Secure Cookie Flag
   - Content Security Policy

## 🚀 開發工具

```bash
# 開發伺服器
npm run dev

# 密碼管理
npm run change-password:admin NewPassword123!

# 安全檢查
npm run security-check

# 圖片同步
npm run backup-images

# 內容清理
npm run clean-content
```

## 📊 核心檔案

### 必需檔案
- `src/lib/auth-jwt.ts` - 認證核心
- `src/lib/admin-simple.ts` - 內容管理
- `src/app/admin/dashboard/page.tsx` - 管理介面
- `package.json` - 專案配置

### 配置檔案
- `.env.local` - 本地環境變數
- `.env.local.example` - 環境變數範本
- `.gitignore` - Git 忽略規則

### 文檔
- `README.md` - 專案說明
- `SECURITY_GUIDE.md` - 安全指南
- `ADMIN_USER_GUIDE.md` - 使用指南

## 🎯 專案優勢

- ✅ **模組化設計**：清晰的檔案結構
- ✅ **安全第一**：企業級安全標準
- ✅ **易於維護**：完整的工具鏈
- ✅ **文檔完整**：詳細的使用指南
- ✅ **版本控制**：Git 支援

---

**💡 這是一個現代化、安全、易於維護的企業級管理後台！**
