import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/configuracion', label: 'Configuración', icon: 'settings' },
  ];

  // Determine the current page title
  const getPageTitle = () => {
    const titles = {
      '/configuracion': 'Configuración',
      '/settings': 'Configuración',
    };
    return titles[location.pathname] || 'Configuración';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      {/* SIDEBAR - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-[220px] lg:w-[250px] bg-white border-r border-outline-variant flex-shrink-0 h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-outline-variant">
          <img
            src="/logo-sena-verde-complementario-svg-2022.svg"
            alt="AVISENA Logo"
            className="w-8 h-8 object-contain"
          />
          <div>
            <span className="font-headline-md text-[18px] font-bold text-on-surface tracking-tight">AVISENA</span>
            <p className="text-[10px] text-on-surface-variant font-medium -mt-0.5 tracking-wide">INSTRUCTOR SENA</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.hasSubmenu && (
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-on-surface transition-colors">
                      expand_more
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[260px] bg-white shadow-xl z-50 flex flex-col animate-slide-in">
            {/* Logo */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-outline-variant">
              <div className="flex items-center gap-3">
                <img
                  src="/logo-sena-verde-complementario-svg-2022.svg"
                  alt="AVISENA Logo"
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <span className="font-headline-md text-[18px] font-bold text-on-surface tracking-tight">AVISENA</span>
                  <p className="text-[10px] text-on-surface-variant font-medium -mt-0.5 tracking-wide">INSTRUCTOR SENA</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                        }`
                      }
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.hasSubmenu && (
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          expand_more
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TOP HEADER BAR */}
        <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b border-outline-variant flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-surface-container-low transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-symbols-outlined text-on-surface">menu</span>
            </button>
            {/* Settings icon for config page */}
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] hidden md:inline-block">settings</span>
            <h1 className="font-headline-md text-headline-md text-on-surface">{getPageTitle()}</h1>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-on-surface leading-tight">Instructor Líder (Admin)</p>
              <div className="flex items-center justify-end gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#1B7A0A]"></span>
                <span className="text-xs text-[#1B7A0A] font-medium">Online</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
              IL
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant z-30 px-2 py-1 flex justify-around">
        {navItems.slice(0, 4).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="mt-0.5">{item.label.split(' ')[0]}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DashboardLayout;
