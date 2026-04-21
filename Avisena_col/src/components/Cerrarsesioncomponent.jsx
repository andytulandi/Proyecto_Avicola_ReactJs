export default function Cerrarsesioncomponent() {
  return (
    <section class="border-t border-[#d5e7d0] dark:border-[#2a3d24] mt-2">
        <button class="w-full flex items-center gap-3 px-4 py-4 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors group">
        <section class="flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30 shrink-0 size-10">
        <img src="src/assets/img/salida.png" alt="logo"  />
        </section>
        <section class="flex-1 text-left">
        <p class="text-sm font-bold">Cerrar Sesión</p>
        <p class="text-[10px] opacity-70">Finalizar sesión actual</p>
        </section>
        </button>
    </section>
  )
}