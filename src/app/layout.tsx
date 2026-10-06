import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { normalizeLocale } from "@/lib/locale";
import "./globals.css";
import "./motion.css";
export const metadata: Metadata = {
  title: "TOMRIS — Creative SMM Studio",
  description: "Creative strategy, content and design.",
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#48140f",
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = normalizeLocale((await headers()).get("x-tomris-language"));
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
