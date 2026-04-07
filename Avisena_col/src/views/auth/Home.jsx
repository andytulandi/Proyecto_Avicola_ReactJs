import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section>
        <h1>Bienvenido a Avisena</h1>
        <Link to="/login">Ir a la página de inicio</Link>
      </section>
      <section className="bg-background-light dark:bg-background-dark font-display transition-colors duration-300">
        <section className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <section className="layout-container flex h-full grow flex-col">
            <section className="flex items-center justify-between whitespace-nowrap border-b border-solid border-emerald-100 dark:border-emerald-900 px-6 md:px-20 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
              <section className="flex items-center gap-3 text-emerald-900 dark:text-emerald-50">
                <img src="assets/images/logo-sena-verde-complementario-svg-2022.svg" alt="Logo SENA" className="w-14 h-14 object-contain rounded-full" />
                <h2 className="text-xl font-black leading-tight tracking-[-0.015em]">
                  AVISENA COL
                </h2>
              </section>
              <section className="  hidden md:flex flex-1 justify-end items-center gap-6">
                <nav className="flex items-center gap-6 font-sans">
                  <a href="#blog" className="text-black text-sm font-semibold">
                    Blog de artículos
                  </a>
                  <a href="#acerca" className="text-black text-sm font-semibold">
                    Acerca de nosotros
                  </a>
                  <a href="#contactanos" className="text-black text-sm font-semibold">
                    Contáctanos
                  </a>
                </nav>
                <Link to="/register" className="bg-[#49e619] hover:bg-[#3cd110] text-[#0b3303] text-xl font-bold px-4 py-2 rounded-2xl shadow-[0_10px_10px_rgba(73,230,25,0.4)] transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3">
                  Registrarse
                </Link>
                <Link to="/login" className="bg-[#49e619] hover:bg-[#3cd110] text-[#0b3303] text-xl font-bold px-4 py-2 rounded-2xl shadow-[0_10px_10px_rgba(73,230,25,0.4)] transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3">
                  Iniciar Sesión
                </Link>
              </section>
              <aside className="md:hidden">
                <span className="material-symbols-outlined text-3xl text-emerald-900 dark:text-emerald-50 cursor-pointer">
                  menu
                </span>
              </aside>
            </section>
            <main className="flex flex-1 flex-col">
              <section className="px-4 md:px-20 py-8">
                <section className="max-w-[1280px] mx-auto w-full">
                  <section className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <section className="flex min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full flex-col bg-cover bg-center bg-no-repeat items-center justify-center p-6 text-center bg-[#2c1d16]" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("assets/images/gallina_baner.jpg")' }}>
                      <article className="max-w-3xl bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                        <h2 className="text-white text-5xl md:text-6xl font-black leading-tight">
                          ¡Bienvenido!
                        </h2>
                        <p className="text-white text-lg md:text-xl font-medium mt-6">
                          Controla tu producción de huevos de forma eficiente.<br className="hidden md:block" />
                          Gestiona tus lotes y monitorea la salud de tus aves.<br className="hidden md:block" />
                          ¡Tu éxito avícola a un toque de distancia!
                        </p>
                      </article>
                    </section>
                  </section>
                </section>
              </section>
              <section className="px-4 md:px-20 py-16 bg-white dark:bg-black/20">
                <section className="max-w-[1280px] mx-auto">
                  <section className="flex flex-col gap-12 @container">
                    <article className="flex flex-col gap-4 text-center items-center">
                      <h2 className="text-emerald-950 dark:text-emerald-50 tracking-tight text-3xl font-black leading-tight md:text-5xl max-w-[800px]">
                        Todo lo que necesitas para tu galpón
                      </h2>
                      <p className="text-emerald-800 dark:text-emerald-200 text-lg font-normal leading-normal max-w-[720px]">
                        Nuestras herramientas digitales están diseñadas para mejorar la eficiencia operativa y el control total de tu producción desde la palma de tu mano.
                      </p>
                    </article>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <article className="flex flex-col gap-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 bg-background-light dark:bg-background-dark/40 p-8 hover:shadow-xl transition-all duration-300 border-b-4 border-b-primary">
                        <section className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-4xl">monitoring</span>
                        </section>
                        <section className="flex flex-col gap-2">
                          <h2 className="text-emerald-950 dark:text-emerald-50 text-xl font-bold leading-tight">
                            Control de Producción
                          </h2>
                          <p className="text-emerald-800 dark:text-emerald-300 text-base font-normal leading-relaxed">
                            Registra y controla la producción diaria de huevos de forma rápida y organizada.
                          </p>
                        </section>
                      </article>
                      <article className="flex flex-col gap-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 bg-background-light dark:bg-background-dark/40 p-8 hover:shadow-xl transition-all duration-300 border-b-4 border-b-primary">
                        <section className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-4xl">fact_check</span>
                        </section>
                        <section className="flex flex-col gap-2">
                          <h2 className="text-emerald-950 dark:text-emerald-50 text-xl font-bold leading-tight">
                            Clasificación
                          </h2>
                          <p className="text-emerald-800 dark:text-emerald-300 text-base font-normal leading-relaxed">
                            Clasifica los huevos por tamaño, calidad y tipo para mejorar la gestión y ventas.
                          </p>
                        </section>
                      </article>
                      <article className="flex flex-col gap-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 bg-background-light dark:bg-background-dark/40 p-8 hover:shadow-xl transition-all duration-300 border-b-4 border-b-primary">
                        <section className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-4xl">heart_broken</span>
                        </section>
                        <section className="flex flex-col gap-2">
                          <h2 className="text-emerald-950 dark:text-emerald-50 text-xl font-bold leading-tight">
                            Mortalidad
                          </h2>
                          <p className="text-emerald-800 dark:text-emerald-300 text-base font-normal leading-relaxed">
                            Lleva el control de aves fallecidas para análisis y toma de decisiones oportunas.
                          </p>
                        </section>
                      </article>
                      <article className="flex flex-col gap-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 bg-background-light dark:bg-background-dark/40 p-8 hover:shadow-xl transition-all duration-300 border-b-4 border-b-primary">
                        <section className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-4xl">medical_services</span>
                        </section>
                        <section className="flex flex-col gap-2">
                          <h2 className="text-emerald-950 dark:text-emerald-50 text-xl font-bold leading-tight">
                            Morbilidad
                          </h2>
                          <p className="text-emerald-800 dark:text-emerald-300 text-base font-normal leading-relaxed">
                            Registra enfermedades y síntomas para monitorear la salud general del lote.
                          </p>
                        </section>
                      </article>
                    </section>
                  </section>
                </section>
              </section>
              <section className="px-4 md:px-20 py-16">
                <section className="max-w-[1280px] mx-auto bg-emerald-900 dark:bg-emerald-950 rounded-[2rem] overflow-hidden relative">
                  <aside className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl"></aside>
                  <aside className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-20 -mb-20 blur-3xl"></aside>
                  <section className="flex flex-col items-center gap-8 px-6 py-16 md:py-24 relative z-10">
                    <article className="flex flex-col gap-4 text-center max-w-[720px]">
                      <h2 className="text-white tracking-tight text-3xl font-black leading-tight md:text-5xl">
                        ¿Listo para digitalizar tu granja?
                      </h2>
                      <p className="text-emerald-100/80 text-lg font-normal leading-relaxed">
                        Únete a cientos de productores que ya están optimizando sus resultados y aumentando su producción con tecnología de punta.
                      </p>
                    </article>
                    <a href="https://play.google.com/store/apps" target="_blank" className="bg-[#49e619] hover:bg-[#3cd110] text-[#0b3303] text-xl font-bold px-12 py-5 rounded-2xl shadow-[0_15px_30px_rgba(73,230,25,0.4)] transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3">
                      <span className="material-symbols-outlined">download</span>
                      Comenzar Ahora
                    </a>
                  </section>
                </section>
              </section>
            </main>
            <footer className="bg-background-light dark:bg-background-dark border-t border-emerald-100 dark:border-emerald-900">
              <section className="max-w-[1280px] mx-auto flex flex-col gap-10 px-6 md:px-20 py-12 text-center">
                <section className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <section className="flex items-center gap-3 text-emerald-900 dark:text-emerald-50">
                    <img src="assets/images/logo-sena-verde-complementario-svg-2022.svg" alt="Logo SENA" className="w-12 h-12" />
                    <h2 className="text-xl font-black">AVISENA COL</h2>
                  </section>
                  <nav className="flex flex-wrap items-center justify-center gap-8">
                    <a className="text-emerald-800 dark:text-emerald-400 text-sm font-medium hover:text-primary transition-colors" href="#">Términos de Servicio</a>
                    <a className="text-emerald-800 dark:text-emerald-400 text-sm font-medium hover:text-primary transition-colors" href="#">Privacidad</a>
                    <a className="text-emerald-800 dark:text-emerald-400 text-sm font-medium hover:text-primary transition-colors" href="#">Soporte</a>
                  </nav>
                  <aside id="contactanos" className="flex flex-wrap justify-center gap-5">
                    <a className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 hover:bg-primary hover:text-emerald-950 transition-all" href="#"><span className="material-symbols-outlined text-xl">share</span></a>
                    <a className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 hover:bg-primary hover:text-emerald-950 transition-all" href="#"><span className="material-symbols-outlined text-xl">alternate_email</span></a>
                    <a className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 hover:bg-primary hover:text-emerald-950 transition-all" href="#"><span className="material-symbols-outlined text-xl">public</span></a>
                  </aside>
                </section>
                <section className="border-t border-emerald-100 dark:border-emerald-900 pt-8">
                  <p className="text-emerald-700 dark:text-emerald-500 text-sm font-medium">
                    © 2026 AVISENA COL. Innovación sostenible para la industria avícola.
                  </p>
                </section>
              </section>
            </footer>
          </section>
        </section>
      </section>
    </>
  );
}