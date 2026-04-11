import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Shield, Home, Zap, Info, 
  Phone, LayoutDashboard, LogOut, LogIn, UserPlus,
  ChevronRight, HelpCircle
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const NAV_LINKS = [
  { name: 'Home',         path: '/',             icon: Home },
  { name: 'Features',     path: '/features',     icon: Zap },
  { name: 'How It Works', path: '/how-it-works', icon: HelpCircle },
  { name: 'About',        path: '/about',         icon: Info },
  { name: 'Contact',      path: '/contact',       icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutContext } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ─── Sticky Navbar Bar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900/95 backdrop-blur-md border-b border-white/5 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              PFM AI
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <Link key={l.name} to={l.path} className="nav-link text-sm">{l.name}</Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-outline text-sm py-2 px-4">Dashboard</Link>
                <button onClick={logoutContext} className="btn-outline text-sm py-2 px-4 text-rose-400 border-rose-400/30">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-sm">Login</Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-5">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger (3 bars) */}
          <button
            onClick={() => setIsOpen(v => !v)}
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Full-Screen Drawer ─── */}
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer Panel */}
      <div
        className={`
          md:hidden fixed top-16 left-0 right-0 bottom-0 z-[60]
          bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950
          transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-y-0' : '-translate-y-[110%]'}
        `}
      >
        {/* Decorative top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-indigo-500 rounded-full opacity-60 blur-sm" />

        <div className="px-4 pt-6 pb-10 space-y-2">
          {/* Nav links */}
          {NAV_LINKS.map((link, i) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
                className={`
                  group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200
                  ${active
                    ? 'bg-indigo-600/20 border border-indigo-500/30 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'}
                `}
              >
                {/* Icon badge */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${active ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 group-hover:bg-indigo-600/20 group-hover:text-indigo-400'}`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="flex-1 text-base font-semibold">{link.name}</span>
                <ChevronRight className={`w-4 h-4 transition-colors ${active ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-4 border-t border-white/5" />

          {/* Auth Section */}
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-4 px-5 py-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-600/20 hover:text-white transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center shrink-0">
                  <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="flex-1 text-base font-semibold">Go to Dashboard</span>
                <ChevronRight className="w-4 h-4 text-indigo-500" />
              </Link>
              <button
                onClick={() => { logoutContext(); setIsOpen(false); }}
                className="group w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-white transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                  <LogOut className="w-5 h-5 text-rose-400" />
                </div>
                <span className="flex-1 text-left text-base font-semibold">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
              >
                <UserPlus className="w-5 h-5" />
                Get Started for Free
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-slate-300 border border-white/10 hover:bg-white/5 hover:text-white transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Login to Your Account
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
