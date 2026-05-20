import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GestionUsuariosView from './features/users/pages/GestionUsuariosView'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GestionUsuariosView/>
  </StrictMode>,
)
