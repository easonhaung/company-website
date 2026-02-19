import fs from 'fs';
import path from 'path';
import { cleanContent } from '../src/lib/content-cleaner';

// 批次清理所有現有內容檔案

const CONTENT_DIR = path.join(process.cwd(), 'content');

function cleanAllFiles() {
  console.log('🧹 開始清理所有內容檔案...');
  
  const directories = ['news', 'page', 'product', 'technology'];
  let totalFiles = 0;
  let cleanedFiles = 0;

  directories.forEach(dir => {
    const dirPath = path.join(CONTENT_DIR, dir);
    
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  目錄不存在: ${dirPath}`);
      return;
    }

    const files = fs.readdirSync(dirPath);
    const mdxFiles = files.filter(file => file.endsWith('.mdx') && file !== 'README.md');
    
    console.log(`\n📁 處理 ${dir}/ 目錄，找到 ${mdxFiles.length} 個檔案`);
    
    mdxFiles.forEach(file => {
      totalFiles++;
      const filePath = path.join(dirPath, file);
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const cleaned = cleanContent(content);
        
        if (cleaned.hasComplexElements) {
          // 備份原始檔案
          const backupPath = path.join(dirPath, `${file}.backup`);
          fs.writeFileSync(backupPath, content);
          
          // 寫入清理後的內容
          fs.writeFileSync(filePath, cleaned.markdown);
          
          console.log(`✅ 已清理: ${file}`);
          console.log(`   📋 備份: ${file}.backup`);
          console.log(`   🖼️  圖片: ${cleaned.images.length} 張`);
          
          cleanedFiles++;
        } else {
          console.log(`ℹ️  無需清理: ${file}`);
        }
        
      } catch (error) {
        console.error(`❌ 處理失敗: ${file}`, error);
      }
    });
  });

  console.log(`\n📊 清理統計：`);
  console.log(`   總檔案數: ${totalFiles}`);
  console.log(`   已清理檔案: ${cleanedFiles}`);
  console.log(`   無需清理: ${totalFiles - cleanedFiles}`);
  
  if (cleanedFiles > 0) {
    console.log('\n💡 提示：');
    console.log('   • 原始檔案已備份為 .backup 檔案');
    console.log('   • 如需還原，請複製 .backup 檔案內容');
    console.log('   • 清理後的內容使用純 Markdown 語法');
  }
}

function restoreFile(fileName: string) {
  const filePath = path.join(CONTENT_DIR, 'news', fileName);
  const backupPath = path.join(CONTENT_DIR, 'news', `${fileName}.backup`);
  
  if (fs.existsSync(backupPath)) {
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    fs.writeFileSync(filePath, backupContent);
    console.log(`✅ 已還原: ${fileName}`);
    fs.unlinkSync(backupPath); // 刪除備份檔案
  } else {
    console.log(`❌ 備份檔案不存在: ${fileName}.backup`);
  }
}

// 命令列介面
const command = process.argv[2];
const fileName = process.argv[3];

switch (command) {
  case 'clean':
    cleanAllFiles();
    break;
  case 'restore':
    if (!fileName) {
      console.log('用法：');
      console.log('  npx tsx scripts/clean-all-content.ts restore <filename.mdx>');
      console.log('');
      console.log('範例：');
      console.log('  npx tsx scripts/clean-all-content.ts restore 2026-02-08-website-launch.mdx');
      break;
    } else {
      restoreFile(fileName);
    }
    break;
  default:
    console.log('用法：');
    console.log('  npx tsx scripts/clean-all-content.ts clean   - 清理所有內容檔案');
    console.log('  npx tsx scripts/clean-all-content.ts restore <filename> - 還原指定檔案');
    break;
}
