import { createAdminUser } from '../src/lib/supabase'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function setupSupabaseAdmins() {
  console.log('🔥 Supabase 管理員設置')
  console.log('====================\n')

  try {
    // 檢查環境變數
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('❌ 請先設置 Supabase 環境變數')
      console.log('在 .env.local 中添加:')
      console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
      console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
      process.exit(1)
    }

    // 創建管理員用戶
    console.log('創建管理員用戶...')
    const adminEmail = await question('輸入管理員電子郵件: ')
    const adminPassword = await question('輸入管理員密碼: ')
    
    // 注意: 這裡需要 Supabase Service Role Key 才能創建用戶
    console.log('⚠️  注意: 創建用戶需要在 Supabase 中手動創建，然後使用以下 SQL 添加角色:')
    console.log('\n-- 在 Supabase SQL Editor 中執行:')
    console.log(`-- 創建 admin_users 表`)
    console.log(`CREATE TABLE IF NOT EXISTS admin_users (
      user_id UUID PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`)
    console.log(`\n-- 添加管理員角色`)
    console.log(`INSERT INTO admin_users (user_id, email, role) 
    VALUES ('用戶的UUID', '${adminEmail}', 'admin')
    ON CONFLICT (user_id) DO UPDATE SET 
      email = EXCLUDED.email,
      role = EXCLUDED.role,
      updated_at = NOW();`)

    console.log('\n🎉 設置完成!')
    console.log('\n下一步:')
    console.log('1. 在 Supabase Console 中創建用戶')
    console.log('2. 執行上述 SQL 添加管理員角色')
    console.log('3. 測試登入功能')

  } catch (error) {
    console.error('❌ 設置失敗:', error)
  } finally {
    rl.close()
  }
}

if (require.main === module) {
  setupSupabaseAdmins()
}
