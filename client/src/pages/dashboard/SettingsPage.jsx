import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { updateProfile, changePassword } from '../../api';
import { User, Mail, Shield, Save, Moon, Sun, Bell, Lock, CheckCircle2, Settings, Upload, Image as ImageIcon, X } from 'lucide-react';

export default function SettingsPage() {
  const { user, updateUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ 
    name: user?.name || '', 
    email: user?.email || '',
    darkMode: theme === 'dark',
    notifications: user?.preferences?.notifications ?? true 
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const PRESET_AVATARS = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Mason',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Willow'
  ];

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

  const handleAvatarSelect = async (url) => {
    setLoading(true);
    try {
        const { data } = await updateProfile({ avatarUrl: url });
        updateUser(data);
        setShowAvatarPicker(false);
    } catch (err) {
        setError('Avatar update failed');
    } finally {
        setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    setLoading(true);
    try {
        const { data } = await updateProfile(formData);
        updateUser(data);
        setShowAvatarPicker(false);
    } catch (err) {
        setError('Upload failed');
    } finally {
        setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
        setError('Passwords do not match');
        return;
    }
    setLoading(true);
    try {
        await changePassword({ 
            currentPassword: passwords.current, 
            newPassword: passwords.new 
        });
        setSuccess('Password changed!');
        setShowPasswordModal(false);
        setPasswords({ current: '', new: '', confirm: '' });
        setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
        setError(err.response?.data?.message || 'Password update failed');
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
              <div className="w-24 h-24 rounded-full border-2 border-indigo-600/30 flex items-center justify-center text-indigo-400 mx-auto mb-6 overflow-hidden relative group">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12" />
                  )}
                  <div 
                    onClick={() => setShowAvatarPicker(true)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Upload className="w-6 h-6 text-white" />
                  </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{user?.name || 'User'}</h3>
              <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest font-black">PFM AI Pro</p>
              <button 
                onClick={() => setShowAvatarPicker(true)}
                className="btn-outline w-full py-2 text-xs"
              >
                Update Avatar
              </button>
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

                 <div 
                   onClick={() => setShowPasswordModal(true)}
                   className="flex items-center justify-between p-4 bg-rose-500/5 rounded-xl border border-rose-500/10 group cursor-pointer hover:bg-rose-500/10 transition-colors"
                 >
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                          <Lock className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-bold group-hover:text-rose-500 transition-colors">Change Password</p>
                          <p className="text-xs text-slate-500">Secure your account with a new password</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowAvatarPicker(false)} />
            <div className="glass-panel p-8 w-full max-w-md relative animate-in zoom-in duration-300">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">Select Avatar</h3>
                    <button onClick={() => setShowAvatarPicker(false)} className="text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {PRESET_AVATARS.map((url, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleAvatarSelect(url)}
                          className="w-full aspect-square rounded-2xl border-2 border-transparent hover:border-indigo-500 cursor-pointer overflow-hidden transition-all bg-indigo-500/5"
                        >
                            <img src={url} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-[rgb(var(--border-color))]">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full btn-outline flex items-center gap-2 justify-center"
                    >
                        <ImageIcon className="w-5 h-5" />
                        Upload Custom Image
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                </div>
            </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowPasswordModal(false)} />
            <div className="glass-panel p-8 w-full max-w-md relative animate-in zoom-in duration-300">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">Change Password</h3>
                    <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                        <input 
                          type="password" 
                          required
                          className="input-field"
                          value={passwords.current}
                          onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                        <input 
                          type="password" 
                          required
                          className="input-field"
                          value={passwords.new}
                          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Confirm New Password</label>
                        <input 
                          type="password" 
                          required
                          className="input-field"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}
