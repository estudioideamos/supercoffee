"use client";

import { useEffect, useState } from "react";

const links = [
  ["#home", "Inicio"],
  ["#about", "Origen"],
  ["#menu", "Carta"],
  ["#gallery", "Momentos"],
  ["#visit", "Visitanos"],
] as const;

export default function PremiumHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`premium-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-container header-inner">
        <a className="wordmark" href="#home" aria-label="Supercoffee, inicio">
          <span>SUPER</span>
          <span>COFFEE</span>
        </a>

        <nav className={`primary-nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#menu">
          Ver carta <span aria-hidden="true">↗</span>
        </a>

        <button
          className={`nav-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
