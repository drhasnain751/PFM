import React from 'react';
import { Upload, Cpu, ShieldAlert, FileText, ArrowDown } from 'lucide-react';

const Step = ({ icon: Icon, title, desc, step }) => (
  <div className="flex flex-col md:flex-row gap-12 items-center mb-24 last:mb-0 relative">
    <div className="w-full md:w-1/2 flex justify-center order-2 md:order-none">
       <div className="glass-panel p-12 rounded-[2.5rem] relative group border-indigo-500/20">
          <Icon className="w-24 h-24 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-4 left-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-600/30">
            {step}
          </div>
       </div>
    </div>
    <div className="w-full md:w-1/2 text-center md:text-left">
       <h3 className="text-3xl font-bold mb-6 text-white">{title}</h3>
       <p className="text-slate-400 text-lg leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function HowItWorksPage() {
  return (
    <div className="py-24 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="section-title">The PFM AI Workflow</h1>
        <p className="section-subtitle">A complex engine simplified for your everyday financial protection.</p>
      </div>

      <div className="relative">
         <div className="hidden md:block absolute left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 -translate-x-1/2" />
         
         <Step 
            step="1"
            icon={Upload}
            title="Import Your Transactions"
            desc="Easily upload your bank statement exports in CSV or Excel format. Our platform processes your data securely without storing permanent identifiers."
         />
         
         <Step 
            step="2"
            icon={Cpu}
            title="AI Model Processing"
            desc="Our isolation forest and random forest models learn your unique spending fingerprint. We categorize every dollar and identify historical patterns."
         />
         
         <Step 
            step="3"
            icon={ShieldAlert}
            title="Anomaly Identification"
            desc="Transactions that deviate from your norm—whether by amount, category, or frequency—are instantly flagged by our detection layer."
         />
         
         <Step 
            step="4"
            icon={FileText}
            title="Review & Remediate"
            desc="Access detailed reports of flagged leakage. Take action by canceling ghost subscriptions or adjusting habits to improve your financial safety score."
         />
      </div>

      <div className="mt-24 text-center">
         <ArrowDown className="w-10 h-10 text-indigo-400 mx-auto animate-bounce mb-8" />
         <h3 className="text-2xl font-bold mb-8">Ready to see it in action?</h3>
         <button className="btn-primary py-4 px-12 text-lg mx-auto">Get Started Now</button>
      </div>
    </div>
  );
}
