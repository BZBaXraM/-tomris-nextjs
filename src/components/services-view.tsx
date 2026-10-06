"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { PosterHeader } from "./poster-header";
import { AnimatedService } from "./animated-service";
export function ServicesView() {
  const { c, href } = useLanguage();
  return (
    <>
      <PosterHeader index={2} />
      <section className="services-page">
        {c.serviceNames.map((name, i) => (
          <AnimatedService
            id={`service-${i}`}
            key={name}
            initialOpen={i === 0}
            summary={
              <>
                <span className="num">0{i + 1}</span>
                <h2>{name}</h2>
                <span className="plus" aria-hidden="true">
                  +
                </span>
              </>
            }
          >
            <p>{c.serviceDesc[i]}</p>
            <ul>
              {c.serviceLists[i].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimatedService>
        ))}
      </section>
      <section className="paper">
        <div className="section-head" data-reveal="up">
          <div>
            <span className="section-index">TOMRIS / PROCESS</span>
            <h2>{c.process}</h2>
          </div>
          <Link className="text-link" href={href("/contacts")}>
            {c.talk}
          </Link>
        </div>
        <div className="process">
          {c.steps.map((step, i) => (
            <div key={step[0]} data-reveal="up" data-delay={i}>
              <b>0{i + 1}</b>
              <h3>{step[0]}</h3>
              <p>{step[1]}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
