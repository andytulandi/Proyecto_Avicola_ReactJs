import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OlvideContrasena3 = () => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (newPass === '' || confirmPass === '') {
      setError('Por favor, completa ambos campos de contraseña.');
      return;
    }

    if (newPass !== confirmPass) {
      setError('Las contraseñas no coinciden. Inténtalo de nuevo.');
      return;
    }

    setTimeout(() => {
      setMensaje('¡Tu contraseña ha sido cambiada con éxito!');
      setTimeout(() => {
        navigate('/');
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
            Restablecer<br />contraseña
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full relative mt-4">
            <div className="relative w-full mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Contraseña nueva"
                className="w-full bg-[#F3F4F6] text-gray-800 placeholder-gray-500 rounded-md px-4 py-2.5 outline-none focus:ring-1 focus:ring-[#39A900] transition-all text-sm text-center"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>

            <div className="relative w-full mb-6">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirmación de contraseña"
                className="w-full bg-[#F3F4F6] text-gray-800 placeholder-gray-500 rounded-md px-4 py-2.5 outline-none focus:ring-1 focus:ring-[#39A900] transition-all text-sm text-center"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>

            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            {mensaje && <p className="text-green-600 text-xs mb-4 font-medium">{mensaje}</p>}

            <button
              type="submit"
              className="hover:brightness-95 text-white font-bold rounded-full px-10 py-1.5 shadow-sm transform transition-transform hover:scale-105 active:scale-95 text-[14px] tracking-wide"
              style={{ backgroundColor: '#5DED34' }}
            >
              CONFIRMAR CAMBIO
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
              Tu nueva contraseña debe ser segura y diferente a la anterior.
            </p>
          </div>
        </section>
      </main>

      <footer className="absolute bottom-6 left-6">
        <button
          type="button"
          onClick={handleSalir}
          className="hover:brightness-95 text-white font-bold rounded-full px-8 py-2 shadow-sm transform transition-transform hover:scale-105 active:scale-95 text-[14px] tracking-wide"
          style={{ backgroundColor: '#5DED34' }}
        >
          SALIR
        </button>
      </footer>
    </div>
  );
};

export default OlvideContrasena3;