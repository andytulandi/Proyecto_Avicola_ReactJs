import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Users,
  ClipboardList,
  ChevronDown,
  FileText,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import logoSena from '../assets/images/logo-sena-verde-complementario-svg-2022.svg';
import '../assets/css/menucolapsable.css';

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('user_id') || 'admin';

  // If no user is logged in, redirect to login page immediately!
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  const userMap = {
    admin: {
      name: 'Instructor Líder (Admin)',
      email: 'admin.lider@granja.com',
      role: 'Instructor Líder',
      avatar: 'https://ui-avatars.com/api/?name=Instructor+Lider&background=5be830&color=fff'
    },
    aprendiz: {
      name: 'Aprendiz Sena',
      email: 'aprendiz.sena@granja.com',
      role: 'Aprendiz de Contrato',
      avatar: 'https://ui-avatars.com/api/?name=Aprendiz+Sena&background=0284c7&color=fff'
    },
    investigador: {
      name: 'Instructor Investigador',
      email: 'investigador.sena@granja.com',
      role: 'Instructor Investigador',
      avatar: 'https://ui-avatars.com/api/?name=Instructor+Investigador&background=f59e0b&color=fff'
    }
  };

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(`user_profile_${userId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return userMap[userId] || userMap.admin;
  });

  useEffect(() => {
    const updateProfile = () => {
      const saved = localStorage.getItem(`user_profile_${userId}`);
      if (saved) {
        try {
          setCurrentUser(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      } else {
        setCurrentUser(userMap[userId] || userMap.admin);
      }
    };

    window.addEventListener('storage', updateProfile);
    return () => {
      window.removeEventListener('storage', updateProfile);
    };
  }, [userId]);

  return (
    <section className="app-container dashboard-body">
      {/* SIDEBAR */}
      <aside className={`sidebar sidebar-transition ${isSidebarCollapsed ? 'is-collapsed' : ''}`}>
        <section className="sidebar-top">
          <button onClick={toggleSidebar} className="sidebar-toggle-btn">
            <Lock className="icon-lock" />
          </button>

          <header className="brand-header">
            <figure className="brand-logo-container">
              <img
                src={logoSena}
                alt="SENA"
                className="brand-logo"
              />
            </figure>
            <hgroup className="brand-text-group">
              <h1 className="brand-title">AVISENA</h1>
              <p className="brand-subtitle user-role-display">{currentUser.role}</p>
            </hgroup>
          </header>

          <nav className="main-navigation">
            <Link to="/users" className="nav-item">
              <Users className="icon-nav" />
              <span className="nav-text">Gestión de Usuarios</span>
            </Link>

            <section className="dropdown-container">
              <button
                onClick={() => toggleDropdown('registros')}
                className="nav-item dropdown-trigger"
              >
                <ClipboardList className="icon-nav" />
                <span className="nav-text flex-1 text-left">Registros</span>
                <ChevronDown className={`chevron-icon ${openDropdown === 'registros' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'registros' && (
                <nav className="submenu active">
                  <Link to="/prodfunfinal" className="submenu-item">Producción Diaria</Link>
                  <Link to="/registro_clasificacion" className="submenu-item">Clasificación Huevos</Link>
                  <Link to="/mortalidad" className="submenu-item">Mortalidad</Link>
                  <Link to="/morbilidad" className="submenu-item">Morbilidad</Link>
                </nav>
              )}
            </section>

            <section className="dropdown-container">
              <button
                onClick={() => toggleDropdown('reportes')}
                className="nav-item dropdown-trigger"
              >
                <FileText className="icon-nav" />
                <span className="nav-text flex-1 text-left">Reportes</span>
                <ChevronDown className={`chevron-icon ${openDropdown === 'reportes' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'reportes' && (
                <nav className="submenu active">
                  <Link to="/rep_diario" className="submenu-item">Producción Diaria</Link>
                  <Link to="/rep_alimento" className="submenu-item">Consumo Alimento</Link>
                  <Link to="/rep_mortalidad" className="submenu-item">Mortalidad Aves</Link>
                  <Link to="/rep_finanzas" className="submenu-item">Finanzas Granja</Link>
                </nav>
              )}
            </section>

            <Link to="/notificaciones" className="nav-item">
              <Bell className="icon-nav" />
              <span className="nav-text">Notificaciones</span>
            </Link>
          </nav>
        </section>
        <footer className="sidebar-footer">
          {/* Footer content if any */}
        </footer>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="content-wrapper">
        <header className="top-bar">
          <h2 className="page-title">Dashboard</h2>
          <article className="user-meta relative">
            <section className="user-details flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 m-0 leading-tight user-name-display">
                  {currentUser.name}
                </p>
                <p className="text-xs text-primary font-medium m-0 flex items-center justify-end gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary block"></span> Online
                </p>
              </div>
              <section className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                  }}
                  className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all p-0 border-none bg-transparent"
                >
                  <p
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-primary hover:opacity-80 transition-opacity user-avatar-img"
                    style={{ backgroundImage: `url("${currentUser.avatar}")` }}
                  ></p>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1a1f1a] rounded-2xl shadow-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden z-[100] transform origin-top-right transition-all">
                    <header className="p-6 bg-slate-50 dark:bg-zinc-800/50 flex items-center gap-4 border-b border-slate-100 dark:border-zinc-800">
                      <img
                        src={currentUser.avatar}
                        alt={`Foto de ${currentUser.name}`}
                        className="w-16 h-16 rounded-full border-2 border-primary shadow-sm user-avatar-img"
                      />
                      <hgroup className="text-left">
                        <h1 className="text-lg font-black text-slate-800 dark:text-slate-100 m-0 user-name-display">
                          {currentUser.name}
                        </h1>
                        <p className="text-xs text-slate-500 m-0 mt-0.5 user-email-display">
                          {currentUser.email}
                        </p>
                      </hgroup>
                    </header>

                    <nav aria-label="Menú de cuenta" className="p-3 space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <User className="w-5 h-5" />
                          </div>
                          <section>
                            <strong className="block text-sm text-slate-800 dark:text-slate-200 font-bold">Mi Perfil</strong>
                            <span className="block text-[11px] text-slate-500">Datos personales y granja</span>
                          </section>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                      </Link>

                      <button
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Settings className="w-5 h-5" />
                          </div>
                          <section>
                            <strong className="block text-sm text-slate-800 dark:text-slate-200 font-bold">Configuración</strong>
                            <span className="block text-[11px] text-slate-500">Preferencias de cuenta</span>
                          </section>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                      </button>

                      <div className="h-px bg-slate-100 dark:bg-zinc-800 my-2 mx-3"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group text-left border-none bg-transparent"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                          <LogOut className="w-5 h-5 ml-1" />
                        </div>
                        <strong className="block text-sm text-red-600 font-bold">Cerrar Sesión</strong>
                      </button>
                    </nav>
                  </div>
                )}
              </section>
            </section>
          </article>
        </header>

        {/* MAIN VIEW FOR ROUTING */}
        <section id="main-view" className="view-container fade-in">
          <Outlet />
        </section>
      </main>
    </section>
  );
}
