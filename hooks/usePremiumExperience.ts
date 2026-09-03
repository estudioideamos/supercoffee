"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PremiumRefs {
  root: RefObject<HTMLElement | null>;
  darkStage: RefObject<HTMLDivElement | null>;
  creamStage: RefObject<HTMLDivElement | null>;
  goldStage: RefObject<HTMLDivElement | null>;
  heroCopy: RefObject<HTMLDivElement | null>;
  aboutCopy: RefObject<HTMLDivElement | null>;
  aboutImage: RefObject<HTMLDivElement | null>;
  signatureCopy: RefObject<HTMLDivElement | null>;
  cupGroup: RefObject<HTMLDivElement | null>;
  cup: RefObject<HTMLDivElement | null>;
  beans: RefObject<(HTMLDivElement | null)[]>;
  progress: RefObject<HTMLSpanElement | null>;
  scene: RefObject<HTMLSpanElement | null>;
}

export function usePremiumExperience(refs: PremiumRefs) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = refs.root.current;
    if (!root) return;

    let removeHashListener = () => {};
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        root.dataset.reducedMotion = "true";
        return;
      }

      const mobile = window.matchMedia("(max-width: 820px)").matches;
      const beanElements = refs.beans.current.filter(Boolean);

      gsap.set([refs.aboutCopy.current, refs.aboutImage.current, refs.signatureCopy.current], {
        opacity: 0,
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=440%",
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (refs.progress.current) {
              refs.progress.current.style.transform = `scaleX(${self.progress})`;
            }
            if (refs.scene.current) {
              refs.scene.current.textContent =
                self.progress < 0.29 ? "01" : self.progress < 0.68 ? "02" : "03";
            }
          },
        },
      });

      timeline
        .to(refs.darkStage.current, {
          scale: 1.14,
          xPercent: -2,
          filter: "brightness(.72) blur(2px)",
          duration: 34,
          ease: "none",
        }, 0)
        .to(refs.heroCopy.current, {
          xPercent: mobile ? -8 : -18,
          yPercent: mobile ? 14 : 0,
          opacity: 0,
          filter: "blur(9px)",
          duration: 18,
        }, 5)
        .to(refs.cupGroup.current, {
          x: mobile ? "-9vw" : "-13vw",
          y: mobile ? "-7vh" : "-3vh",
          scale: mobile ? 1.08 : 1.16,
          rotation: -3,
          duration: 22,
        }, 6)
        .to(refs.creamStage.current, {
          clipPath: "inset(0% 0 0)",
          duration: 24,
          ease: "power3.inOut",
        }, 20)
        .to(refs.cupGroup.current, {
          x: mobile ? "-22vw" : "-17vw",
          y: mobile ? "-23vh" : "2vh",
          scale: mobile ? .62 : .72,
          rotation: 2,
          duration: 22,
          ease: "power3.inOut",
        }, 29)
        .fromTo(refs.aboutImage.current, {
          xPercent: -18,
          yPercent: 8,
          scale: 1.08,
          opacity: 0,
        }, {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 18,
          ease: "power3.out",
        }, 33)
        .fromTo(refs.aboutCopy.current, {
          xPercent: 12,
          opacity: 0,
          filter: "blur(8px)",
        }, {
          xPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 17,
          ease: "power3.out",
        }, 36)
        .to([refs.aboutCopy.current, refs.aboutImage.current], {
          yPercent: -8,
          opacity: 0,
          filter: "blur(8px)",
          duration: 13,
        }, 58)
        .to(refs.goldStage.current, {
          opacity: 1,
          duration: 18,
        }, 62)
        .to(refs.creamStage.current, {
          opacity: 0,
          duration: 15,
        }, 65)
        .to(refs.cupGroup.current, {
          x: mobile ? "-5vw" : "18vw",
          y: mobile ? "-16vh" : "0vh",
          scale: mobile ? .9 : 1.12,
          rotation: -2,
          duration: 23,
          ease: "power3.inOut",
        }, 59)
        .fromTo(refs.signatureCopy.current, {
          xPercent: -10,
          opacity: 0,
          filter: "blur(10px)",
        }, {
          xPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 17,
          ease: "power3.out",
        }, 75)
        .to(refs.cup.current, {
          scale: 1.04,
          duration: 25,
          ease: "none",
        }, 75);

      beanElements.forEach((element, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        timeline.to(element, {
          x: direction * (mobile ? 16 : 28) + "vw",
          y: (index - 2) * (mobile ? 9 : 13) + "vh",
          rotation: direction * (80 + index * 24),
          scale: index === 0 ? 1.45 : .8 + index * .12,
          duration: 100,
          ease: "none",
        }, 0);
      });

      const scrollToOrigin = () => {
        if (window.location.hash !== "#about" || !timeline.scrollTrigger) return;
        const { start, end } = timeline.scrollTrigger;
        window.scrollTo({
          top: start + (end - start) * 0.43,
          behavior: "smooth",
        });
      };

      window.addEventListener("hashchange", scrollToOrigin);
      scrollToOrigin();
      removeHashListener = () => window.removeEventListener("hashchange", scrollToOrigin);

    }, root);

    return () => {
      removeHashListener();
      ctx.revert();
    };
  }, []);
}
