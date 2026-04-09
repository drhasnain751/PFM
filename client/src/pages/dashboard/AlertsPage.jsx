import React, { useEffect, useState } from 'react';
import { getTransactions } from '../../api';
import { AlertTriangle, ShieldCheck, ShieldAlert, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const { data } = await getTransactions();
      setAlerts(data.filter(t => t.prediction === 'Risky'));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Security Alerts</h1>
          <p className="text-slate-400">Immediate attention required for these anomalous transactions.</p>
        </div>
        <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20 shadow-lg shadow-rose-500/20">
           <ShieldAlert className="w-7 h-7" />
        </div>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="glass-panel p-20 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20">
               <ShieldCheck className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">You are Secure</h3>
             <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
               No risky transactions or financial leakage detected by our models. Keep it up!
             </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert._id} className="glass-panel p-6 border-rose-500/10 hover:border-rose-500/30 transition-all group flex flex-col md:flex-row items-start md:items-center gap-6">
               <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 shrink-0 border border-rose-500/20">
                  <AlertTriangle className="w-7 h-7" />
               </div>
               <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                     <h4 className="text-lg font-bold text-white">Anomalous Spending Detected</h4>
                     <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider">High Risk</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Transaction of <span className="text-rose-400 font-bold">${alert.amount.toFixed(2)}</span> in 
                    <span className="text-indigo-400 font-bold ml-1">{alert.category}</span> deviates significantly 
                    from your historical behavior models.
                  </p>
                  <p className="text-[10px] text-slate-600 font-medium">DETECTED ID: {alert._id}</p>
               </div>
               <div className="flex items-center gap-6 md:border-l md:border-white/5 md:pl-8">
                  <div className="text-right">
                     <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Risk Score</p>
                     <p className="text-2xl font-black text-rose-500">{alert.riskScore.toFixed(0)}%</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                     <ChevronRight className="w-6 h-6" />
                  </button>
               </div>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
         <div className="flex-1 glass-panel p-8">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-indigo-400" />
               Security Tips
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
               <li>• Review recurring subscriptions for "Zombie" accounts.</li>
               <li>• Enable 2FA on your primary banking portals.</li>
               <li>• Check for small ($1-$5) unauthorized merchant test charges.</li>
            </ul>
         </div>
         <div className="flex-1 glass-panel p-8 bg-indigo-600/5">
            <h4 className="text-white font-bold mb-4">Need Help?</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              If you don't recognize these transactions, we recommend contacting your financial institution immediately.
            </p>
            <button className="btn-outline w-full text-xs font-bold py-2 border-indigo-500/30 text-indigo-400 flex items-center justify-center gap-1 group">
               Contact Security Team <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
         </div>
      </div>
    </div>
  );
}
