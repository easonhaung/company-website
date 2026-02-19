import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { TwoPhotoGrid } from "@/components/TwoPhotoGrid";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { getNewsBySlug, getNewsSlugs } from "@/lib/news";

const mdxComponents = {
  TwoPhotoGrid,
};

interface NewsSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function NewsSlugPage({ params }: NewsSlugPageProps) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        title={post.meta.title}
        description={
          post.meta.date ? (
            <time className="text-slate-500 text-base font-normal">
              {post.meta.date}
            </time>
          ) : undefined
        }
      />
      <section className="w-full bg-white">
        <Container className="py-12 md:py-16">
          <AnimateOnScroll animation="fade-up">
          <Link
            href="/news"
            className="text-sm text-slate-600 hover:text-cyan-600 mb-8 inline-block"
          >
            ← 返回最新消息
          </Link>
          <article className="w-full min-w-0 overflow-hidden">
            <div className="prose prose-slate prose-img:rounded-lg max-w-4xl">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
          </article>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
