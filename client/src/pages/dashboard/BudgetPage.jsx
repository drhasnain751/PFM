import React, { useState } from 'react';
import { Wallet, Plus, AlertCircle, X, Check } from 'lucide-react';

const COLORS = ['bg-indigo-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];

export default function BudgetPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ category: '', limit: '' });
  const [budgets, setBudgets] = useState([
    { category: 'Food & Dining', limit: 500, spent: 420, color: 'bg-indigo-500' },
    { category: 'Transportation', limit: 200, spent: 180, color: 'bg-purple-500' },
    { category: 'Entertainment', limit: 150, spent: 90, color: 'bg-emerald-500' },
    { category: 'Shopping', limit: 300, spent: 340, color: 'bg-rose-500' },
  ]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    setEditingIndex(null);
    setForm({ category: '', limit: '' });
    setIsModalOpen(true);
  };

  const openEdit = (i) => {
    setEditingIndex(i);
    setForm({ category: budgets[i].category, limit: budgets[i].limit });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!form.category.trim() || !form.limit) return;
    if (editingIndex !== null) {
      setBudgets(prev => prev.map((b, i) =>
        i === editingIndex ? { ...b, category: form.category, limit: Number(form.limit) } : b
      ));
      showToast('Budget updated!');
    } else {
      const color = COLORS[budgets.length % COLORS.length];
      setBudgets(prev => [...prev, { category: form.category, limit: Number(form.limit), spent: 0, color }]);
      showToast('Budget created!');
    }
    setIsModalOpen(false);
    setForm({ category: '', limit: '' });
  };

  const handleDelete = (i) => {
    setBudgets(prev => prev.filter((_, idx) => idx !== i));
    showToast('Budget removed.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-4">
          <Check className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Budget Management</h1>
          <p className="text-slate-400">Set spending limits and track your utilization by category.</p>
        </div>
        <button onClick={openCreate} className="btn-primary w-fit">
          <Plus className="w-5 h-5" /> Create Budget
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass-panel w-full max-w-md p-8 relative border-white/10 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-6">{editingIndex !== null ? 'Edit Budget' : 'Create New Budget'}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Category Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Travel"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-2">Monthly Limit ($)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="1000"
                  value={form.limit}
                  onChange={e => setForm(f => ({ ...f, limit: e.target.value }))}
                />
              </div>
              <button onClick={handleSubmit} className="btn-primary w-full mt-4" disabled={!form.category || !form.limit}>
                {editingIndex !== null ? 'Save Changes' : 'Add Budget'}
              </button>
            </div>
          </div>
        </div>
      )}

      {budgets.length === 0 && (
        <div className="glass-panel p-20 text-center">
          <Wallet className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-400">No budgets yet</h3>
          <p className="text-slate-500 text-sm mt-1">Click "Create Budget" to get started.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget, i) => {
          const progress = (budget.spent / budget.limit) * 100;
          const isOver = budget.spent > budget.limit;
          return (
            <div key={i} className="glass-panel p-6 border-white/5 hover:border-indigo-500/30 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${budget.color}/20 flex items-center justify-center text-indigo-400`}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{budget.category}</h3>
                    <p className="text-xs text-slate-500">Monthly Limit: ${budget.limit.toLocaleString()}</p>
                  </div>
                </div>
                {isOver && <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Spent: ${budget.spent}</span>
                  <span className={isOver ? 'text-rose-400' : 'text-slate-400'}>{Math.min(progress, 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${isOver ? 'bg-rose-500' : budget.color}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                  {isOver ? 'Limit Exceeded' : `$${Math.max(0, budget.limit - budget.spent)} Remaining`}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => openEdit(i)} className="text-xs font-bold text-indigo-400 hover:text-white transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(i)} className="text-xs font-bold text-rose-400 hover:text-white transition-colors">
                    Delete
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
