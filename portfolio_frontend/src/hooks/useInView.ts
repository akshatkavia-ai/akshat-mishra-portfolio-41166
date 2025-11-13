"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect when an element is in the viewport, toggling `in-view` class.
 * Respects prefers-reduced-motion by still toggling visibility without animation.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            node.classList.add("in-view");
          } else {
            node.classList.remove("in-view");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
        ...options,
      }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}
