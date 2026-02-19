import fs from 'fs';
import path from 'path';

// 圖片同步工具 - 在不同裝置間同步圖片

const SOURCE_DIR = path.join(process.cwd(), 'public', 'news');
const BACKUP_DIR = path.join(process.cwd(), 'backups', 'images');
const EXPORT_DIR = path.join(process.cwd(), 'exports', 'images');

function ensureDirectory(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyImages() {
  console.log('🖼️  開始同步圖片...');
  
  // 確保目錄存在
  ensureDirectory(BACKUP_DIR);
  ensureDirectory(EXPORT_DIR);

  try {
    const files = fs.readdirSync(SOURCE_DIR);
    const imageFiles = files.filter(file => {
      const ext = file.toLowerCase().split('.').pop();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
    });

    console.log(`📁 找到 ${imageFiles.length} 張圖片`);

    // 複製到備份目錄
    imageFiles.forEach(file => {
      const sourcePath = path.join(SOURCE_DIR, file);
      const backupPath = path.join(BACKUP_DIR, file);
      const exportPath = path.join(EXPORT_DIR, file);

      try {
        fs.copyFileSync(sourcePath, backupPath);
        fs.copyFileSync(sourcePath, exportPath);
        console.log(`✅ 已備份: ${file}`);
      } catch (error) {
        console.error(`❌ 備份失敗: ${file}`, error);
      }
    });

    // 創建清單檔案
    const manifest = {
      timestamp: new Date().toISOString(),
      totalImages: imageFiles.length,
      files: imageFiles.map(file => {
        const filePath = path.join(SOURCE_DIR, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          modified: stats.mtime.toISOString(),
          path: `/news/${file}`
        };
      })
    };

    fs.writeFileSync(
      path.join(BACKUP_DIR, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    fs.writeFileSync(
      path.join(EXPORT_DIR, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    console.log('📋 已創建清單檔案');
    console.log('✅ 圖片同步完成！');
    
    console.log('\n📂 目錄位置：');
    console.log(`原始: ${SOURCE_DIR}`);
    console.log(`備份: ${BACKUP_DIR}`);
    console.log(`匯出: ${EXPORT_DIR}`);

  } catch (error) {
    console.error('❌ 同步失敗:', error);
  }
}

function restoreImages() {
  console.log('🔄 開始還原圖片...');
  
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('❌ 備份目錄不存在');
    return;
  }

  try {
    const manifestPath = path.join(BACKUP_DIR, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      console.log('❌ 清單檔案不存在');
      return;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log(`📋 找到 ${manifest.totalImages} 張圖片備份`);

    // 確保目標目錄存在
    ensureDirectory(SOURCE_DIR);

    manifest.files.forEach((file: any) => {
      const backupPath = path.join(BACKUP_DIR, file.name);
      const targetPath = path.join(SOURCE_DIR, file.name);

      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, targetPath);
        console.log(`✅ 已還原: ${file.name}`);
      } else {
        console.warn(`⚠️  備份檔案不存在: ${file.name}`);
      }
    });

    console.log('✅ 圖片還原完成！');

  } catch (error) {
    console.error('❌ 還原失敗:', error);
  }
}

// 命令列介面
const command = process.argv[2];

switch (command) {
  case 'backup':
  case 'sync':
    copyImages();
    break;
  case 'restore':
    restoreImages();
    break;
  default:
    console.log('用法：');
    console.log('  npx tsx scripts/sync-images.ts backup  - 備份圖片');
    console.log('  npx tsx scripts/sync-images.ts restore - 還原圖片');
    break;
}
