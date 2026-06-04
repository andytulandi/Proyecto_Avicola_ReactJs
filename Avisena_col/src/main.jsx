import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReportesView from './features/galpones/views/ReportesView'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReportesView/>
  </StrictMode>,
)
