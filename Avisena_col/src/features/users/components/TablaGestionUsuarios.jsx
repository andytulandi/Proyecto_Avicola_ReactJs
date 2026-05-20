import '../pages/GestionUsuarios.css'

export default function TablaGestionUsuarios({
  usuarios,
  setUsuarios,
  setUsuariosFiltrados
}) {

    function eliminarUsuario(id) {
      const nuevosUsuarios = usuarios.filter((u) => u.id !== id);

      setUsuarios(nuevosUsuarios);
      setUsuariosFiltrados(nuevosUsuarios);

      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    }

    function habilitarUsuario(id) {
      const nuevosUsuarios = usuarios.map((u) =>
        u.id === id ? { ...u, estado: "ACTIVO" } : u,
      );

      setUsuarios(nuevosUsuarios);
      setUsuariosFiltrados(nuevosUsuarios);

      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    }

    function deshabilitarUsuario(id) {
      const nuevosUsuarios = usuarios.map((u) =>
        u.id === id ? { ...u, estado: "INACTIVO" } : u,
      );
      
      setUsuarios(nuevosUsuarios);
      setUsuariosFiltrados(nuevosUsuarios);

      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    }

  return (
    <>
      <tbody className="table-body">
        {usuarios.map((u) => (
          <tr
            key={u.id}
            className={u.estado === "INACTIVO" ? "opacity-50" : ""}
          >
            <td className="px-6 py-5 font-semibold">{u.nombre}</td>
            <td className="px-6 py-5">{u.email}</td>
            <td className="px-6 py-5">{u.telefono}</td>
            <td className="px-6 py-5">{u.documento}</td>
            <td className="px-6 py-5 font-bold">{u.rol}</td>
            <td className="px-6 py-5">{u.residencia}</td>
            <td className="px-6 py-5">{u.fecha}</td>

            <td className="px-6 py-5 text-right">
              <section className="flex justify-end gap-2">
                <button
                  onClick={() => habilitarUsuario(u.id)}
                  className="p-2 rounded-lg bg-green-100 text-green-500 hover:bg-green-600 hover:text-green-600"
                >
                  <span className="material-symbols-outlined text-lg">
                    check_circle
                  </span>
                </button>

                <button onClick={() => deshabilitarUsuario(u.id)}
                  className='p-2 rounded-lg bg-yellow-100 text-yellow-500 hover:bg-yellow-500 hover:text-yellow-600'>
                  <span className="material-symbols-outlined text-lg">
                    block
                  </span>
                </button>

                <button onClick={() => eliminarUsuario(u.id)}
                  className='p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-600 hover:text-red-600'>
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </section>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
