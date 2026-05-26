export default function ReportesFinanzasView() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Finanzas de la Granja</h1>
        <p className="text-slate-500 dark:text-slate-400">Análisis financiero y rentabilidad.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <article className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 text-sm mb-2">Ingresos Mes</p>
          <h3 className="text-3xl font-black text-emerald-500">$24,500</h3>
          <p className="text-xs text-slate-400 mt-2">+8% vs mes anterior</p>
        </article>

        <article className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 text-sm mb-2">Gastos Operacionales</p>
          <h3 className="text-3xl font-black text-red-500">$12,300</h3>
          <p className="text-xs text-slate-400 mt-2">Alimento + Servicios</p>
        </article>

        <article className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 text-sm mb-2">Ganancia Neta</p>
          <h3 className="text-3xl font-black text-primary">$12,200</h3>
          <p className="text-xs text-slate-400 mt-2">Rentabilidad: 49.8%</p>
        </article>
      </section>

      <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-lg mb-4">Desglose de Costos</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold">Alimento</span>
              <span className="text-sm font-bold text-slate-500">$8,500 (69%)</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '69%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold">Servicios</span>
              <span className="text-sm font-bold text-slate-500">$2,100 (17%)</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '17%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold">Medicamentos</span>
              <span className="text-sm font-bold text-slate-500">$1,700 (14%)</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '14%' }}></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
