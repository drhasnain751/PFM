import React, { useEffect, useState } from 'react';
import { getTransactions } from '../../api';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { FileText, Download, Filter, Search } from 'lucide-react';

export default function ReportsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === 'all' || tx.prediction.toLowerCase() === filter.toLowerCase();
    const matchesQuery = tx.category.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const chartData = Object.entries(
    transactions.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#ef4444', '#f59e0b', '#10b981'];

  const downloadCSV = () => {
    if (filteredTransactions.length === 0) return;
    const headers = ['ID', 'Date', 'Category', 'Amount', 'Prediction', 'Risk Score'];
    const rows = filteredTransactions.map(t => [
        t._id,
        new Date(t.date).toLocaleDateString(),
        t.category,
        t.amount,
        t.prediction,
        t.riskScore
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pfm_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Detailed Reports</h1>
          <p className="text-slate-400 text-sm">Advanced analysis of your transaction distributions and risks.</p>
        </div>
        <button 
          onClick={downloadCSV}
          disabled={filteredTransactions.length === 0}
          className="btn-outline flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto shrink-0 group hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
        >
           <Download className="w-5 h-5 group-hover:scale-110 transition-transform" /> Export Data (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 glass-panel p-8">
            <h3 className="text-xl font-bold text-white mb-8">Category Share</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
               {chartData.map((entry, index) => (
                 <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs text-slate-400 truncate">{entry.name}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-2 glass-panel p-8">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-white">Full Audit Trail</h3>
               <div className="flex items-center gap-4">
                  <div className="relative hidden sm:block">
                     <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                     <input 
                       type="text" 
                       className="input-field pl-10 h-10 py-0 text-sm" 
                       placeholder="Search category..." 
                       value={query}
                       onChange={(e) => setQuery(e.target.value)}
                     />
                  </div>
                  <select 
                    className="input-field h-10 py-0 text-sm w-32 [&>option]:bg-slate-900" 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                     <option value="all">All Logs</option>
                     <option value="risky">Risky Only</option>
                     <option value="normal">Safe Only</option>
                  </select>
               </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 text-sm font-medium uppercase tracking-wider">
                    <th className="pb-4 px-4">Type</th>
                    <th className="pb-4 px-4 text-right">Amount</th>
                    <th className="pb-4 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan="3" className="py-20 text-center text-slate-500 italic">No transactions found matching filters.</td>
                    </tr>
                  )}
                  {filteredTransactions.map((tx) => (
                    <tr key={tx._id} className="group hover:bg-white/[0.02]">
                      <td className="py-4 px-4">
                         <p className="text-white font-medium text-sm">#{tx._id.slice(-6)}</p>
                         <p className="text-xs text-slate-500">{tx.category} • {new Date(tx.date).toLocaleDateString()}</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                         <span className="text-white font-bold tracking-tight">${Number(tx.amount).toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                         <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                           tx.prediction === 'Risky' 
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                         }`}>
                           {tx.prediction}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>
      </div>
    </div>
  );
}
