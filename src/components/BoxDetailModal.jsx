import React from 'react';
import { X, ArrowRight, Database, AlertTriangle, CheckCircle, Tag, Briefcase, FileCode2 } from 'lucide-react';

export default function BoxDetailModal({ box, phase, onClose }) {
  if (!box) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {box.code}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Phase {phase?.number}: {phase?.shortTitle}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {box.department}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {box.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Summary */}
          <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60 text-slate-300 leading-relaxed">
            {box.description}
          </div>

          {/* Two-Column: Inputs & Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inputs */}
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-2.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Input Data / Pre-requisites</span>
              </div>
              <ul className="space-y-1.5">
                {box.inputs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-sky-400 mt-0.5 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outputs */}
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Outputs / Generated Artifacts</span>
              </div>
              <ul className="space-y-1.5">
                {box.outputs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-Step Execution Logic */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Step-by-Step Process Logic</span>
            </div>
            <div className="space-y-2">
              {box.process.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-mono font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database Tables & Schema */}
          {box.tables && box.tables.length > 0 && (
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2.5">
                <Database className="w-3.5 h-3.5" />
                <span>Database Tables Impacted</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {box.tables.map((tbl, idx) => (
                  <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-blue-300">
                    {tbl}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Alerts & System Triggers */}
          {box.alerts && box.alerts.length > 0 && (
            <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>System Triggers & Automated Validations</span>
              </div>
              <ul className="space-y-1">
                {box.alerts.map((alert, idx) => (
                  <li key={idx} className="text-xs text-amber-200/90 leading-relaxed">
                    {alert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Responsible Role: <strong className="text-slate-200">{box.role}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
