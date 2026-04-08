export default function Profileandemailcomponent() {
  return (
    <section>
      {/* ete es el componente con correo -- */}
        <section class="fixed inset-0 z-50 bg-black/10 dark:bg-black/40 flex justify-end items-start p-4 pt-16 pr-10"></section>
        <section class="w-full max-w-[280px] bg-white dark:bg-[#1a2e15] rounded-xl shadow-2xl border border-[#d5e7d0] dark:border-[#2a3d24] overflow-hidden flex flex-col"></section>
        <section class="p-4 bg-background-light dark:bg-[#23381e] border-b border-[#d5e7d0] dark:border-[#2a3d24] flex items-center gap-3">
            <img src="" alt="logo" />
            <section class="flex flex-col">
            <p class="text-sm font-bold leading-tight">Juan Pérez</p>
            <p class="text-xs text-[#5f974e] dark:text-primary/80">juan.perez@granja.com</p>
            </section>
            <section class="py-2"></section>
        </section>
    </section>
  )
}