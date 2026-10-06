"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { PortfolioGrid } from "./portfolio";
export function HomeView() {
  const { c, e, href } = useLanguage();
  return (
    <>
      <section className="hero poster">
        <span className="poster-label top-left" data-reveal="up">{c.tag}</span>
        <span className="poster-label top-right" data-reveal="up">{c.location}</span>
        <div className="hero-painting" data-reveal="right" data-delay="2" data-parallax="18">
          <img
            src="/assets/smm-voice.jpg"
            alt={c.projects[0][0]}
            width={1024}
            height={1280}
            fetchPriority="high"
          />
          <span className="painting-caption">01 / {c.serviceNames[0]}</span>
        </div>
        <div className="poster-title">
          <h1>
            {e.hero.map((line, i) => (
              <span key={line} data-reveal="up" data-delay={i + 1}>{line}</span>
            ))}
          </h1>
        </div>
        <span className="script-word hero-signature" aria-hidden="true" data-reveal="up" data-delay="4">
          Tomris
        </span>
        <span className="poster-label bottom-left" data-reveal="up" data-delay="4">{e.note}</span>
        <p className="hero-description" data-reveal="up" data-delay="3">{c.intro}</p>
        <Link className="poster-link bottom-right" href={href("/contacts")} data-reveal="up" data-delay="4">
          {c.talk}
        </Link>
      </section>
      <section className="content-story poster">
        <div className="content-art" data-reveal="left">
          <span className="poster-label top-left">
            02 / {c.serviceNames[1]}
          </span>
          <img
            src="/assets/smm-workshop.jpg"
            alt={c.projects[1][0]}
            loading="lazy"
            width={1536}
            height={1024}
            data-parallax="16"
          />
        </div>
        <div className="content-copy">
          <span className="section-index" data-reveal="up">TOMRIS / {e.approach}</span>
          <h2 data-reveal="up" data-delay="1">{e.workshop}</h2>
          <p data-reveal="up" data-delay="2">{c.serviceDesc[1]}</p>
          <Link className="text-link" href={href("/services")} data-reveal="up" data-delay="3">
            {c.services} +
          </Link>
        </div>
      </section>
      <section className="community-story poster">
        <div className="community-heading">
          <div data-reveal="up">
            <span className="section-index">03 / SMM</span>
            <h2>{e.world}</h2>
          </div>
          <div data-reveal="up" data-delay="1">
            <p>{e.chapter}</p>
            <Link className="text-link" href={href("/portfolio")}>
              {c.allWork} +
            </Link>
          </div>
        </div>
        <img
          className="community-art"
          src="/assets/smm-community.jpg"
          alt={c.projects[2][0]}
          loading="lazy"
          width={1536}
          height={1024}
          data-reveal="up"
          data-parallax="14"
        />
      </section>
      <section className="selected-section">
        <div className="section-head" data-reveal="up">
          <div>
            <span className="section-index">TOMRIS / {c.nav[1]}</span>
            <h2>{c.selected}</h2>
            <p>{c.workNote}</p>
          </div>
          <Link className="text-link" href={href("/portfolio")}>
            {c.allWork}
          </Link>
        </div>
        <PortfolioGrid selected={[1, 2]} />
      </section>
    </>
  );
}
