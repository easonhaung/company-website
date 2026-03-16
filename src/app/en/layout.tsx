import type { Metadata, Viewport } from "next";
import "../globals.css";
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
    "EZeeTech helps mobility and infrastructure partners turn next-generation energy concepts into real-world deployments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col w-full min-w-0 overflow-x-hidden">
        <SiteHeader />
        <main className="flex-1 w-full min-w-0">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

