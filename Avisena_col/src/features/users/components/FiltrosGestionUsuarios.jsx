import '../pages/GestionUsuarios.css'
import { useState } from "react";

export default function FiltrosGestionUsuarios({
  usuarios,
  setUsuariosFiltrados,
}) {
    
    const [filtroRol, setFiltroRol] = useState("");
    const [filtroDocumento, setFiltroDocumento] = useState("");

    function aplicarFiltros() {
      const filtrados = usuarios.filter((u) => {
        const porRol = filtroRol === "" || u.rol === filtroRol;

        const porDocumento =
          filtroDocumento === "" || u.documento.includes(filtroDocumento);

        return porRol && porDocumento;
      });

      setUsuariosFiltrados(filtrados);
    }

    return (
      <>
        <section className="filters-container">
          <section className="filter-group">
            <label className="filter-label">Rol</label>
            <select
              className="filter-input"
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
            >
              <option value="">Todos</option>
              <option>Instructor lider</option>
              <option>Instructor investigador</option>
              <option>Aprendiz de contrato</option>
            </select>
          </section>

          <section className="filter-group">
            <label className="filter-label">Documento</label>
            <input
              type="text"
              placeholder="Buscar documento"
              className="filter-input"
              value={filtroDocumento}
              onChange={(e) => setFiltroDocumento(e.target.value)}
            />
          </section>

          <section className="filter-action">
            <button onClick={aplicarFiltros} className="btn-primary">
              <span className="material-symbols-outlined">filter_list</span>
              <span>Filtrar</span>
            </button>
          </section>
        </section>
      </>
    );
}
