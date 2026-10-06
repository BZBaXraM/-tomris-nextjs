"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { content, editorial } from "@/data/translations";
import type { Locale } from "@/lib/locale";
type LanguageState = { locale: Locale; setLocale: (locale: Locale) => void };
const LanguageContext = createContext<LanguageState | null>(null);
export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState(initialLocale);
  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale]);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  function switchLanguage(next: Locale) {
    setLocale(next);
    document.cookie = `tmr-language=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
  }
  return (
    <LanguageContext.Provider value={{ locale, setLocale: switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const state = useContext(LanguageContext);
  if (!state) throw new Error("LanguageProvider is required");
  return {
    ...state,
    c: content[state.locale],
    e: editorial[state.locale],
    href: (path: string) => `${path}?lang=${state.locale}`,
  };
}
