import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 解析 MDX frontmatter
function parseMDX(content: string): { frontmatter: any; content: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (frontmatterMatch) {
    try {
      const frontmatterText = frontmatterMatch[1];
      const frontmatter: any = {};
      
      // 改進的 YAML 解析
      frontmatterText.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) { // 忽略註釋
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // 處理引號
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            
            frontmatter[key] = value;
          }
        }
      });
      
      const cleanContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
      return { frontmatter, content: cleanContent };
    } catch (e) {
      console.warn('Failed to parse frontmatter:', e);
      return { frontmatter: {}, content };
    }
  }
  
  return { frontmatter: {}, content };
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'news', '2025-03-21-youth-command.mdx');
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content: cleanContent } = parseMDX(content);
    
    return NextResponse.json({
      filePath,
      frontmatter,
      contentLength: cleanContent.length,
      contentPreview: cleanContent.substring(0, 200) + '...',
      rawFrontmatter: content.match(/^---\n([\s\S]*?)\n---/)?.[1]
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace'
    }, { status: 500 });
  }
}

export const runtime = 'nodejs';
