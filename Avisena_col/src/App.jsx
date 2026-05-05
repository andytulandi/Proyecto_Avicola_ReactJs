import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from './views/dashboard/DashboardHome';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import AdminGalponesView from './views/galpones/AdminGalponesView';
import UserManagementView from './views/users/UserManagementView';
import RegisterUserView from './views/users/RegisterUserView';
import UserProfileView from './views/profile/UserProfileView';
import Home from './views/auth/Home';
import './App.css';
import Iniciosesion from './views/users/Iniciosesion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/login" element={<Iniciosesion />} />
        <Route path="/register" element={<RegisterUserView />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/galpones" element={<AdminGalponesView />} />
        <Route path="/users" element={<UserManagementView />} />
        <Route path="/users/register" element={<RegisterUserView />} />
        <Route path="/profile" element={<UserProfileView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
