"use client";
import { projectAssets } from "@/data/projects";
import { useLanguage } from "./language-provider";
export function PosterHeader({ index }: { index: 1 | 2 | 3 }) {
  const { c } = useLanguage();
  const title =
    index === 1
      ? c.portfolio
      : index === 2
        ? c.services
        : c.contactTitle.join(" ");
  const subtitle =
    index === 1
      ? c.portfolioIntro
      : index === 2
        ? c.serviceIntro
        : c.contactIntro;
  return (
    <section className="page-top poster reveal">
      <img
        className="page-artwork"
        src={`/assets/${projectAssets[index === 1 ? 2 : index === 2 ? 1 : 0]}`}
        alt=""
        fetchPriority="high"
      />
      <span className="poster-label top-left">
        0{index} / {c.nav[index]}
      </span>
      <div className="page-title">
        <h1>{title}</h1>
      </div>
      <p className="page-intro">{subtitle}</p>
      <span className="poster-label bottom-right">TOMRIS / STUDIO</span>
    </section>
  );
}
