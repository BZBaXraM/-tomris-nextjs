"use client";

import { useEffect, type RefObject } from "react";

export const motionEase = "cubic-bezier(0.22, 1, 0.36, 1)";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Enhance visible HTML only after hydration; content also works without JS. */
export function useStudioMotion(
  scope: RefObject<HTMLElement | null>,
  page: number,
) {
  useEffect(() => {
    const root = scope.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 721px) and (pointer: fine)");
    let dispose = () => {};

    function setup() {
      dispose();
      if (!root || reducedMotion.matches) return;

      const seen = new Set<HTMLElement>();
      const parallax = new Set<HTMLElement>();
      let frame = 0;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            element.dataset.motion = "visible";
            observer.unobserve(element);
          }
        },
        { threshold: 0.08 },
      );

      function scan() {
        if (!root) return;
        // Drop removed cards after filtering or changing language.
        for (const element of seen) {
          if (!root.contains(element)) {
            observer.unobserve(element);
            seen.delete(element);
            parallax.delete(element);
          }
        }
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          const bounds = element.getBoundingClientRect();
          // Back/forward restoration should never conceal already passed content.
          if (bounds.bottom <= 0 || element.contains(document.activeElement)) {
            element.dataset.motion = "shown";
            return;
          }
          element.dataset.motion = "pending";
          observer.observe(element);
        });
        root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
          parallax.add(element);
        });
        schedule();
      }

      function updateParallax() {
        frame = 0;
        if (!desktop.matches || document.hidden) return;
        const viewport = window.innerHeight;
        // Read all geometry before writing styles to avoid forced layout per image.
        const positions = [...parallax]
          .filter((element) => root?.contains(element))
          .map((element) => ({ element, bounds: element.getBoundingClientRect() }));
        for (const { element, bounds } of positions) {
          if (bounds.bottom < 0 || bounds.top > viewport) continue;
          const distance = Number(element.dataset.parallax) || 0;
          const progress = Math.max(
            -1,
            Math.min(
              1,
              (viewport / 2 - bounds.top - bounds.height / 2) /
                (viewport / 2 + bounds.height / 2),
            ),
          );
          element.style.setProperty("--parallax-y", `${(progress * distance).toFixed(2)}px`);
        }
      }

      function schedule() {
        if (!frame && parallax.size && desktop.matches) {
          frame = requestAnimationFrame(updateParallax);
        }
      }

      function resize() {
        if (!desktop.matches) {
          parallax.forEach((element) => element.style.removeProperty("--parallax-y"));
        }
        schedule();
      }

      function focus(event: FocusEvent) {
        if (!(event.target instanceof Element)) return;
        const element = event.target.closest<HTMLElement>("[data-reveal]");
        if (!element || !root?.contains(element)) return;
        element.dataset.motion = "shown";
        observer.unobserve(element);
      }

      const mutations = new MutationObserver(scan);
      scan();
      mutations.observe(root, { childList: true, subtree: true });
      root.addEventListener("focusin", focus);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", resize, { passive: true });
      desktop.addEventListener("change", resize);

      dispose = () => {
        observer.disconnect();
        mutations.disconnect();
        cancelAnimationFrame(frame);
        root.removeEventListener("focusin", focus);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", resize);
        desktop.removeEventListener("change", resize);
        seen.forEach((element) => delete element.dataset.motion);
        parallax.forEach((element) => element.style.removeProperty("--parallax-y"));
      };
    }

    setup();
    reducedMotion.addEventListener("change", setup);
    return () => {
      dispose();
      reducedMotion.removeEventListener("change", setup);
    };
  }, [scope, page]);
}
