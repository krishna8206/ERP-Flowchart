import React, { useState } from 'react';
import { Send, ArrowDownRight, AlertTriangle, CheckCircle2, ShieldAlert, Truck, Clock } from 'lucide-react';

export default function VendorJobWorkSimulator() {
  const [vendorName, setVendorName] = useState('Apex Polymers & Molders (GSTIN: 24AAACA1234F1Z5)');
  const [sentQty, setSentQty] = useState(100);
  const [receivedQty, setReceivedQty] = useState(80);
  const [rejectedQty, setRejectedQty] = useState(2);

  const pendingQty = Math.max(0, sentQty - receivedQty);
  const acceptedQty = Math.max(0, receivedQty - rejectedQty);

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
              Shivanshu Sir Voice Spec Demonstration
            </span>
            <h2 className="text-xl lg:text-2xl font-bold text-white mt-1.5">
              Subcontracting & Job Work Tracking: Bottle Cap (ઢાંકણું)
            </h2>
            <p className="text-xs lg:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              "ધારો કે એને 100 પીસ એને આપ્યા, હવે બનીને 80 પીસ આયા, તો 20 એના પેન્ડિંગ બોલવા જોઈએ, સોફ્ટવેરમાં એવું દેખાવું જોઈએ."
              Adjust the inputs below to see the ERP calculate pending vendor liabilities and ledger balances in real-time.
            </p>
          </div>
          <div className="flex-shrink-0 bg-amber-500/10 border border-amber-500/30 px-4 py-3 rounded-xl text-center">
            <div className="text-xs text-amber-300 font-medium">Automatic Pending Calculation</div>
            <div className="font-mono text-2xl font-extrabold text-amber-400 mt-0.5">
              {pendingQty} Units PENDING
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Live Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Column */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-400" />
            Job Work Challan Inputs
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Select Cap Vendor (Vendor Master):
            </label>
            <select
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option>Apex Polymers & Molders (GSTIN: 24AAACA1234F1Z5)</option>
              <option>Maruti Precision Caps Ltd (GSTIN: 24AAABM5678B1Z2)</option>
              <option>Shreeji Silicone & Caps (GSTIN: 24AAACS9012C1Z8)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Sent on Challan (Qty Sent):</span>
              <span className="font-mono font-bold text-amber-400">{sentQty} pcs</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={sentQty}
              onChange={(e) => setSentQty(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex gap-2 mt-1">
              {[50, 100, 250, 500].map(val => (
                <button
                  key={val}
                  onClick={() => setSentQty(val)}
                  className={`text-[10px] px-2 py-0.5 rounded ${sentQty === val ? 'bg-amber-500 text-black font-bold' : 'bg-slate-800 text-slate-400'}`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Received at Factory Gate (GRN Inward):</span>
              <span className="font-mono font-bold text-emerald-400">{receivedQty} pcs</span>
            </div>
            <input
              type="range"
              min="0"
              max={sentQty}
              step="5"
              value={receivedQty}
              onChange={(e) => setReceivedQty(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex gap-2 mt-1">
              {[0, Math.floor(sentQty * 0.5), Math.floor(sentQty * 0.8), sentQty].map((val, i) => (
                <button
                  key={i}
                  onClick={() => setReceivedQty(val)}
                  className={`text-[10px] px-2 py-0.5 rounded ${receivedQty === val ? 'bg-emerald-500 text-black font-bold' : 'bg-slate-800 text-slate-400'}`}
                >
                  {val} pcs {val === Math.floor(sentQty * 0.8) ? '(80%)' : ''}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">QC Rejection / Rework:</span>
              <span className="font-mono font-bold text-rose-400">{rejectedQty} pcs</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.min(20, receivedQty)}
              value={rejectedQty}
              onChange={(e) => setRejectedQty(Number(e.target.value))}
              className="w-full accent-rose-500"
            />
          </div>
        </div>

        {/* Live Calculation & Status Cards */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Metric Triplet */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                1. Dispatched
              </div>
              <div className="text-2xl font-extrabold text-white mt-1">
                {sentQty} <span className="text-xs text-slate-400 font-normal">units</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Outward Challan #JW-2026-089
              </div>
            </div>

            <div className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-xl bg-emerald-950/10">
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                2. Received & Passed
              </div>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                {acceptedQty} <span className="text-xs text-emerald-300 font-normal">units</span>
              </div>
              <div className="text-[11px] text-emerald-400/80 mt-1">
                GRN Inward ({receivedQty} In - {rejectedQty} Reject)
              </div>
            </div>

            <div className={`border p-4 rounded-xl transition-all ${
              pendingQty > 0 
                ? 'bg-amber-950/30 border-amber-500/50 glow-amber' 
                : 'bg-emerald-950/30 border-emerald-500/40'
            }`}>
              <div className={`text-[11px] font-semibold uppercase tracking-wider ${
                pendingQty > 0 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                3. Outstanding Liability
              </div>
              <div className={`text-2xl font-extrabold mt-1 ${
                pendingQty > 0 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {pendingQty} <span className="text-xs font-normal">units</span>
              </div>
              <div className="text-[11px] mt-1 font-medium">
                {pendingQty > 0 ? '⚠️ Pending with Vendor' : '✓ Full Order Reconciled'}
              </div>
            </div>
          </div>

          {/* Real-time Subcontracting Ledger */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Vendor Subcontracting Ledger Record</span>
              <span className="font-mono text-[11px] text-slate-400">GST Sec 143 Compliant</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono">
                  <tr>
                    <th className="py-2 px-3 rounded-l">Field</th>
                    <th className="py-2 px-3">System Value</th>
                    <th className="py-2 px-3 rounded-r">Status / Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                  <tr>
                    <td className="py-2 px-3 font-sans text-slate-400">Vendor Name</td>
                    <td className="py-2 px-3 font-semibold text-white">{vendorName}</td>
                    <td className="py-2 px-3"><span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Approved</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans text-slate-400">Component</td>
                    <td className="py-2 px-3 text-amber-300">Stainless Steel Insulated Cap (ઢાંકણું)</td>
                    <td className="py-2 px-3 text-[10px] text-slate-400">BOM Item CMP-02</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans text-slate-400">Challan Sent Qty</td>
                    <td className="py-2 px-3 text-white">{sentQty} Units</td>
                    <td className="py-2 px-3 text-emerald-400">Challan Outward</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans text-slate-400">Gate GRN Received</td>
                    <td className="py-2 px-3 text-emerald-400">{receivedQty} Units</td>
                    <td className="py-2 px-3 text-[10px] text-slate-400">Inward Voucher #GRN-142</td>
                  </tr>
                  <tr className={pendingQty > 0 ? 'bg-amber-950/20 font-bold' : ''}>
                    <td className="py-2 px-3 font-sans text-amber-400">Pending with Vendor</td>
                    <td className="py-2 px-3 text-amber-400 text-sm">{pendingQty} Units Outstanding</td>
                    <td className="py-2 px-3">
                      {pendingQty > 0 ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Auto Reminder Queued
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans text-slate-400">WIP Assembly Inward</td>
                    <td className="py-2 px-3 text-sky-400">{acceptedQty} Units Approved for Shopfloor</td>
                    <td className="py-2 px-3 text-[10px] text-sky-400">QC Passed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notification / Alert Bar */}
            {pendingQty > 0 ? (
              <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200">
                  <strong>Automated System Alert:</strong> Vendor <span className="font-semibold">{vendorName.split('(')[0]}</span> has <strong>{pendingQty} caps pending</strong> against Challan #JW-2026-089. An automated follow-up notification and stock aging counter has been registered in the Vendor Subcontracting Ledger.
                </div>
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-200">
                  <strong>Challan Reconciled:</strong> All {sentQty} units have been received. Challan #JW-2026-089 is officially marked as Closed and cleared in the GST Subcontracting Register.
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
