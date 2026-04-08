export default function Perfilydatoscomponent() {
  return (
    <section>
          <a class="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors group" href="#">
            <div class="text-[#5f974e] group-hover:text-primary flex items-center justify-center rounded-lg bg-[#eaf3e7] dark:bg-[#2a3d24] shrink-0 size-10">
            <img src="src/assets/img/usuario.png" alt="logo" />
            </div>
            <div class="flex-1">
            <p class="text-sm font-semibold">Mi Perfil</p>
            <p class="text-[10px] text-gray-500 dark:text-gray-400">Datos personales</p>
            </div>
            <img src="src/assets/img/angulo-pequeno-derecho.png" alt="logo" />
          </a>
    </section>
  )
}