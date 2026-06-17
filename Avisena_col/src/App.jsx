import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './views/dashboard/DashboardHome';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import AdminGalponesView from './views/galpones/AdminGalponesView';
import UserManagementView from './views/users/UserManagementView';
import RegisterUserView from './views/users/RegisterUserView';
import UserProfileView from './views/profile/UserProfileView';
import OlvideContrasena1 from './components/OlvideContrasena1';
import OlvideContrasena2 from './views/auth/OlvideContrasena2';
import OlvideContrasena3 from './views/auth/OlvideContrasena3';
import ConfiguracionGeneral from './views/settings/ConfiguracionGeneral';

import './App.css';

function App() {
  return (
    <Routes>
      {/* Auth routes (NO sidebar layout) */}
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/forgot-password" element={<OlvideContrasena1 />} />
      <Route path="/forgot-password-2" element={<OlvideContrasena2 />} />
      <Route path="/forgot-password-3" element={<OlvideContrasena3 />} />

      {/* Dashboard routes (WITH sidebar layout) */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/configuracion" replace />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/galpones" element={<AdminGalponesView />} />
        <Route path="/users" element={<UserManagementView />} />
        <Route path="/users/register" element={<RegisterUserView />} />
        <Route path="/profile" element={<UserProfileView />} />
        <Route path="/configuracion" element={<ConfiguracionGeneral />} />
        <Route path="/settings" element={<ConfiguracionGeneral />} />
      </Route>
    </Routes>
  );
}

export default App;
