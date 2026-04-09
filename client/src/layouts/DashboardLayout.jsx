import React, { useState, useContext } from 'react';
import { Menu, User, Bell } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import { AuthContext } from '../context/AuthContext';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logoutContext } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        logoutContext={logoutContext} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-72 min-h-screen relative">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 md:h-20 bg-slate-900/40 backdrop-blur-md border-b border-white/5 px-4 md:px-8 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10 text-slate-200">
               <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-indigo-400">
                  <User className="w-5 h-5" />
               </div>
            </div>
          </div>
        </header>

        {/* Dashboard Pages */}
        <main className="p-4 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
