import React from 'react';
import { Layers, Printer, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function Header({ onPrint, onResetRole, activeRole }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left branding with Official Nanobot Logo */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5 flex items-center justify-center shadow-lg shadow-blue-500/10">
            <img 
              src="/nanobot-logo.png" 
              alt="nanobot logo" 
              className="h-7 sm:h-8 w-auto object-contain filter drop-shadow" 
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                Nanobot® Manufacturing ERP
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Shivanshu Sir Voice Spec
              </span>
            </div>
            <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Stainless Steel Bottle Manufacturing ERP - Complete Process Flow
            </h1>
          </div>
        </div>

        {/* Right badges & controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
          <div className="hidden xl:flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-emerald-400">7</span> Swimlanes
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-blue-400">22</span> Process Boxes
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-mono">100 Sent ➔ 80 In ➔ 20 Pend</span>
          </div>

          <div className="flex items-center gap-2">
            {activeRole !== 'admin' && (
              <button
                onClick={onResetRole}
                className="no-print inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700 transition"
                title="Reset Role Filter to All"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Filter
              </button>
            )}

            <button
              onClick={onPrint}
              className="no-print inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Printer className="w-4 h-4" />
              <span>Export / Print</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
