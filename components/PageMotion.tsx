"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function PageMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const smoothScroll = gsap.matchMedia();
    smoothScroll.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        smoothWheel: true,
        wheelMultiplier: 0.65,
        lerp: 0.065,
        syncTouch: false,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      });
      const tick = () => lenis.raf(performance.now());
      const resize = () => lenis.resize();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      ScrollTrigger.addEventListener("refresh", resize);

      return () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.removeEventListener("refresh", resize);
        lenis.destroy();
      };
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: Number(element.dataset.parallax ?? -8),
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    });

    return () => {
      smoothScroll.revert();
      ctx.revert();
    };
  }, []);

  return null;
}
