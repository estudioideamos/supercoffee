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

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

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
          <div className="mobile-nav-meta" aria-hidden={!open}>
            <span>Palermo · Buenos Aires</span>
            <span>08—20 h</span>
          </div>
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
