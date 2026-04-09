import React from 'react';
import { Target, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-24 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="section-title">The Story Behind PFM AI</h1>
        <p className="section-subtitle">
          Bridging the gap between advanced data science and everyday personal 
          finance to give everyone the tools they need to stay secure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="glass-panel p-2 rounded-2xl">
          <img 
            src="/images/financial_security.png" 
            alt="Team Working" 
            className="rounded-xl w-full h-auto opacity-80"
          />
        </div>
        <div className="space-y-8">
          <div>
             <h3 className="text-3xl font-bold mb-4 text-indigo-400">Our Mission</h3>
             <p className="text-slate-400 leading-relaxed text-lg">
               In an era of digitial subscriptions and micro-transactions, small leaks 
               can lead to significant financial strain over time. Our goal is to empower 
               individuals with the same anomaly detection technology used by major banks.
             </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
             <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-white">99%</span>
                <span className="text-slate-400 font-medium">Detection Accuracy</span>
             </div>
             <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-white">10k+</span>
                <span className="text-slate-400 font-medium">Active Safe Users</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/5">
            <Target className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
            <h4 className="text-xl font-bold mb-4">Focus</h4>
            <p className="text-slate-400 text-sm">We specialize only in personal financial leakage detection to ensure the highest precision.</p>
         </div>
         <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/5">
            <Users className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
            <h4 className="text-xl font-bold mb-4">Values</h4>
            <p className="text-slate-400 text-sm">Privacy, transparency, and user empowerment are at the core of every model we build.</p>
         </div>
         <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/5">
            <BookOpen className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
            <h4 className="text-xl font-bold mb-4">Vision</h4>
            <p className="text-slate-400 text-sm">Becoming the global standard for personal financial monitoring and security.</p>
         </div>
      </div>
    </div>
  );
}
