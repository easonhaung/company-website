import { type ReactNode } from "react";

export function PageHero({
  title,
  description,
}: {
  title: string;
  description?: ReactNode;
}) {
  return (
    <section className="w-full bg-slate-100 border-b border-slate-200">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {title}
        </h1>
        {description && (
          <div className="text-slate-600 leading-relaxed max-w-2xl">
            {description}
          </div>
        )}
      </div>
    </section>
  );
}
