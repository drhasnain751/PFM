import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutContext } = useContext(AuthContext);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                PFM AI
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="nav-link text-sm">
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="btn-outline text-sm py-2 px-4">Dashboard</Link>
                  <button onClick={logoutContext} className="btn-outline text-sm py-2 px-4">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link text-sm">Login</Link>
                  <Link to="/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(v => !v)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay — rendered OUTSIDE nav so it fills the full screen */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[55] md:hidden"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-16 left-0 right-0 bottom-0 z-[60] md:hidden
          bg-slate-900 border-t border-white/5
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="h-full overflow-y-auto flex flex-col">
          {/* Nav Links */}
          <div className="flex-1 px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-4 text-base font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="px-4 py-6 border-t border-white/10 space-y-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => { logoutContext(); setIsOpen(false); }}
                  className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-rose-400 border border-rose-400/20 hover:bg-rose-400/10 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                >
                  Get Started for Free
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl font-semibold text-slate-300 border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
