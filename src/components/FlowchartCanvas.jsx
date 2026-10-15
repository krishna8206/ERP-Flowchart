import React from 'react';
import { ERP_PHASES, ROLE_PROFILES } from '../data/flowchartData';
import { ArrowDown, Info, AlertTriangle, Zap, CheckCircle2, Database, ChevronRight } from 'lucide-react';

export default function FlowchartCanvas({ onSelectBox, activeRole }) {
  const currentRole = ROLE_PROFILES.find(r => r.id === activeRole) || ROLE_PROFILES[0];

  return (
    <div className="space-y-10 py-6">
      
      {/* Flowchart Guide Banner */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-sm">
            i
          </div>
          <div>
            <div className="text-sm font-bold text-white">Interactive End-to-End ERP Flowchart</div>
            <div className="text-xs text-slate-300">
              Click on <span className="text-blue-400 font-semibold">any box</span> to inspect inputs, outputs, processes, database tables, and alerts in complete granular detail.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
            <Zap className="w-3.5 h-3.5" /> 20 Pcs Pending Highlight
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
            <Zap className="w-3.5 h-3.5" /> BOM Backflush Engine
          </span>
        </div>
      </div>

      {/* Main Flow Phases */}
      <div className="relative space-y-12">
        {ERP_PHASES.map((phase, pIndex) => {
          const isPhaseVisible = activeRole === 'admin' || currentRole.visiblePhases.includes(phase.id);
          const isNextPhase = pIndex < ERP_PHASES.length - 1;

          return (
            <div 
              key={phase.id} 
              className={`relative transition-all duration-300 ${
                isPhaseVisible ? 'opacity-100' : 'opacity-40 grayscale-[50%]'
              }`}
            >
              {/* Phase Header Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm border shadow-lg ${
                    phase.color === 'blue' ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-blue-500/10' :
                    phase.color === 'sky' ? 'bg-sky-600/20 border-sky-500/40 text-sky-400 shadow-sky-500/10' :
                    phase.color === 'purple' ? 'bg-purple-600/20 border-purple-500/40 text-purple-400 shadow-purple-500/10' :
                    phase.color === 'amber' ? 'bg-amber-600/20 border-amber-500/40 text-amber-400 shadow-amber-500/10' :
                    phase.color === 'indigo' ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-400 shadow-indigo-500/10' :
                    phase.color === 'emerald' ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400 shadow-emerald-500/10' :
                    'bg-cyan-600/20 border-cyan-500/40 text-cyan-400 shadow-cyan-500/10'
                  }`}>
                    {phase.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {phase.badge}
                      </span>
                      {!isPhaseVisible && (
                        <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          Restricted for {currentRole.name}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base lg:text-lg font-bold text-white tracking-tight mt-0.5">
                      {phase.title}
                    </h2>
                  </div>
                </div>
                <p className="text-xs text-slate-400 max-w-xl md:text-right leading-relaxed">
                  {phase.description}
                </p>
              </div>

              {/* Phase Boxes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {phase.boxes.map((box) => {
                  const isSpecialPending = box.id === 'box_auto_pending';
                  const isSpecialBackflush = box.id === 'box_auto_backflush';

                  return (
                    <div
                      key={box.id}
                      onClick={() => onSelectBox(box, phase)}
                      className={`group relative rounded-xl p-4 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                        isSpecialPending
                          ? 'bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-500/50 hover:border-amber-400 glow-amber'
                          : isSpecialBackflush
                          ? 'bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-500/50 hover:border-emerald-400 glow-emerald'
                          : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10'
                      }`}
                    >
                      {/* Box Top Meta */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`font-mono text-[11px] font-extrabold px-2 py-0.5 rounded ${
                            isSpecialPending ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            isSpecialBackflush ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}>
                            {box.code}
                          </span>
                          <span className="text-[10px] text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded-full border border-slate-800">
                            {box.department}
                          </span>
                        </div>

                        {/* Special Feature Badges */}
                        {isSpecialPending && (
                          <div className="mb-2 text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5 animate-pulse">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>100 Sent ➔ 80 In ➔ 20 PENDING</span>
                          </div>
                        )}
                        {isSpecialBackflush && (
                          <div className="mb-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5 animate-pulse">
                            <Zap className="w-3.5 h-3.5" />
                            <span>Instant Auto-Deduction Engine</span>
                          </div>
                        )}

                        <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors mb-1.5 line-clamp-2">
                          {box.title}
                        </h3>

                        <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-3">
                          {box.description}
                        </p>
                      </div>

                      {/* Box Bottom Meta & Action */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 truncate max-w-[130px]" title={box.role}>
                          👤 {box.role}
                        </span>
                        <span className="text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Inspect <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Vertical Connector between Phases */}
              {isNextPhase && (
                <div className="flex flex-col items-center justify-center my-6">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500/60 to-purple-500/60"></div>
                  <div className="w-7 h-7 rounded-full bg-slate-900 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-md shadow-blue-500/10">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
