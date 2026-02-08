import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";

export default function ProductPage() {
  return (
    <>
      <PageHero
        title="產品／解決方案"
        description="聚焦車用電池震動電能回收技術，協助合作夥伴在實際車輛與移動載具應用中驗證效能、穩定性與整合可行性。"
      />
      <section className="w-full">
        <Container className="py-12 md:py-16">
          <div className="max-w-4xl space-y-6 text-slate-600 leading-relaxed">
            <p>
              EZeeTech 聚焦於車用電池相關之震動電能回收技術，
              協助合作夥伴在實際車輛與移動載具應用中，
              驗證能源回收效能、系統穩定性與整合可行性。
            </p>
            <h2 className="text-xl font-semibold text-slate-900 pt-4">
              我們的解決方案可支援：
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>實際運行環境中的技術驗證</li>
              <li>關鍵效能指標的量測與分析</li>
              <li>與既有系統與流程的整合</li>
            </ul>
            <p>
              我們不提供制式化產品，而是依據不同應用場景、法規條件與部署限制，與合作夥伴共同調整與驗證最合適的方案。
            </p>
            <blockquote className="border-l-4 border-cyan-500 bg-slate-50 rounded-r-lg py-4 px-6 my-8 text-slate-700 italic">
              我們的「領先」來自於實地測試經驗、系統整合能力與數據驗證成果，
              而非僅止於實驗室條件下的理論表現。
            </blockquote>
          </div>
        </Container>
      </section>
    </>
  );
}
