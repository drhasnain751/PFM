import React, { useState } from 'react';
import { Zap, Lightbulb, TrendingDown, ArrowUpRight, CheckCircle2, X, Check, RefreshCw } from 'lucide-react';

const DEFAULT_INSIGHTS = [
  {
    id: 1,
    title: 'Optimize Subscription Leakage',
    desc: "Our models detected 3 streaming services with no usage in 60 days. Cancelling could save $42.50/mo.",
    impact: 'High',
    icon: Zap,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    impactClass: 'bg-rose-500/20 text-rose-400',
  },
  {
    id: 2,
    title: 'Dining Efficiency',
    desc: "You spend 40% more on Dining than the average user in your income bracket. Try meal prepping 2 more days/week.",
    impact: 'Medium',
    icon: Lightbulb,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    impactClass: 'bg-amber-500/20 text-amber-400',
  },
  {
    id: 3,
    title: 'Emergency Fund Boost',
    desc: "By rounding up your transactions to the nearest dollar, you could reach your milestone 3 months earlier.",
    impact: 'Medium',
    icon: TrendingDown,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    impactClass: 'bg-indigo-500/20 text-indigo-400',
  },
  {
    id: 4,
    title: 'Weekend Spending Spike',
    desc: "Your Saturday/Sunday spending is 2.3× your weekday average. Setting a weekend limit could help.",
    impact: 'Medium',
    icon: Zap,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    impactClass: 'bg-purple-500/20 text-purple-400',
  },
];

export default function InsightsPage() {
  const [recommendations, setRecommendations] = useState(DEFAULT_INSIGHTS);
  const [dismissed, setDismissed] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const dismissInsight = (id) => {
    const item = recommendations.find(r => r.id === id);
    setRecommendations(prev => prev.filter(r => r.id !== id));
    setDismissed(prev => [...prev, item]);
    showToast('Insight dismissed.');
  };

  const applyInsight = (id) => {
    setRecommendations(prev => prev.filter(r => r.id !== id));
    showToast('Great! Insight marked as acted on. ✅');
  };

  const restoreAll = () => {
    setRecommendations(DEFAULT_INSIGHTS);
    setDismissed([]);
    showToast('All insights restored.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-4">
          <Check className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">AI-Driven Insights</h1>
          <p className="text-slate-400">Personalized recommendations from your spending behavior.</p>
        </div>
        {dismissed.length > 0 && (
          <button onClick={restoreAll} className="btn-outline flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" /> Restore All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recommendations.length === 0 ? (
          <div className="glass-panel p-20 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">You're All Caught Up!</h3>
            <p className="text-slate-500 mb-6">You've reviewed all your insights. Great financial discipline!</p>
            {dismissed.length > 0 && (
              <button onClick={restoreAll} className="btn-primary mx-auto">
                <RefreshCw className="w-4 h-4" /> Restore Insights
              </button>
            )}
          </div>
        ) : (
          recommendations.map((item) => (
            <div key={item.id} className="glass-panel p-8 flex flex-col md:flex-row gap-6 group hover:border-indigo-500/20 transition-all relative animate-in slide-in-from-right-4">
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shrink-0 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${item.impactClass}`}>
                    {item.impact} Impact
                  </span>
                </div>

                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>

                <div className="flex items-center gap-4 pt-1">
                  <button
                    onClick={() => applyInsight(item.id)}
                    className="text-sm font-bold text-emerald-400 flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Check className="w-4 h-4" /> Mark as Done
                  </button>
                  <button
                    onClick={() => dismissInsight(item.id)}
                    className="text-sm font-bold text-slate-500 flex items-center gap-1 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-4 h-4" /> Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="glass-panel p-8 bg-indigo-600/5 text-center border-indigo-500/20">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mx-auto mb-4">
          <Lightbulb className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold mb-2">Financial Score: 78/100</h4>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          You're up 12% from last month. Keep following your AI tips to reach your goals faster.
        </p>
      </div>
    </div>
  );
}
