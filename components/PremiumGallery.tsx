import Image from "next/image";
import { asset } from "@/lib/site";

const gallery = [
  {
    src: "/assets/img/roastery-craft.webp",
    alt: "Granos de café recién tostados",
    label: "El oficio",
    className: "gallery-tall",
  },
  {
    src: "/assets/img/product-cappuccino.webp",
    alt: "Cappuccino con arte latte",
    label: "La pausa",
    className: "gallery-wide",
  },
  {
    src: "/assets/img/gallery-interior.webp",
    alt: "Interior luminoso de Supercoffee",
    label: "La casa",
    className: "gallery-small",
  },
  {
    src: "/assets/img/product-pastry.webp",
    alt: "Pastelería artesanal y espresso",
    label: "Cada mañana",
    className: "gallery-small",
  },
];

export default function PremiumGallery() {
  return (
    <>
      <section className="manifesto-band" aria-label="Manifiesto Supercoffee">
        <div className="marquee" aria-hidden="true">
          <span>CAFÉ · TIEMPO · ORIGEN · TEXTURA · CAFÉ · TIEMPO · ORIGEN · TEXTURA ·</span>
          <span>CAFÉ · TIEMPO · ORIGEN · TEXTURA · CAFÉ · TIEMPO · ORIGEN · TEXTURA ·</span>
        </div>
        <blockquote data-reveal>
          “No hacemos café rápido.
          <br />
          Hacemos que el tiempo <em>valga.</em>”
        </blockquote>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="site-container">
          <header className="section-heading gallery-heading" data-reveal>
            <div>
              <span className="section-index">04 / MOMENTOS</span>
              <h2>Una casa para <em>quedarte.</em></h2>
            </div>
            <p>Vení por el café. Quedate por la luz, la música y esa mesa que termina siendo tuya.</p>
          </header>

          <div className="editorial-gallery">
            {gallery.map((photo) => (
              <figure key={photo.label} className={photo.className} data-reveal>
                <Image src={asset(photo.src)} alt={photo.alt} fill sizes="(max-width: 760px) 92vw, 48vw" />
                <figcaption>{photo.label}<span>↗</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="site-container testimonial-grid">
          <div className="testimonial-score" data-reveal>
            <span>4.9</span>
            <i>★★★★★</i>
            <p>Más de 380 visitas</p>
          </div>
          <blockquote data-reveal>
            “El cappuccino es impecable, pero vuelvo por cómo se siente el lugar:
            tranquilo, cuidado y con una energía hermosa.”
            <footer>— Marina T. · clienta habitual</footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
