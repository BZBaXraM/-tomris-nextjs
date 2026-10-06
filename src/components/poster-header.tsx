"use client";
import { projectAssets } from "@/data/projects";
import { useLanguage } from "./language-provider";
import { StudioStar } from "./studio-star";
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
    <section className="page-top poster" data-scroll-scene="hero">
      <StudioStar className="page-star" />
      <img
        className="page-artwork"
        src={`/assets/${projectAssets[index === 1 ? 2 : index === 2 ? 1 : 0]}`}
        alt=""
        fetchPriority="high"
        data-reveal="art"
        data-delay="2"
        data-parallax="12"
      />
      <span className="poster-label top-left" data-reveal="up">
        0{index} / {c.nav[index]}
      </span>
      <div className="page-title">
        <h1 data-reveal="up" data-delay="1">{title}</h1>
      </div>
      <p className="page-intro" data-reveal="up" data-delay="2">{subtitle}</p>
      <span className="poster-label bottom-right" data-reveal="up" data-delay="3">TOMRIS / STUDIO</span>
    </section>
  );
}
