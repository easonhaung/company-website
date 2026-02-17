import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
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
            <AnimateOnScroll animation="fade-up">
              <p className="text-slate-600">目前尚無消息。</p>
            </AnimateOnScroll>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(({ slug, meta }, index) => (
                <li key={slug}>
                  <AnimateOnScroll animation="fade-up" delay={index * 80}>
                    <Link
                      href={`/news/${slug}`}
                      className="block bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition overflow-hidden h-full flex flex-col"
                    >
                      <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                        {meta.image ? (
                          <Image
                            src={meta.image}
                            alt={meta.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div
                            className="w-full h-full bg-gradient-to-br from-cyan-50 to-slate-100 flex items-center justify-center"
                            aria-hidden
                          >
                            <span className="text-cyan-200 text-5xl font-light">
                              EZ
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1 min-h-[180px]">
                        {meta.date && (
                          <time className="text-sm text-slate-500 mb-2 block">
                            {meta.date}
                          </time>
                        )}
                        <h2 className="text-lg font-semibold text-slate-900 hover:text-cyan-600 transition mb-2 line-clamp-2">
                          {meta.title}
                        </h2>
                        {meta.excerpt && (
                          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 flex-1">
                            {meta.excerpt}
                          </p>
                        )}
                        <span className="mt-4 inline-flex items-center text-cyan-600 text-sm font-medium hover:text-cyan-500 transition">
                          閱讀更多 →
                        </span>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
