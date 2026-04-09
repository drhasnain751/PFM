import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, BarChart3, ArrowRight, CheckCircle2, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 px-8">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom duration-700">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Financial Security</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
            Detect Financial Leakage <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-purple-400">
              Before It Drains Your Money
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            Identify hidden subscriptions, unusual spending patterns, and anomalous transactions with 
            enterprise-grade machine learning models designed for personal finance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <Link to="/signup" className="btn-primary py-4 px-10 text-lg">
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/how-it-works" className="btn-outline py-4 px-10 text-lg">
              <Play className="w-5 h-5 fill-current" /> See How It Works
            </Link>
          </div>

          <div className="mt-20 w-full max-w-5xl glass-panel p-2 rounded-[2rem] shadow-2xl animate-in zoom-in duration-1000 delay-500">
             <div className="bg-slate-900 rounded-[1.8rem] overflow-hidden border border-white/5">
                <img 
                  src="/images/dashboard_mockup.png" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto opacity-80"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 max-w-7xl mx-auto w-full">
        <h2 className="section-title">Everything You Need to Secure Your Wealth</h2>
        <p className="section-subtitle">
          Our platform combines cutting-edge AI with intuitive design to give you 
          full control over your financial health.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 group">
            <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <Shield className="w-8 h-8 text-indigo-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-4">AI Anomaly Detection</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our models learn your spending habits and instantly flag unusual transactions 
              that could indicate leakage or fraud.
            </p>
          </div>

          <div className="glass-card p-8 group">
            <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-purple-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-4">Smart Insights</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Visual dashboards give you a clear overview of your spending trends 
              and category distributions in real-time.
            </p>
          </div>

          <div className="glass-card p-8 group">
            <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <Lock className="w-8 h-8 text-emerald-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-4">Privacy First</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your financial data is encrypted and remains strictly private. 
              We never sell your data to third parties.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-800/30 py-24 px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">How It Works in 4 Steps</h2>
          <p className="section-subtitle">Experience the power of financial clarity in minutes.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0" />
            
            {[
              { step: '01', title: 'Upload', desc: 'Securely upload your transaction history.' },
              { step: '02', title: 'Analyze', desc: 'Our AI engine processes your data patterns.' },
              { step: '03', title: 'Detect', desc: 'Leakage and unusual spikes are flagged.' },
              { step: '04', title: 'Report', desc: 'Receive a detailed risk assessment report.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mb-6">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 max-w-5xl mx-auto w-full">
        <div className="glass-panel p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-600/10 to-purple-600/10 -z-10" />
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Stop Financial Leakage?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of users who are identifying hidden costs and securing their 
            financial futures today with PFM AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary py-4 px-12 text-lg">
              Start Free Trial
            </Link>
            <Link to="/contact" className="btn-outline py-4 px-12 text-lg">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
