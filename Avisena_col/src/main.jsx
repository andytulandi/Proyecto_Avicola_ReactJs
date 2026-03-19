import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Footer from './layouts/Footer.jsx'
import Header from './layouts/Header.jsx'
import DashboardHome from './views/dashboard/DashboardHome.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardHome />
  </StrictMode>,
)
