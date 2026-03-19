export default function DashboardHome() {
  return (
    <div>
      <h1>DashboardHome</h1>
      <body class="bg-background-light dark:bg-background-dark font-display text-[#111b0e] dark:text-white transition-colors duration-200">
        <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          <header class="flex items-center justify-between border-b border-solid border-[#eaf3e7] dark:border-[#2a3a24] bg-white dark:bg-[#1c2a17] px-6 md:px-20 py-4">
            <div class="flex items-center gap-3">
              <div class="size-8 text-primary">
                <span class="material-symbols-outlined text-4xl">egg_alt</span>
              </div>
              <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">Granja Digital</h2>
            </div>
            <div class="flex items-center gap-4">
              <a class="text-sm font-medium hover:text-primary transition-colors" href="#">Ayuda</a>
              <button class="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-[#2d6a1a] dark:text-primary hover:bg-primary/20 transition-colors">
                Iniciar Sesión
              </button>
            </div>
          </header>
          <main class="flex flex-1 items-center justify-center p-6 md:p-12">
            <div class="w-full max-w-[640px] rounded-xl bg-white dark:bg-[#1c2a17] p-8 shadow-xl shadow-black/5 border border-[#eaf3e7] dark:border-[#2a3a24]">
              <div class="mb-8 text-center">
                <h1 class="text-3xl font-bold tracking-tight mb-2">Registro de Usuarios</h1>
                <p class="text-[#5f7a55] dark:text-gray-400 text-base">Únete a la plataforma de gestión avícola inteligente y controla tu producción.</p>
              </div>
              <form class="space-y-6">

                <div class="space-y-2">
                  <label class="text-sm font-medium">Nombre Completo</label>
                  <div class="relative">
                    <input class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Ej. Juan Pérez" required="" type="text" />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Correo Electrónico</label>
                    <input class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="usuario@granja.com" required="" type="email" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Rol del Usuario</label>
                    <select class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                      <option value="aprendiz">Aprendiz</option>
                      <option value="instructor_lider">Instructor Líder</option>
                      <option value="instructor_investigador">Instructor Investigador</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Tipo de Documento</label>
                    <select class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                      <option value="cc">Cédula de Ciudadanía</option>
                      <option value="ti">Tarjeta de Identidad</option>
                      <option value="ce">Cédula de Extranjería</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Número de Documento <span class="text-red-500">*</span></label>
                    <input class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="123456789" required="" type="text" />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium">Contraseña</label>
                  <div class="relative">
                    <input class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 pr-10 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="••••••••••••" required="" type="password" />
                    <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none">visibility_off</span>
                  </div>

                  <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg bg-background-light dark:bg-[#152111] p-4 text-xs font-medium border border-[#eaf3e7] dark:border-[#2a3a24]">
                    <div class="flex items-center gap-2 text-gray-500">
                      <span class="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Mínimo 10 caracteres</span>
                    </div>
                    <div class="flex items-center gap-2 text-primary">
                      <span class="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Al menos 1 mayúscula</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-500">
                      <span class="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Al menos 5 números</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-500">
                      <span class="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>1 carácter especial</span>
                    </div>
                  </div>
                </div>

                <button class="w-full rounded-lg bg-primary py-4 text-center text-lg font-bold text-[#111b0e] shadow-lg shadow-primary/20 hover:bg-opacity-90 active:scale-[0.98] transition-all" type="submit">
                  Registrarse
                </button>

                <p class="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  ¿Ya tienes una cuenta?
                  <a class="text-primary hover:underline ml-1" href="#">Inicia Sesión</a>
                </p>
              </form>
            </div>
          </main>

          <footer class="py-8 text-center text-xs text-gray-400 dark:text-gray-600">
            <div class="flex items-center justify-center gap-2 mb-2">
              <span class="material-symbols-outlined text-sm">agriculture</span>
              <span>Granja Digital © 2024 - Sistema de Gestión Avícola</span>
            </div>
            <div class="flex justify-center gap-4">
              <a class="hover:text-primary transition-colors" href="#">Términos de servicio</a>
              <a class="hover:text-primary transition-colors" href="#">Privacidad</a>
            </div>
          </footer>

          <div class="fixed top-0 right-0 -z-10 h-[500px] w-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div class="fixed bottom-0 left-0 -z-10 h-[300px] w-[300px] bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </div>
      </body>
    </div>
  )
}

