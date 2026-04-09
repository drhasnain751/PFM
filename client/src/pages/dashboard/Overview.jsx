import React, { useEffect, useState, useContext } from 'react';
import { getTransactions } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { 
  Plus, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  CreditCard, 
  PieChart as PieIcon,
  ArrowRight
} from 'lucide-react';
import TransactionModal from '../../components/TransactionModal';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Link } from 'react-router-dom';

export default function Overview() {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Compute stats
  const totalSpending = transactions.reduce((acc, cur) => acc + Number(cur.amount), 0);
  const monthlySpending = transactions
    .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc, cur) => acc + Number(cur.amount), 0);
  const riskyTransactions = transactions.filter(t => t.prediction === 'Risky');
  const avgRiskScore = riskyTransactions.length > 0 
    ? riskyTransactions.reduce((acc, cur) => acc + cur.riskScore, 0) / transactions.length
    : 0;

  const chartData = Object.entries(
    transactions.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
      return acc;
    }, {})
  ).map(([name, amount]) => ({ name, amount }));

  // Trend data (simple group by date)
  const trendData = Object.entries(
    transactions.reduce((acc, tx) => {
      const date = new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      acc[date] = (acc[date] || 0) + Number(tx.amount);
      return acc;
    }, {})
  ).map(([date, amount]) => ({ date, amount })).reverse().slice(-7);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 animate-pulse">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-slate-400">Here's an overview of your financial health today.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary w-fit shadow-indigo-600/30"
        >
          <Plus className="w-5 h-5" /> Add Transaction
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Spending', value: `$${totalSpending.toFixed(2)}`, icon: CreditCard, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { label: 'Monthly Spending', value: `$${monthlySpending.toFixed(2)}`, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { label: 'Leakage Risk Score', value: `${avgRiskScore.toFixed(1)}%`, icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-400/10' },
          { label: 'Spending Groups', value: `${chartData.length}`, icon: PieIcon, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6">
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
               <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Spending Trend */}
        <div className="lg:col-span-2 glass-panel p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Daily Spending Trend</h3>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-400">Last 7 Days</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#6366f1" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="glass-panel p-8">
          <h3 className="text-xl font-bold text-white mb-8">Spending by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                <Tooltip 
                   cursor={{fill: 'rgba(255,255,255,0.05)'}}
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="amount" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions list */}
        <div className="lg:col-span-2 glass-panel p-8">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold text-white">Recent Activity</h3>
             <Link to="/dashboard/reports" className="text-indigo-400 hover:text-indigo-300 text-sm font-bold flex items-center gap-1">
               View All <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-sm">
                  <th className="pb-4 font-medium px-4">Description</th>
                  <th className="pb-4 font-medium px-4">Category</th>
                  <th className="pb-4 font-medium px-4">Date</th>
                  <th className="pb-4 font-medium px-4">Amount</th>
                  <th className="pb-4 font-medium px-4">ML Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.slice(0, 5).map((tx) => (
                  <tr key={tx._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-white font-medium">Transaction #{tx._id.slice(-4)}</td>
                    <td className="py-4 px-4">
                       <span className="px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                          {tx.category}
                       </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-sm">
                       {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-white font-bold">
                       ${Number(tx.amount).toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                        {tx.prediction === 'Risky' ? (
                          <div className="flex items-center gap-1.5 text-rose-400 bg-rose-400/10 w-fit px-3 py-1 rounded-full border border-rose-400/20 text-[10px] uppercase font-heavy tracking-wider">
                            <AlertTriangle className="w-3 h-3" /> Risky
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 w-fit px-3 py-1 rounded-full border border-emerald-400/20 text-[10px] uppercase font-heavy tracking-wider">
                            <ShieldCheck className="w-3 h-3" /> Normal
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts Preview */}
        <div className="glass-panel p-8 bg-gradient-to-br from-slate-900 to-indigo-900/10 border-indigo-500/10">
           <div className="flex items-center gap-2 mb-8">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
              <h3 className="text-xl font-bold text-white">Leakage Alerts</h3>
           </div>
           
           <div className="space-y-4">
              {riskyTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                   <ShieldCheck className="w-12 h-12 text-emerald-500/20 mb-4" />
                   <p className="text-slate-500 text-sm text-center italic">No financial leakage detected in recent transactions.</p>
                </div>
              ) : (
                riskyTransactions.slice(0, 3).map((alert) => (
                  <div key={alert._id} className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-start gap-3">
                     <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-white mb-1">High Risk Detected</p>
                        <p className="text-xs text-rose-300 opacity-60">
                           {alert.category} spike of ${alert.amount.toFixed(2)} flagged as anomalous.
                        </p>
                     </div>
                  </div>
                ))
              )}

              {riskyTransactions.length > 3 && (
                 <Link to="/dashboard/alerts" className="block text-center text-xs text-slate-500 hover:text-white pt-2 font-medium">
                   View {riskyTransactions.length - 3} more alerts...
                 </Link>
              )}
           </div>
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTransactionAdded={fetchTransactions} 
      />
    </div>
  );
}
