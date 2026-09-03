"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/site";

type Category = "calientes" | "frios" | "pasteleria";

const categories: { key: Category; label: string }[] = [
  { key: "calientes", label: "Calientes" },
  { key: "frios", label: "Fríos" },
  { key: "pasteleria", label: "Pastelería" },
];

const menu: Record<Category, { name: string; note: string; price: string }[]> = {
  calientes: [
    { name: "Espresso", note: "Doble shot · cacao · avellana", price: "$2.900" },
    { name: "Flat white", note: "Doble ristretto · leche sedosa", price: "$3.900" },
    { name: "Cappuccino", note: "Espresso · microespuma · cacao", price: "$3.600" },
    { name: "Filtro del día", note: "Origen rotativo · V60", price: "$4.100" },
  ],
  frios: [
    { name: "Super cold", note: "Espresso · leche · crema fría", price: "$4.600" },
    { name: "Cold brew", note: "18 horas · suave · chocolate", price: "$4.500" },
    { name: "Espresso tonic", note: "Espresso · tónica · pomelo", price: "$4.900" },
    { name: "Affogato", note: "Espresso · helado de vainilla", price: "$4.800" },
  ],
  pasteleria: [
    { name: "Croissant", note: "Manteca · laminado artesanal", price: "$2.700" },
    { name: "Roll de canela", note: "Canela · mascabo · glaseado", price: "$3.200" },
    { name: "Cookie 70%", note: "Chocolate · sal marina", price: "$2.600" },
    { name: "Budín cítrico", note: "Naranja · almendras", price: "$2.900" },
  ],
};

export default function PremiumMenu() {
  const [active, setActive] = useState<Category>("calientes");

  return (
    <section id="menu" className="menu-section">
      <div className="site-container">
        <header className="section-heading menu-heading" data-reveal>
          <div>
            <span className="section-index">03 / LA CARTA</span>
            <h2>Elegí tu próximo <em>ritual.</em></h2>
          </div>
          <p>Recetas precisas, ingredientes honestos y el tiempo necesario para hacerlas bien.</p>
        </header>

        <div className="menu-feature" data-reveal>
          <div className="menu-feature-image" data-parallax="-5">
            <Image
              src={asset("/assets/img/ritual-spread.webp")}
              alt="Iced latte, espresso y croissant sobre una barra de piedra"
              fill
              sizes="(max-width: 900px) 94vw, 58vw"
            />
          </div>
          <div className="menu-feature-copy">
            <span>NUEVO · FIRMA DE LA CASA</span>
            <h3>Super Cold</h3>
            <p>Capas de espresso, leche helada y crema sedosa. Fresco, intenso y perfectamente equilibrado.</p>
            <strong>$4.600</strong>
          </div>
        </div>

        <div className="menu-browser">
          <div className="menu-tabs" role="tablist" aria-label="Categorías de la carta">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                role="tab"
                aria-selected={active === category.key}
                onClick={() => setActive(category.key)}
              >
                <span>{category.label}</span>
                <i />
              </button>
            ))}
          </div>

          <div key={active} className="menu-list" role="tabpanel">
            {menu[active].map((item, index) => (
              <article key={item.name} data-reveal>
                <span className="menu-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </div>
                <strong>{item.price}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
