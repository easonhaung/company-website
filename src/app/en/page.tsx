import Link from "next/link";
import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export default function HomePageEn() {
  return (
    <>
      <section className="relative w-full aspect-[16/9] min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="relative z-10 w-full max-w-[1400px] min-w-0 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            EZeeTech
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-4">
            Vibration energy harvesting for mobility batteries and
            infrastructure, turning real‑world motion into useful power.
          </p>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-10">
            We work with public agencies and industry partners on pilots,
            on‑site validation, and data‑driven evaluation, so new energy
            technologies can be deployed with confidence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/en/contact"
              className="px-6 py-3 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-400 shadow-lg shadow-cyan-500/25"
            >
              Contact us
            </Link>
            <Link
              href="/en/news"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/30 backdrop-blur-sm"
            >
              Latest news
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="py-16 md:py-20">
          <AnimateOnScroll animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              What we focus on
            </h2>
          </AnimateOnScroll>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto text-center">
            Proof‑of‑concept pilots, performance data, and integration
            feasibility studies for vibration energy harvesting in EV
            batteries and related systems.
          </p>
        </Container>
      </section>
    </>
  );
}

