import React, { useState } from 'react';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit
    setSent(true);
  };

  return (
    <div className="py-24 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="section-title">Get in Touch</h1>
        <p className="section-subtitle">We would love to hear from you. Our team typically responds within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0">
               <Mail className="w-7 h-7" />
            </div>
            <div>
               <h4 className="text-xl font-bold mb-2">Email Us</h4>
               <p className="text-slate-400">Send us your queries anytime!</p>
               <p className="text-indigo-400 font-medium">support@pfm-ai.example</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-400 shrink-0">
               <Phone className="w-7 h-7" />
            </div>
            <div>
               <h4 className="text-xl font-bold mb-2">Call Us</h4>
               <p className="text-slate-400">Monday to Friday, 9am to 6pm PST</p>
               <p className="text-indigo-400 font-medium">+1 (555) 000-0000</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0">
               <MapPin className="w-7 h-7" />
            </div>
            <div>
               <h4 className="text-xl font-bold mb-2">Our Office</h4>
               <p className="text-slate-400">123 FinTech Plaza</p>
               <p className="text-indigo-400 font-medium">San Francisco, CA 94103</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
               <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white mb-6">
                 <Send className="w-10 h-10" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
               <p className="text-slate-400">Thank you for reaching out. Our team will contact you shortly.</p>
               <button onClick={() => setSent(false)} className="mt-8 btn-outline">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="input-field" 
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="input-field" 
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Message</label>
                <textarea 
                  required 
                  rows="6" 
                  className="input-field resize-none no-scrollbar" 
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4 uppercase tracking-widest font-bold">
                 Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
