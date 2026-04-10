import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Shield, ArrowRight, Download, BarChart3, TrendingUp } from 'lucide-react';
import { uploadTransactions } from '../../api';
import { Link } from 'react-router-dom';

export default function UploadData() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await uploadTransactions(formData);
      setAnalysisResults(data.transactions);
      setSuccess(true);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Ensure file is a valid CSV.');
    } finally {
      setUploading(false);
    }
  };

  const downloadSummary = () => {
    if (!analysisResults) return;
    const headers = ['Date', 'Category', 'Amount', 'Prediction', 'Risk Score'];
    const rows = analysisResults.map(t => [
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
    link.setAttribute("download", "financial_analysis_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
           {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm flex items-start gap-2 animate-in slide-in-from-right">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 {error}
              </div>
           )}

           {success && analysisResults && (
              <div className="glass-panel p-8 bg-indigo-500/5 border-indigo-500/20 animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold">Analysis Ready</h4>
                        <p className="text-sm text-slate-500">Processed {analysisResults.length} records</p>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-[rgb(var(--border-color))]">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-rose-500" />
                            <span className="text-sm">Risky Transactions</span>
                        </div>
                        <span className="font-bold text-rose-500">{analysisResults.filter(t => t.prediction === 'Risky').length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-[rgb(var(--border-color))]">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm">Total Amount Processed</span>
                        </div>
                        <span className="font-bold">${analysisResults.reduce((acc, t) => acc + t.amount, 0).toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                      onClick={downloadSummary}
                      className="btn-primary w-full py-3"
                    >
                       <Download className="w-4 h-4" /> Download Full Summary
                    </button>
                    <Link 
                      to="/dashboard" 
                      className="btn-outline w-full py-3 group"
                    >
                       Go to Overview <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
