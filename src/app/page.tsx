import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { IconPoC, IconData, IconIntegrate } from "@/components/Icons";

export default function HomePage() {
  return (
    <>
      {/* Hero: 全寬、科技風背景 */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden">
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
          {/* 幾何網格裝飾 */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
            aria-hidden
          />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            EZeeTech
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-4">
            專注於車用電池系統之震動電能回收技術，
            提供領先的車用應用驗證與試點解決方案。
          </p>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-10">
            與公部門及產業夥伴合作，透過實地測試、試點計畫與數據驗證，
            讓創新技術真正落地、可評估、可擴展。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/25"
            >
              聯絡我們
            </Link>
            <Link
              href="/news"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/30 hover:bg-white/20 transition backdrop-blur-sm"
            >
              最新消息
            </Link>
          </div>
        </div>
      </section>

      {/* 主要服務重點：全寬區塊 */}
      <section className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
            主要服務重點
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          </div>
        </Container>
      </section>
    </>
  );
}
