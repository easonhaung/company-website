import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "news");

export interface NewsMeta {
  title: string;
  date: string;
  excerpt?: string;
  /** 首頁卡片用精選圖，可選填；未填則從內文擷取第一張圖 */
  image?: string;
}

export interface NewsItem {
  slug: string;
  meta: NewsMeta;
}

export interface NewsPost extends NewsItem {
  content: string;
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

/** 從 MDX 內文擷取第一張圖片網址（markdown、img src、TwoPhotoGrid leftSrc/rightSrc） */
function extractFirstImage(content: string): string | undefined {
  const markdownMatch = content.match(/!\[[^\]]*\]\((\/news\/[^)]+)\)/);
  if (markdownMatch) return markdownMatch[1];
  const twoPhotoMatch = content.match(/(?:leftSrc|rightSrc)=["'](\/news\/[^"']+)["']/);
  if (twoPhotoMatch) return twoPhotoMatch[1];
  const srcMatch = content.match(/src=["'](\/news\/[^"']+)["']/);
  if (srcMatch) return srcMatch[1];
  return undefined;
}

export function getNewsList(): NewsItem[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const items: NewsItem[] = files.map((filename) => {
    const fullPath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const image = (data.image as string | undefined) ?? extractFirstImage(content);
    return {
      slug: getSlugFromFilename(filename),
      meta: {
        title: (data.title as string) ?? filename,
        date: (data.date as string) ?? "",
        excerpt: data.excerpt as string | undefined,
        image,
      },
    };
  });
  items.sort((a, b) => (b.meta.date > a.meta.date ? 1 : -1));
  return items;
}

export function getNewsBySlug(slug: string): NewsPost | null {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    meta: {
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      excerpt: data.excerpt as string | undefined,
    },
    content,
  };
}

export function getNewsSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(getSlugFromFilename);
}
