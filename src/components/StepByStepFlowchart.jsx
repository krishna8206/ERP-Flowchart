import React, { useState } from 'react';
import { SEQUENTIAL_STEPS } from '../data/sequentialSteps';
import { 
  ArrowDown, CheckCircle2, AlertTriangle, Zap, Split, Eye, 
  ChevronDown, ChevronUp, Database, ArrowRight, Play, SkipForward, SkipBack, Search
} from 'lucide-react';

export default function StepByStepFlowchart({ onSelectStep }) {
  const [expandedSteps, setExpandedSteps] = useState({ 4: true, 14: true, 20: true });
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState('pipeline'); // 'pipeline' | 'walkthrough'
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (stepNumber) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const expandAll = () => {
    const all = {};
    SEQUENTIAL_STEPS.forEach(s => { all[s.stepNumber] = true; });
    setExpandedSteps(all);
  };

  const collapseAll = () => {
    setExpandedSteps({});
  };

  const filteredSteps = SEQUENTIAL_STEPS.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.stage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentWalkthroughStep = SEQUENTIAL_STEPS[activeStepIndex];

  return (
    <div className="space-y-8 py-4">

      {/* Top Controller Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-purple-950/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              End-to-End Chronological ERP Flow
            </span>
            <span className="text-xs text-slate-400">• Total 22 Sequential Steps</span>
          </div>
          <h2 className="text-lg lg:text-xl font-bold text-white tracking-tight mt-0.5">
            Step-by-Step Manufacturing & Subcontracting Flowchart
          </h2>
        </div>

        {/* View Mode Switcher & Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto justify-between md:justify-end">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'pipeline'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Continuous Pipeline View
            </button>
            <button
              onClick={() => setViewMode('walkthrough')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'walkthrough'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Guided Step-by-Step Tour
            </button>
          </div>

          {viewMode === 'pipeline' && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={expandAll}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition"
              >
                Collapse All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Step Jump Navigation Bar (Horizontal Timeline) */}
      <div className="glass-panel p-3 rounded-xl border border-white/5 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            Steps Jump:
          </span>
          {SEQUENTIAL_STEPS.map((step, idx) => {
            const isHighlight = step.stepNumber === 14 || step.stepNumber === 20;
            const isDecision = step.type === 'decision';
            const isActive = viewMode === 'walkthrough' && activeStepIndex === idx;

            return (
              <button
                key={step.stepNumber}
                onClick={() => {
                  if (viewMode === 'walkthrough') {
                    setActiveStepIndex(idx);
                  } else {
                    const el = document.getElementById(`step-card-${step.stepNumber}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setExpandedSteps(prev => ({ ...prev, [step.stepNumber]: true }));
                    }
                  }
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-extrabold transition-all border ${
                  isActive
                    ? 'bg-blue-500 text-white border-blue-400 scale-110 shadow-lg shadow-blue-500/40 ring-2 ring-white/20'
                    : isHighlight
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                    : isDecision
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800'
                }`}
                title={`Step ${step.stepNumber}: ${step.title}`}
              >
                {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: GUIDED STEP-BY-STEP WALKTHROUGH */}
      {viewMode === 'walkthrough' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 shadow-2xl relative overflow-hidden">
            
            {/* Top Stepper Progress */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-mono font-extrabold text-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
                  {currentWalkthroughStep.stepNumber < 10 ? `0${currentWalkthroughStep.stepNumber}` : currentWalkthroughStep.stepNumber}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      {currentWalkthroughStep.stage}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {currentWalkthroughStep.code}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-extrabold text-white mt-0.5">
                    {currentWalkthroughStep.title}
                  </h3>
                </div>
              </div>

              {/* Progress Count */}
              <div className="text-right">
                <span className="text-xs text-slate-400">Step Progress</span>
                <div className="text-sm font-mono font-bold text-white">
                  {currentWalkthroughStep.stepNumber} / {SEQUENTIAL_STEPS.length}
                </div>
              </div>
            </div>

            {/* Step Walkthrough Details */}
            <div className="space-y-6">
              
              {/* Highlight Banner if Step 14 or 20 */}
              {currentWalkthroughStep.stepNumber === 14 && (
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 glow-amber flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-amber-300">
                      ⚡ CORE AUDIO SPECIFICATION: 100 Sent ➔ 80 Inward ➔ 20 PENDING
                    </h4>
                    <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                      "ધારો કે એને 100 પીસ એને આપ્યા, હવે બનીને 80 પીસ આયા, તો 20 એના પેન્ડિંગ બોલવા જોઈએ, સોફ્ટવેરમાં એવું દેખાવું જોઈએ."
                      System automatically executes: 100 - 80 = 20 Pcs PENDING with Vendor. Subcontracting ledger updated immediately.
                    </p>
                  </div>
                </div>
              )}

              {currentWalkthroughStep.stepNumber === 20 && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 glow-emerald flex items-start gap-3">
                  <Zap className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-300">
                      ⚡ CORE AUDIO SPECIFICATION: AUTOMATED BOM BACKFLUSH (AUTO-DEDUCTION)
                    </h4>
                    <p className="text-xs text-emerald-200/90 mt-1 leading-relaxed">
                      "જેવી મારી ઇન્વેન્ટરી માં બોટલ એક કરું ને, તો ઓટોમેટિકલી બોડી બનાવવાના રો મટીરીયલ્સ અને ઢાંકણા બનાવવાના જેટલા બી રો મટીરીયલ્સ હોય ને એ બધું માઇનસ થઈ જવું જોઈએ."
                      Atomic SQL commit deducts SS Sheet (-0.35kg), Cap (-1pc), Silicone Ring (-1pc), Paint (-25ml), Box (-1pc) automatically.
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-slate-200 text-sm leading-relaxed">
                {currentWalkthroughStep.details}
              </div>

              {/* Decision Paths (If Step is a decision diamond) */}
              {currentWalkthroughStep.decision && (
                <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                    <Split className="w-4 h-4 text-purple-400" />
                    <span>Decision Gateway: {currentWalkthroughStep.decision.question}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="text-xs font-bold text-emerald-400 uppercase">✓ YES Condition (In Stock)</div>
                      <div className="text-xs text-slate-300 mt-1">{currentWalkthroughStep.decision.yesPath}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
                      <div className="text-xs font-bold text-amber-400 uppercase">✕ NO Condition (Deficit)</div>
                      <div className="text-xs text-slate-300 mt-1">{currentWalkthroughStep.decision.noPath}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Meta Grid: Actor, Dept, Inputs, Outputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1 font-semibold uppercase text-[10px]">Responsible Actor</span>
                  <strong className="text-white block">{currentWalkthroughStep.actor}</strong>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1 font-semibold uppercase text-[10px]">Department</span>
                  <strong className="text-white block">{currentWalkthroughStep.department}</strong>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-sky-400 block mb-1 font-semibold uppercase text-[10px]">Inputs Received</span>
                  <ul className="space-y-0.5 text-slate-300">
                    {currentWalkthroughStep.inputs.map((inp, idx) => (
                      <li key={idx} className="truncate">• {inp}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 block mb-1 font-semibold uppercase text-[10px]">Generated Outputs</span>
                  <ul className="space-y-0.5 text-slate-300">
                    {currentWalkthroughStep.outputs.map((out, idx) => (
                      <li key={idx} className="truncate">✓ {out}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Database Tables */}
              {currentWalkthroughStep.tables && currentWalkthroughStep.tables.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap text-xs pt-2">
                  <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                    <Database className="w-3.5 h-3.5 text-blue-400" />
                    Impacted Tables:
                  </span>
                  {currentWalkthroughStep.tables.map((tbl, idx) => (
                    <span key={idx} className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-300">
                      {tbl}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-5 border-t border-white/10">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <SkipBack className="w-4 h-4" />
                Previous Step
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <span>Step {currentWalkthroughStep.stepNumber} of {SEQUENTIAL_STEPS.length}</span>
              </div>

              <button
                disabled={activeStepIndex === SEQUENTIAL_STEPS.length - 1}
                onClick={() => setActiveStepIndex(prev => Math.min(SEQUENTIAL_STEPS.length - 1, prev + 1))}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
              >
                Next Step
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: CONTINUOUS CONNECTED FLOW PIPELINE */}
      {viewMode === 'pipeline' && (
        <div className="relative max-w-4xl mx-auto space-y-6">
          
          {/* Central Vertical Connector Line */}
          <div className="absolute left-6 lg:left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500 via-amber-500 to-emerald-500 rounded-full z-0 opacity-40"></div>

          {filteredSteps.map((step, idx) => {
            const isExpanded = expandedSteps[step.stepNumber];
            const isHighlight = step.stepNumber === 14 || step.stepNumber === 20;
            const isDecision = step.type === 'decision';

            return (
              <div 
                key={step.stepNumber} 
                id={`step-card-${step.stepNumber}`}
                className="relative z-10 pl-16 lg:pl-20 transition-all duration-200"
              >
                {/* Timeline Step Badge Node on the Left Line */}
                <div 
                  className={`absolute left-2 lg:left-4 top-4 -translate-x-1/2 w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-extrabold text-xs shadow-lg transition-transform ${
                    isHighlight
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30 scale-110 animate-pulse'
                      : isDecision
                      ? 'bg-purple-600 text-white ring-4 ring-purple-500/20 rotate-45'
                      : 'bg-slate-900 border-2 border-blue-500 text-blue-400'
                  }`}
                >
                  <span className={isDecision ? '-rotate-45' : ''}>
                    {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
                  </span>
                </div>

                {/* Main Step Card */}
                <div 
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isHighlight && step.stepNumber === 14
                      ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/60 glow-amber'
                      : isHighlight && step.stepNumber === 20
                      ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/60 glow-emerald'
                      : isDecision
                      ? 'bg-slate-900/90 border-purple-500/40 hover:border-purple-400'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-blue-500/40'
                  }`}
                >
                  {/* Card Header */}
                  <div 
                    onClick={() => toggleExpand(step.stepNumber)}
                    className="p-4 lg:p-5 cursor-pointer flex items-start justify-between gap-4 select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {step.stage}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {step.code}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          👤 {step.actor}
                        </span>
                      </div>

                      <h3 className="text-base lg:text-lg font-bold text-white flex items-center gap-2">
                        {step.title}
                        {isDecision && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Decision Gate
                          </span>
                        )}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                        {step.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Special Audio Banners right in the card */}
                  {step.stepNumber === 14 && (
                    <div className="mx-4 lg:mx-5 mb-3 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-200">
                      <span className="font-bold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        100 Pieces Sent ➔ 80 Received ➔ 20 PENDING with Vendor!
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                        Auto Calculation
                      </span>
                    </div>
                  )}

                  {step.stepNumber === 20 && (
                    <div className="mx-4 lg:mx-5 mb-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs text-emerald-200">
                      <span className="font-bold flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        1 Bottle Produced = SS Sheet (-0.35kg), Cap (-1), Gasket (-1), Box (-1)
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        BOM Auto-Deduction
                      </span>
                    </div>
                  )}

                  {/* Decision Path Branching Visual (For Decision Steps) */}
                  {isDecision && step.decision && (
                    <div className="mx-4 lg:mx-5 mb-4 p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30">
                      <div className="text-[11px] font-bold text-purple-300 uppercase mb-2">
                        Fork Gateway: {step.decision.question}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                          <strong>✓ YES (In Stock):</strong> {step.decision.yesPath}
                        </div>
                        <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-300">
                          <strong>✕ NO (Deficit):</strong> {step.decision.noPath}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expanded Step Deep Dive */}
                  {isExpanded && (
                    <div className="px-4 lg:px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-xs">
                      <div className="text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                        {step.details}
                      </div>

                      {/* Inputs & Outputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-1.5">
                            Inputs / Pre-requisites
                          </span>
                          <ul className="space-y-1 text-slate-300">
                            {step.inputs.map((inp, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-sky-400 font-bold">•</span>
                                <span>{inp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                            Outputs / Generated Documents
                          </span>
                          <ul className="space-y-1 text-slate-300">
                            {step.outputs.map((out, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">✓</span>
                                <span>{out}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Database Tables Impacted */}
                      {step.tables && step.tables.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                            <Database className="w-3.5 h-3.5 text-blue-400" />
                            Database Tables:
                          </span>
                          {step.tables.map((tbl, idx) => (
                            <span key={idx} className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-300">
                              {tbl}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* System Alerts */}
                      {step.alert && (
                        <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-300 text-[11px]">
                          {step.alert}
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Arrow Down connecting to next step */}
                {idx < filteredSteps.length - 1 && (
                  <div className="flex items-center pl-2 lg:pl-4 py-2">
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
