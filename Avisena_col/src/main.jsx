import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import OlvideContraseña1 from './views/auth/OlvideContraseña1.jsx';    

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <OlvideContraseña1 />

  </StrictMode>,
)
