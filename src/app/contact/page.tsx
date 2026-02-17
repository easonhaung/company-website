import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="聯絡我們"
        description="歡迎來自產業、政府單位與各類合作夥伴的洽詢。合作討論、試點計畫或一般問題，請填寫表單或直接寄信。"
      />
      <section className="w-full bg-white">
        <Container className="py-12 md:py-16">
          <AnimateOnScroll animation="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="border-t lg:border-t-0 lg:border-l border-slate-200 pt-8 lg:pt-0 lg:pl-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  聯絡信箱
                </h3>
                <a
                  href="mailto:info.ezeetech.sustain@gmail.com"
                  className="text-cyan-600 hover:underline font-medium break-all"
                >
                  info.ezeetech.sustain@gmail.com
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  台北辦公室
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  11010 臺北市信義區基隆路1段143號11樓之3
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  11F-3, No. 143, Sec. 1, Keelung Rd., Xinyi Dist., Taipei City 11010, Taiwan (R.O.C.)
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  桃園辦公室
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  320071 桃園市中壢區新中北路499號324室
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Room 324, No 499 Xingzhong N. Rd., Zhongli Dist., Taoyuan City, 320071, Taiwan (R.O.C.)
                </p>
              </div>
            </div>
          </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
