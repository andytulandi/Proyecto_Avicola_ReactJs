export default function ReportesMortalidadView() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Reporte de Mortalidad</h1>
        <p className="text-slate-500 dark:text-slate-400">Análisis de mortalidad por período.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <article className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 text-sm mb-2">Total Aves Fallecidas (Hoy)</p>
          <h3 className="text-3xl font-black text-red-500">24</h3>
          <p className="text-xs text-slate-400 mt-2">+3 desde ayer</p>
        </article>

        <article className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 text-sm mb-2">Porcentaje Mortalidad</p>
          <h3 className="text-3xl font-black text-amber-500">0.8%</h3>
          <p className="text-xs text-slate-400 mt-2">Dentro de lo normal</p>
        </article>

        <article className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 text-sm mb-2">Galpón Más Afectado</p>
          <h3 className="text-3xl font-black text-primary">Galpón 2</h3>
          <p className="text-xs text-slate-400 mt-2">12 aves esta semana</p>
        </article>
      </section>

      <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-lg mb-4">Historial Semanal</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left p-3 font-bold">Fecha</th>
                <th className="text-left p-3 font-bold">Galpón</th>
                <th className="text-left p-3 font-bold">Cantidad</th>
                <th className="text-left p-3 font-bold">Causa</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-3">18/05/2026</td>
                <td className="p-3">G1</td>
                <td className="p-3">5</td>
                <td className="p-3">Inanición</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-3">18/05/2026</td>
                <td className="p-3">G2</td>
                <td className="p-3">12</td>
                <td className="p-3">Enfermedad</td>
              </tr>
              <tr>
                <td className="p-3">17/05/2026</td>
                <td className="p-3">G3</td>
                <td className="p-3">7</td>
                <td className="p-3">Traumas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
