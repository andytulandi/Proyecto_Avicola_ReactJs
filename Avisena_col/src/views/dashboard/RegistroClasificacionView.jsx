import { useState, useEffect } from 'react';
import '../../assets/css/clasificacion.css';

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
      <header className="doc-title-section flex justify-between items-center mb-6">
        <hgroup className="title-text">
          <h1 className="text-2xl font-bold">SENA - UNIDAD AVÍCOLA</h1>
          <p className="text-slate-500">REGISTRO DE CLASIFICACIÓN DE HUEVOS</p>
        </hgroup>
        <mark className="status-pill no-print bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-bold">SISTEMA LISTO</mark>
      </header>

      <header className="traceability-header no-print flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="font-bold"><span className="hash text-primary">#</span> TRAZABILIDAD</h2>
        <button type="button" onClick={() => setShowHistory(true)} className="btn-history bg-slate-800 text-white px-4 py-2 rounded-lg text-sm">HISTORIAL COMPLETO</button>
      </header>

      <form id="form-registro" onSubmit={handleSave}>
        <fieldset className="card info-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white dark:bg-[#1a1f1a] p-6 rounded-xl border border-slate-200 dark:border-zinc-800 mb-6">
          <label className="input-group flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500">MES:</span>
            <input type="month" value={mes} onChange={e => setMes(e.target.value)} required className="border p-2 rounded-md bg-slate-50 dark:bg-zinc-800 dark:border-zinc-700" />
          </label>
          <section className="input-group flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500">SEMANA DEL / AL:</span>
            <label className="date-inputs flex items-center gap-2">
              <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required className="border p-2 rounded-md bg-slate-50 dark:bg-zinc-800 dark:border-zinc-700 flex-1" />
              <b className="slash">/</b>
              <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} required className="border p-2 rounded-md bg-slate-50 dark:bg-zinc-800 dark:border-zinc-700 flex-1" />
            </label>
          </section>
          <label className="input-group flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500">CONSECUTIVO:</span>
            <input type="text" value={cons} onChange={handleConsSearch} className="bold-center border p-2 rounded-md bg-slate-50 dark:bg-zinc-800 dark:border-zinc-700 text-center font-bold" placeholder="001" />
          </label>
          <label className="input-group flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500">N° GALPÓN:</span>
            <input type="number" value={galpon} onChange={e => setGalpon(e.target.value)} placeholder="0" className="border p-2 rounded-md bg-slate-50 dark:bg-zinc-800 dark:border-zinc-700" />
          </label>
          <label className="input-group flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500">LÍNEA GENÉTICA:</span>
            <select value={lineaGenetica} onChange={e => setLineaGenetica(e.target.value)} className="border p-2 rounded-md bg-slate-50 dark:bg-zinc-800 dark:border-zinc-700">
              <option disabled value="">Seleccione línea</option>
              <option value="Hy-Line">Hy-Line</option>
              <option value="Isa Brown">Isa Brown</option>
            </select>
          </label>
          <label className="input-group flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500">RESPONSABLE:</span>
            <input type="text" value={responsable} onChange={e => setResponsable(e.target.value)} placeholder="Aprendiz" className="border p-2 rounded-md bg-slate-50 dark:bg-zinc-800 dark:border-zinc-700" />
          </label>
        </fieldset>

        <section className="card table-wrapper bg-white dark:bg-[#1a1f1a] p-6 rounded-xl border border-slate-200 dark:border-zinc-800 mb-6 overflow-x-auto">
          <table className="main-table w-full text-center border-collapse">
            <thead className="bg-slate-50 dark:bg-zinc-800/80">
              <tr>
                <th className="al-left p-3 text-sm border-b">TIPO DE HUEVO</th>
                <th className="p-3 text-sm border-b">ACTUAL (HOY)</th>
                <th className="p-3 text-sm border-b">ANTERIOR</th>
                <th className="col-highlight p-3 text-sm border-b bg-primary/5">ACUMULADO</th>
                <th className="p-3 text-sm border-b">PRECIO ($)</th>
                <th className="p-3 text-sm border-b">SUBTOTAL ($)</th>
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
                  <tr key={tipo.id} className="border-b dark:border-zinc-800">
                    <td className="al-left type-name font-bold p-3 text-left">{tipo.name}</td>
                    <td className="p-2"><input type="number" value={tableData[tipo.id].actual} onChange={e => handleTableChange(tipo.id, 'actual', e.target.value)} className="table-input w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-center" /></td>
                    <td className="p-2"><input type="number" value={tableData[tipo.id].anterior} onChange={e => handleTableChange(tipo.id, 'anterior', e.target.value)} className="table-input w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-center" /></td>
                    <td className="col-highlight bg-primary/5 font-bold p-3">{row.acumulado}</td>
                    <td className="p-2"><input type="text" value={tableData[tipo.id].precio} onChange={e => handleTableChange(tipo.id, 'precio', e.target.value)} className="table-input w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-center" placeholder="0" /></td>
                    <td className="subtotal-cell p-3 font-bold text-primary">$ {row.subtotal.toLocaleString('es-CO')}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="table-footer bg-slate-50 dark:bg-zinc-800/80 font-bold">
                <td className="al-left footer-label p-3 text-left">TOTAL PANALES</td>
                <td className="footer-val p-3">{totales.tActual}</td>
                <td className="footer-val p-3">{totales.tAnterior}</td>
                <td className="footer-val highlight bg-primary/10 text-primary p-3">{totales.tAcumulado}</td>
                <td className="al-right footer-desc p-3 text-right">VALOR TOTAL:</td>
                <td className="grand-total-cell p-3 text-primary text-xl">$ {totales.granTotal.toLocaleString('es-CO')}</td>
              </tr>
            </tfoot>
          </table>
        </section>

        <fieldset className="card footer-details bg-white dark:bg-[#1a1f1a] p-6 rounded-xl border border-slate-200 dark:border-zinc-800 mb-6">
          <label className="input-group full-width flex flex-col gap-2">
            <span className="label-title font-bold text-sm"> DESCRIPCIÓN:</span>
            <textarea value={observaciones} onChange={e => setObservaciones(e.target.value)} placeholder="Escriba aquí novedades..." rows="4" className="border p-3 rounded-md bg-slate-50 dark:bg-zinc-800 dark:border-zinc-700"></textarea>
          </label>

          <div className="divider-line h-px bg-slate-200 dark:bg-zinc-800 my-6"></div>

          <section className="signature-container grid grid-cols-1 md:grid-cols-2 gap-8">
            <label className="sig-box flex flex-col items-center border-t-2 border-slate-300 pt-2">
              <span className="label-sig text-xs font-bold text-slate-500">ENTREGA </span>
              <input type="text" placeholder="Nombre completo" className="text-center mt-2 bg-transparent outline-none border-none" />
            </label>
            <label className="sig-box flex flex-col items-center border-t-2 border-slate-300 pt-2">
              <span className="label-sig text-xs font-bold text-slate-500">RECIBE INSTRUCTORA </span>
              <input type="text" placeholder="Nombre completo" className="text-center mt-2 bg-transparent outline-none border-none" />
            </label>
          </section>
        </fieldset>

        <footer className="action-footer no-print flex flex-wrap justify-between items-center gap-4 mt-8">
          <button type="button" onClick={() => setShowDeleteConfirm(true)} className="btn-danger text-red-500 font-bold hover:underline">❌ BORRAR REGISTRO</button>
          <nav className="btn-group flex gap-2">
            <button type="button" className="btn-action btn-excel bg-green-600 text-white px-4 py-2 rounded-lg font-bold">EXPORTAR EXCEL</button>
            <button type="button" onClick={() => window.print()} className="btn-action btn-black bg-slate-800 text-white px-4 py-2 rounded-lg font-bold">EXPORTAR PDF</button>
            <button type="submit" className="btn-action btn-submit bg-primary text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-primary/30">GUARDAR REGISTRO</button>
          </nav>
        </footer>
      </form>

      {showHistory && (
        <dialog open className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 w-full h-full">
          <article className="modal-content-wrapper bg-white dark:bg-[#1a1f1a] w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col">
            <header className="modal-header-custom p-6 border-b flex justify-between items-center bg-slate-50 dark:bg-zinc-800/50">
              <h2 className="modal-title-big text-xl font-bold">HISTORIAL DE<br />REGISTROS</h2>
              <button type="button" className="btn-close-x text-2xl font-bold text-slate-400 hover:text-red-500" onClick={() => setShowHistory(false)}>&times;</button>
            </header>
            <section className="history-scroll-area p-6 overflow-y-auto flex-1 space-y-4">
              {historialDb.length === 0 ? (
                <p className="text-slate-500 text-center">No hay registros aún.</p>
              ) : (
                historialDb.map((reg, idx) => (
                  <article key={idx} className="border border-slate-200 rounded-3xl p-6 bg-white flex flex-col gap-3">
                    <header className="flex justify-between items-center">
                      <strong className="font-black text-xl text-black">#B-{reg.cons}</strong>
                      <time className="text-slate-700 text-lg font-medium">{reg.fecha}</time>
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
        <dialog open className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 w-full h-full">
          <article className="bg-white dark:bg-[#1a1f1a] p-8 rounded-xl text-center max-w-sm">
            <span className="icon-success text-5xl block mb-4">✔</span>
            <h2 className="text-2xl font-bold mb-2">¡REGISTRO EXITOSO!</h2>
            <p className="text-slate-500 mb-6">Los datos se han guardado correctamente.</p>
            <button type="button" onClick={() => { setShowSuccess(false); reloadPage(); }} className="btn-green bg-primary text-white w-full py-3 rounded-lg font-bold">CONTINUAR</button>
          </article>
        </dialog>
      )}

      {showDeleteConfirm && (
        <dialog open className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 w-full h-full">
          <article className="bg-white dark:bg-[#1a1f1a] p-8 rounded-xl text-center max-w-sm">
            <span className="icon-delete text-5xl text-red-500 block mb-4">🗑</span>
            <h2 className="text-2xl font-bold mb-6">¿BORRAR TODO?</h2>
            <div className="modal-actions flex gap-4">
              <button type="button" onClick={() => setShowDeleteConfirm(false)} className="btn-gray flex-1 bg-slate-200 dark:bg-zinc-800 py-3 rounded-lg font-bold text-slate-700 dark:text-slate-300">CANCELAR</button>
              <button type="button" onClick={() => { setShowDeleteConfirm(false); reloadPage(); }} className="btn-red flex-1 bg-red-500 text-white py-3 rounded-lg font-bold">SÍ, BORRAR</button>
            </div>
          </article>
        </dialog>
      )}
    </main>
  );
}
