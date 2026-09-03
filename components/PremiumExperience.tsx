"use client";

import Image from "next/image";
import { useRef } from "react";
import { asset } from "@/lib/site";
import { usePremiumExperience } from "@/hooks/usePremiumExperience";
import styles from "./PremiumExperience.module.css";

const beans = [
  { className: styles.beanOne, size: 148 },
  { className: styles.beanTwo, size: 104 },
  { className: styles.beanThree, size: 74 },
  { className: styles.beanFour, size: 124 },
  { className: styles.beanFive, size: 84 },
] as const;

export default function PremiumExperience() {
  const root = useRef<HTMLElement | null>(null);
  const darkStage = useRef<HTMLDivElement | null>(null);
  const creamStage = useRef<HTMLDivElement | null>(null);
  const goldStage = useRef<HTMLDivElement | null>(null);
  const heroCopy = useRef<HTMLDivElement | null>(null);
  const aboutCopy = useRef<HTMLDivElement | null>(null);
  const aboutImage = useRef<HTMLDivElement | null>(null);
  const signatureCopy = useRef<HTMLDivElement | null>(null);
  const cupGroup = useRef<HTMLDivElement | null>(null);
  const cup = useRef<HTMLDivElement | null>(null);
  const beansRef = useRef<(HTMLDivElement | null)[]>([]);
  const progress = useRef<HTMLSpanElement | null>(null);
  const scene = useRef<HTMLSpanElement | null>(null);

  usePremiumExperience({
    root,
    darkStage,
    creamStage,
    goldStage,
    heroCopy,
    aboutCopy,
    aboutImage,
    signatureCopy,
    cupGroup,
    cup,
    beans: beansRef,
    progress,
    scene,
  });

  return (
    <section ref={root} id="home" className={styles.root} aria-label="Experiencia Supercoffee">
      <div ref={darkStage} className={styles.darkStage}>
        <Image
          className={styles.darkImage}
          src={asset("/assets/img/hero-cinematic.webp")}
          alt=""
          fill
          sizes="100vw"
          preload
          aria-hidden="true"
        />
        <span className={styles.vignette} />
        <span className={styles.film} />
      </div>

      <div ref={creamStage} className={styles.creamStage}>
        <div className={styles.creamGrid}>
          <div ref={aboutImage} className={styles.aboutImage}>
            <Image
              src={asset("/assets/img/roastery-craft.webp")}
              alt="Selección artesanal de granos de café"
              fill
              sizes="(max-width: 760px) 92vw, 42vw"
              className={styles.cover}
            />
            <span className={styles.imageIndex}>02 / ORIGEN</span>
          </div>
          <div ref={aboutCopy} className={styles.aboutCopy}>
            <span className={styles.kicker}>Del origen a la taza</span>
            <h2>
              El detalle
              <br />
              cambia <em>todo.</em>
            </h2>
            <p>
              Seleccionamos microlotes, tostamos en pequeñas partidas y ajustamos
              cada receta hasta encontrar su punto exacto.
            </p>
            <div className={styles.metrics}>
              <span><strong>86+</strong> puntuación</span>
              <span><strong>7</strong> orígenes</span>
              <span><strong>48 h</strong> desde el tueste</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={goldStage} className={styles.goldStage}>
        <span className={styles.goldHalo} />
        <span className={styles.goldWord} aria-hidden="true">COLD</span>
        <div ref={signatureCopy} className={styles.signatureCopy}>
          <span className={styles.kicker}>Firma de la casa</span>
          <h2>
            Frío. Sedoso.
            <br />
            <em>Inolvidable.</em>
          </h2>
          <p>Espresso intenso, leche fría y una textura que cambia con cada sorbo.</p>
          <a href="#menu">Descubrir la carta <span aria-hidden="true">↘</span></a>
        </div>
      </div>

      <div ref={heroCopy} className={styles.heroCopy}>
        <span className={styles.kicker}>Buenos Aires · Tostado propio</span>
        <h1>
          El café se
          <br />
          vuelve <em>experiencia.</em>
        </h1>
        <p>Especialidad sin apuro. Cada taza, una pausa que vale la pena.</p>
        <div className={styles.actions}>
          <a className={styles.primaryAction} href="#menu">Explorar la carta</a>
          <a className={styles.secondaryAction} href="#about">Conocer el ritual</a>
        </div>
      </div>

      <div ref={cupGroup} className={styles.cupGroup}>
        <span className={styles.orbit} />
        <span className={styles.cupGlow} />
        <div ref={cup} className={styles.cup}>
          <Image
            src={asset("/assets/img/cup-cutout.webp")}
            alt="Café Supercoffee con arte latte"
            width={928}
            height={1152}
            preload
          />
        </div>
      </div>

      <div className={styles.beans} aria-hidden="true">
        {beans.map((bean, index) => (
          <div
            key={bean.className}
            ref={(element) => { beansRef.current[index] = element; }}
            className={`${styles.bean} ${bean.className}`}
          >
            <Image
              src={asset("/assets/img/bean-single-cutout.webp")}
              alt=""
              width={bean.size}
              height={bean.size}
            />
          </div>
        ))}
      </div>

      <div className={styles.scrollCue}>
        <span>Deslizá para entrar</span>
        <i />
      </div>

      <div className={styles.progressWrap} aria-hidden="true">
        <span ref={scene} className={styles.sceneLabel}>01</span>
        <span className={styles.progressTrack}><span ref={progress} /></span>
        <span>03</span>
      </div>
    </section>
  );
}
