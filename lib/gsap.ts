import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function getGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function supportsPointerMotion(minWidth = 768): boolean {
  if (typeof window === "undefined" || prefersReducedMotion()) return false;

  return (
    window.innerWidth >= minWidth &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(hover: none)").matches &&
    !("ontouchstart" in window)
  );
}

/**
 * Safe clip-path mask reveal that NEVER hides content if JS or ScrollTrigger fails.
 * Uses `once: true` so content stays permanently visible once revealed.
 */
export function animateClipPathReveal(element: HTMLElement, triggerElement?: HTMLElement) {
  if (prefersReducedMotion() || !element) return;
  const { gsap, ScrollTrigger } = getGSAP();

  gsap.fromTo(
    element,
    { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.8 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerElement || element,
        start: "top 85%",
        once: true, // Content NEVER hides after revealing!
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Safe staggered reveal scene helper that uses `once: true`.
 */
export function animateStaggeredScene(container: HTMLElement) {
  if (prefersReducedMotion() || !container) return;
  const { gsap, ScrollTrigger } = getGSAP();

  const elements = container.querySelectorAll("[data-animate]");
  if (!elements.length) return;

  gsap.fromTo(
    elements,
    { opacity: 0.2, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true, // Content NEVER hides after revealing!
        toggleActions: "play none none none",
      },
    }
  );
}
