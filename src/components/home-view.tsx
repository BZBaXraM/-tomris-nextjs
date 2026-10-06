"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { PortfolioGrid } from "./portfolio";
import { StudioStar } from "./studio-star";
export function HomeView() {
  const { c, e, href } = useLanguage();
  return (
    <>
      <section className="hero poster" data-scroll-scene="hero">
        <svg className="hero-surface" viewBox="0 0 1220 720" preserveAspectRatio="none" aria-hidden="true">
          <path className="surface-desktop" d="M42 224C83 80 536 30 1038 0C1158-9 1204 30 1206 74L1220 548C1162 642 673 690 113 716C70 719 63 691 60 658Z" />
          <path className="surface-mobile" d="M0 80C170 3 420 3 1030 0C1139-3 1175 19 1180 76L1220 643C1213 684 1176 705 1067 706L156 720C77 720 41 695 37 650Z" />
        </svg>
        <span className="poster-label top-left" data-reveal="up">{c.tag}</span>
        <span className="poster-label top-right" data-reveal="up">{c.location}</span>
        <StudioStar className="hero-star" />
        <div className="hero-painting" data-reveal="art" data-delay="2" data-parallax="28">
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
              <span className="title-line" key={line} data-reveal="line" data-delay={i + 1}><span>{line}</span></span>
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
      <a className="scroll-cue" href="#approach">{e.scroll}<span aria-hidden="true">↘</span></a>
      <div className="service-ribbon" data-scroll-scene="ribbon">
        <Link className="ribbon-link" href={href("/services")} aria-label={c.services}>
          <div className="ribbon-track" aria-hidden="true">
            {[0, 1, 2].map((copy) => (
              <span className="ribbon-group" key={copy}>
                {c.serviceNames.map((name) => <span className="ribbon-item" key={name}>{name}<StudioStar /></span>)}
              </span>
            ))}
          </div>
        </Link>
      </div>
      <section id="approach" className="content-story poster" data-scroll-scene="story">
        <div className="content-art" data-reveal="up">
          <span className="poster-label top-left">
            02 / {c.serviceNames[1]}
          </span>
          <div className="art-window">
            <img
              src="/assets/smm-workshop.jpg"
              alt={c.projects[1][0]}
              loading="lazy"
              width={1536}
              height={1024}
              data-parallax="24"
            />
          </div>
          <span className="art-handnote" aria-hidden="true">made of ideas</span>
        </div>
        <div className="content-copy">
          <StudioStar className="story-star" />
          <span className="section-index" data-reveal="up">TOMRIS / {e.approach}</span>
          <h2 data-reveal="up" data-delay="1">{e.workshop}</h2>
          <p data-reveal="up" data-delay="2">{c.serviceDesc[1]}</p>
          <Link className="text-link" href={href("/services")} data-reveal="up" data-delay="3">
            {c.services} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="community-story poster" data-scroll-scene="community">
        <div className="community-heading">
          <div data-reveal="up">
            <span className="section-index">03 / SMM</span>
            <h2>{e.world}</h2>
          </div>
          <div data-reveal="up" data-delay="1">
            <p>{e.chapter}</p>
            <Link className="text-link" href={href("/portfolio")}>
              {c.allWork} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="community-window" data-reveal="art">
          <img
            className="community-art"
            src="/assets/smm-community.jpg"
            alt={c.projects[2][0]}
            loading="lazy"
            width={1536}
            height={1024}
            data-parallax="24"
          />
        </div>
        <span className="community-handnote" aria-hidden="true">with character.</span>
      </section>
      <section className="selected-section" data-scroll-scene="work">
        <div className="section-head" data-reveal="up">
          <div>
            <span className="section-index">TOMRIS / {c.nav[1]}</span>
            <h2>{c.selected}</h2>
            <p>{c.workNote}</p>
          </div>
          <Link className="text-link" href={href("/portfolio")}>
            {c.allWork} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <PortfolioGrid selected={[1, 2]} />
      </section>
    </>
  );
}
