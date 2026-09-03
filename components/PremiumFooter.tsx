const footerLinks = [
  ["01", "#about", "Origen"],
  ["02", "#menu", "Carta"],
  ["03", "#gallery", "La casa"],
  ["04", "#visit", "Contacto"],
] as const;

export default function PremiumFooter() {
  return (
    <footer id="site-footer" className="premium-footer" aria-label="Pie de página">
      <div className="footer-glow" aria-hidden="true" />
      <div className="site-container">
        <div className="footer-eyebrow">
          <span>Palermo — Buenos Aires</span>
          <span>Todos los días · 08—20 h</span>
        </div>

        <div className="footer-statement" data-reveal>
          <p>La última taza<br />nunca es la última.</p>
          <a className="footer-contact" href="mailto:hola@supercoffee.com.ar">
            <span>Hablemos</span>
            <strong>hola@supercoffee.com.ar</strong>
            <i aria-hidden="true">↗</i>
          </a>
        </div>

        <div className="footer-navigation">
          <nav aria-label="Navegación del pie">
            {footerLinks.map(([index, href, label]) => (
              <a key={href} href={href}>
                <span>{index}</span>
                <strong>{label}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </nav>
          <div className="footer-address">
            <span>Encontranos</span>
            <p>Palermo<br />Buenos Aires, AR</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Palermo%2C%20Buenos%20Aires" target="_blank" rel="noreferrer">
              Cómo llegar <i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>

        <a className="footer-masthead" href="#home" aria-label="Supercoffee, volver al inicio">
          <span>SUPER</span><span>COFFEE</span>
        </a>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Supercoffee</span>
          <a
            className="concept-credit"
            href="https://ideamos.com.ar/"
            target="_blank"
            rel="noreferrer"
            aria-label="Concepto por Estudio Ideamos, abrir sitio"
          >
            <span>Concepto y dirección creativa</span>
            <strong>Estudio Ideamos</strong>
            <i aria-hidden="true">↗</i>
          </a>
          <a className="footer-top-link" href="#home">Volver arriba <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
