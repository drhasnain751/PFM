import React, { useEffect } from 'react';
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

  // Close sidebar on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── Desktop Sidebar (always visible ≥ md) ── */}
      <aside className={`
        fixed left-0 top-0 bottom-0 z-50 w-64 bg-[rgb(var(--bg-main))] border-r border-[rgb(var(--border-color))]
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo Row */}
        <div className="h-16 md:h-20 px-5 flex items-center justify-between border-b border-[rgb(var(--border-color))]">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">PFM AI</span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150
                ${isActive(item.path)
                  ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}
              `}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive(item.path) ? 'text-indigo-400' : ''}`} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[rgb(var(--border-color))]">
          <button 
            onClick={logoutContext}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-400/10 hover:text-rose-300 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-2 py-2 safe-bottom">
        {menuItems.slice(0, 5).map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all min-w-0 ${
              isActive(item.path)
                ? 'text-indigo-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-semibold truncate max-w-full">{item.label}</span>
          </Link>
        ))}
        {/* "More" button opens full sidebar */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 transition-all"
        >
          <div className="w-5 h-5 flex flex-col justify-center gap-[3px]">
            <span className="block h-[2px] bg-current rounded" />
            <span className="block h-[2px] bg-current rounded w-3/4" />
            <span className="block h-[2px] bg-current rounded" />
          </div>
          <span className="text-[9px] font-semibold">More</span>
        </button>
      </nav>
    </>
  );
}
