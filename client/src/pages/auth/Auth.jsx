import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login, register } from '../../api';
import { Mail, Lock, LogIn, UserPlus, User, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = isLogin 
        ? await login({ email: form.email, password: form.password }) 
        : await register(form);
      loginContext(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      {/* Left side: Content & Branding */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 relative z-10">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl group">
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
           <span>PFM AI</span>
        </Link>
        <div className="max-w-md">
           <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-indigo-600/40">
              <ShieldCheck className="w-10 h-10 text-white" />
           </div>
           <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
             Secure Your <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
               Financial Future
             </span>
           </h2>
           <p className="text-slate-400 text-lg leading-relaxed">
             Join the thousands using PFM AI to identify hidden costs, 
             subscriptions, and anomalies in their transaction history.
           </p>
        </div>
        <div className="flex gap-8 text-sm text-slate-500">
           <span>&copy; PFM AI</span>
           <a href="#" className="hover:text-white">Privacy</a>
           <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 relative z-10">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
          <div className="glass-panel p-10 md:p-12">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="text-slate-400">
                {isLogin 
                  ? 'Access your financial safety metrics.' 
                  : 'Start your journey to financial clarity.'}
              </p>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/50 text-rose-300 px-4 py-3 rounded-lg mb-8 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="text"
                      required
                      className="input-field pl-11"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="email"
                    required
                    className="input-field pl-11"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  {isLogin && <a href="#" className="text-xs text-indigo-400 hover:underline">Forgot?</a>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="password"
                    required
                    className="input-field pl-11"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="btn-primary w-full py-4 mt-4 relative overflow-hidden"
              >
                {loading ? (
                   <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                   </div>
                ) : (
                   <span className="flex items-center gap-2">
                      {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                      {isLogin ? 'Sign In' : 'Join Now'}
                   </span>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); }}
                  className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
