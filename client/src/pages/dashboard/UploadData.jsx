import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Shield, ArrowRight } from 'lucide-react';

export default function UploadData() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setFile(null);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Import Your Financial Data</h1>
        <p className="text-slate-400">Upload CSV or Excel statements to begin anomaly detection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-10 border-dashed border-2 border-slate-700 hover:border-indigo-500/50 transition-all group relative overflow-hidden text-center">
             <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             
             <input 
               type="file" 
               className="absolute inset-0 opacity-0 cursor-pointer z-10" 
               accept=".csv,.xlsx"
               onChange={(e) => setFile(e.target.files[0])}
             />

             {!file ? (
               <div className="space-y-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-500 border border-white/5">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Drag & Drop or Browse</h3>
                  <p className="text-slate-500 text-sm">Supports CSV, XLSX up to 10MB.</p>
               </div>
             ) : (
               <div className="space-y-6 animate-in zoom-in duration-300">
                  <div className="flex items-center justify-center gap-4 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 max-w-sm mx-auto">
                     <FileText className="w-8 h-8 text-indigo-400" />
                     <div className="text-left">
                        <p className="text-sm font-bold text-white truncate max-w-[150px]">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                     </div>
                     <button onClick={() => setFile(null)} className="ml-auto text-slate-400 hover:text-white relative z-20">
                        <X className="w-5 h-5" />
                     </button>
                  </div>
                  <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    className="btn-primary px-12 py-3 mx-auto relative z-20"
                  >
                    {uploading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      'Initialize AI Analysis'
                    )}
                  </button>
               </div>
             )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="p-4 bg-slate-800/20 border border-white/5 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                   <p className="text-sm font-bold text-white mb-1">Encrypted Transit</p>
                   <p className="text-xs text-slate-500">Data is encrypted using SSL/TLS during the entire process.</p>
                </div>
             </div>
             <div className="p-4 bg-slate-800/20 border border-white/5 rounded-xl flex items-start gap-3">
                <Shield className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                   <p className="text-sm font-bold text-white mb-1">Privacy Compliant</p>
                   <p className="text-xs text-slate-500">We do not store PII or account numbers permanently.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-6 bg-indigo-600/10 border-indigo-500/20">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-400" />
                Best Practices
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                 <li className="flex gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    Ensure the Date, Amount, and Category columns are present.
                 </li>
                 <li className="flex gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    Export your statement from your banking portal directly.
                 </li>
                 <li className="flex gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    Maximum file length is limited to 1,000 transactions.
                 </li>
              </ul>
           </div>

           {success && (
              <div className="glass-panel p-6 bg-emerald-500/10 border-emerald-500/20 animate-in slide-in-from-right duration-500">
                <h4 className="text-lg font-bold text-emerald-400 mb-2">Success!</h4>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                   Your statement was processed and AI models were successfully trained on your new data.
                </p>
                <Link to="/dashboard" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-sm underline group">
                   View Dashboard Results <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button onClick={() => setSuccess(false)} className="mt-6 text-xs text-slate-500 hover:text-white uppercase tracking-widest font-bold">Close Notification</button>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
