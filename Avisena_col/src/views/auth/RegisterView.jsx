import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterView() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipoDocumento: 'Cédula de Ciudadanía',
    documento: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate user registration
    alert('Usuario registrado exitosamente');
    navigate('/login');
  };

  return (
    <div className="bg-[#f5faf6] min-h-screen font-['Inter']">
      <header className="w-full bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <section className="flex items-center gap-1">
            <img src="./assets/images/logo-sena-verde-complementario-svg-2022.svg" className="w-9 h-9 " alt="Logo" />
            <strong className="text-2xl font-extrabold uppercase text-[#0B5D3B] tracking-wide">AVISENA COL</strong>
          </section>
        </nav>
      </header>

      <main className="flex justify-center items-center py-10 px-4">
        <article className="bg-white w-full max-w-3xl rounded-3xl shadow-lg border border-gray-100 p-10">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1e293b]">Registro de Usuarios</h2>
            <p className="text-gray-500 mt-2 text-sm">Únete a la plataforma de gestión avícola inteligente.</p>
          </header>

          <form id="form-registro" className="space-y-6" onSubmit={handleRegister}>
            <label className="block">
              <p className="text-sm font-bold text-gray-700 mb-2">Nombre Completo</p>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. Juan Pérez"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </label>

            <label className="block">
              <p className="text-sm font-bold text-gray-700 mb-2">Correo Electrónico</p>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="usuario@avisena.com"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </label>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <p className="text-sm font-bold text-gray-700 mb-2">Tipo de Documento</p>
                <select
                  value={formData.tipoDocumento}
                  onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  <option>Cédula de Ciudadanía</option>
                  <option>Tarjeta de Identidad</option>
                  <option>Pasaporte</option>
                  <option>Cédula extranjera</option>
                </select>
              </label>
              <label className="block">
                <p className="text-sm font-bold text-gray-700 mb-2">Número de Documento <span className="text-red-500">*</span></p>
                <input
                  type="text"
                  value={formData.documento}
                  onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                  required
                  className="w-full rounded-xl border-none bg-[#eff6ff] px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none font-medium"
                />
              </label>
            </section>

            <label className="block relative">
              <p className="text-sm font-bold text-gray-700 mb-2">Contraseña</p>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="Mínimo 10 caracteres y un caracter especial"
                className="w-full rounded-xl border-none bg-[#eff6ff] px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </label>

            <button type="submit"
              className="flex items-center justify-center w-full bg-primary hover:bg-[#3dbd14] text-black text-xl font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98]">
              Registrarse
            </button>

            <p className="text-center text-sm text-gray-500">
              ¿Ya tienes una cuenta? <Link to="/login" className="text-green-600 font-bold hover:underline">Inicia sesión</Link>
            </p>
          </form>
        </article>
      </main>
    </div>
  );
}
