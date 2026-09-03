import Image from "next/image";
import { asset } from "@/lib/site";
import PremiumContactForm from "./PremiumContactForm";

export default function PremiumVisit() {
  return (
    <section id="visit" className="visit-section">
      <div className="visit-backdrop" data-parallax="-7">
        <Image
          src={asset("/assets/img/hero-cinematic.webp")}
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      <span className="visit-overlay" />

      <div className="site-container visit-content">
        <div className="visit-copy" data-reveal>
          <span className="section-index light">05 / VISITANOS</span>
          <h2>Tu próxima pausa<br />empieza <em>acá.</em></h2>
          <p>Una mesa junto a la ventana, música baja y café recién molido. El resto puede esperar.</p>
          <a
            className="visit-action"
            href="https://www.google.com/maps/search/?api=1&query=Palermo%2C%20Buenos%20Aires"
            target="_blank"
            rel="noreferrer"
          >
            Abrir en mapas <span aria-hidden="true">↗</span>
          </a>
          <p className="visit-meta">Palermo · Buenos Aires <span>Todos los días · 8 a 20 h</span></p>
        </div>

        <PremiumContactForm />
      </div>
    </section>
  );
}
