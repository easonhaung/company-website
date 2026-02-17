import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="關於我們"
        description="一段從校園實驗室開始的創業故事"
      />
      <section className="w-full bg-white">
        <Container className="py-12 md:py-16">
          <AnimateOnScroll animation="fade-up">
          <article className="max-w-4xl space-y-6 text-slate-600 leading-relaxed">
            <p>
              EZeeTech 的故事，並不是從會議室或商業簡報開始的。
              而是從一間校園實驗室、幾張反覆修改的電路圖，以及兩位學生對現實世界的好奇開始。
            </p>
            <p>
              2025 年，兩位學生在學校實驗室裡，長時間投入震動發電相關技術的研究與測試。
              每天看著設備運作、結構晃動，我們不斷問自己一個問題：
              如果這些無所不在的震動，只是不斷被消耗，那是不是代表，有一種能量正在被浪費？
            </p>
            <p>
              一開始，我們只是想把技術做出來。
              但隨著測試次數增加，我們很快發現——
              真正困難的，不是技術本身，而是如何讓技術被世界使用。
            </p>
            <p>
              於是，我們選擇走出實驗室。
            </p>
            <p>
              EZeeTech 因此誕生，作為一間由校園出發的衍生企業，專注於把震動發電技術，帶進真實的使用場域。
              我們不追求只存在於展示桌上的原型，而是選擇與產業與公部門夥伴合作，透過試點計畫與實地驗證，讓技術在真實環境中被測試、被質疑、也被改進。
            </p>
            <p>
              這條路並不輕鬆。
              每一次現場測試，都是對工程設計、系統整合與執行能力的全面挑戰。
              但也正是在這些限制與回饋中，我們逐步找到技術與現實之間的平衡。
            </p>
            <p>
              今天的 EZeeTech，仍然保留著當初在實驗室裡反覆嘗試的精神。
              只是我們把視野，從桌上的測試平台，放大到整個世界。
            </p>
            <p>
              從校園出發，走進現場。
              從一個問題開始，持續把想像變成可以落地的答案。
            </p>
            <p className="text-slate-900 font-semibold text-lg pt-4">
              這，就是 EZeeTech。
            </p>
          </article>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
