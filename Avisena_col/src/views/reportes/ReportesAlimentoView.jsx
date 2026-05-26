export default function ReportesAlimentoView() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Consumo de Alimento</h1>
        <p className="text-slate-500 dark:text-slate-400">Seguimiento del consumo alimenticio por galpón.</p>
      </section>

      <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Consumo Semanal</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left p-3 font-bold">Galpón</th>
                <th className="text-left p-3 font-bold">Consumo (kg)</th>
                <th className="text-left p-3 font-bold">Promedio Diario</th>
                <th className="text-left p-3 font-bold">Desviación</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-3">Galpón 1</td>
                <td className="p-3">150 kg</td>
                <td className="p-3">21.4 kg</td>
                <td className="p-3 text-emerald-500">+2%</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-3">Galpón 2</td>
                <td className="p-3">145 kg</td>
                <td className="p-3">20.7 kg</td>
                <td className="p-3 text-emerald-500">-1%</td>
              </tr>
              <tr>
                <td className="p-3">Galpón 3</td>
                <td className="p-3">155 kg</td>
                <td className="p-3">22.1 kg</td>
                <td className="p-3 text-amber-500">+3%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
