import './GestionUsuarios.css';
import { useState, useEffect } from 'react';
import FiltrosGestionUsuarios from "../components/FiltrosGestionUsuarios";
import FormGestionUsuarios from "../components/FormGestionUsuarios";
import TablaGestionUsuarios from '../components/TablaGestionUsuarios';

export default function GestionUsuariosView() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  
    useEffect(() => {
      const datos = JSON.parse(localStorage.getItem("usuarios")) || [];
      setUsuarios(datos);
      setUsuariosFiltrados(datos);
    }, []);

    const total = usuarios.length;
    const activos = usuarios.filter((u) => u.estado === "ACTIVO").length;
    const inactivos = usuarios.filter((u) => u.estado === "INACTIVO").length;
    
  return (
    <>
      <section className="main-body">
        <section className="layout-container">
          <main className="main-container ">
            <section className="header-container">
              <section className="header-text">
                <h1 className="title">Gestión de Usuarios</h1>
                <p className="description">
                  Administra el acceso al sistema, los roles y los datos del
                  personal encargado de las operaciones avícolas
                </p>
              </section>
              <FormGestionUsuarios
                usuarios={usuarios}
                setUsuarios={setUsuarios}
                setUsuariosFiltrados={setUsuariosFiltrados}
              />
            </section>
            <FiltrosGestionUsuarios
              usuarios={usuarios}
              setUsuariosFiltrados={setUsuariosFiltrados}
            />
            <section className="table-container">
              <section className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr className="table-header-row">
                      <th className="table-header">Nombre</th>
                      <th className="table-header">E-mail</th>
                      <th className="table-header">Teléfono</th>
                      <th className="table-header">Número de Documento</th>
                      <th className="table-header">Rol</th>
                      <th className="table-header">Residencia</th>
                      <th className="table-header">Fecha de ingreso</th>
                      <th className="table-header text-center">Acciones</th>
                    </tr>
                  </thead>
                  <TablaGestionUsuarios
                    usuarios={usuariosFiltrados}
                    setUsuarios={setUsuarios}
                    setUsuariosFiltrados={setUsuariosFiltrados}
                  />
                </table>
              </section>
            </section>
            <section className="grid-container">
              <section className="card">
                <section className="icon-container">
                  <span className="icon">groups</span>
                </section>
                <section>
                  <p className="card-label">Total Usuarios</p>
                  <h3 className="card-value">
                    {total}
                  </h3>
                </section>
              </section>
              <section className="card">
                <section className="icon-container success">
                  <span className="icon">person_check</span>
                </section>
                <section>
                  <p className="card-label">Usuarios Activos</p>
                  <h3 className="card-value">
                    {activos}
                  </h3>
                </section>
              </section>
              <section className="card">
                <section className="icon-container warning">
                  <span className="icon">person_off</span>
                </section>
                <section>
                  <p className="card-label">Usuarios Inhabilitados</p>
                  <h3 className="card-value">
                    {inactivos}
                  </h3>
                </section>
              </section>
            </section>
          </main>
          <footer className="footer">
            <p className="footer-text">© 2026 AVISENA COL</p>
          </footer>
        </section>
      </section>
    </>
  );
}
