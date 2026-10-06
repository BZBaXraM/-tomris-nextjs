"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { motionEase, prefersReducedMotion } from "@/lib/motion";

export function AnimatedService({
  id,
  initialOpen,
  summary,
  children,
}: {
  id: string;
  initialOpen: boolean;
  summary: ReactNode;
  children: ReactNode;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const expanded = useRef(initialOpen);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function settle() {
      if (!media.matches || !animation.current) return;
      animation.current.onfinish = null;
      animation.current.cancel();
      animation.current = null;
      const element = details.current;
      if (element) {
        element.open = expanded.current;
        element.style.removeProperty("height");
        element.style.removeProperty("overflow");
      }
      if (content.current) content.current.inert = false;
    }
    media.addEventListener("change", settle);
    return () => {
      media.removeEventListener("change", settle);
      animation.current?.cancel();
    };
  }, []);

  function toggle(event: MouseEvent<HTMLElement>) {
    const element = details.current;
    const body = content.current;
    if (!element || !body || prefersReducedMotion() || !element.animate) return;

    event.preventDefault();
    const opening = animation.current ? !expanded.current : !element.open;
    const start = element.getBoundingClientRect().height;
    expanded.current = opening;
    if (animation.current) {
      animation.current.onfinish = null;
      animation.current.cancel();
    }
    element.style.overflow = "hidden";
    element.style.height = "auto";
    element.open = true;
    body.inert = !opening;
    const heading = element.querySelector("summary")!;
    const end = opening
      ? element.getBoundingClientRect().height
      : heading.getBoundingClientRect().height + element.clientTop;
    element.style.height = `${start}px`;

    const current = element.animate(
      { height: [`${start}px`, `${end}px`] },
      { duration: 420, easing: motionEase },
    );
    animation.current = current;
    current.onfinish = () => {
      element.open = opening;
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      body.inert = false;
      animation.current = null;
    };
  }

  return (
    <details
      className="service"
      id={id}
      ref={details}
      open={initialOpen}
      data-reveal="up"
    >
      <summary onClick={toggle}>{summary}</summary>
      <div className="service-detail" ref={content}>
        {children}
      </div>
    </details>
  );
}
