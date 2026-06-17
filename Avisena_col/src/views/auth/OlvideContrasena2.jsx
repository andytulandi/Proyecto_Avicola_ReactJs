import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OlvideContrasena2 = () => {
  const [code, setCode] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    const value = code.trim();
    const regex = /^[0-9]{6}$/;

    if (!regex.test(value)) {
      setError('Debes ingresar exactamente 6 números.');
      return;
    }

    setTimeout(() => {
      setMensaje('¡Código verificado correctamente!');
      setTimeout(() => {
        navigate('/olvide-contrasena-3');
      }, 1000);
    }, 1000);
  };

  const handleSalir = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col relative font-sans text-gray-800">
      <header className="absolute top-4 left-4 md:top-6 md:left-6">
        <img
          src="/logo-sena-verde-complementario-svg-2022.svg"
          alt="SENA Logo"
          className="w-20 object-contain"
        />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <section className="bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.06)] rounded-xl w-full max-w-[420px] p-10 text-center flex flex-col items-center">

          <h1 className="text-[20px] md:text-[22px] font-bold text-[#14234b] leading-[1.3] mb-4 mt-2">
            Recuperación<br />de contraseña
          </h1>

          <p className="text-[#6B7280] text-[13px] md:text-[14px] leading-relaxed max-w-[300px] mb-6">
            Por favor ingresa el código de 6 dígitos enviado al correo electrónico
            que tienes registrado en el aplicativo.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full relative">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              placeholder="Código de verificación"
              className="w-full bg-[#F3F4F6] text-gray-800 placeholder-gray-500 rounded-md px-4 py-2.5 outline-none focus:ring-1 focus:ring-[#1B7A0A] transition-all text-sm mb-6 text-center tracking-widest"
            />

            {error && <p className="text-red-500 text-xs absolute top-12">{error}</p>}
            {mensaje && <p className="text-green-600 text-xs absolute top-12 font-medium">{mensaje}</p>}

            <button
              type="submit"
              className="hover:brightness-95 text-white font-bold rounded-full px-10 py-1.5 shadow-sm transform transition-transform hover:scale-105 active:scale-95 text-[14px] tracking-wide"
              style={{ backgroundColor: '#1B7A0A' }}
            >
              ENVIAR
            </button>
          </form>

          <div className="flex items-center mt-8 text-left space-x-2 text-[12px] md:text-[13px] text-[#4B5563] w-full px-2">
            <div className="flex-shrink-0 text-[#2563EB]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[20px] w-[20px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="leading-snug">
              Revisa tu correo electrónico y escribe el código de 6 dígitos para continuar.
            </p>
          </div>
        </section>
      </main>

      <footer className="absolute bottom-6 left-6">
        <button
          type="button"
          onClick={handleSalir}
          className="hover:brightness-95 text-white font-bold rounded-full px-8 py-2 shadow-sm transform transition-transform hover:scale-105 active:scale-95 text-[14px] tracking-wide"
          style={{ backgroundColor: '#1B7A0A' }}
        >
          SALIR
        </button>
      </footer>
    </div>
  );
};

export default OlvideContrasena2;