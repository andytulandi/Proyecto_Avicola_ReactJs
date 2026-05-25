import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MortalidadView from './features/galpones/views/MortalidadView'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MortalidadView/>
  </StrictMode>,
)
