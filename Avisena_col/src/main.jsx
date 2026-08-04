import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import GestionUsuariosView from './features/users/pages/GestionUsuariosView'
import MortalidadView from './features/galpones/views/MortalidadView'
import ReportesView from './features/galpones/views/ReportesView'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MortalidadView/>
    <GestionUsuariosView/>
  </StrictMode>,
)
