import { type ReactNode } from "react";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export function PageHero({
  title,
  description,
}: {
  title: string;
  description?: ReactNode;
}) {
  return (
    <section className="w-full bg-slate-100 border-b border-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden />
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <AnimateOnScroll animation="fade-up">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {title}
        </h1>
        {description && (
          <div className="text-slate-600 leading-relaxed max-w-2xl mt-1 pl-4 border-l-2 border-cyan-200">
            {description}
          </div>
        )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
