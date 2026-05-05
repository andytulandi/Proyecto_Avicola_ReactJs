import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PerfilyConfiguracionview from './views/profile/PerfilyConfiguracionview'
import Header from './layouts/Header.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App/>
   
    <PerfilyConfiguracionview/>
  </StrictMode>,
)
