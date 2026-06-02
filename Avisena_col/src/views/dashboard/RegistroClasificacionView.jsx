import { useState, useEffect } from 'react';

export default function RegistroClasificacionView() {
  const [showHistory, setShowHistory] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form State
  const [mes, setMes] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [cons, setCons] = useState('');
  const [galpon, setGalpon] = useState('');
  const [lineaGenetica, setLineaGenetica] = useState('');
  const [responsable, setResponsable] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const [historialDb, setHistorialDb] = useState([]);

  // Table Data State
  const [tableData, setTableData] = useState({
    tipoC: { actual: 0, anterior: 0, precio: '' },
    tipoB: { actual: 0, anterior: 0, precio: '' },
    tipoAAA: { actual: 0, anterior: 0, precio: '' },
    tipoAA: { actual: 0, anterior: 0, precio: '' },
    tipoA: { actual: 0, anterior: 0, precio: '' },
  });

  useEffect(() => {
    let actualCons = localStorage.getItem('consecutivo_avisena') || 1;
    setCons(actualCons.toString().padStart(3, '0'));

    const db = JSON.parse(localStorage.getItem('avisena_db')) || [];
    setHistorialDb(db);
  }, []);

  const handleTableChange = (tipo, field, value) => {
    const val = field === 'precio' ? value : (parseInt(value) || 0);
    setTableData({
      ...tableData,
      [tipo]: { ...tableData[tipo], [field]: val }
    });
  };

  const handleConsSearch = (e) => {
    const numBuscar = e.target.value.padStart(3, '0');
    setCons(numBuscar);

    const db = JSON.parse(localStorage.getItem('avisena_db')) || [];
    const encontrado = db.find(reg => reg.cons === numBuscar);

    if (encontrado) {
      setMes(encontrado.mes || '');
      setGalpon(encontrado.galpon || '');
      setLineaGenetica(encontrado.linea || '');
      setResponsable(encontrado.responsable || '');
      setObservaciones(encontrado.observaciones || '');

      if (encontrado.detallesTabla) {
        setTableData({
          tipoC: encontrado.detallesTabla[0] || { actual: 0, anterior: 0, precio: '' },
          tipoB: encontrado.detallesTabla[1] || { actual: 0, anterior: 0, precio: '' },
          tipoAAA: encontrado.detallesTabla[2] || { actual: 0, anterior: 0, precio: '' },
          tipoAA: encontrado.detallesTabla[3] || { actual: 0, anterior: 0, precio: '' },
          tipoA: encontrado.detallesTabla[4] || { actual: 0, anterior: 0, precio: '' },
        });
      }
    }
  };

  const calculateRow = (tipo) => {
    const data = tableData[tipo];
    const acumulado = data.actual + data.anterior;
    const precio = parseFloat(data.precio.toString().replace(/\./g, '')) || 0;
    const subtotal = data.actual * precio;
    return { acumulado, subtotal };
  };

  const calculateTotals = () => {
    let tActual = 0, tAnterior = 0, tAcumulado = 0, granTotal = 0;
    Object.keys(tableData).forEach(key => {
      const data = tableData[key];
      tActual += data.actual;
      tAnterior += data.anterior;
      const { acumulado, subtotal } = calculateRow(key);
      tAcumulado += acumulado;
      granTotal += subtotal;
    });
    return { tActual, tAnterior, tAcumulado, granTotal };
  };

  const totales = calculateTotals();

  const handleSave = (e) => {
    e.preventDefault();

    const registro = {
      cons: cons.padStart(3, '0'),
      fecha: new Date().toLocaleDateString(),
      mes, galpon, linea: lineaGenetica, responsable, observaciones,
      totalPanales: totales.tAcumulado,
      detallesTabla: [
        tableData.tipoC, tableData.tipoB, tableData.tipoAAA, tableData.tipoAA, tableData.tipoA
      ]
    };

    let db = [...historialDb];
    const idx = db.findIndex(r => r.cons === registro.cons);

    if (idx !== -1) {
      db[idx] = registro;
    } else {
      db.unshift(registro);
      localStorage.setItem('consecutivo_avisena', parseInt(localStorage.getItem('consecutivo_avisena') || 1) + 1);
    }

    localStorage.setItem('avisena_db', JSON.stringify(db));
    setHistorialDb(db);
    setShowSuccess(true);
  };

  const eliminarRegistro = (index) => {
    const newDb = [...historialDb];
    newDb.splice(index, 1);
    localStorage.setItem('avisena_db', JSON.stringify(newDb));
    setHistorialDb(newDb);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center border-b-4 border-primary pb-4 mb-6">
        <hgroup>
          <h1 className="text-2xl font-black tracking-tight dark:text-white">SENA - UNIDAD AVÍCOLA</h1>
          <p className="text-[11px] font-bold text-slate-500 italic">REGISTRO DE CLASIFICACIÓN DE HUEVOS</p>
        </hgroup>
        <mark className="no-print bg-primary/20 text-primary px-4 py-1 rounded-full text-[10px] font-black">SISTEMA LISTO</mark>
      </header>

      <header className="no-print flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-sm font-black dark:text-white"><span className="text-primary mr-1">#</span> TRAZABILIDAD</h2>
        <button type="button" onClick={() => setShowHistory(true)} className="bg-transparent border-none text-primary font-black text-[10px] cursor-pointer uppercase hover:underline">HISTORIAL COMPLETO</button>
      </header>

      <form id="form-registro" onSubmit={handleSave}>
        <fieldset className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white dark:bg-[#1a1f1a] p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)]">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-500">MES:</span>
            <input type="month" value={mes} onChange={e => setMes(e.target.value)} required className="border border-slate-200 dark:border-zinc-700 p-3 rounded-xl bg-[#fdfdfd] dark:bg-zinc-800 font-bold dark:text-white text-sm outline-none" />
          </label>
          <section className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-500">SEMANA DEL / AL:</span>
            <label className="flex items-center gap-2">
              <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required className="border border-slate-200 dark:border-zinc-700 p-3 rounded-xl bg-[#fdfdfd] dark:bg-zinc-800 font-bold dark:text-white text-sm outline-none flex-1" />
              <b className="text-slate-400">/</b>
              <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} required className="border border-slate-200 dark:border-zinc-700 p-3 rounded-xl bg-[#fdfdfd] dark:bg-zinc-800 font-bold dark:text-white text-sm outline-none flex-1" />
            </label>
          </section>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-500">CONSECUTIVO:</span>
            <input type="text" value={cons} onChange={handleConsSearch} className="border border-slate-200 dark:border-zinc-700 p-3 rounded-xl bg-[#fdfdfd] dark:bg-zinc-800 text-center font-black text-lg text-black dark:text-white outline-none" placeholder="001" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-500">N° GALPÓN:</span>
            <input type="number" value={galpon} onChange={e => setGalpon(e.target.value)} placeholder="0" className="border border-slate-200 dark:border-zinc-700 p-3 rounded-xl bg-[#fdfdfd] dark:bg-zinc-800 font-bold dark:text-white text-sm outline-none" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-500">LÍNEA GENÉTICA:</span>
            <select value={lineaGenetica} onChange={e => setLineaGenetica(e.target.value)} className="border border-slate-200 dark:border-zinc-700 p-3 rounded-xl bg-[#fdfdfd] dark:bg-zinc-800 font-bold dark:text-white text-sm outline-none">
              <option disabled value="">Seleccione línea</option>
              <option value="Hy-Line">Hy-Line</option>
              <option value="Isa Brown">Isa Brown</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-500">RESPONSABLE:</span>
            <input type="text" value={responsable} onChange={e => setResponsable(e.target.value)} placeholder="Aprendiz" className="border border-slate-200 dark:border-zinc-700 p-3 rounded-xl bg-[#fdfdfd] dark:bg-zinc-800 font-bold dark:text-white text-sm outline-none" />
          </label>
        </fieldset>

        <section className="bg-white dark:bg-[#1a1f1a] p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#f8faf8] dark:bg-zinc-800/80">
              <tr>
                <th className="text-left p-[18px] text-[10px] font-black border-b border-slate-100 dark:border-zinc-700 dark:text-white">TIPO DE HUEVO</th>
                <th className="p-[18px] text-[10px] font-black border-b border-slate-100 dark:border-zinc-700 dark:text-white">ACTUAL (HOY)</th>
                <th className="p-[18px] text-[10px] font-black border-b border-slate-100 dark:border-zinc-700 dark:text-white">ANTERIOR</th>
                <th className="p-[18px] text-[10px] font-black border-b border-slate-100 dark:border-zinc-700 bg-[#f1f9f1] dark:bg-green-950/10 dark:text-white">ACUMULADO</th>
                <th className="p-[18px] text-[10px] font-black border-b border-slate-100 dark:border-zinc-700 dark:text-white">PRECIO ($)</th>
                <th className="p-[18px] text-[10px] font-black border-b border-slate-100 dark:border-zinc-700 dark:text-white">SUBTOTAL ($)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'tipoC', name: 'Tipo C' },
                { id: 'tipoB', name: 'Tipo B' },
                { id: 'tipoAAA', name: 'Tipo AAA' },
                { id: 'tipoAA', name: 'Tipo AA' },
                { id: 'tipoA', name: 'Tipo A' },
              ].map((tipo) => {
                const row = calculateRow(tipo.id);
                return (
                  <tr key={tipo.id} className="border-b border-slate-100 dark:border-zinc-800">
                    <td className="text-left font-black italic text-[13px] p-3 dark:text-white">{tipo.name}</td>
                    <td className="p-2">
                      <input type="number" value={tableData[tipo.id].actual} onChange={e => handleTableChange(tipo.id, 'actual', e.target.value)} className="w-[120px] mx-auto p-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-center font-black text-base dark:text-white" />
                    </td>
                    <td className="p-2">
                      <input type="number" value={tableData[tipo.id].anterior} onChange={e => handleTableChange(tipo.id, 'anterior', e.target.value)} className="w-[120px] mx-auto p-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-center font-black text-base dark:text-white" />
                    </td>
                    <td className="bg-[#f1f9f1] dark:bg-green-950/10 font-bold p-3 dark:text-white">{row.acumulado}</td>
                    <td className="p-2">
                      <input type="text" value={tableData[tipo.id].precio} onChange={e => handleTableChange(tipo.id, 'precio', e.target.value)} className="w-[120px] mx-auto p-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-center font-black text-base dark:text-white" placeholder="0" />
                    </td>
                    <td className="p-3 font-bold text-primary">$ {row.subtotal.toLocaleString('es-CO')}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-black text-white font-bold h-[90px]">
                <td className="text-left font-black text-[11px] pl-6">TOTAL PANALES</td>
                <td className="font-black text-xl">{totales.tActual}</td>
                <td className="font-black text-xl">{totales.tAnterior}</td>
                <td className="font-black text-xl text-[#39FF14] italic">{totales.tAcumulado}</td>
                <td className="text-right text-[10px] opacity-50 font-bold pr-4">VALOR TOTAL:</td>
                <td className="bg-primary text-black text-3xl font-black italic w-[230px] p-3 text-center">$ {totales.granTotal.toLocaleString('es-CO')}</td>
              </tr>
            </tfoot>
          </table>
        </section>

        <fieldset className="bg-white dark:bg-[#1a1f1a] p-[30px] rounded-2xl border border-slate-200 dark:border-zinc-800 mb-6 flex flex-col gap-10 shadow-[0_4px_15px_rgba(0,0,0,0.02)]">
          <label className="flex flex-col gap-2 w-full">
            <span className="font-bold text-sm text-slate-700 dark:text-slate-300"> DESCRIPCIÓN:</span>
            <textarea value={observaciones} onChange={e => setObservaciones(e.target.value)} placeholder="Escriba aquí novedades..." rows="4" className="w-full bg-[#fdfdfd] dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl p-[15px] font-bold text-[13px] resize-none dark:text-white outline-none"></textarea>
          </label>

          <div className="border-t border-dashed border-slate-300 dark:border-zinc-800 my-5 w-full"></div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-2.5">
            <label className="flex flex-col items-center border-t-2 border-slate-300 dark:border-zinc-700 pt-2 flex-1">
              <span className="text-[0.75rem] font-bold text-slate-500 uppercase">ENTREGA </span>
              <input type="text" placeholder="Nombre completo" className="text-center mt-2 bg-transparent border-b-2 border-dashed border-slate-300 dark:border-zinc-700 py-2 font-bold text-sm outline-none rounded-none w-full max-w-[250px] dark:text-white" />
            </label>
            <label className="flex flex-col items-center border-t-2 border-slate-300 dark:border-zinc-700 pt-2 flex-1">
              <span className="text-[0.75rem] font-bold text-slate-500 uppercase">RECIBE INSTRUCTORA </span>
              <input type="text" placeholder="Nombre completo" className="text-center mt-2 bg-transparent border-b-2 border-dashed border-slate-300 dark:border-zinc-700 py-2 font-bold text-sm outline-none rounded-none w-full max-w-[250px] dark:text-white" />
            </label>
          </section>
        </fieldset>

        <footer className="no-print flex flex-wrap justify-between items-center gap-4 my-10">
          <button type="button" onClick={() => setShowDeleteConfirm(true)} className="text-red-500 font-extrabold text-[11px] cursor-pointer bg-transparent border-none hover:underline">❌ BORRAR REGISTRO</button>
          <nav className="flex gap-4">
            <button type="button" className="py-4 px-8 rounded-xl font-extrabold text-xs cursor-pointer uppercase flex items-center gap-2.5 border-none bg-[#15803d] text-white hover:bg-green-800 transition-colors">EXPORTAR EXCEL</button>
            <button type="button" onClick={() => window.print()} className="py-4 px-8 rounded-xl font-extrabold text-xs cursor-pointer uppercase flex items-center gap-2.5 border-none bg-black text-white hover:bg-zinc-800 transition-colors">EXPORTAR PDF</button>
            <button type="submit" className="py-4 px-8 rounded-xl font-extrabold text-xs cursor-pointer uppercase flex items-center gap-2.5 border-none bg-primary text-black shadow-[0_8px_25px_rgba(73,230,25,0.4)] hover:brightness-110 active:scale-95 transition-all">GUARDAR REGISTRO</button>
          </nav>
        </footer>
      </form>

      {showHistory && (
        <dialog open className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 w-full h-full border-none">
          <article className="bg-white dark:bg-[#1a1f1a] w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col shadow-2xl">
            <header className="p-6 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-800/50">
              <h2 className="text-xl font-black dark:text-white">HISTORIAL DE<br />REGISTROS</h2>
              <button type="button" className="text-2xl font-bold text-slate-400 hover:text-red-500 bg-transparent border-none cursor-pointer" onClick={() => setShowHistory(false)}>&times;</button>
            </header>
            <section className="p-6 overflow-y-auto flex-1 space-y-4">
              {historialDb.length === 0 ? (
                <p className="text-slate-500 text-center">No hay registros aún.</p>
              ) : (
                historialDb.map((reg, idx) => (
                  <article key={idx} className="border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 bg-white dark:bg-zinc-900 flex flex-col gap-3">
                    <header className="flex justify-between items-center">
                      <strong className="font-black text-xl text-black dark:text-white">#B-{reg.cons}</strong>
                      <time className="text-slate-700 dark:text-slate-300 text-lg font-medium">{reg.fecha}</time>
                    </header>
                    <footer className="flex justify-between items-center mt-2">
                      <mark className="font-black text-2xl text-[#39FF14] bg-transparent tracking-tighter">{reg.totalPanales} Panales</mark>
                      <button onClick={() => eliminarRegistro(idx)} className="bg-transparent border-none cursor-pointer">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </footer>
                  </article>
                ))
              )}
            </section>
          </article>
        </dialog>
      )}

      {showSuccess && (
        <dialog open className="fixed inset-0 z-50 bg-[#121212]/98 text-white flex flex-col items-center justify-center p-4 w-full h-full border-none">
          <article className="text-center p-5 w-full max-w-[400px]">
            <span className="text-[#39FF14] text-[80px] mb-5 block text-center">✔</span>
            <h2 className="text-2xl font-bold mb-2">¡REGISTRO EXITOSO!</h2>
            <p className="text-slate-500 mb-6">Los datos se han guardado correctamente.</p>
            <button type="button" onClick={() => { setShowSuccess(false); reloadPage(); }} className="bg-[#39FF14] text-black p-5 rounded-[40px] font-black w-full cursor-pointer hover:brightness-110 transition-all border-none">CONTINUAR</button>
          </article>
        </dialog>
      )}

      {showDeleteConfirm && (
        <dialog open className="fixed inset-0 z-50 bg-[#121212]/98 text-white flex flex-col items-center justify-center p-4 w-full h-full border-none">
          <article className="text-center p-5 w-full max-w-[400px]">
            <span className="text-red-500 text-[80px] mb-5 block text-center">🗑</span>
            <h2 className="text-2xl font-bold mb-6">¿BORRAR TODO?</h2>
            <div className="flex gap-[15px] justify-center w-full mt-5">
              <button type="button" onClick={() => setShowDeleteConfirm(false)} className="bg-[#333C4D] text-white py-[18px] px-[30px] rounded-[40px] font-black cursor-pointer hover:bg-[#2c3443] transition-colors flex-1 border-none">CANCELAR</button>
              <button type="button" onClick={() => { setShowDeleteConfirm(false); reloadPage(); }} className="bg-red-500 text-white py-[18px] px-[30px] rounded-[40px] font-black cursor-pointer hover:bg-red-600 transition-colors flex-1 border-none">SÍ, BORRAR</button>
            </div>
          </article>
        </dialog>
      )}
    </main>
  );
}
