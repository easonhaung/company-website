 "use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";

export function SiteHeader() {
  const pathname = usePathname() || "/";

  const isEnglish = pathname.startsWith("/en");
  const zhPath = isEnglish ? pathname.slice(3) || "/" : pathname || "/";
  const enPath =
    isEnglish || pathname === "/"
      ? pathname || "/en"
      : `/en${pathname === "/" ? "" : pathname}`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="py-4">
        <nav className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/news/logo.png"
              alt="EZeeTech"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-slate-900">
                首頁
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-slate-900">
                最新消息
              </Link>
            </li>
            <li>
              <Link href="/technology" className="hover:text-slate-900">
                技術與差異化
              </Link>
            </li>
            <li>
              <Link href="/product" className="hover:text-slate-900">
                產品／解決方案
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-slate-900">
                關於我們
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-slate-900">
                聯絡我們
              </Link>
            </li>
            <li>
              <div className="h-5 w-px bg-slate-200 mx-1" aria-hidden />
            </li>
            <li>
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <Link
                  href={zhPath}
                  className={`px-2 py-1 rounded-full border ${
                    !isEnglish
                      ? "bg-slate-900 text-white border-slate-900"
                      : "border-slate-300 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  繁中
                </Link>
                <Link
                  href={enPath}
                  className={`px-2 py-1 rounded-full border ${
                    isEnglish
                      ? "bg-slate-900 text-white border-slate-900"
                      : "border-slate-300 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  EN
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
