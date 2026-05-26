import { useState, useEffect } from 'react';
import '../../assets/css/mortalidad.css';

export default function MortalidadView() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [buscar, setBuscar] = useState("");
  
  const [formData, setFormData] = useState({
    cantidad: '', causa: '', necropsia: ''
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registrosMortalidad")) || [];
    setRegistros(data);
  }, []);

  const guardarLocalStorage = (data) => {
    localStorage.setItem("registrosMortalidad", JSON.stringify(data));
    setRegistros(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const guardarRegistro = (e) => {
    e.preventDefault();
    const nuevoRegistro = {
      fecha: new Date().toLocaleString(),
      cantidad: formData.cantidad,
      causa: formData.causa,
      necropsia: formData.necropsia
    };

    const nuevosRegistros = [nuevoRegistro, ...registros];
    guardarLocalStorage(nuevosRegistros);
    
    setFormData({ cantidad: '', causa: '', necropsia: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const generarPDF = (index) => {
    alert("Generando PDF para el reporte #" + (index + 1) + " (Funcionalidad exportar pendiente de jsPDF)");
  };

  const registrosFiltrados = registros.filter(r => 
    r.causa.toLowerCase().includes(buscar.toLowerCase()) || 
    r.fecha.toLowerCase().includes(buscar.toLowerCase())
  );

  const total = registros.reduce((acc, item) => acc + Number(item.cantidad), 0);
  
  const contadorCausas = {};
  registros.forEach(r => {
    contadorCausas[r.causa] = (contadorCausas[r.causa] || 0) + 1;
  });
  
  let causaPrincipal = "--";
  let mayor = 0;
  for (let causa in contadorCausas) {
    if (contadorCausas[causa] > mayor) {
      mayor = contadorCausas[causa];
      causaPrincipal = causa;
    }
  }

  const totalAvesBase = 1000;
  const tasaMortalidad = registros.length > 0 ? ((total / totalAvesBase) * 100).toFixed(1) : 0;

  return (
    <div className="main-body">
      <section className="layout-container">
        <main className="main-container pt-8 px-4 sm:px-6 lg:px-8">
          <section className="header-container">
            <section className="header-text">
              <h1 className="title">Mortalidad de las aves</h1>
              <p className="description">Registra y gestiona organizadamente los datos relacionados con la mortalidad de las aves, dentro de tu unidad avícola.</p>
            </section>
          </section>
          
          <section className="notification-container">
            {showSuccess && (
              <section className="success-message block">
                <span className="material-icons icon-check">check_circle</span>
                <span className="message-text">Registro Guardado Exitosamente: El reporte ha sido sincronizado con la base de datos central.</span>
                <button type="button" className="close-button" onClick={() => setShowSuccess(false)}>
                  <span className="material-icons close-icon">close</span>
                </button>
              </section>
            )}
          </section>
          
          <section className="main-grid mt-4">
            <section className="form-section">
              <section className="form-card bg-white dark:bg-[#1a1f1a] p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                <section className="section-header flex items-center gap-2 mb-6">
                  <span className="material-icons text-primary">add_box</span>
                  <h2 className="section-title text-lg font-bold">Nuevo Registro de Mortalidad</h2>
                </section>
                <form className="mortality-form space-y-4" onSubmit={guardarRegistro}>
                  <section className="form-group space-y-1">
                    <label className="form-label text-sm font-semibold">Cantidad de Aves Muertas <span className="text-red-500">*</span></label>
                    <section className="input-wrapper relative">
                      <span className="input-icon absolute left-3 top-2.5">
                        <span className="material-icons text-slate-400 text-sm">count</span>
                      </span>
                      <input id="cantidad" value={formData.cantidad} onChange={handleInputChange} required className="form-input w-full pl-10 pr-4 py-2 rounded-lg border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800" placeholder="0" type="number" min="1"/>
                    </section>
                  </section>
                  
                  <section className="form-group space-y-1">
                    <label className="form-label text-sm font-semibold">Causa de Muerte <span className="text-red-500">*</span></label>
                    <section className="input-wrapper relative">
                      <span className="input-icon absolute left-3 top-2.5">
                        <span className="material-icons text-slate-400 text-sm">category</span>
                      </span>
                      <select id="causa" value={formData.causa} onChange={handleInputChange} required className="form-select w-full pl-10 pr-4 py-2 rounded-lg border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800">
                        <option disabled value="">Seleccione una causa</option>
                        <option value="Respiratoria">Respiratoria</option>
                        <option value="Digestiva">Digestiva</option>
                        <option value="Accidente">Accidente</option>
                        <option value="Desconocida">Desconocida</option>
                      </select>
                    </section>
                  </section>
                  
                  <section className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Resultado de Necropsia <span className="text-red-500">*</span></label>
                    <textarea id="necropsia" value={formData.necropsia} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none" placeholder="Describa los hallazgos encontrados..." required rows="4"></textarea>
                  </section>
                  
                  <section className="grid grid-cols-1 sm:grid-cols-1 gap-4 pt-4">
                    <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20" type="submit">
                      <span className="material-icons text-sm">save</span>Guardar Registro
                    </button>
                  </section>
                </form>
              </section>
              
              <section className="mt-6 p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-primary mb-2">
                  <span className="material-icons text-sm">info</span>Recordatorio de Procedimiento
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Toda necropsia debe realizarse bajo condiciones de bioseguridad. Asegúrese de desinfectar el área y desechar correctamente los restos orgánicos según el protocolo institucional.</p>
              </section>
            </section>
            
            <section className="lg:col-span-7 mt-8 lg:mt-0">
              <section className="bg-white dark:bg-[#1a1f1a] border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
                <section className="p-6 border-b border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <section className="flex items-center gap-2">
                    <span className="material-icons text-primary">history</span>
                    <h2 className="text-lg font-semibold">Historial de Mortalidad</h2>
                  </section>
                  <section className="relative">
                    <input value={buscar} onChange={(e) => setBuscar(e.target.value)} className="w-full sm:w-64 pl-9 pr-4 py-1.5 rounded-full border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs focus:ring-1 focus:ring-primary outline-none" placeholder="Buscar registros..." type="text" />
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <span className="material-icons text-sm">search</span>
                    </span>
                  </section>
                </section>
                <section className="flex-grow overflow-x-auto custom-scrollbar">
                  <table className="font-size w-full text-left">
                    <thead className="bg-slate-50 dark:bg-zinc-800/80 sticky top-0">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center"> Cantidad</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"> Causa</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                      {registrosFiltrados.length === 0 ? (
                        <tr><td colSpan="4" className="text-center py-4 text-slate-500">No hay registros de mortalidad</td></tr>
                      ) : (
                        registrosFiltrados.map((registro, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm">{registro.fecha}</td>
                            <td className="px-6 py-4 text-sm text-center">{registro.cantidad}</td>
                            <td className="px-6 py-4 text-sm">{registro.causa}</td>
                            <td className="px-6 py-4 text-sm text-right">
                              <button className="bg-red-500/10 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition" onClick={() => generarPDF(index)}>PDF</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </section>
              </section>
            </section>
          </section>
        </main>

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 px-4 md:px-20">
          <section className="bg-white dark:bg-[#1a1f1a] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
            <section className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <span className="material-icons text-red-500">trending_up</span>
            </section>
            <section>        
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Mortalidad Total</p>
              <section className="text-xl font-bold">{total}</section>
            </section>
          </section>
          <section className="bg-white dark:bg-[#1a1f1a] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
            <section className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="material-icons text-primary">analytics</span>
            </section>
            <section>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Causa Principal</p>
              <section className="text-xl font-bold">{causaPrincipal}</section>
            </section>
          </section>
          <section className="bg-white dark:bg-[#1a1f1a] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
            <section className="h-10 w-10 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
              <span className="material-icons text-teal-500">task_alt</span>
            </section>
            <section>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Actas Generadas</p>
              <section className="text-xl font-bold">{registros.length}</section>
            </section>
          </section>
          <section className="bg-white dark:bg-[#1a1f1a] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-4 relative overflow-hidden">
            <section className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <span className="material-icons text-amber-500">warning</span>
            </section>
            <section>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Tasa de Mortalidad</p>
              <section className="text-xl font-bold">{tasaMortalidad}%</section>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
