"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { locales, paths, type Locale, type PageIndex } from "@/lib/locale";
import { useStudioMotion } from "@/lib/motion";
import { LanguageProvider, useLanguage } from "./language-provider";
import { StudioStar } from "./studio-star";
function Chrome({ page, children }: { page: PageIndex; children: ReactNode }) {
  const { locale, setLocale, c, href } = useLanguage();
  const [open, setOpen] = useState(false);
  const main = useRef<HTMLElement>(null);
  const footer = useRef<HTMLElement>(null);
  useStudioMotion(main, page);
  useStudioMotion(footer, page);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    document.title = `${page ? c.nav[page] + " — " : ""}${c.title}`;
  }, [c, page]);
  return (
    <>
      <a className="skip" href="#main">
        {c.skip}
      </a>
      <header className="header">
        <Link className="brand" href={href("/")} aria-label="TOMRIS">
          <img
            src="/assets/logo-source.png"
            width={655}
            height={445}
            alt="tmr."
          />
        </Link>
        <nav id="nav" aria-label={c.menu} className={open ? "open" : ""}>
          {paths.map((path, i) => (
            <Link
              key={path}
              href={href(path)}
              aria-current={page === i ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {c.nav[i]}
            </Link>
          ))}
        </nav>
        <div className="language" role="group" aria-label="Language">
          {locales.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={value === locale}
              onClick={() => setLocale(value)}
            >
              {value.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="nav"
          aria-label={c.menu}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>
      <main id="main" ref={main}>{children}</main>
      <footer id="footer" ref={footer} data-scroll-scene="footer">
        <StudioStar className="footer-star" />
        <div className="footer-top" data-reveal="up">
          <span>TOMRIS / CREATIVE STUDIO</span>
          <span>{c.footerSmall}</span>
        </div>
        <Link className="footer-headline" href={href("/contacts")} data-reveal="up">
          <span>{c.footer}</span><span className="footer-arrow" aria-hidden="true">↗</span>
        </Link>
        <div className="footer-bottom" data-reveal="up" data-delay="1">
          <span>
            © {new Date().getFullYear()} {c.rights}
          </span>
          <nav>
            {paths.slice(1).map((path, i) => (
              <Link key={path} href={href(path)}>
                {c.nav[i + 1]}
              </Link>
            ))}
          </nav>
          <span>{c.location}</span>
        </div>
      </footer>
    </>
  );
}
export function StudioShell({
  initialLocale,
  page,
  children,
}: {
  initialLocale: Locale;
  page: PageIndex;
  children: ReactNode;
}) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <Chrome page={page}>{children}</Chrome>
    </LanguageProvider>
  );
}
