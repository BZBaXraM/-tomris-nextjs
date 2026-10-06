"use client";
import { PosterHeader } from "./poster-header";
import { PortfolioGrid } from "./portfolio";
export function PortfolioView() {
  return (
    <>
      <PosterHeader index={1} />
      <section className="paper portfolio-body">
        <PortfolioGrid filters />
      </section>
    </>
  );
}
