import React, { useState } from 'react';

const OlvideContraseña1 = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Solicitando recuperación para:', email);
  };

  return (
    <div 
      style={{ 
        position: 'fixed', // Rompe cualquier estilo heredado de Vite
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh', 
        backgroundColor: '#ffffff',
        fontFamily: 'sans-serif',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        zIndex: 9999 // Se asegura de estar por encima de todo
      }}
    >
      {/* --- LOGO EN LA ESQUINA SUPERIOR IZQUIERDA --- */}
      <header 
        style={{
          position: 'absolute',
          top: '30px',
          left: '40px',
          zIndex: 100
        }}
      >
        <img 
          src="/logo-sena-verde-complementario-svg-2022.svg" 
          alt="Logo SENA" 
          style={{ height: '70px', width: 'auto', display: 'block' }}
        />
      </header>

      {/* --- TARJETA CENTRAL TOTALMENTE ALINEADA --- */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Centrado matemático perfecto
          width: '100%',
          maxWidth: '460px',
          padding: '0 20px',
          boxSizing: 'border-box',
          zIndex: 50
        }}
      >
        <section 
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            border: '1px solid #f1f5f9',
            borderRadius: '28px',
            padding: '45px 35px',
            textAlign: 'center'
          }}
        >
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '18px', lineHeight: '1.2', color: '#1E293B' }}>
            Recuperación<br />de contraseña
          </h1>

          <p style={{ color: '#64748B', marginBottom: '30px', fontSize: '14.5px', lineHeight: '1.5', padding: '0 15px' }}>
            Por favor ingresa el correo electrónico que tienes registrado en el aplicativo.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              style={{
                width: '100%',
                backgroundColor: '#F4F6F9',
                color: '#334155',
                borderRadius: '12px',
                padding: '14px 18px',
                border: '1px solid #e2e8f0',
                outline: 'none',
                boxSizing: 'border-box',
                fontSize: '15px'
              }}
              required
            />

            {/* BOTÓN ENVIAR VERDE */}
            <button
              type="submit"
              style={{
                backgroundColor: '#1B7A0A',
                color: '#ffffff',
                fontWeight: 'bold',
                borderRadius: '9999px',
                padding: '12px 55px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(27, 122, 10, 0.25)',
                fontSize: '14px',
                letterSpacing: '0.5px'
              }}
            >
              ENVIAR
            </button>
          </form>

          {/* Información con el Check azul */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '35px', gap: '10px', textAlign: 'left' }}>
            <div style={{ marginTop: '2px', flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px', color: '#3B82F6' }} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p style={{ color: '#64748B', fontSize: '13.5px', margin: 0, lineHeight: '1.4' }}>
              Se enviará un código a tu correo electrónico, para cambiar la contraseña.
            </p>
          </div>
        </section>
      </div>

      {/* --- BOTÓN SALIR VERDE EN LA ESQUINA INFERIOR IZQUIERDA --- */}
      <footer 
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '40px',
          zIndex: 100
        }}
      >
        <button
          type="button"
          onClick={() => console.log('Saliendo...')}
          style={{
            backgroundColor: '#1B7A0A',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '9999px',
            padding: '10px 36px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(27, 122, 10, 0.25)',
            fontSize: '14px',
            letterSpacing: '0.5px'
          }}
        >
          SALIR
        </button>
      </footer>
    </div>
  );
};

export default OlvideContraseña1;