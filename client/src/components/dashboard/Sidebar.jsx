import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  BarChart3, 
  AlertCircle, 
  Settings, 
  LogOut,
  Shield,
  X,
  Wallet,
  Target,
  Zap
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, logoutContext }) {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Wallet, label: 'Budgets', path: '/dashboard/budgets' },
    { icon: Upload, label: 'Upload Data', path: '/dashboard/upload' },
    { icon: BarChart3, label: 'Reports', path: '/dashboard/reports' },
    { icon: Target, label: 'Goals', path: '/dashboard/goals' },
    { icon: Zap, label: 'Insights', path: '/dashboard/insights' },
    { icon: AlertCircle, label: 'Alerts', path: '/dashboard/alerts' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed left-0 top-0 bottom-0 z-50 w-72 bg-[rgb(var(--bg-main))] border-r border-[rgb(var(--border-color))] 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full h-screen">
          <div className="p-6 flex items-center justify-between border-b border-indigo-500/10">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">PFM AI</span>
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-6 h-6 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive(item.path) 
                    ? 'bg-indigo-600/10 text-indigo-400 font-bold border border-indigo-600/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                `}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'}`} />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-[rgb(var(--border-color))]">
            <button 
              onClick={logoutContext}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-400/5 hover:text-rose-300 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
