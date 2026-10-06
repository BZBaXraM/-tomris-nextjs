"use client";
import { useEffect, useRef, useState } from "react";
import { projectAssets, projectCategories } from "@/data/projects";
import { useLanguage } from "./language-provider";
export function PortfolioGrid({
  selected,
  filters = false,
}: {
  selected?: number[];
  filters?: boolean;
}) {
  const { c } = useLanguage();
  const [filter, setFilter] = useState(-1);
  const [project, setProject] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (project !== null) {
      if (!element.open) element.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    element.close();
  }, [project]);
  const indices = (selected ?? projectAssets.map((_, i) => i)).filter(
    (i) => filter === -1 || projectCategories[i] === filter,
  );
  return (
    <>
      {filters && (
        <div className="filters" role="group" aria-label={c.nav[1]}>
          {[c.all, ...c.categories].map((category, index) => (
            <button
              type="button"
              key={category}
              aria-pressed={filter === index - 1}
              onClick={() => setFilter(index - 1)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      <div className="work-grid">
        {indices.map((i) => (
          <button
            type="button"
            className="project"
            key={i}
            aria-label={c.projects[i][0]}
            onClick={() => setProject(i)}
          >
            <div className="project-image">
              <img
                src={`/assets/${projectAssets[i]}`}
                alt={c.projects[i][0]}
                loading="lazy"
              />
              <span className="project-badge">{c.concept}</span>
            </div>
            <div className="project-meta">
              <span className="section-index">
                0{i + 1} / {c.projects[i][1]}
              </span>
              <h3>{c.projects[i][0]}</h3>
              <p>{c.projects[i][2]}</p>
              <span className="view-project">{c.nav[1]} +</span>
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        onClose={() => setProject(null)}
        onClick={(event) => {
          if (event.target !== dialog.current) return;
          const bounds = dialog.current.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            setProject(null);
        }}
      >
        <button
          type="button"
          className="close-dialog"
          aria-label={c.close}
          onClick={() => setProject(null)}
        >
          ×
        </button>
        {project !== null && (
          <div className="dialog-layout">
            <img
              src={`/assets/${projectAssets[project]}`}
              alt={c.projects[project][0]}
            />
            <div className="dialog-copy">
              <span className="section-index">
                0{project + 1} / {c.concept}
              </span>
              <h2>{c.projects[project][0]}</h2>
              <p>{c.projects[project][2]}</p>
              <small>{c.referenceNote}</small>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
