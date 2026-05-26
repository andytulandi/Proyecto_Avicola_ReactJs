import { useState, useEffect } from 'react';
import '../../assets/css/gestionusuarios.css';

export default function UserManagementView() {
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroDocumento, setFiltroDocumento] = useState("");

  const [formData, setFormData] = useState({
    nombre: '', email: '', telefono: '', documento: '', residencia: '', fecha: '', rol: ''
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(data);
  }, []);

  const guardarUsuarios = (data) => {
    localStorage.setItem("usuarios", JSON.stringify(data));
    setUsuarios(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const guardarUsuario = () => {
    if (!formData.nombre || !formData.email || !formData.rol) {
      alert("Complete los campos obligatorios");
      return;
    }

    const nuevoUsuario = {
      ...formData,
      id: Date.now(),
      estado: "ACTIVO"
    };

    guardarUsuarios([...usuarios, nuevoUsuario]);
    setShowModal(false);
    setFormData({ nombre: '', email: '', telefono: '', documento: '', residencia: '', fecha: '', rol: '' });
  };

  const eliminarUsuario = (id) => {
    guardarUsuarios(usuarios.filter(u => u.id !== id));
  };

  const cambiarEstado = (id, estado) => {
    guardarUsuarios(usuarios.map(u => (u.id === id ? { ...u, estado } : u)));
  };

  const usuariosFiltrados = usuarios.filter(u => {
    const matchRol = filtroRol === "" || u.rol === filtroRol;
    const matchDoc = filtroDocumento === "" || u.documento.includes(filtroDocumento);
    return matchRol && matchDoc;
  });

  const total = usuarios.length;
  const activos = usuarios.filter(u => u.estado === "ACTIVO").length;
  const inactivos = usuarios.filter(u => u.estado === "INACTIVO").length;

  return (
    <section className="layout-container flex h-full grow flex-col">
      <main className="flex flex-1 flex-col px-4 md:px-10 lg:px-20 xl:px-40 py-8">
        <section className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <section className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Gestión de Usuarios</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Administra el acceso al sistema, los roles y los datos del personal encargado de las operaciones avícolas</p>
          </section>
          <section className="flex flex-col lg:flex-row gap-4 justify-center">
            <section className="flex gap-3 flex-wrap">
              <button onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary text-black text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                <span className="material-symbols-outlined">person_add</span>
                <span>Añadir Usuario</span>
              </button>
            </section>
          </section>
        </section>

        {/* Filtros */}
        <section className="flex gap-4 mb-6">
          <section>
            <label className="text-sm font-bold block mb-1">Rol</label>
            <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)} className="border border-slate-200 dark:border-slate-800 rounded px-3 py-2 bg-white dark:bg-slate-900">
              <option value="">Todos</option>
              <option value="Instructor lider">Instructor lider</option>
              <option value="Instructor investigador">Instructor investigador</option>
              <option value="Aprendiz de contrato">Aprendiz de contrato</option>
            </select>
          </section>

          <section>
            <label className="text-sm font-bold block mb-1">Documento</label>
            <input type="text" value={filtroDocumento} onChange={(e) => setFiltroDocumento(e.target.value)} placeholder="Buscar documento"
              className="border border-slate-200 dark:border-slate-800 rounded px-3 py-2 bg-white dark:bg-slate-900" />
          </section>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <section className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-slate-900 dark:text-white text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-4 text-slate-900 dark:text-white text-sm font-semibold">E-mail</th>
                  <th className="px-6 py-4 text-slate-900 dark:text-white text-sm font-semibold">Teléfono</th>
                  <th className="px-6 py-4 text-slate-900 dark:text-white text-sm font-semibold">Número de Documento</th>
                  <th className="px-6 py-4 text-slate-900 dark:text-white text-sm font-semibold">Rol</th>
                  <th className="px-6 py-4 text-slate-900 dark:text-white text-sm font-semibold">Residencia</th>
                  <th className="px-6 py-4 text-slate-900 dark:text-white text-sm font-semibold">Fecha de ingreso</th>
                  <th className="px-6 py-4 text-slate-900 dark:text-white text-sm font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {usuariosFiltrados.length === 0 ? (
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-center" colSpan="8">No hay usuarios registrados</td>
                  </tr>
                ) : (
                  usuariosFiltrados.map(u => (
                    <tr key={u.id} className={`${u.estado === 'INACTIVO' ? 'opacity-50' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors`}>
                      <td className="px-6 py-5 font-semibold">{u.nombre}</td>
                      <td className="px-6 py-5">{u.email}</td>
                      <td className="px-6 py-5">{u.telefono}</td>
                      <td className="px-6 py-5">{u.documento}</td>
                      <td className="px-6 py-5 font-bold">{u.rol}</td>
                      <td className="px-6 py-5">{u.residencia}</td>
                      <td className="px-6 py-5">{u.fecha}</td>
                      <td className="px-6 py-5 text-right">
                        <section className="flex justify-end gap-2">
                          <button onClick={() => cambiarEstado(u.id, "ACTIVO")} className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white" title="Habilitar">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                          </button>
                          <button onClick={() => cambiarEstado(u.id, "INACTIVO")} className="p-2 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white" title="Inhabilitar">
                            <span className="material-symbols-outlined text-lg">block</span>
                          </button>
                          <button onClick={() => eliminarUsuario(u.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white" title="Eliminar">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </section>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </section>

        {/* Estadísticas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <section className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </section>
            <section>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Usuarios</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{total}</h3>
            </section>
          </section>
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <section className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <span className="material-symbols-outlined text-3xl">person_check</span>
            </section>
            <section>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Usuarios Activos</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{activos}</h3>
            </section>
          </section>
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <section className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <span className="material-symbols-outlined text-3xl">person_off</span>
            </section>
            <section>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Usuarios Inhabilitados</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{inactivos}</h3>
            </section>
          </section>
        </section>
      </main>

      <footer className="mt-auto px-10 py-6 text-center border-t border-slate-200 dark:border-slate-800">
        <p className="text-slate-400 dark:text-slate-500 text-xs">© 2026 AVISENA COL</p>
      </footer>

      {/* Modal Añadir Usuario */}
      {showModal && (
        <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <section className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-xl p-6 shadow-2xl">
            <section className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Añadir Usuario</h3>
              <button onClick={() => setShowModal(false)} className="text-2xl font-bold text-slate-400 hover:text-red-500">&times;</button>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input id="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre *" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3" />
              <input id="email" value={formData.email} onChange={handleInputChange} placeholder="E-mail *" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3" />
              <input id="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="Teléfono" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3" />
              <input id="documento" value={formData.documento} onChange={handleInputChange} placeholder="Documento" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3" />
              <input id="residencia" value={formData.residencia} onChange={handleInputChange} placeholder="Residencia" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3" />
              <input id="fecha" value={formData.fecha} onChange={handleInputChange} type="date" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3" />
              <select id="rol" value={formData.rol} onChange={handleInputChange} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 col-span-1 md:col-span-2">
                <option value="">Seleccione rol *</option>
                <option value="Instructor lider">Instructor lider</option>
                <option value="Instructor investigador">Instructor investigador</option>
                <option value="Aprendiz de contrato">Aprendiz de contrato</option>
              </select>
            </section>
            <section className="flex justify-end gap-3 mt-8">
              <button onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold hover:brightness-95 transition-all">Cancelar</button>
              <button onClick={guardarUsuario} className="px-6 py-2.5 rounded-lg bg-primary text-black font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">Guardar</button>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
