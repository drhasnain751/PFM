import React, { useState } from 'react';
import { Target, Plus, TrendingUp, Calendar, Trophy, X, Check, Trash2 } from 'lucide-react';

const ICONS = [Trophy, TrendingUp, Calendar, Target];
const COLORS = [
  { text: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { text: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { text: 'text-purple-400', bg: 'bg-purple-400/10' },
  { text: 'text-amber-400', bg: 'bg-amber-400/10' },
];

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', target: '', current: '', date: '' });
  const [toast, setToast] = useState(null);
  const [goals, setGoals] = useState([
    { title: 'Emergency Fund', target: 5000, current: 1250, date: 'Dec 2024', iconIdx: 0, colorIdx: 0 },
    { title: 'New Laptop', target: 2500, current: 2100, date: 'Aug 2024', iconIdx: 1, colorIdx: 1 },
    { title: 'Vacation Fund', target: 3000, current: 450, date: 'Jun 2025', iconIdx: 2, colorIdx: 2 },
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    setForm({ title: '', target: '', current: '', date: '' });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    if (!form.title.trim() || !form.target) return;
    const colorIdx = goals.length % COLORS.length;
    const iconIdx = goals.length % ICONS.length;
    setGoals(prev => [...prev, {
      title: form.title,
      target: Number(form.target),
      current: Number(form.current) || 0,
      date: form.date || 'TBD',
      iconIdx,
      colorIdx,
    }]);
    setIsModalOpen(false);
    setForm({ title: '', target: '', current: '', date: '' });
    showToast('Goal added!');
  };

  const handleDelete = (i) => {
    setGoals(prev => prev.filter((_, idx) => idx !== i));
    showToast('Goal removed.');
  };

  const handleDeposit = (i, amount) => {
    setGoals(prev => prev.map((g, idx) =>
      idx === i ? { ...g, current: Math.min(g.current + Number(amount), g.target) } : g
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-4">
          <Check className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Savings Goals</h1>
          <p className="text-slate-400">Track milestones for your long-term financial objectives.</p>
        </div>
        <button onClick={openCreate} className="btn-primary w-fit">
          <Plus className="w-5 h-5" /> New Goal
        </button>
      </div>

      {/* Create Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass-panel w-full max-w-md p-8 relative border-white/10 shadow-2xl text-left">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-6">Set New Savings Goal</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Goal Name</label>
                <input type="text" className="input-field" placeholder="e.g. Dream House" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Target Amount ($)</label>
                  <input type="number" className="input-field" placeholder="10000" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Already Saved ($)</label>
                  <input type="number" className="input-field" placeholder="0" value={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-2">Target Date</label>
                <input type="text" className="input-field" placeholder="e.g. Dec 2025" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <button onClick={handleAdd} className="btn-primary w-full mt-4" disabled={!form.title || !form.target}>
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {goals.length === 0 && (
        <div className="glass-panel p-20 text-center">
          <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-400">No goals yet</h3>
          <p className="text-slate-500 text-sm mt-1">Click "New Goal" to start saving for something.</p>
        </div>
      )}

      <div className="space-y-6">
        {goals.map((goal, i) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const GoalIcon = ICONS[goal.iconIdx];
          const color = COLORS[goal.colorIdx];

          return (
            <div key={i} className="glass-panel p-8 group hover:border-indigo-500/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className={`w-16 h-16 rounded-2xl ${color.bg} flex items-center justify-center ${color.text} border border-white/5 shrink-0`}>
                  <GoalIcon className="w-8 h-8" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                      <p className="text-xs text-slate-500">Target Date: {goal.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-indigo-400">{progress.toFixed(0)}%</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Progress</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>${goal.current.toLocaleString()} saved</span>
                      <span>Goal: ${goal.target.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="md:border-l border-white/5 md:pl-8 flex flex-row md:flex-col items-center gap-3">
                  <AddFundsButton onAdd={(amt) => { handleDeposit(i, amt); showToast(`+$${amt} added!`); }} />
                  <button
                    onClick={() => handleDelete(i)}
                    className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                    title="Delete goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddFundsButton({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [amt, setAmt] = useState('');

  const submit = () => {
    if (!amt || isNaN(amt) || Number(amt) <= 0) return;
    onAdd(amt);
    setAmt('');
    setOpen(false);
  };

  if (open) {
    return (
      <div className="flex items-center gap-1">
        <input
          type="number"
          autoFocus
          className="w-20 h-10 bg-slate-800 border border-indigo-500/40 rounded-lg px-2 text-sm text-white"
          placeholder="$50"
          value={amt}
          onChange={e => setAmt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') setOpen(false); }}
        />
        <button onClick={submit} className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition-all">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={() => setOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
      title="Add funds"
    >
      <Plus className="w-5 h-5" />
    </button>
  );
}
