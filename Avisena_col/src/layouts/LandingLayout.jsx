import { Outlet, Link } from 'react-router-dom';
import logoSena from '../assets/images/logo-sena-verde-complementario-svg-2022.svg';
import '../assets/css/index.css';
import HomeView from '../views/HomeView';

export default function LandingLayout() {
  return (
    <>
      <header>
        <section className="nav">
          <figure className="brand">
            <img src={logoSena} alt="AVISENA COL Logo" />
            <figcaption>AVISENA COL</figcaption>
          </figure>

          <nav className="menu">
            <Link to="#">Blog</Link>
            <Link to="#">Nosotros</Link>
            <Link to="#">Contacto</Link>
          </nav>

          <aside className="actions">
            <Link to="/register" className="primary">Registrarse</Link>
            <Link to="/login" className="primary">Iniciar sesión</Link>
          </aside>
        </section>
      </header>

      <main>
        <section className="hero">
        <article className="hero-content">
          <h1>¡Bienvenido!</h1>
          <p>
            Controla tu producción de huevos de forma eficiente.<br />
            Gestiona tus lotes y monitorea la salud de tus aves.<br />
            ¡Tu éxito avícola a un toque de distancia!
          </p>
        </article>
      </section>

      {/* FEATURES */}
      <section className="features">
        <header className="features-header">
          <h2>Todo lo que necesitas para tu galpón</h2>
          <p>
            Nuestras herramientas digitales están diseñadas para mejorar la eficiencia operativa
            y el control total de tu producción desde la palma de tu mano.
          </p>
        </header>

        <section className="cards">
          <article>
            <span>📊</span>
            <h3>Control de Producción</h3>
            <p>Registra y controla la producción diaria de huevos de forma rápida y organizada.</p>
          </article>

          <article>
            <span>✔️</span>
            <h3>Clasificación</h3>
            <p>Clasifica los huevos por tamaño, calidad y tipo para mejorar la gestión.</p>
          </article>

          <article>
            <span>💔</span>
            <h3>Mortalidad</h3>
            <p>Lleva el control de aves fallecidas para análisis y toma de decisiones oportunas.</p>
          </article>

          <article>
            <span>🏥</span>
            <h3>Morbilidad</h3>
            <p>Registra enfermedades y síntomas del lote.</p>
          </article>
        </section>
      </section>

      {/* CTA */}
      <section className="cta">
        <article>
          <h2>¿Listo para digitalizar tu granja?</h2>
          <p>Únete a cientos de productores que ya están optimizando sus resultados y aumentando su producción con tecnología de punta.</p>
          <div className="cta-buttons">
            <Link to="/register">Comenzar Ahora</Link>
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </article>
      </section>
    
      </main>

      <footer>
        <section>
          <p>© 2026 AVISENA COL. Innovación sostenible para la industria avícola.</p>
        </section>
      </footer>
    </>
  );
}
