// 內容清理工具 - 將複雜的 JSX 語法轉換為純 Markdown

export interface CleanedContent {
  markdown: string;
  images: string[];
  hasComplexElements: boolean;
}

export function cleanContent(content: string): CleanedContent {
  const images: string[] = [];
  let hasComplexElements = false;
  let cleanedContent = content;

  // 1. 提取圖片路徑
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const matches = content.match(imageRegex);
  if (matches) {
    matches.forEach(match => {
      const pathMatch = match.match(/\(([^)]+)\)/);
      if (pathMatch) {
        const path = pathMatch[1];
        if (path.startsWith('/news/')) {
          images.push(path);
        }
      }
    });
  }

  // 2. 處理 <figure> 標籤
  const figureRegex = /<figure[^>]*>([\s\S]*?)<\/figure>/g;
  cleanedContent = cleanedContent.replace(figureRegex, (match) => {
    hasComplexElements = true;
    
    // 提取圖片 alt 文字和路徑
    const imgMatch = match.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const path = imgMatch[2];
      return `![${alt}](${path})`;
    }
    
    // 如果沒有找到圖片，移除整個 figure
    return '';
  });

  // 3. 處理 <figcaption> 標籤
  const figcaptionRegex = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/g;
  cleanedContent = cleanedContent.replace(figcaptionRegex, (match) => {
    hasComplexElements = true;
    // 提取文字內容
    const text = match.replace(/<figcaption[^>]*>/, '').replace(/<\/figcaption>/, '');
    return `\n\n*${text}*\n\n`;
  });

  // 4. 處理其他複雜的 JSX 標籤
  const jsxTags = [
    { pattern: /className="[^"]*"/g, replacement: '' },
    { pattern: /<div[^>]*>/g, replacement: '' },
    { pattern: /<\/div>/g, replacement: '' },
    { pattern: /<section[^>]*>/g, replacement: '' },
    { pattern: /<\/section>/g, replacement: '' }
  ];

  jsxTags.forEach(({ pattern, replacement }) => {
    if (pattern.test(cleanedContent)) {
      hasComplexElements = true;
      cleanedContent = cleanedContent.replace(pattern, replacement);
    }
  });

  // 5. 清理多餘的空白行
  cleanedContent = cleanedContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n\n');

  return {
    markdown: cleanedContent,
    images,
    hasComplexElements
  };
}

export function extractImagesFromContent(content: string): string[] {
  const images: string[] = [];
  
  // 從 Markdown 語法提取
  const markdownRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = markdownRegex.exec(content)) !== null) {
    const path = match[2];
    if (path.startsWith('/news/')) {
      images.push(path);
    }
  }

  // 從 HTML img 標籤提取
  const htmlRegex = /<img[^>]*src="([^"]*)"[^>]*>/g;
  while ((match = htmlRegex.exec(content)) !== null) {
    const path = match[1];
    if (path.startsWith('/news/')) {
      images.push(path);
    }
  }

  return [...new Set(images)]; // 去除重複
}

export function generateImageMarkdown(images: string[]): string {
  return images.map((path, index) => {
    const filename = path.split('/').pop() || 'image';
    return `${index + 1}. ![${filename}](${path})`;
  }).join('\n');
}
