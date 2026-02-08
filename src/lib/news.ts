import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "news");

export interface NewsMeta {
  title: string;
  date: string;
  excerpt?: string;
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

export function getNewsList(): NewsItem[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const items: NewsItem[] = files.map((filename) => {
    const fullPath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    return {
      slug: getSlugFromFilename(filename),
      meta: {
        title: (data.title as string) ?? filename,
        date: (data.date as string) ?? "",
        excerpt: data.excerpt as string | undefined,
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
