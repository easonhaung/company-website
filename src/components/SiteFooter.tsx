import Link from "next/link";
import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto">
      <Container className="py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>EZeeTech © 2026 All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/contact" className="hover:text-slate-900">
                聯絡我們
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-slate-900">
                關於我們
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
