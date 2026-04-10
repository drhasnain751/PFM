import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { updateProfile } from '../../api';
import { User, Mail, Shield, Save, Moon, Sun, Bell, CheckCircle2, Settings } from 'lucide-react';

export default function SettingsPage() {
  const { user, updateUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [form, setForm] = useState({ 
    name: user?.name || '', 
    email: user?.email || '',
    darkMode: theme === 'dark',
    notifications: user?.preferences?.notifications ?? true 
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await updateProfile({ 
        name: form.name,
        preferences: { notifications: form.notifications }
      });
      updateUser(data);
      setSuccess('Profile updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Settings & Profile</h1>
        <p className="text-slate-400">Manage your account preferences and security configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="glass-panel p-8 text-center bg-indigo-500/5">
              <div className="w-24 h-24 rounded-full border-2 border-indigo-600/30 flex items-center justify-center text-indigo-400 mx-auto mb-6 overflow-hidden relative">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12" />
                  )}
              </div>
              <h3 className="text-xl font-bold mb-1">{user?.name || 'User'}</h3>
              <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest font-black">PFM AI Pro</p>
           </div>

           {/* Stats section same as before but themed */}
           <div className="glass-panel p-6 space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Account Stats</h4>
              <div className="flex justify-between items-center py-2 border-b border-[rgb(var(--border-color))]">
                 <span className="text-xs text-slate-500">Member Since</span>
                 <span className="text-xs font-bold">Apr 2024</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[rgb(var(--border-color))]">
                 <span className="text-xs text-slate-500">Status</span>
                 <span className="text-xs text-emerald-500 font-bold">Verified</span>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           {success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-sm font-bold animate-in zoom-in">
                 {success}
              </div>
           )}
           {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm font-bold animate-in zoom-in">
                 {error}
              </div>
           )}

           <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                 <Shield className="w-6 h-6 text-indigo-500" />
                 Personal Information
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                       <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            className="input-field pl-10" 
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                       <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input 
                            type="email" 
                            className="input-field pl-10 opacity-60" 
                            value={form.email}
                            readOnly
                          />
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-[rgb(var(--border-color))] flex items-center justify-between">
                    <p className="text-xs text-slate-500">Update your public display name.</p>
                    <button type="submit" disabled={loading} className="btn-primary py-2 px-8 text-sm">
                       {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                       Save Changes
                    </button>
                 </div>
              </form>
           </div>

           <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                 <Settings className="w-6 h-6 text-indigo-500" />
                 Preferences
              </h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-indigo-500/5 rounded-xl border border-[rgb(var(--border-color))]">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                       </div>
                       <div>
                          <p className="font-bold">Dark Mode</p>
                          <p className="text-xs text-slate-500">Toggle interface theme</p>
                       </div>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className={`w-12 h-6 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'right-1' : 'left-1'}`} />
                    </button>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-indigo-500/5 rounded-xl border border-[rgb(var(--border-color))]">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                          <Bell className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-bold">Push Notifications</p>
                          <p className="text-xs text-slate-500">Alerts for high risk transactions</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setForm(f => ({...f, notifications: !f.notifications}))}
                      className={`w-12 h-6 rounded-full relative transition-colors ${form.notifications ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.notifications ? 'right-1' : 'left-1'}`} />
                    </button>
                 </div>

               </div>
            </div>
         </div>
      </div>

    </div>
  );
}
