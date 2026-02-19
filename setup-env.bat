@echo off
echo 🔒 設定環境變數...

echo JWT_SECRET=ezeech-admin-super-secret-jwt-key-for-production-please-change-this-to-something-very-long-and-secure-2025 > .env.local
echo ADMIN_PASSWORD_HASH=$2b$10$wZSWKbLS/MKhtT/hnhvBLeJ22bCnsLgoXvY.kTlBs9Z/nVFng5ARO >> .env.local
echo EDITOR_PASSWORD_HASH=$2b$10$qaYyTuPdTrPx88fcTz7ytOmZeL3e3TvGhiTMk.go48DN5ny6XY.9y >> .env.local
echo NODE_ENV=development >> .env.local
echo NEXT_PUBLIC_BASE_URL=http://127.0.0.1:3001 >> .env.local

echo ✅ 環境變數設定完成！
echo.
echo 📋 設定的環境變數：
type .env.local
echo.
echo 🚀 現在可以重新啟動開發伺服器：
echo npm run dev
