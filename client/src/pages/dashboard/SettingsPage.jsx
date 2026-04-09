import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile } from '../../api';
import { User, Mail, Shield, Save, Moon, Bell, Lock, CheckCircle2, Settings } from 'lucide-react';

export default function SettingsPage() {
  const { user, updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({ 
    name: user?.name || '', 
    email: user?.email || '',
    darkMode: true,
    notifications: true 
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await updateProfile({ name: form.name });
      updateUser(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
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
           <div className="glass-panel p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-indigo-400 mx-auto mb-6">
                 <User className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{user?.name || 'User'}</h3>
              <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest font-black">PFM Plus Member</p>
              <button className="btn-outline w-full py-2 text-xs">Update Avatar</button>
           </div>
           
           <div className="glass-panel p-6 space-y-4">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Account Stats</h4>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                 <span className="text-xs text-slate-500">Member Since</span>
                 <span className="text-xs text-white">Apr 2024</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                 <span className="text-xs text-slate-500">Status</span>
                 <span className="text-xs text-emerald-400 font-bold">Verified</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                 <span className="text-xs text-slate-500">ML Model Version</span>
                 <span className="text-xs text-indigo-400">v2.4.0 (Stable)</span>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <div className="glass-panel p-8">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                 <Shield className="w-6 h-6 text-indigo-400" />
                 Personal Information
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                       <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
                          <input 
                            type="text" 
                            className="input-field pl-10" 
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                       <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
                          <input 
                            type="email" 
                            className="input-field pl-10" 
                            value={form.email}
                            readOnly
                          />
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-slate-500">Update your public display name.</p>
                    <button type="submit" className="btn-primary py-2 px-8 text-sm">
                       {success ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-4 h-4" />}
                       {success ? 'Saved' : 'Save Changes'}
                    </button>
                 </div>
              </form>
           </div>

           <div className="glass-panel p-8">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                 <Settings className="w-6 h-6 text-indigo-400" />
                 Preferences
              </h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-slate-800/20 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <Moon className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-bold text-white">Dark Mode</p>
                          <p className="text-xs text-slate-500">Toggle dark/light interface theme</p>
                       </div>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-slate-800/20 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <Bell className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-bold text-white">Push Notifications</p>
                          <p className="text-xs text-slate-500">Get alerts for high risk transactions</p>
                       </div>
                    </div>
                    <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                       <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full transition-all" />
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-slate-800/20 rounded-xl border border-white/5 group bg-rose-500/[0.02] border-rose-500/10 cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                          <Lock className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-bold text-white group-hover:text-rose-400 transition-colors">Change Password</p>
                          <p className="text-xs text-slate-500">Secure your account with a new password</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
