"use client";

import { useEffect, type RefObject } from "react";

export const motionEase = "cubic-bezier(0.22, 1, 0.36, 1)";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Enhance the server-rendered composition without taking over native scrolling. */
export function useStudioMotion(scope: RefObject<HTMLElement | null>, page: number) {
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
      const scenes = new Set<HTMLElement>();
      const activeScenes = new Set<HTMLElement>();
      let frame = 0;
      let disposed = false;

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.motion = "visible";
          observer.unobserve(element);
        }
      }, { threshold: 0.06 });

      const sceneObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) activeScenes.add(element);
          else {
            activeScenes.delete(element);
            // Settle a scene when fast scrolling skips past its observation area.
            const passed = entry.boundingClientRect.bottom < 0;
            element.style.setProperty("--scene-progress", passed ? "1" : "0");
            element.style.setProperty("--scene-entry", passed ? "1" : "0");
            element.style.setProperty("--scene-exit", passed ? "1" : "0");
          }
        }
        schedule();
      }, { rootMargin: "15% 0px", threshold: 0 });

      function scan() {
        if (!root) return;
        for (const element of seen) {
          if (root.contains(element)) continue;
          observer.unobserve(element);
          seen.delete(element);
        }
        for (const element of parallax) {
          if (!root.contains(element)) parallax.delete(element);
        }
        for (const element of scenes) {
          if (element === root || root.contains(element)) continue;
          sceneObserver.unobserve(element);
          activeScenes.delete(element);
          scenes.delete(element);
        }
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          const bounds = element.getBoundingClientRect();
          if (bounds.bottom <= 0 || element.contains(document.activeElement)) {
            element.dataset.motion = "shown";
            return;
          }
          element.dataset.motion = "pending";
          observer.observe(element);
        });
        root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => parallax.add(element));
        const found = [...root.querySelectorAll<HTMLElement>("[data-scroll-scene]")];
        if (root.hasAttribute("data-scroll-scene")) found.push(root);
        for (const element of found) {
          if (scenes.has(element)) continue;
          scenes.add(element);
          activeScenes.add(element);
          sceneObserver.observe(element);
        }
        schedule();
      }

      function update() {
        frame = 0;
        if (document.hidden) return;
        const viewport = window.innerHeight;
        // Batch geometry reads before writes; only nearby scenes need updates.
        const scenePositions = [...activeScenes].map((element) => ({
          element, bounds: element.getBoundingClientRect(),
        }));
        const imagePositions = desktop.matches ? [...parallax].map((element) => ({
          element, bounds: element.getBoundingClientRect(),
        })) : [];
        for (const { element, bounds } of scenePositions) {
          element.style.setProperty("--scene-progress", clamp((viewport - bounds.top) / (viewport + bounds.height)).toFixed(4));
          element.style.setProperty("--scene-entry", clamp((viewport - bounds.top) / (viewport * 0.72)).toFixed(4));
          element.style.setProperty("--scene-exit", clamp(-bounds.top / (viewport * 0.85)).toFixed(4));
        }
        for (const { element, bounds } of imagePositions) {
          if (bounds.bottom < 0 || bounds.top > viewport) continue;
          const distance = Number(element.dataset.parallax) || 0;
          const progress = Math.max(-1, Math.min(1,
            (viewport / 2 - bounds.top - bounds.height / 2) / (viewport / 2 + bounds.height / 2),
          ));
          element.style.setProperty("--parallax-y", (progress * distance).toFixed(2) + "px");
        }
      }

      function schedule() {
        if (!disposed && !frame && (scenes.size || parallax.size)) frame = requestAnimationFrame(update);
      }
      function resize() {
        if (!desktop.matches) parallax.forEach((element) => element.style.removeProperty("--parallax-y"));
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
      const sizes = new ResizeObserver(schedule);
      scan();
      mutations.observe(root, { childList: true, subtree: true });
      sizes.observe(root);
      document.fonts.ready.then(schedule);
      root.addEventListener("focusin", focus);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", schedule);
      desktop.addEventListener("change", resize);

      dispose = () => {
        disposed = true;
        observer.disconnect();
        sceneObserver.disconnect();
        mutations.disconnect();
        sizes.disconnect();
        cancelAnimationFrame(frame);
        root.removeEventListener("focusin", focus);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", schedule);
        desktop.removeEventListener("change", resize);
        seen.forEach((element) => delete element.dataset.motion);
        parallax.forEach((element) => element.style.removeProperty("--parallax-y"));
        scenes.forEach((element) => {
          element.style.removeProperty("--scene-progress");
          element.style.removeProperty("--scene-entry");
          element.style.removeProperty("--scene-exit");
        });
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
