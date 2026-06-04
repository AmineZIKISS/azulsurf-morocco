import React, { useEffect } from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Shield, BedDouble, Compass, 
  Image, Star, Mail, Settings, LogOut, Waves, User, Menu, X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Authorization Protection
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white">
        <div className="flex flex-col items-center space-y-4">
          <Waves className="animate-spin text-sky-500 h-10 w-10" />
          <p className="text-sm font-medium tracking-wide">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { name: 'Réservations', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Packages', path: '/admin/packages', icon: Package },
    { name: 'Cours de Surf', path: '/admin/lessons', icon: Shield },
    { name: 'Chambres', path: '/admin/rooms', icon: BedDouble },
    { name: 'Excursions', path: '/admin/guiding', icon: Compass },
    { name: 'Galerie', path: '/admin/gallery', icon: Image },
    { name: 'Avis Clients', path: '/admin/reviews', icon: Star },
    { name: 'Messages Inbox', path: '/admin/contacts', icon: Mail },
    { name: 'Paramètres', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row text-slate-800 font-body-md">
      {/* Mobile Top Bar */}
      <div className="bg-[#004655] text-white p-4 flex justify-between items-center md:hidden border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Waves className="text-[#E76F51]" size={20} />
          <span className="font-bold text-sm tracking-wide">Azul Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-200 hover:text-white bg-transparent border-none cursor-pointer"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#004655] text-white flex flex-col justify-between border-r border-white/10 transition-transform duration-300 md:translate-x-0 md:static md:inset-auto md:z-auto shrink-0 shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="bg-[#E76F51] p-2 rounded-xl text-white shadow-md">
                <Waves size={20} />
              </div>
              <div>
                <span className="font-bold text-white text-base tracking-tight block">Azul Surf</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Admin Console</span>
              </div>
            </div>
            {/* Close Mobile Sidebar */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white/60 hover:text-white md:hidden bg-transparent border-none cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Profile Quick Look */}
          <div className="p-6 border-b border-white/10 flex items-center space-x-3 bg-white/5">
            <div className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-[#E76F51] font-bold border border-white/10 shadow-md">
              {user.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div>
              <span className="block text-white text-sm font-semibold truncate max-w-[150px]">{user.name}</span>
              <span className="block text-white/50 text-xs truncate max-w-[150px]">{user.email}</span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'hover:bg-white/5 hover:text-white text-white/85'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={18} className={isActive ? 'text-[#E76F51]' : 'text-white/60'} />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-white/5 hover:text-white text-white/80 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <LogOut size={18} className="text-white/60" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden animate-fade-in"
        />
      )}

      {/* Main Page Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-full">
        {children}
      </main>
    </div>
  );
}
