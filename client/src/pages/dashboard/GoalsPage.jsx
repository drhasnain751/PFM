import React, { useState } from 'react';
import { Target, Plus, TrendingUp, Calendar, Trophy, ChevronRight, X } from 'lucide-react';

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([
    { title: 'Emergency Fund', target: 5000, current: 1250, date: 'Dec 2024', icon: Trophy, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { title: 'New Laptop', target: 2500, current: 2100, date: 'Aug 2024', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { title: 'Vacation', target: 3000, current: 450, date: 'Jun 2025', icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Savings Goals</h1>
          <p className="text-slate-400">Track milestones for your long-term financial objectives.</p>
        </div>
        <button 
           onClick={() => setIsModalOpen(true)}
           className="btn-primary w-fit hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" /> New Goal
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass-panel w-full max-w-md p-8 relative border-white/10 shadow-2xl text-left">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-6">Set New Savings Goal</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Goal Name</label>
                <input type="text" className="input-field" placeholder="e.g. Dream House" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-sm text-slate-400 block mb-2">Target Amount ($)</label>
                   <input type="number" className="input-field" placeholder="10000" />
                </div>
                <div>
                   <label className="text-sm text-slate-400 block mb-2">Target Date</label>
                   <input type="text" className="input-field" placeholder="Dec 2025" />
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="btn-primary w-full mt-4"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {goals.map((goal, i) => {
          const progress = (goal.current / goal.target) * 100;

          return (
            <div key={i} className="glass-panel p-8 group hover:border-indigo-500/30 transition-all cursor-default">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className={`w-16 h-16 rounded-2xl ${goal.bg} flex items-center justify-center ${goal.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                   <goal.icon className="w-8 h-8" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{goal.title}</h3>
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

                <div className="md:border-l border-white/5 md:pl-8 flex items-center justify-center">
                   <button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-xl"
                   >
                      <Plus className="w-6 h-6" />
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
