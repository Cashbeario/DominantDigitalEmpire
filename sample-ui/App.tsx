import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import HostingManager from './pages/HostingManager';
import CRM from './pages/CRM';
import AIStudio from './pages/AIStudio';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Sites from './pages/Sites';
import Projects from './pages/Projects';
import EmailMarketing from './pages/EmailMarketing';
import Ecommerce from './pages/Ecommerce';
import Login from './components/Login';
import { AppView } from './types';
import { Bell, Search, User, LogOut, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Add a welcome notification
    setNotifications(prev => [...prev, 'Welcome back, Admin. System is 100% operational.']);
    setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.SITES:
        return <Sites />;
      case AppView.HOSTING:
        return <HostingManager />;
      case AppView.ECOMMERCE:
        return <Ecommerce />;
      case AppView.CRM:
        return <CRM />;
      case AppView.PROJECTS:
        return <Projects />;
      case AppView.EMAIL:
        return <EmailMarketing />;
      case AppView.AI_STUDIO:
        return <AIStudio />;
      case AppView.ANALYTICS:
        return <Analytics />;
      case AppView.SETTINGS:
        return <Settings />;
      default:
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                <div className="text-center">
                    <h3 className="text-xl font-bold">Module Under Construction</h3>
                    <p>This part of the Digital Empire is being built.</p>
                </div>
            </div>
        );
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#f3f4f6] relative overflow-hidden">
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {notifications.map((msg, i) => (
          <div key={i} className="bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up pointer-events-auto">
            <div className="h-2 w-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium">{msg}</span>
          </div>
        ))}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:flex-shrink-0`}>
         <Sidebar currentView={currentView} onChangeView={handleViewChange} />
         {/* Close button for mobile */}
         <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white md:hidden"
         >
            <X size={24} />
         </button>
      </div>
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-30 flex-shrink-0">
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={toggleMobileMenu}
                    className="md:hidden text-slate-500 hover:text-slate-800"
                >
                    <Menu size={24} />
                </button>
                <div className="relative w-full max-w-sm hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search across tenants, servers, or contacts..." 
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <button className="relative text-slate-500 hover:text-indigo-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 border-l border-slate-200 pl-4 md:pl-6 cursor-pointer group relative">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-800">Admin User</p>
                        <p className="text-xs text-slate-500">Super Admin</p>
                    </div>
                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 border border-indigo-200 group-hover:bg-indigo-200 transition-colors">
                        <User size={20} />
                    </div>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1 hidden group-hover:block z-50">
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto h-full">
                {renderView()}
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;