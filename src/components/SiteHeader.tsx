import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="py-4">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="EZeeTech"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <ul className="flex flex-wrap gap-6 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-slate-900">
                首頁
              </Link>
            </li>
            <li>
              <Link href="/product" className="hover:text-slate-900">
                產品／解決方案
              </Link>
            </li>
            <li>
              <Link href="/technology" className="hover:text-slate-900">
                技術與差異化
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-slate-900">
                最新消息
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
          </ul>
        </nav>
      </Container>
    </header>
  );
}
