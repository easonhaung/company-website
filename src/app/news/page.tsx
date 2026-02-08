import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getNewsList } from "@/lib/news";

export default function NewsPage() {
  const items = getNewsList();
  return (
    <>
      <PageHero
        title="最新消息"
        description="EZeeTech 的重要里程碑、合作進展、試點計畫與對外公告。得獎與入選計畫、合作夥伴與試點啟動、技術與專案進度更新、官方公告。"
      />
      <section className="w-full bg-white">
        <Container className="py-12 md:py-16">
          {items.length === 0 ? (
            <p className="text-slate-600">目前尚無消息。</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map(({ slug, meta }) => (
                <li key={slug}>
                  <Link
                    href={`/news/${slug}`}
                    className="block bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-md transition h-full"
                  >
                    <h2 className="text-lg font-semibold text-slate-900 group-hover:text-cyan-600 transition mb-2 line-clamp-2">
                      {meta.title}
                    </h2>
                    {meta.date && (
                      <time className="text-sm text-slate-500 block mb-2">
                        {meta.date}
                      </time>
                    )}
                    {meta.excerpt && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {meta.excerpt}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
