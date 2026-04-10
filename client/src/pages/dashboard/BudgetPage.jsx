import React from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Target, AlertCircle } from 'lucide-react';

export default function BudgetPage() {
  const budgets = [
    { category: 'Food & Dining', limit: 500, spent: 420, color: 'bg-indigo-500' },
    { category: 'Transportation', limit: 200, spent: 180, color: 'bg-purple-500' },
    { category: 'Entertainment', limit: 150, spent: 90, color: 'bg-emerald-500' },
    { category: 'Shopping', limit: 300, spent: 340, color: 'bg-rose-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Budget Management</h1>
          <p className="text-slate-400">Set spending limits and track your utilization by category.</p>
        </div>
        <button className="btn-primary w-fit">
          <Plus className="w-5 h-5" /> Create Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget, i) => {
          const progress = (budget.spent / budget.limit) * 100;
          const isOver = budget.spent > budget.limit;

          return (
            <div key={i} className="glass-panel p-6 border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${budget.color}/10 flex items-center justify-center text-indigo-400`}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{budget.category}</h3>
                    <p className="text-xs text-slate-500">Monthly Limit: ${budget.limit}</p>
                  </div>
                </div>
                {isOver && <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Spent: ${budget.spent}</span>
                  <span className={isOver ? 'text-rose-400' : 'text-slate-400'}>{progress.toFixed(0)}%</span>
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
                  {isOver ? 'Limit Exceeded' : `${Math.max(0, budget.limit - budget.spent)} Remaining`}
                </p>
                <button className="text-xs font-bold text-indigo-400 hover:text-white transition-colors">Adjust Limit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
