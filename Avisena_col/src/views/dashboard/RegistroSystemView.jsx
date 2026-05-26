import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function RegistroSystemView() {
  const [tipoFormulario, setTipoFormulario] = useState('lotes');
  const [notificacion, setNotificacion] = useState(null);
  
  // Lotes
  const [lotes, setLotes] = useState([]);
  const [formLotes, setFormLotes] = useState({ codigo: '', galpon: '1', cantidad: '', fecha: '' });
  
  // Mortalidad
  const [mortalidad, setMortalidad] = useState([]);
  const [formMortalidad, setFormMortalidad] = useState({ lote: '', bajas: '', observaciones: '' });
  
  // Morbilidad
  const [morbilidad, setMorbilidad] = useState([]);
  const [formMorbilidad, setFormMorbilidad] = useState({ lote: '', aves: '', sintomas: '', tratamiento: '' });
  
  // Huevos
  const [huevos, setHuevos] = useState([]);
  const [formHuevos, setFormHuevos] = useState({ jumbo: '', tipoA: '', tipoB: '', rotos: '', fecha: '' });
  
  // Producción
  const [produccion, setProduccion] = useState([]);
  const [formProduccion, setFormProduccion] = useState({ alimento: '', agua: '', peso: '', humedad: '', fecha: '' });

  // Cargar datos del localStorage
  useEffect(() => {
    setLotes(JSON.parse(localStorage.getItem('avisena_lotes')) || []);
    setMortalidad(JSON.parse(localStorage.getItem('avisena_mortalidad')) || []);
    setMorbilidad(JSON.parse(localStorage.getItem('avisena_morbilidad')) || []);
    setHuevos(JSON.parse(localStorage.getItem('avisena_huevos')) || []);
    setProduccion(JSON.parse(localStorage.getItem('avisena_produccion')) || []);
  }, []);

  const showNotification = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(null), 3000);
  };

  // Guardar Lote
  const guardarLote = (e) => {
    e.preventDefault();
    if (!formLotes.codigo || !formLotes.cantidad || !formLotes.fecha) {
      showNotification('⚠️ Complete todos los campos');
      return;
    }
    const nuevoLote = { id: Date.now(), ...formLotes, fecha: new Date().toLocaleString() };
    const nuevosLotes = [nuevoLote, ...lotes];
    setLotes(nuevosLotes);
    localStorage.setItem('avisena_lotes', JSON.stringify(nuevosLotes));
    setFormLotes({ codigo: '', galpon: '1', cantidad: '', fecha: '' });
    showNotification('✓ Lote registrado correctamente');
  };

  // Guardar Mortalidad
  const guardarMortalidad = (e) => {
    e.preventDefault();
    if (!formMortalidad.lote || !formMortalidad.bajas) {
      showNotification('⚠️ Complete todos los campos');
      return;
    }
    const nuevoRegistro = { id: Date.now(), ...formMortalidad, fecha: new Date().toLocaleString() };
    const nuevosRegistros = [nuevoRegistro, ...mortalidad];
    setMortalidad(nuevosRegistros);
    localStorage.setItem('avisena_mortalidad', JSON.stringify(nuevosRegistros));
    setFormMortalidad({ lote: '', bajas: '', observaciones: '' });
    showNotification('✓ Mortalidad registrada');
  };

  // Guardar Morbilidad
  const guardarMorbilidad = (e) => {
    e.preventDefault();
    if (!formMorbilidad.lote || !formMorbilidad.aves) {
      showNotification('⚠️ Complete todos los campos');
      return;
    }
    const nuevoRegistro = { id: Date.now(), ...formMorbilidad, fecha: new Date().toLocaleString() };
    const nuevosRegistros = [nuevoRegistro, ...morbilidad];
    setMorbilidad(nuevosRegistros);
    localStorage.setItem('avisena_morbilidad', JSON.stringify(nuevosRegistros));
    setFormMorbilidad({ lote: '', aves: '', sintomas: '', tratamiento: '' });
    showNotification('✓ Morbilidad registrada');
  };

  // Guardar Huevos
  const guardarHuevos = (e) => {
    e.preventDefault();
    const total = parseInt(formHuevos.jumbo || 0) + parseInt(formHuevos.tipoA || 0) + 
                  parseInt(formHuevos.tipoB || 0) + parseInt(formHuevos.rotos || 0);
    if (total === 0) {
      showNotification('⚠️ Ingrese al menos un valor');
      return;
    }
    const nuevoRegistro = { id: Date.now(), ...formHuevos, fecha: new Date().toLocaleString() };
    const nuevosRegistros = [nuevoRegistro, ...huevos];
    setHuevos(nuevosRegistros);
    localStorage.setItem('avisena_huevos', JSON.stringify(nuevosRegistros));
    setFormHuevos({ jumbo: '', tipoA: '', tipoB: '', rotos: '', fecha: '' });
    showNotification('✓ Clasificación guardada');
  };

  // Guardar Producción
  const guardarProduccion = (e) => {
    e.preventDefault();
    if (!formProduccion.alimento || !formProduccion.agua) {
      showNotification('⚠️ Complete los campos requeridos');
      return;
    }
    const nuevoRegistro = { id: Date.now(), ...formProduccion, fecha: new Date().toLocaleString() };
    const nuevosRegistros = [nuevoRegistro, ...produccion];
    setProduccion(nuevosRegistros);
    localStorage.setItem('avisena_produccion', JSON.stringify(nuevosRegistros));
    setFormProduccion({ alimento: '', agua: '', peso: '', humedad: '', fecha: '' });
    showNotification('✓ Indicadores guardados');
  };

  // Eliminar registros
  const eliminarRegistro = (tipo, id) => {
    let datos = tipo === 'lotes' ? lotes : tipo === 'mortalidad' ? mortalidad : 
                tipo === 'morbilidad' ? morbilidad : tipo === 'huevos' ? huevos : produccion;
    const actualizados = datos.filter(r => r.id !== id);
    
    if (tipo === 'lotes') { setLotes(actualizados); localStorage.setItem('avisena_lotes', JSON.stringify(actualizados)); }
    else if (tipo === 'mortalidad') { setMortalidad(actualizados); localStorage.setItem('avisena_mortalidad', JSON.stringify(actualizados)); }
    else if (tipo === 'morbilidad') { setMorbilidad(actualizados); localStorage.setItem('avisena_morbilidad', JSON.stringify(actualizados)); }
    else if (tipo === 'huevos') { setHuevos(actualizados); localStorage.setItem('avisena_huevos', JSON.stringify(actualizados)); }
    else { setProduccion(actualizados); localStorage.setItem('avisena_produccion', JSON.stringify(actualizados)); }
    showNotification('✓ Registro eliminado');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {notificacion && (
        <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-50">
          {notificacion}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menú Lateral */}
        <aside className="lg:col-span-1 space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Formularios</h2>
          
          {[
            { id: 'lotes', label: 'Registro de Lotes', color: 'emerald' },
            { id: 'mortalidad', label: 'Mortalidad', color: 'red' },
            { id: 'morbilidad', label: 'Morbilidad', color: 'amber' },
            { id: 'huevos', label: 'Clasificación Huevos', color: 'blue' },
            { id: 'produccion', label: 'Producción Diaria', color: 'purple' }
          ].map(form => (
            <button
              key={form.id}
              onClick={() => setTipoFormulario(form.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all ${
                tipoFormulario === form.id
                  ? `bg-${form.color}-500 text-white shadow-lg`
                  : `bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700`
              }`}
            >
              {form.label}
            </button>
          ))}
        </aside>

        {/* Formularios y Historial */}
        <section className="lg:col-span-3 space-y-6">
          {/* Registro de Lotes */}
          {tipoFormulario === 'lotes' && (
            <>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-emerald-700 mb-6">Registro de Nuevo Lote</h3>
                <form onSubmit={guardarLote} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Código de Lote (Ej: L-2024-001)" value={formLotes.codigo}
                      onChange={(e) => setFormLotes({...formLotes, codigo: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <select value={formLotes.galpon} onChange={(e) => setFormLotes({...formLotes, galpon: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option value="1">Galpón 1</option>
                      <option value="2">Galpón 2</option>
                      <option value="3">Galpón 3</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" placeholder="Cantidad Inicial" value={formLotes.cantidad}
                      onChange={(e) => setFormLotes({...formLotes, cantidad: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <input type="date" value={formLotes.fecha}
                      onChange={(e) => setFormLotes({...formLotes, fecha: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-all">
                    Confirmar Ingreso de Lote
                  </button>
                </form>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4">Historial de Lotes</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {lotes.length === 0 ? <p className="text-slate-500">Sin registros</p> : lotes.map(lote => (
                    <div key={lote.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="text-sm">
                        <p className="font-bold">{lote.codigo}</p>
                        <p className="text-slate-500 text-xs">G{lote.galpon} • {lote.cantidad} aves • {lote.fecha}</p>
                      </div>
                      <button onClick={() => eliminarRegistro('lotes', lote.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Mortalidad */}
          {tipoFormulario === 'mortalidad' && (
            <>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-red-700 mb-6">Reporte Diario de Mortalidad</h3>
                <form onSubmit={guardarMortalidad} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Lote" value={formMortalidad.lote}
                      onChange={(e) => setFormMortalidad({...formMortalidad, lote: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <input type="number" placeholder="Número de Bajas" value={formMortalidad.bajas}
                      onChange={(e) => setFormMortalidad({...formMortalidad, bajas: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <textarea placeholder="Observaciones Técnicas" rows="3" value={formMortalidad.observaciones}
                    onChange={(e) => setFormMortalidad({...formMortalidad, observaciones: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  <button type="submit" style={{ backgroundColor: '#991b1b' }} className="w-full text-white font-bold py-3 rounded-lg transition-all hover:opacity-90">
                    Registrar Bajas
                  </button>
                </form>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4">Historial de Mortalidad</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr><th className="p-2 text-left">Lote</th><th className="p-2 text-left">Bajas</th><th className="p-2 text-left">Observaciones</th><th className="p-2 text-center">Acción</th></tr>
                    </thead>
                    <tbody>
                      {mortalidad.length === 0 ? <tr><td colSpan="4" className="p-4 text-center text-slate-500">Sin registros</td></tr> :
                        mortalidad.map(reg => (
                          <tr key={reg.id} className="border-b border-slate-200 dark:border-slate-700">
                            <td className="p-2">{reg.lote}</td>
                            <td className="p-2">{reg.bajas}</td>
                            <td className="p-2 text-xs">{reg.observaciones || '-'}</td>
                            <td className="p-2 text-center"><button onClick={() => eliminarRegistro('mortalidad', reg.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Morbilidad */}
          {tipoFormulario === 'morbilidad' && (
            <>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-amber-700 mb-6">Registro de Morbilidad</h3>
                <form onSubmit={guardarMorbilidad} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Lote Afectado" value={formMorbilidad.lote}
                      onChange={(e) => setFormMorbilidad({...formMorbilidad, lote: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                    <input type="number" placeholder="Aves con Síntomas" value={formMorbilidad.aves}
                      onChange={(e) => setFormMorbilidad({...formMorbilidad, aves: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                  <input type="text" placeholder="Síntomas Principales (Ej: Respiratorios, digestivos...)" value={formMorbilidad.sintomas}
                    onChange={(e) => setFormMorbilidad({...formMorbilidad, sintomas: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  <input type="text" placeholder="Tratamiento / Vacuna Aplicada" value={formMorbilidad.tratamiento}
                    onChange={(e) => setFormMorbilidad({...formMorbilidad, tratamiento: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  <button type="submit" style={{ backgroundColor: '#b45309' }} className="w-full text-white font-bold py-3 rounded-lg transition-all hover:opacity-90">
                    Guardar Registro Médico
                  </button>
                </form>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4">Historial de Morbilidad</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr><th className="p-2 text-left">Lote</th><th className="p-2 text-left">Aves</th><th className="p-2 text-left">Síntomas</th><th className="p-2 text-left">Tratamiento</th><th className="p-2 text-center">Acción</th></tr>
                    </thead>
                    <tbody>
                      {morbilidad.length === 0 ? <tr><td colSpan="5" className="p-4 text-center text-slate-500">Sin registros</td></tr> :
                        morbilidad.map(reg => (
                          <tr key={reg.id} className="border-b border-slate-200 dark:border-slate-700">
                            <td className="p-2">{reg.lote}</td>
                            <td className="p-2">{reg.aves}</td>
                            <td className="p-2 text-xs">{reg.sintomas || '-'}</td>
                            <td className="p-2 text-xs">{reg.tratamiento || '-'}</td>
                            <td className="p-2 text-center"><button onClick={() => eliminarRegistro('morbilidad', reg.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Clasificación de Huevos */}
          {tipoFormulario === 'huevos' && (
            <>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-blue-700 mb-6">Clasificación de Producción</h3>
                <form onSubmit={guardarHuevos} className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <input type="number" placeholder="Jumbo (G)" value={formHuevos.jumbo}
                      onChange={(e) => setFormHuevos({...formHuevos, jumbo: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Tipo A" value={formHuevos.tipoA}
                      onChange={(e) => setFormHuevos({...formHuevos, tipoA: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Tipo B" value={formHuevos.tipoB}
                      onChange={(e) => setFormHuevos({...formHuevos, tipoB: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Rotos/Sucios" value={formHuevos.rotos}
                      onChange={(e) => setFormHuevos({...formHuevos, rotos: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#1e40af' }} className="w-full text-white font-bold py-3 rounded-lg transition-all hover:opacity-90">
                    Cargar Clasificación
                  </button>
                </form>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4">Historial de Clasificaciones</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr><th className="p-2 text-left">Jumbo</th><th className="p-2 text-left">Tipo A</th><th className="p-2 text-left">Tipo B</th><th className="p-2 text-left">Rotos</th><th className="p-2 text-left">Fecha</th><th className="p-2 text-center">Acción</th></tr>
                    </thead>
                    <tbody>
                      {huevos.length === 0 ? <tr><td colSpan="6" className="p-4 text-center text-slate-500">Sin registros</td></tr> :
                        huevos.map(reg => (
                          <tr key={reg.id} className="border-b border-slate-200 dark:border-slate-700">
                            <td className="p-2">{reg.jumbo || 0}</td>
                            <td className="p-2">{reg.tipoA || 0}</td>
                            <td className="p-2">{reg.tipoB || 0}</td>
                            <td className="p-2">{reg.rotos || 0}</td>
                            <td className="p-2 text-xs">{reg.fecha}</td>
                            <td className="p-2 text-center"><button onClick={() => eliminarRegistro('huevos', reg.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Producción Diaria */}
          {tipoFormulario === 'produccion' && (
            <>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-purple-700 mb-6">Producción Diaria de Alimento y Agua</h3>
                <form onSubmit={guardarProduccion} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" step="0.01" placeholder="Consumo Alimento (Kg)" value={formProduccion.alimento}
                      onChange={(e) => setFormProduccion({...formProduccion, alimento: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <input type="number" step="0.01" placeholder="Consumo Agua (Lts)" value={formProduccion.agua}
                      onChange={(e) => setFormProduccion({...formProduccion, agua: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" placeholder="Peso Promedio Ave (g)" value={formProduccion.peso}
                      onChange={(e) => setFormProduccion({...formProduccion, peso: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <input type="number" placeholder="Humedad Relativa (%)" value={formProduccion.humedad}
                      onChange={(e) => setFormProduccion({...formProduccion, humedad: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all">
                    Guardar Indicadores del Día
                  </button>
                </form>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4">Historial de Producción</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr><th className="p-2 text-left">Alimento (Kg)</th><th className="p-2 text-left">Agua (Lts)</th><th className="p-2 text-left">Peso Ave (g)</th><th className="p-2 text-left">Humedad (%)</th><th className="p-2 text-left">Fecha</th><th className="p-2 text-center">Acción</th></tr>
                    </thead>
                    <tbody>
                      {produccion.length === 0 ? <tr><td colSpan="6" className="p-4 text-center text-slate-500">Sin registros</td></tr> :
                        produccion.map(reg => (
                          <tr key={reg.id} className="border-b border-slate-200 dark:border-slate-700">
                            <td className="p-2">{reg.alimento}</td>
                            <td className="p-2">{reg.agua}</td>
                            <td className="p-2">{reg.peso || '-'}</td>
                            <td className="p-2">{reg.humedad || '-'}</td>
                            <td className="p-2 text-xs">{reg.fecha}</td>
                            <td className="p-2 text-center"><button onClick={() => eliminarRegistro('produccion', reg.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
