import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Iniciosesion from './views/users/Iniciosesion.jsx'
import RegisterUserView from './views/users/RegisterUserView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Iniciosesion />
    <RegisterUserView />
  </StrictMode>,
)
