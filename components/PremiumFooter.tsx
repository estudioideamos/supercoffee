const footerLinks = [
  ["#about", "Origen"],
  ["#menu", "Carta"],
  ["#gallery", "Momentos"],
  ["#visit", "Visitanos"],
] as const;

export default function PremiumFooter() {
  return (
    <footer className="premium-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <span className="footer-kicker">Seguimos la conversación</span>
            <h2>¿Otro café?</h2>
          </div>
          <a href="mailto:hola@supercoffee.com.ar">
            hola@supercoffee.com.ar <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="footer-grid">
          <a className="footer-wordmark" href="#home" aria-label="Supercoffee, inicio">
            <span>SUPER</span>
            <span>COFFEE</span>
          </a>
          <nav aria-label="Navegación del pie">
            {footerLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="footer-social">
            <a href="#home">Instagram</a>
            <a href="#home">TikTok</a>
            <a href="#home">Spotify</a>
          </div>
          <p className="footer-note">Café de especialidad, tostado en pequeñas partidas en Buenos Aires.</p>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Supercoffee</span>
          <a
            className="concept-credit"
            href="https://ideamos.com.ar/"
            target="_blank"
            rel="noreferrer"
            aria-label="Concepto por Estudio Ideamos, abrir sitio"
          >
            <span>Concepto nacido en</span>
            <strong>Estudio Ideamos</strong>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </div>
    </footer>
  );
}
