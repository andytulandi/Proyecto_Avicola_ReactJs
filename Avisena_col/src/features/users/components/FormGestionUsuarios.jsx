import '../pages/GestionUsuarios.css'
import { useState } from "react";

export default function FormGestionUsuarios({
  usuarios,
  setUsuarios,
  setUsuariosFiltrados
}) {

  const [modalAbierto, setModalAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [documento, setDocumento] = useState("");
  const [residencia, setResidencia] = useState("");
  const [fecha, setFecha] = useState("");
  const [rol, setRol] = useState("");

  function abrirModal() {
    setModalAbierto(true);
  }

  function cerrarModal() {
    setModalAbierto(false);
    limpiarFormulario();
  }

  function guardarUsuarios(data) {
    localStorage.setItem("usuarios", JSON.stringify(data));
  }

  /* guardar usuarios */
  function guardarUsuario() {
    const usuario = {
      id: Date.now(),
      nombre,
      email,
      telefono,
      documento,
      residencia,
      fecha,
      rol,
      estado: "ACTIVO",
    };

    if (!usuario.nombre || !usuario.email || !usuario.rol) {
      alert("Complete los campos obligatorios");
      return;
    }

    const nuevosUsuarios = [...usuarios, usuario];

    setUsuarios(nuevosUsuarios);
    setUsuariosFiltrados(nuevosUsuarios);
    
    guardarUsuarios(nuevosUsuarios);

    cerrarModal();
    limpiarFormulario();
  }

  /* ===== limpiar formulario ===== */
  function limpiarFormulario() {
    setNombre("");
    setEmail("");
    setTelefono("");
    setDocumento("");
    setResidencia("");
    setFecha("");
    setRol("");
  }

  return (
    <>
      <section className="header-actions">
        <section className="actions-group">
          <button onClick={abrirModal} className="btn-primary">
            <span className="material-symbols-outlined">person_add</span>
            <span>Añadir Usuario</span>
          </button>
        </section>
      </section>
      {modalAbierto && (
        <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <section className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-xl p-6">
            <section className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold justify-center">Añadir Usuario</h3>
              <button
                onClick={cerrarModal}
                className="text-xl text-slate-400 hover:text-danger"
              >
                &times;
              </button>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <label className="form-label">Nombre</label>
              <input
                placeholder="Ingrese el nombre"
                className="form-input col-span-2 "
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              /> 
              <label className="form-label">E-mail</label>
              <input
                placeholder="Ingrese el correo electrónico"
                className="form-input col-span-2 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             
              <label className="form-label">Teléfono</label>
              <input
                type='tel'
                placeholder="Digite el número de celular"
                className="form-input col-span-2 "
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              
              <label className="form-label">Documento</label>
              <input
              type='text'
                placeholder="Ingrese el documento de identidad"
                className="form-input col-span-2 "
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
              
              <label className="form-label">Residencia</label>
              <input
                placeholder="Dirección de residencia"
                className="form-input col-span-2 "
                value={residencia}
                onChange={(e) => setResidencia(e.target.value)}
              />
              
              <label className="form-label">Fecha de ingreso</label>
              <input
                type="date"
                className="form-input col-span-2 "
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />

              <label className='form-label'>Asignar rol</label>
              <select
                className="form-input col-span-2"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="">Seleccione un rol</option>
                <option value="Instructor lider">Instructor lider</option>
                <option value="Instructor investigador">
                  Instructor investigador
                </option>
                <option value="Aprendiz de contrato">
                  Aprendiz de contrato
                </option>
              </select>
            </section>

            <section className="flex justify-end gap-3 mt-6">
              <button
                onClick={cerrarModal}
                className="btn cancel"
              >
                Cancelar
              </button>

              <button
                onClick={guardarUsuario}
                className="btn-primary"
              >
                Guardar
              </button>
            </section>
          </section>
        </section>
      )}
    </>
  );
}
