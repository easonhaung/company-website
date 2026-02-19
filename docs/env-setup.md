# 🔒 環境變數設定指南

## 📁 檔案結構

```
company-website/
├── .env.local              # 本地環境變數（不提交到 Git）
├── .env.template           # 環境變數範本（可提交到 Git）
├── docs/
│   └── env-setup.md     # 設定指南（本檔案）
└── src/lib/
    └── auth-jwt.ts    # 認證邏輯
```

## 🚀 快速設定

### 1. 建立環境變數檔案

```bash
# 複製範本檔案
cp .env.template .env.local

# 編輯環境變數
nano .env.local
# 或使用 VS Code 開啟
```

### 2. 設定管理員密碼

```bash
# 變更管理員密碼
npm run change-password:admin YourNewSecurePassword2025!

# 變更編輯者密碼
npm run change-password:editor YourNewSecurePassword2025!
```

### 3. 設定 JWT 密鑰

```bash
# 生成安全的 JWT 密鑰
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 複製到 .env.local
echo "JWT_SECRET=your-generated-secret-key" >> .env.local
```

## 🔒 安全最佳實踐

### ✅ 必須設定

1. **JWT_SECRET**：生產環境必須設定強密鑰
2. **密碼雜湊**：使用 bcrypt，不使用明文
3. **環境分離**：開發、測試、生產環境分開設定

### ⚠️ 絕不提交

```gitignore
# 確保 .gitignore 包含
.env.local
.env*.local
.env
.env.*.key
```

### 🔧 開發環境建議

```bash
# 開發模式
NODE_ENV=development

# 測試模式
NODE_ENV=test

# 生產模式
NODE_ENV=production
```

## 🔄 密碼管理

### 變更密碼流程

1. **使用安全工具**：
   ```bash
   npm run change-password:admin NewPassword123!
   ```

2. **自動安全檢查**：
   - 密碼長度 ≥ 8 字元
   - 包含大小寫字母、數字、特殊字元
   - 使用 bcrypt 雜湊（10 rounds）

3. **自動備份**：
   - 原始檔案備份為 `.backup`
   - 變更記錄到控制台

### 密碼強度要求

- ✅ 至少 8 個字元
- ✅ 包含大寫字母 (A-Z)
- ✅ 包含小寫字母 (a-z)
- ✅ 包含數字 (0-9)
- ✅ 包含特殊字元 (!@#$%^&*)

## 🌐 生產環境部署

### 環境變數設定

```bash
# 生產環境
export NODE_ENV=production
export JWT_SECRET=your-production-secret-key
export ADMIN_PASSWORD_HASH=$2b$10$production-admin-hash
export EDITOR_PASSWORD_HASH=$2b$10$production-editor-hash
```

### Docker 部署

```dockerfile
ENV NODE_ENV=production
ENV JWT_SECRET=${JWT_SECRET}
ENV ADMIN_PASSWORD_HASH=${ADMIN_PASSWORD_HASH}
ENV EDITOR_PASSWORD_HASH=${EDITOR_PASSWORD_HASH}
```

## 📋 安全檢查清單

### 部署前檢查

- [ ] JWT_SECRET 已設定且足夠複雜
- [ ] 密碼使用 bcrypt 雜湊
- [ ] .env.local 在 .gitignore 中
- [ ] 生產環境使用不同的密碼
- [ ] 已移除所有測試密碼

### 定期安全維護

- [ ] 每季度更換密碼
- [ ] 定期檢查 JWT 密鑰強度
- [ ] 監控異常登入嘗試
- [ ] 備份重要配置檔案

## 🆘 故障排除

### 常見問題

**Q: 密碼變更後無法登入？**
A: 
1. 檢查 .env.local 是否正確設定
2. 重新啟動開發伺服器
3. 檢查控制台錯誤訊息

**Q: JWT token 過期太快？**
A: 檢查 JWT_SECRET 是否設定，增加 token 有效期

**Q: 環境變數未載入？**
A: 
1. 確認檔案名稱正確 (.env.local)
2. 檢查檔案權限
3. 重啟開發伺服器

---

**💡 記住：永遠不要在程式碼中硬編碼密碼或敏感資訊！**
