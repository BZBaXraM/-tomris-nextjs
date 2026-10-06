"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { PosterHeader } from "./poster-header";
export function ServicesView() {
  const { c, href } = useLanguage();
  return (
    <>
      <PosterHeader index={2} />
      <section className="services-page">
        {c.serviceNames.map((name, i) => (
          <details
            className="service"
            id={`service-${i}`}
            key={name}
            open={i === 0 ? true : undefined}
          >
            <summary>
              <span className="num">0{i + 1}</span>
              <h2>{name}</h2>
              <span className="plus" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="service-detail">
              <p>{c.serviceDesc[i]}</p>
              <ul>
                {c.serviceLists[i].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </section>
      <section className="paper">
        <div className="section-head">
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
            <div key={step[0]}>
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
