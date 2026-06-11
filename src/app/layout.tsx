import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "EZeeTech",
  description:
    "EZeeTech 致力於協助行動載具與基礎建設相關夥伴，將新世代能源技術從概念驗證推進至實際部署。",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen flex flex-col w-full min-w-0 overflow-x-hidden">
        <SiteHeader />
        <main className="flex-1 w-full min-w-0">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
