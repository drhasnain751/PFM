import React from 'react';
import { CheckCircle2, Shield, BarChart2, PieChart, Activity, Zap } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      title: 'Real-time Anomaly Detection',
      desc: 'Our machine learning models analyze every transaction against your historical patterns to flag any suspicious spikes or recurring leakage.',
      icon: Zap,
    },
    {
      title: 'Subscription Identification',
      desc: 'Automatically identify and track dormant or unwanted subscriptions that are silently draining your account each month.',
      icon: Activity,
    },
    {
      title: 'Secure Data Encryption',
      desc: 'Enterprise-grade encryption ensures that your sensitive financial records are protected and remain private at all times.',
      icon: Shield,
    },
    {
      title: 'Visual Trend Analytics',
      desc: 'Beautiful, interactive charts let you visualize your spending categories and monitor your financial health indicators.',
      icon: BarChart2,
    },
    {
      title: 'Custom Risk Scoring',
      desc: 'Get a comprehensive Risk Score for your finances, updated instantly as new transaction data flows into your account.',
      icon: PieChart,
    },
    {
       title: 'Smart Export & Reporting',
       desc: 'Download detailed PDF or CSV reports of your flagged transactions and overall performance analytics for your records.',
       icon: CheckCircle2,
    }
  ];

  return (
    <div className="py-24 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-700">
        <h1 className="section-title">Powerful Features, Simply Delivered</h1>
        <p className="section-subtitle">
          PFM AI provides state-of-the-art tools previously only available to financial 
          institutions, now designed for your personal use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="glass-card p-10 group hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 transition-all duration-300">
              <feature.icon className="w-8 h-8 text-indigo-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
