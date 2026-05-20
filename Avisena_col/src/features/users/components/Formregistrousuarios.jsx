export default function Formregistrousuarios() {
    return (
        <section>
            <form class="space-y-6">

                <section class="space-y-2">
                    <label class="text-sm font-medium">Nombre Completo</label>
                    <section class="relative">
                        <input class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Ej. Juan Pérez" required="" type="text" />
                    </section>
                </section>

                <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <section class="space-y-2">
                        <label class="text-sm font-medium">Correo Electrónico</label>
                        <input class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="usuario@granja.com" required="" type="email" />
                    </section>
                    <section class="space-y-2">
                        <label class="text-sm font-medium">Rol del Usuario</label>
                        <select class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                            <option value="aprendiz">Aprendiz</option>
                            <option value="instructor_lider">Instructor Líder</option>
                            <option value="instructor_investigador">Instructor Investigador</option>
                        </select>
                    </section>
                </section>
section
                <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <section class="space-y-2">
                        <label class="text-sm font-medium">Tipo de Documento</label>
                        <select class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                            <option value="cc">Cédula de Ciudadanía</option>
                            <option value="ti">Tarjeta de Identidad</option>
                            <option value="ce">Cédula de Extranjería</option>
                        </select>
                    </section>
                    <section class="space-y-2">
                        <label class="text-sm font-medium">Número de Documento <span class="text-red-500">*</span></label>
                        <input class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="123456789" required="" type="text" />
                    </section>
                </section>

                <section class="space-y-2">
                    <label class="text-sm font-medium">Contraseña</label>
                    <section class="relative">
                        <input class="w-full rounded-lg border border-[#d5e7d0] dark:border-[#3a4d34] bg-white dark:bg-[#152111] p-3 pr-10 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="••••••••••••" required="" type="password" />
                        <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none">visibility_off</span>
                    </section>

                    <section class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg bg-background-light dark:bg-[#152111] p-4 text-xs font-medium border border-[#eaf3e7] dark:border-[#2a3a24]">
                        <section class="flex items-center gap-2 text-gray-500">
                            <span class="material-symbols-outlined text-[10px]">check_circle</span>
                            <span>Mínimo 10 caracteres</span>
                        </section>
                        <section class="flex items-center gap-2 text-primary">
                            <span class="material-symbols-outlined text-[10px]">check_circle</span>
                            <span>Al menos 1 mayúscula</span>
                        </section>
                        <section class="flex items-center gap-2 text-gray-500">
                            <span class="material-symbols-outlined text-[10px]">check_circle</span>
                            <span>Al menos 5 números</span>
                        </section>
                        <section class="flex items-center gap-2 text-gray-500">
                            <span class="material-symbols-outlined text-[10px]">check_circle</span>
                            <span>1 carácter especial</span>
                        </section>
                    </section>
                </section>

                <button class="w-full rounded-lg !bg-[#5be830] hover:!bg-[#4cc528] text-black py-4 text-center text-lg font-bold shadow-lg shadow-primary/20 hover:bg-opacity-90 active:scale-[0.98] transition-all" type="submit">
                    Registrarse
                </button>

                <p class="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    ¿Ya tienes una cuenta?
                    <a class="text-primary hover:underline ml-1" href="#">Inicia Sesión</a>
                </p>
            </form>

        </section>
    )
}