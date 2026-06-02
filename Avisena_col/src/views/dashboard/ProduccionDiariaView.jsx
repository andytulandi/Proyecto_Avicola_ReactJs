import { useState, useEffect } from 'react';
import {
  Calendar,
  Egg,
  Clock,
  Layers,
  User,
  Edit3,
  Grid,
  Calculator,
  TrendingUp,
  ArrowRight,
  Trash2,
  X,
  Printer
} from 'lucide-react';


export default function ProduccionDiariaView() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('avicola_db');
    return saved ? JSON.parse(saved) : [];
  });

  // Form Fields
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [hora, setHora] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });
  const [worker, setWorker] = useState('');
  const [galpon, setGalpon] = useState('Galpón A - Ponedoras');
  const [buenos, setBuenos] = useState(0);
  const [rotos, setRotos] = useState(0);
  const [descarte, setDescarte] = useState(0);
  const [notas, setNotas] = useState('');

  // Projections
  const [calcAves, setCalcAves] = useState(1000);
  const [calcGramos, setCalcGramos] = useState(110);

  // Sync Animation
  const [isSyncing, setIsSyncing] = useState(false);

  // Date Formatting helper
  const formatDate = (val) => {
    if (!val) {
      return new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    const date = new Date(val + 'T00:00:00');
    if (Number.isNaN(date.getTime())) {
      return val;
    }
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Calculations
  const feedRequired = (calcAves * calcGramos) / 1000;
  const bultos = feedRequired / 50;

  const totalHuevosToday = data.reduce((sum, item) => sum + item.buenos, 0);
  const totalRotosToday = data.reduce((sum, item) => sum + item.rotos, 0);
  const lastTime = data.length > 0 ? data[0].hora : '--:--';
  const totalRecolecciones = data.length;
  const lastWorker = data.length > 0 ? data[0].worker : 'John Doe';

  // Cubetas
  const cubetas = Math.floor(totalHuevosToday / 30);
  const sueltos = totalHuevosToday % 30;

  // FCR Calculation
  const fcrScore = totalHuevosToday > 0 ? (feedRequired / (totalHuevosToday * 0.06)).toFixed(2) : '0.0';

  const getFcrStatus = (score) => {
    const s = parseFloat(score);
    if (s <= 0) return { label: 'Sin datos', color: 'bg-slate-400 text-white' };
    if (s <= 2.2) return { label: 'Bueno', color: 'bg-emerald-500 text-white' };
    if (s <= 2.6) return { label: 'Regular', color: 'bg-yellow-500 text-black' };
    return { label: 'Malo', color: 'bg-red-500 text-white' };
  };

  const fcrStatus = getFcrStatus(fcrScore);

  const handleSave = (e) => {
    e.preventDefault();

    if (parseInt(buenos) <= 0) {
      alert('Por favor, ingrese al menos la cantidad de huevos buenos.');
      return;
    }

    const entry = {
      id: Date.now(),
      fecha: formatDate(fecha),
      hora: hora || '--:--',
      worker: worker || 'Anónimo',
      galpon: galpon,
      buenos: parseInt(buenos) || 0,
      rotos: parseInt(rotos) || 0,
      descarte: parseInt(descarte) || 0,
      alimento: feedRequired,
      notas: notas
    };

    const updated = [entry, ...data];
    setData(updated);
    localStorage.setItem('avicola_db', JSON.stringify(updated));

    // Reset Form fields
    setBuenos(0);
    setRotos(0);
    setDescarte(0);
    setNotas('');
    alert('Registro guardado exitosamente.');
  };

  const handleReset = () => {
    setBuenos(0);
    setRotos(0);
    setDescarte(0);
    setNotas('');
    setWorker('');
    setGalpon('Galpón A - Ponedoras');
    setFecha(new Date().toISOString().split('T')[0]);
    const now = new Date();
    setHora(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este registro?')) {
      const updated = data.filter(item => item.id !== id);
      setData(updated);
      localStorage.setItem('avicola_db', JSON.stringify(updated));
    }
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Datos sincronizados con éxito con el sistema del Centro Agropecuario.');
    }, 1500);
  };

  return (
    <>
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <hgroup>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Panel de Control</h2>
            <p className="text-slate-500 text-sm">Bienvenido de nuevo, monitoreando el desempeño de Galpón A y B.</p>
          </hgroup>
          <menu className="flex items-center gap-4 p-0 m-0">
            <time className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Calendar className="text-slate-400 w-5 h-5" />
              <span className="text-sm font-medium">{new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </time>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer flex items-center gap-2"
            >
              {isSyncing ? 'Sincronizando...' : 'Sincronizar Datos'}
            </button>
          </menu>
        </header>

        <section aria-label="Métricas Principales" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <article className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <p className="text-slate-500 text-sm font-medium">Total Huevos Hoy</p>
            <header className="flex items-center justify-between mt-2">
              <h3 className="text-3xl font-bold">{totalHuevosToday.toLocaleString()}</h3>
              <span className="bg-primary/10 text-primary p-2 rounded-lg"><Egg className="w-6 h-6" /></span>
            </header>
          </article>
          <article className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <p className="text-slate-500 text-sm font-medium">Última Recolección</p>
            <header className="flex items-center justify-between mt-2">
              <h3 className="text-3xl font-bold">{lastTime}</h3>
              <span className="bg-primary/10 text-primary p-2 rounded-lg"><Clock className="w-6 h-6" /></span>
            </header>
          </article>
          <article className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <p className="text-slate-500 text-sm font-medium">Total Recolecciones Hoy</p>
            <header className="flex items-center justify-between mt-2">
              <h3 className="text-3xl font-bold text-primary">{totalRecolecciones}</h3>
              <span className="bg-primary/10 text-primary p-2 rounded-lg"><Layers className="w-6 h-6" /></span>
            </header>
          </article>
          <article className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <p className="text-slate-500 text-sm font-medium">Trabajador Responsable</p>
            <header className="flex items-center justify-between mt-2">
              <h3 className="text-xl font-bold truncate">{lastWorker}</h3>
              <span className="bg-primary/10 text-primary p-2 rounded-lg"><User className="w-6 h-6" /></span>
            </header>
          </article>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <article className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Edit3 className="text-primary w-6 h-6" />
              Registro de Recolección de Huevos
            </h3>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Fecha de Recolección</label>
                <input
                  className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 py-3 px-4 dark:text-white"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </p>
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Hora de Recolección</label>
                <input
                  className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 py-3 px-4 dark:text-white"
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
              </p>
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Nombre del Trabajador</label>
                <input
                  className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 py-3 px-4 dark:text-white"
                  placeholder="Ingresar nombre"
                  type="text"
                  value={worker}
                  onChange={(e) => setWorker(e.target.value)}
                  required
                />
              </p>
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Galpón / Origen</label>
                <select
                  className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 py-3 px-4 dark:text-white"
                  value={galpon}
                  onChange={(e) => setGalpon(e.target.value)}
                >
                  <option value="Galpón A - Ponedoras">Galpón A - Ponedoras</option>
                  <option value="Galpón B - Ponedoras">Galpón B - Ponedoras</option>
                  <option value="Sección Engorde">Sección Engorde</option>
                </select>
              </p>
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Huevos Buenos</label>
                <input
                  className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 py-3 px-4 dark:text-white"
                  placeholder="0"
                  type="number"
                  value={buenos === 0 ? '' : buenos}
                  onChange={(e) => setBuenos(parseInt(e.target.value) || 0)}
                  required
                />
              </p>
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Huevos Rotos</label>
                <input
                  className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 py-3 px-4 dark:text-white"
                  placeholder="0"
                  type="number"
                  value={rotos === 0 ? '' : rotos}
                  onChange={(e) => setRotos(parseInt(e.target.value) || 0)}
                />
              </p>
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Descarte</label>
                <input
                  className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 py-3 px-4 dark:text-white"
                  placeholder="0"
                  type="number"
                  value={descarte === 0 ? '' : descarte}
                  onChange={(e) => setDescarte(parseInt(e.target.value) || 0)}
                />
              </p>
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Notas</label>
                <input
                  className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 py-3 px-4 dark:text-white"
                  placeholder="ej., Huevos dañados encontrados"
                  type="text"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
              </p>
              <menu className="md:col-span-2 flex gap-4 mt-2 p-0 m-0 border-none bg-transparent">
                <button className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all cursor-pointer border-none" type="submit">Guardar Registro</button>
                <button className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary/5 transition-all cursor-pointer bg-transparent" type="button" onClick={handleReset}>Limpiar Formulario</button>
              </menu>
            </form>
          </article>

          <aside className="space-y-6">
            <article className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Grid className="w-6 h-6" />
                Conversión a Cubetas
              </h4>
              <section className="space-y-4">
                <p className="flex justify-between items-center border-b border-white/20 pb-2 m-0">
                  <span className="text-white/80 text-sm">Total Huevos (Hoy)</span>
                  <span className="text-xl font-bold">{totalHuevosToday}</span>
                </p>
                <p className="flex justify-between items-center border-b border-white/20 pb-2 m-0">
                  <span className="text-white/80 text-sm">Panal de huevos (30 und)</span>
                  <span className="text-xl font-bold">{cubetas}</span>
                </p>
                <p className="flex justify-between items-center m-0">
                  <span className="text-white/80 text-sm">Huevos Sueltos Restantes</span>
                  <span className="text-xl font-bold">{sueltos}</span>
                </p>
              </section>
            </article>

            <article className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Cálculo y Proyección
              </h4>
              <section className="space-y-4">
                <fieldset className="grid grid-cols-2 gap-3 border-0 p-0 m-0">
                  <p className="m-0 flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Nro. de Aves</label>
                    <input
                      className="w-full mt-1 bg-slate-50 dark:bg-zinc-800 border-none rounded-lg text-sm p-2 dark:text-white"
                      type="number"
                      value={calcAves}
                      onChange={(e) => setCalcAves(parseFloat(e.target.value) || 0)}
                    />
                  </p>
                  <p className="m-0 flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">g / Ave</label>
                    <input
                      className="w-full mt-1 bg-slate-50 dark:bg-zinc-800 border-none rounded-lg text-sm p-2 dark:text-white"
                      type="number"
                      value={calcGramos}
                      onChange={(e) => setCalcGramos(parseFloat(e.target.value) || 0)}
                    />
                  </p>
                </fieldset>
                <output className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex justify-between items-center block">
                  <hgroup>
                    <p className="text-[10px] font-bold text-primary uppercase m-0">Requerimiento Total</p>
                    <p className="text-xl font-black text-slate-800 dark:text-slate-100 m-0">{feedRequired.toFixed(1)} <span className="text-xs font-normal text-slate-500">kg</span></p>
                  </hgroup>
                </output>
                <section className="pt-4 border-t border-slate-100 dark:border-zinc-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Actualizar Inventario</p>
                  <fieldset className="grid grid-cols-2 gap-3 mb-3 border-0 p-0 m-0">
                    <p className="bg-slate-50 dark:bg-zinc-800 p-2 rounded-lg m-0 flex flex-col items-center justify-center">
                      <span className="block text-[10px] text-slate-500">Bultos (50kg)</span>
                      <span className="block font-bold dark:text-white">{bultos.toFixed(1)}</span>
                    </p>
                    <button className="bg-slate-800 dark:bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all border-none cursor-pointer">Registrar Salida</button>
                  </fieldset>
                </section>
              </section>
            </article>
          </aside>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <article className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-primary w-6 h-6" />
              Índice de Conversión Alimenticia (FCR)
            </h3>
            <fieldset className="grid grid-cols-2 gap-6 mb-6 border-0 p-0 m-0">
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Alimento Consumido (kg)</label>
                <input className="w-full bg-slate-100 dark:bg-zinc-800/50 border-none rounded-xl py-3 px-4 font-bold text-primary cursor-not-allowed" value={feedRequired.toFixed(1)} readOnly type="number" />
              </p>
              <p className="space-y-1 m-0">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Huevos Producidos</label>
                <input className="w-full bg-slate-100 dark:bg-zinc-800/50 border-none rounded-xl py-3 px-4 font-bold text-primary cursor-not-allowed" value={totalHuevosToday} readOnly type="number" />
              </p>
            </fieldset>
            <output className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900 block">
              <hgroup>
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 m-0">Conversion Alimenticia</p>
                <p className="text-3xl font-black text-emerald-800 dark:text-emerald-300 m-0">{fcrScore}</p>
              </hgroup>
              <span className={`px-4 py-1 rounded-full text-sm font-bold ${fcrStatus.color}`}>{fcrStatus.label}</span>
            </output>
          </article>
        </section>

        <section aria-label="Historial de Producción" className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 mb-8 overflow-hidden">
          <header className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-lg font-bold">Historial de Producción</h3>
            <button onClick={() => setShowModal(true)} className="text-primary text-sm font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none">
              Ver Todo <ArrowRight className="w-5 h-5" />
            </button>
          </header>
          <figure className="overflow-x-auto m-0">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-zinc-800/50 text-slate-500 text-xs font-bold uppercase">
                <tr>
                  <th className="px-6 py-4">Fecha/Hora</th>
                  <th className="px-6 py-4">Trabajador</th>
                  <th className="px-6 py-4">Galpón</th>
                  <th className="px-6 py-4 text-center">Huevos</th>
                  <th className="px-6 py-4 text-center">Alimento (kg)</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-slate-400">No hay registros aún.</td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm m-0 dark:text-slate-200">{item.fecha}</p>
                        <p className="text-xs text-slate-400 m-0">{item.hora}</p>
                      </td>
                      <td className="px-6 py-4 text-sm dark:text-slate-300">{item.worker}</td>
                      <td className="px-6 py-4 text-sm font-medium dark:text-slate-300">{item.galpon}</td>
                      <td className="px-6 py-4 text-center text-sm font-bold text-primary">{item.buenos}</td>
                      <td className="px-6 py-4 text-center text-sm dark:text-slate-300">{item.alimento.toFixed(1)}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-500 p-1 bg-transparent border-none cursor-pointer">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </figure>
        </section>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <header className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
              <h3 className="text-xl font-bold italic dark:text-white">Historial Completo de Producción</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer">
                <X className="w-8 h-8" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white dark:bg-zinc-900 text-slate-500 text-xs font-bold uppercase border-b border-slate-100 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3">Fecha/Hora</th>
                    <th className="px-4 py-3">Trabajador</th>
                    <th className="px-4 py-3">Galpón</th>
                    <th className="px-4 py-3 text-center">Buenos</th>
                    <th className="px-4 py-3 text-center">Rotos</th>
                    <th className="px-4 py-3 text-center">Alimento</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-10 text-slate-400">No hay registros históricos.</td>
                    </tr>
                  ) : (
                    data.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20">
                        <td className="px-4 py-4 text-sm font-medium dark:text-slate-300">
                          {item.fecha} <br />
                          <span className="text-xs text-slate-400">{item.hora}</span>
                        </td>
                        <td className="px-4 py-4 text-sm dark:text-slate-300">{item.worker}</td>
                        <td className="px-4 py-4 text-sm dark:text-slate-300">{item.galpon}</td>
                        <td className="px-4 py-4 text-center text-sm font-bold text-primary">{item.buenos}</td>
                        <td className="px-4 py-4 text-center text-sm text-red-500 font-bold">{item.rotos}</td>
                        <td className="px-4 py-4 text-center text-sm dark:text-slate-300">{item.alimento.toFixed(1)} kg</td>
                        <td className="px-4 py-4 text-right">
                          <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-500 p-1 bg-transparent border-none cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <footer className="p-6 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 flex justify-end">
              <button onClick={() => window.print()} className="bg-slate-800 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-700 transition-all border-none cursor-pointer">
                <Printer className="w-4 h-4" />
                Imprimir Reporte
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
