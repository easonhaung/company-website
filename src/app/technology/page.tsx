import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        title="技術與差異化"
        description="技術策略強調可靠性、可量測性與可擴展性，以實際部署與數據驗證為核心。"
      />
      <section className="w-full bg-white">
        <Container className="py-12 md:py-16">
          <blockquote className="border-l-4 border-cyan-500 bg-slate-50 rounded-r-lg py-4 px-6 mb-10 text-slate-700 italic max-w-4xl">
            我們的「領先」來自於實地測試經驗、系統整合能力與數據驗證成果，
            而非僅止於實驗室條件下的理論表現。
          </blockquote>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            核心差異包括：
          </h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8 max-w-4xl">
            <li>以實際部署條件為出發點的系統級設計</li>
            <li>以數據驗證為核心，而非僅止於實驗室測試</li>
            <li>模組化架構，支援分階段導入與擴充</li>
            <li>PoC 與試點階段即與合作夥伴密切協作</li>
          </ul>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            此作法可協助決策者在導入前即掌握真實運作數據，降低不確定性並提升後續擴大部署的成功率。
          </p>
        </Container>
      </section>
    </>
  );
}
