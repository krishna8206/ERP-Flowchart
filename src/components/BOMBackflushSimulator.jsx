import React, { useState } from 'react';
import { Zap, Layers, ArrowRight, MinusCircle, PlusCircle, CheckCircle, RefreshCcw } from 'lucide-react';

export default function BOMBackflushSimulator() {
  const [producedQty, setProducedQty] = useState(50);
  
  // Base raw material ratios per 1 finished steel bottle
  const ratios = {
    ssSheetKg: 0.35,        // 350 grams per bottle
    copperFoil: 1,          // 1 thermal foil
    capUnit: 1,             // 1 finished cap (ઢાંકણું)
    siliconeGasket: 1,      // 1 silicone leakproof seal
    powderPaintMl: 25,      // 25 ml coating
    innerBox: 1             // 1 printed retail box
  };

  // Base initial starting stock
  const initialStock = {
    fgBottles: 120,
    ssSheetKg: 1500,
    caps: 450,
    siliconeGaskets: 600,
    powderPaintMl: 50000,
    innerBoxes: 2000
  };

  // Calculated deductions
  const deductions = {
    ssSheetKg: (producedQty * ratios.ssSheetKg).toFixed(2),
    caps: producedQty * ratios.capUnit,
    siliconeGaskets: producedQty * ratios.siliconeGasket,
    powderPaintMl: producedQty * ratios.powderPaintMl,
    innerBoxes: producedQty * ratios.innerBox
  };

  // Remaining stock
  const remainingStock = {
    fgBottles: initialStock.fgBottles + producedQty,
    ssSheetKg: (initialStock.ssSheetKg - deductions.ssSheetKg).toFixed(2),
    caps: initialStock.caps - deductions.caps,
    siliconeGaskets: initialStock.siliconeGaskets - deductions.siliconeGaskets,
    powderPaintMl: initialStock.powderPaintMl - deductions.powderPaintMl,
    innerBoxes: initialStock.innerBoxes - deductions.innerBoxes
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
              Automated BOM Backflush Engine
            </span>
            <h2 className="text-xl lg:text-2xl font-bold text-white mt-1.5">
              1 Finished Bottle In = All Child Raw Materials Auto-Deducted
            </h2>
            <p className="text-xs lg:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              "જેવી મારી ઇન્વેન્ટરી માં બોટલ એક કરું ને, તો ઓટોમેટિકલી બોડી બનાવવાના રો મટીરીયલ્સ અને ઢાંકણા બનાવવાના જેટલા બી રો મટીરીયલ્સ હોય ને એ બધું માઇનસ થઈ જવું જોઈએ."
              Demonstration of real-time multi-level stock backflushing triggered by finished goods entry.
            </p>
          </div>
          <div className="flex-shrink-0 bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 rounded-xl text-center">
            <div className="text-xs text-emerald-300 font-medium">Finished Goods Credit</div>
            <div className="font-mono text-2xl font-extrabold text-emerald-400 mt-0.5">
              +{producedQty} Bottles
            </div>
          </div>
        </div>
      </div>

      {/* Production Trigger Control */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Production Entry Trigger</div>
            <div className="text-sm font-bold text-white">Select Completed Finished Bottles to Punch:</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap justify-end">
          {[1, 10, 50, 100, 250, 500].map((qty) => (
            <button
              key={qty}
              onClick={() => setProducedQty(qty)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                producedQty === qty
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
              }`}
            >
              +{qty} {qty === 1 ? 'Bottle' : 'Bottles'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Stock Impact Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: BOM Multi-Level Hierarchy */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
            <span>Multi-Level Bill of Materials (BOM) Explosion</span>
            <span className="font-mono text-[11px] text-purple-400">Model: FG-SS-1000</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {/* Level 0 */}
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="font-sans font-bold text-white">LEVEL 0: Finished Steel Bottle</span>
              </div>
              <span className="text-emerald-400 font-bold">+{producedQty} Units</span>
            </div>

            {/* Level 1: Sub-assemblies */}
            <div className="pl-4 space-y-2 border-l-2 border-slate-800 ml-3">
              {/* Body */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-sans">↳ Sub-Assy 1:</span> <span className="text-white font-medium">Bottle Body Shell</span>
                </div>
                <span className="text-slate-400">Ratio 1:1</span>
              </div>
              
              {/* Level 2 RM under Body */}
              <div className="pl-4 space-y-1.5 border-l-2 border-slate-800/60 ml-3 text-[11px]">
                <div className="flex justify-between text-slate-300 py-0.5">
                  <span>SS 304 Sheet (0.35 kg/u)</span>
                  <span className="text-rose-400 font-bold">-{deductions.ssSheetKg} kg</span>
                </div>
                <div className="flex justify-between text-slate-300 py-0.5">
                  <span>Powder Paint (25 ml/u)</span>
                  <span className="text-rose-400 font-bold">-{deductions.powderPaintMl} ml</span>
                </div>
              </div>

              {/* Cap (Outsourced) */}
              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-sans">↳ Sub-Assy 2:</span> <span className="text-white font-medium">Cap / ઢાંકણું Assembly (Vendor)</span>
                </div>
                <span className="text-amber-400">Ratio 1:1</span>
              </div>

              {/* Level 2 RM under Cap */}
              <div className="pl-4 space-y-1.5 border-l-2 border-amber-500/20 ml-3 text-[11px]">
                <div className="flex justify-between text-slate-300 py-0.5">
                  <span>Cap Assembly Unit (from Apex Vendor)</span>
                  <span className="text-rose-400 font-bold">-{deductions.caps} pcs</span>
                </div>
                <div className="flex justify-between text-slate-300 py-0.5">
                  <span>Silicone Gasket Seal Ring</span>
                  <span className="text-rose-400 font-bold">-{deductions.siliconeGaskets} pcs</span>
                </div>
              </div>

              {/* Packaging */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-sans">↳ Packaging:</span> <span className="text-white font-medium">Printed Inner Box</span>
                </div>
                <span className="text-rose-400 font-bold">-{deductions.innerBoxes} pcs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Inventory Ledger Impact */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
            <span>Automated Inventory Ledger Balance (Before vs After)</span>
            <span className="font-mono text-[11px] text-emerald-400">Atomic SQL Engine</span>
          </h3>

          <div className="space-y-2.5 font-mono text-xs">
            {/* FG Bottle */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-sans font-semibold text-white">Finished Goods Warehouse</div>
                <div className="text-[10px] text-slate-400">Item: FG-SS-1000 Bottle</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">{initialStock.fgBottles} ➔ </span>
                <span className="text-emerald-400 font-bold text-sm">{remainingStock.fgBottles} Units</span>
                <span className="block text-[10px] text-emerald-400">(+{producedQty} Credit)</span>
              </div>
            </div>

            {/* SS Sheet */}
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-sans font-semibold text-white">RM Store: SS 304 Coil</div>
                <div className="text-[10px] text-slate-400">Deduction: -0.35kg per bottle</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">{initialStock.ssSheetKg}kg ➔ </span>
                <span className="text-white font-bold">{remainingStock.ssSheetKg} kg</span>
                <span className="block text-[10px] text-rose-400">(-{deductions.ssSheetKg} kg)</span>
              </div>
            </div>

            {/* Cap Stock */}
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-sans font-semibold text-amber-300">WIP Store: Cap Assembly (ઢાંકણું)</div>
                <div className="text-[10px] text-slate-400">Vendor Item: CMP-02 (Apex)</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">{initialStock.caps} ➔ </span>
                <span className="text-white font-bold">{remainingStock.caps} Pcs</span>
                <span className="block text-[10px] text-rose-400">(-{deductions.caps} Pcs)</span>
              </div>
            </div>

            {/* Silicone Rings */}
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-sans font-semibold text-white">RM Store: Silicone Rings</div>
                <div className="text-[10px] text-slate-400">Item: SIL-01 Gasket</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">{initialStock.siliconeGaskets} ➔ </span>
                <span className="text-white font-bold">{remainingStock.siliconeGaskets} Pcs</span>
                <span className="block text-[10px] text-rose-400">(-{deductions.siliconeGaskets} Pcs)</span>
              </div>
            </div>

            {/* Packaging Box */}
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-sans font-semibold text-white">Packaging Store: Printed Box</div>
                <div className="text-[10px] text-slate-400">Item: BOX-SS-1000</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">{initialStock.innerBoxes} ➔ </span>
                <span className="text-white font-bold">{remainingStock.innerBoxes} Pcs</span>
                <span className="block text-[10px] text-rose-400">(-{deductions.innerBoxes} Pcs)</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300/90 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Zero manual calculations. All store debits and FG credits post in 1 single database commit.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
