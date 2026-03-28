
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { IconPoC, IconData, IconIntegrate } from "@/components/Icons";
import { getNewsList } from "@/lib/news";

export default function HomePage() {
  const newsItems = getNewsList().slice(0, 4);
  return (
    <>
      {/* Hero: 全寬、16:9 比例、科技風背景 */}
      <section className="relative w-full aspect-[16/8] md:aspect-[16/7] min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* 背景圖：科技感 */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80"
              alt=""
              fill
              className="object-cover opacity-40"
              priority
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950"
            aria-hidden
          />
          {/* 會動的網格背景（向下斜向滾動） */}
          <div
            className="absolute inset-0 hero-grid-animate opacity-80"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6,182,212,.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,.2) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
            aria-hidden
          />
          {/* 流動光帶（明顯橫向移動） */}
          <div
            className="absolute inset-0 opacity-30 hero-shimmer-layer"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.15) 25%, rgba(6,182,212,0.25) 50%, rgba(6,182,212,0.15) 75%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "hero-shimmer 6s linear infinite",
            }}
            aria-hidden
          />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] min-w-0 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 左側文字內容 */}
            <div className="text-left lg:col-span-1">
              <h1 className="hero-title-animate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg" style={{ fontFamily: 'PROJECT9, sans-serif', textShadow: "0 0 40px rgba(6,182,212,0.3)" }}>
                EZeeTech
              </h1>
              <p className="hero-desc-1 text-lg sm:text-xl text-white max-w-2xl leading-relaxed mb-4">
                專注於車用電池系統之震動電能回收技術，
                提供領先的車用應用驗證與試點解決方案。
              </p>
              <p className="hero-desc-2 text-slate-200 max-w-xl text-sm sm:text-base mb-10">
                與公部門及產業夥伴合作，透過實地測試、試點計畫與數據驗證，
                讓創新技術真正落地、可評估、可擴展。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="hero-btn-primary w-full sm:w-auto px-6 py-3 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-400 shadow-lg shadow-cyan-500/25 text-center"
                >
                  聯絡我們
                </Link>
                <Link
                  href="/news"
                  className="hero-btn-secondary w-full sm:w-auto px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/30 backdrop-blur-sm text-center"
                >
                  最新消息
                </Link>
              </div>
            </div>
            
            {/* 右側科技動畫 - 手機版隱藏 */}
            <div className="hidden lg:flex relative w-full h-64 sm:h-80 lg:h-96 items-center justify-center">
              <div className="relative w-full h-full max-w-md">
                {/* 科技感網格背景 */}
                <div 
                  className="absolute inset-0 rounded-2xl border border-cyan-500/30"
                  style={{
                    background: `
                      linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                    animation: "tech-grid 4s linear infinite"
                  }}
                />
                
                {/* 流動能量粒子 */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div 
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                    style={{
                      top: "20%",
                      left: "10%",
                      animation: "particle-float 3s ease-in-out infinite"
                    }}
                  />
                  <div 
                    className="absolute w-3 h-3 bg-cyan-300 rounded-full opacity-40"
                    style={{
                      top: "60%",
                      left: "70%",
                      animation: "particle-float 4s ease-in-out infinite 1s"
                    }}
                  />
                  <div 
                    className="absolute w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-80"
                    style={{
                      top: "40%",
                      left: "40%",
                      animation: "particle-float 2.5s ease-in-out infinite 2s"
                    }}
                  />
                  <div 
                    className="absolute w-2.5 h-2.5 bg-cyan-200 rounded-full opacity-30"
                    style={{
                      top: "80%",
                      left: "25%",
                      animation: "particle-float 5s ease-in-out infinite 1.5s"
                    }}
                  />
                </div>
                
                {/* 能量波紋效果 */}
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "radial-gradient(circle at center, transparent 30%, rgba(6,182,212,0.1) 70%, transparent 100%)",
                    animation: "energy-pulse 4s ease-in-out infinite"
                  }}
                />
                
                {/* 中央核心 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(6,182,212,0.2) 70%, transparent 100%)",
                        animation: "core-glow 2s ease-in-out infinite"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主要服務重點：全寬區塊 */}
      <section className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="py-16 md:py-20">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
              主要服務重點
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-w-0">
            <AnimateOnScroll animation="fade-up" delay={0}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4 text-cyan-600">
                <IconPoC className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                技術概念驗證與實地測試
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                在實際場域驗證技術可行性，產出可量測數據與評估報告。
              </p>
            </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 text-slate-600">
                <IconData className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                效能數據蒐集與分析
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                系統化蒐集與分析關鍵效能指標，支援決策與優化。
              </p>
            </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 text-slate-600">
                <IconIntegrate className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                系統整合與部署可行性評估
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                評估與既有系統、流程整合的可行性，降低部署風險。
              </p>
            </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* 最新消息 */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="py-16 md:py-20">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
              最新消息
            </h2>
          </AnimateOnScroll>
          {newsItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-0 items-stretch">
              {newsItems.map(({ slug, meta }, index) => (
                <AnimateOnScroll key={slug} animation="fade-up" delay={index * 80} className="h-full min-h-0">
                  <Link
                    href={`/news/${slug}`}
                    className="block bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition overflow-hidden h-full flex flex-col"
                  >
                    <div className="aspect-video bg-slate-100 overflow-hidden shrink-0">
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
                          className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
                          aria-hidden
                        >
                          <span className="text-slate-400 text-4xl font-light">
                            EZ
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1 min-h-[160px]">
                      <h3 className="text-base font-semibold text-slate-900 line-clamp-2 mb-2">
                        {meta.title}
                      </h3>
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
              ))}
            </div>
          ) : (
            <AnimateOnScroll animation="fade-up">
              <p className="text-slate-600 text-center">目前尚無消息。</p>
            </AnimateOnScroll>
          )}
          {newsItems.length > 0 && (
            <AnimateOnScroll animation="fade-up" className="text-center mt-10">
              <Link
                href="/news"
                className="inline-flex px-6 py-3 rounded-lg border border-cyan-500 text-cyan-600 font-medium hover:bg-cyan-50 transition"
              >
                查看全部消息
              </Link>
            </AnimateOnScroll>
          )}
        </Container>
      </section>

      {/* 落地實績：康科科技 */}
      <section className="w-full bg-slate-950 text-white">
        <Container className="py-16 md:py-20">
          <AnimateOnScroll animation="fade-up">
          <div className="flex flex-col gap-8 sm:gap-10 md:grid md:grid-cols-2 md:items-center min-w-0">
            <div className="relative w-full min-w-0 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video">
              <Image
                src="/news/kank-landing.png"
                alt="康科科技 KANK 模組化電動滑板車落地實績"
                width={1024}
                height={576}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-cyan-300 mb-3">
                落地實績
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                康科科技：模組化電動滑板車移動方案
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                康科科技（KANK）專注於開發模組化電動滑板車，透過可更換模組與多元應用，
                提供具永續價值的移動解決方案。我們協助其在實際場域中導入並驗證震動電能回收技術，
                並針對不同應用情境進行系統整合與數據分析。
              </p>
              <div className="grid gap-4 text-sm md:text-base mb-6">
                <div>
                  <h3 className="font-semibold mb-1 text-white">合作內容</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>車用電池系統震動電能回收模組導入與整合評估</li>
                    <li>實車道路測試與關鍵效能指標蒐集</li>
                    <li>多模組載具情境（標準版、載籃模組、輪椅連接模組等）驗證建議</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">實際成果</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>建立可重複量測的實測流程與報表格式</li>
                    <li>找出適合量產前調校的關鍵工況與參數</li>
                    <li>支援後續與公部門及產業夥伴合作的技術佐證</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/technology"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-cyan-500 text-sm font-medium text-white hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/25"
                >
                  了解技術應用
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg border border-slate-600 text-sm font-medium text-slate-100 hover:bg-slate-900 transition"
                >
                  與我們討論落地計畫
                </Link>
              </div>
            </div>
          </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* 隱藏的管理員入口 */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/admin"
          className="text-slate-400 hover:text-slate-600 text-xs transition-colors duration-200"
          aria-label="管理員登入"
        >
          Admin
        </Link>
      </div>
    </>
  );
}
