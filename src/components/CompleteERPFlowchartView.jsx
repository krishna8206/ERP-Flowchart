import React, { useState } from 'react';
import { 
  User, ShieldCheck, CheckSquare, FileText, Boxes, HelpCircle, 
  CheckCircle2, XCircle, ShoppingCart, Truck, Factory, Warehouse, 
  Layers, Search, RotateCcw, FileSpreadsheet, Database, BarChart3, 
  TrendingUp, ClipboardCheck, Settings, Package, Cog, ArrowRight, 
  ArrowDown, AlertTriangle, Zap, Check, Eye, ExternalLink, BookOpen, Info
} from 'lucide-react';

export default function CompleteERPFlowchartView({ onSelectNode }) {
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [showGlossary, setShowGlossary] = useState(true);

  // Comprehensive Abbreviations & Full Forms dictionary
  const abbreviations = [
    { short: 'RBAC', full: 'Role-Based Access Control', meaning: 'Restricts system access based on user departmental roles.' },
    { short: 'SO', full: 'Sales Order', meaning: 'Official internal order document confirmed by a customer.' },
    { short: 'FG', full: 'Finished Goods', meaning: 'Completed bottles in warehouse ready for delivery.' },
    { short: 'BOM', full: 'Bill of Materials', meaning: 'Comprehensive list of raw materials, components & sub-assemblies.' },
    { short: 'MRP', full: 'Material Requirement Planning', meaning: 'Production & inventory control system for material planning.' },
    { short: 'RM', full: 'Raw Material', meaning: 'Basic materials like SS 304 coils, silicone, powder paint.' },
    { short: 'WIP', full: 'Work In Progress', meaning: 'Semi-finished goods currently on shopfloor or with subcontractor.' },
    { short: 'GRN', full: 'Goods Receipt Note', meaning: 'Document acknowledging delivery of goods at factory gate/store.' },
    { short: 'JWO', full: 'Job Work Order', meaning: 'Order subcontracting manufacturing tasks (e.g. caps) to external vendor.' },
    { short: 'QC', full: 'Quality Control', meaning: 'Inspection process ensuring parts meet required specifications.' },
    { short: 'DC', full: 'Delivery Challan', meaning: 'Transport documentation accompanying goods sent for job work/delivery.' },
    { short: 'PP', full: 'Polypropylene', meaning: 'Food-grade thermoplastic polymer used for bottle cap core.' },
    { short: 'SS 304', full: 'Stainless Steel Grade 304', meaning: 'Food-grade austenitic chromium-nickel stainless steel.' },
    { short: 'PO', full: 'Purchase Order', meaning: 'Commercial document issued to a vendor committing to purchase.' },
    { short: 'Pcs', full: 'Pieces (Quantity Units)', meaning: 'Count of individual units produced or transferred.' }
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
      
      {/* 1. TOP HEADER BANNER WITH NANOBOT LOGO */}
      <div className="bg-[#103a6b] text-white py-3 px-6 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl px-3 py-1.5 flex items-center shadow-inner">
            <img 
              src="/nanobot-logo.png" 
              alt="nanobot logo" 
              className="h-7 sm:h-8 w-auto object-contain filter drop-shadow" 
            />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
              <span>Nanobot® Operations &amp; Manufacturing</span>
              <span className="text-[10px] px-2 py-0.2 rounded bg-sky-400/20 text-sky-200 border border-sky-400/30">Official ERP</span>
            </div>
            <h1 className="text-lg lg:text-xl font-extrabold tracking-wide uppercase mt-0.5">
              Steel Bottle Manufacturing ERP - Complete Process Flow
            </h1>
          </div>
        </div>

        <button 
          onClick={() => setShowGlossary(!showGlossary)}
          className="text-xs bg-blue-600/60 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg border border-blue-400/40 flex items-center gap-1.5 transition"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{showGlossary ? 'Hide Full Forms Glossary' : 'Show Full Forms Glossary'}</span>
        </button>
      </div>

      {/* QUICK GLOSSARY / FULL FORM REFERENCE BAR */}
      {showGlossary && (
        <div className="bg-[#eef5fc] border-b border-[#cbdff7] p-3.5 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-blue-700" />
            <span className="font-extrabold text-blue-900 uppercase text-[11px] tracking-wide">
              Official ERP Abbreviations &amp; Full Forms Reference
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-2">
            {abbreviations.map((abbr, i) => (
              <div key={i} className="bg-white border border-blue-200/80 rounded-md p-1.5 shadow-2xs">
                <div className="font-mono font-extrabold text-blue-800 text-[11px]">{abbr.short}</div>
                <div className="text-[10px] font-bold text-slate-700 leading-tight">{abbr.full}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 lg:p-6 space-y-6 overflow-x-auto">
        
        {/* 2. TOP BAND: USER LOGIN & ROLE-BASED ACCESS CONTROL (RBAC) */}
        <div className="bg-[#f0f5fc] border-2 border-[#b8d4f7] rounded-xl p-4 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Login & Authenticate Block */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-tight max-w-[140px] leading-tight">
                User Login &amp; <br />
                <span className="text-blue-700">Role-Based Access Control (RBAC)</span>
              </div>
              <span className="text-slate-400 font-bold">➔</span>
              
              {/* Login Box */}
              <div 
                className="bg-[#dce9f9] border border-[#7ba9e8] rounded-lg px-3.5 py-2 flex items-center gap-2 shadow-sm cursor-pointer hover:bg-blue-100 transition"
                onClick={() => onSelectNode && onSelectNode('User Login', 'Encrypted employee authentication checking username & password.')}
              >
                <div className="w-6 h-6 rounded-full bg-[#1e4e8c] text-white flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1e4e8c]">User Login</div>
                  <div className="text-[9px] text-blue-600">Single Sign-On</div>
                </div>
              </div>

              <span className="text-slate-400 font-bold">➔</span>

              {/* Authenticate Diamond */}
              <div 
                className="bg-[#e9e1f7] border border-[#a78bfa] rounded-lg p-2 text-center text-[10px] font-bold text-[#5b21b6] shadow-sm max-w-[125px] leading-tight cursor-pointer hover:bg-purple-100 transition"
                onClick={() => onSelectNode && onSelectNode('Authenticate User & Check Role', 'Validates credentials and maps RBAC (Role-Based Access Control) permissions.')}
              >
                Authenticate User &amp; Check Role <br />
                <span className="text-[8px] text-purple-600 font-normal">(RBAC Check)</span>
              </div>

              <span className="text-slate-400 font-bold">➔</span>
            </div>

            {/* 7 Roles Cards with Full Forms */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 w-full">
              
              {/* Sales Executive */}
              <div 
                className={`bg-[#e6f7ec] border border-[#6ee7b7] rounded-lg p-2 text-center cursor-pointer transition hover:shadow-md ${activeHighlight === 'sales' ? 'ring-2 ring-emerald-500 scale-105' : ''}`}
                onClick={() => setActiveHighlight(activeHighlight === 'sales' ? null : 'sales')}
              >
                <div className="w-5 h-5 mx-auto rounded-full bg-[#10b981] text-white flex items-center justify-center mb-1">
                  <User className="w-3 h-3" />
                </div>
                <div className="text-[11px] font-extrabold text-[#065f46]">Sales Executive</div>
                <div className="text-[8.5px] text-[#047857] leading-tight mt-0.5">
                  <strong>SO</strong> (Sales Order), Customer, <strong>FG</strong> (Finished Goods) Stock
                </div>
              </div>

              {/* Store Manager */}
              <div 
                className={`bg-[#fef3c7] border border-[#fcd34d] rounded-lg p-2 text-center cursor-pointer transition hover:shadow-md ${activeHighlight === 'store' ? 'ring-2 ring-amber-500 scale-105' : ''}`}
                onClick={() => setActiveHighlight(activeHighlight === 'store' ? null : 'store')}
              >
                <div className="w-5 h-5 mx-auto rounded-full bg-[#f59e0b] text-white flex items-center justify-center mb-1">
                  <Warehouse className="w-3 h-3" />
                </div>
                <div className="text-[11px] font-extrabold text-[#92400e]">Store Manager</div>
                <div className="text-[8.5px] text-[#b45309] leading-tight mt-0.5">
                  Inventory, <strong>GRN</strong> (Goods Receipt Note), Stock Ledger
                </div>
              </div>

              {/* Production Supervisor */}
              <div 
                className={`bg-[#f3e8ff] border border-[#d8b4fe] rounded-lg p-2 text-center cursor-pointer transition hover:shadow-md ${activeHighlight === 'production' ? 'ring-2 ring-purple-500 scale-105' : ''}`}
                onClick={() => setActiveHighlight(activeHighlight === 'production' ? null : 'production')}
              >
                <div className="w-5 h-5 mx-auto rounded-full bg-[#8b5cf6] text-white flex items-center justify-center mb-1">
                  <Cog className="w-3 h-3" />
                </div>
                <div className="text-[11px] font-extrabold text-[#5b21b6]">Production Supervisor</div>
                <div className="text-[8.5px] text-[#6d28d9] leading-tight mt-0.5">
                  <strong>BOM</strong> (Bill of Materials), Work Orders, Production Entry
                </div>
              </div>

              {/* Vendor Manager */}
              <div 
                className={`bg-[#fef9c3] border border-[#fde047] rounded-lg p-2 text-center cursor-pointer transition hover:shadow-md ${activeHighlight === 'vendor' ? 'ring-2 ring-yellow-500 scale-105' : ''}`}
                onClick={() => setActiveHighlight(activeHighlight === 'vendor' ? null : 'vendor')}
              >
                <div className="w-5 h-5 mx-auto rounded-full bg-[#ca8a04] text-white flex items-center justify-center mb-1">
                  <Factory className="w-3 h-3" />
                </div>
                <div className="text-[11px] font-extrabold text-[#854d0e]">Vendor Manager</div>
                <div className="text-[8.5px] text-[#a16207] leading-tight mt-0.5">
                  <strong>JWO</strong> (Job Work Order), Vendor Master, Pending Stock
                </div>
              </div>

              {/* QC Inspector */}
              <div 
                className={`bg-[#fce7f3] border border-[#f9a8d4] rounded-lg p-2 text-center cursor-pointer transition hover:shadow-md ${activeHighlight === 'qc' ? 'ring-2 ring-pink-500 scale-105' : ''}`}
                onClick={() => setActiveHighlight(activeHighlight === 'qc' ? null : 'qc')}
              >
                <div className="w-5 h-5 mx-auto rounded-full bg-[#ec4899] text-white flex items-center justify-center mb-1">
                  <ClipboardCheck className="w-3 h-3" />
                </div>
                <div className="text-[11px] font-extrabold text-[#9d174d]">QC Inspector</div>
                <div className="text-[8.5px] text-[#be185d] leading-tight mt-0.5">
                  <strong>QC</strong> (Quality Control), Inspection, Rejection Reports
                </div>
              </div>

              {/* Dispatch Officer */}
              <div 
                className={`bg-[#e0f2fe] border border-[#7dd3fc] rounded-lg p-2 text-center cursor-pointer transition hover:shadow-md ${activeHighlight === 'dispatch' ? 'ring-2 ring-sky-500 scale-105' : ''}`}
                onClick={() => setActiveHighlight(activeHighlight === 'dispatch' ? null : 'dispatch')}
              >
                <div className="w-5 h-5 mx-auto rounded-full bg-[#0284c7] text-white flex items-center justify-center mb-1">
                  <Truck className="w-3 h-3" />
                </div>
                <div className="text-[11px] font-extrabold text-[#075985]">Dispatch Officer</div>
                <div className="text-[8.5px] text-[#0369a1] leading-tight mt-0.5">
                  Packing, <strong>DC</strong> (Delivery Challan), Invoicing
                </div>
              </div>

              {/* Admin / Management */}
              <div 
                className={`bg-[#f1f5f9] border border-[#cbd5e1] rounded-lg p-2 text-center cursor-pointer transition hover:shadow-md ${activeHighlight === 'admin' ? 'ring-2 ring-slate-500 scale-105' : ''}`}
                onClick={() => setActiveHighlight(activeHighlight === 'admin' ? null : 'admin')}
              >
                <div className="w-5 h-5 mx-auto rounded-full bg-[#475569] text-white flex items-center justify-center mb-1">
                  <Settings className="w-3 h-3" />
                </div>
                <div className="text-[11px] font-extrabold text-[#1e293b]">Admin / Management</div>
                <div className="text-[8.5px] text-[#334155] leading-tight mt-0.5">
                  Full Access, System Reports, Audit Logs
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 3. MIDDLE SECTION: 7 DETAILED PROCESS SWIMLANES WITH FULL FORMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3.5 items-start">
          
          {/* =========================================================================
              COLUMN 1: 1. Sales Order (Customer Order) - GREEN
             ========================================================================= */}
          <div className="bg-[#f0fbf4] border-2 border-[#a7f3d0] rounded-xl overflow-hidden flex flex-col shadow-sm">
            {/* Header */}
            <div className="bg-[#d1fae5] border-b border-[#a7f3d0] p-2.5 text-center">
              <h2 className="text-xs font-extrabold text-[#065f46]">1. Sales Order (SO)</h2>
              <div className="text-[10px] text-[#047857]">(Customer Purchase Order)</div>
            </div>

            {/* Boxes Flow */}
            <div className="p-3 space-y-3 flex flex-col items-center">
              
              {/* Box 1.1: Create Sales Order */}
              <div className="w-full bg-white border border-[#6ee7b7] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-emerald-500 transition">
                <FileText className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Create Sales Order (SO)</div>
                <div className="text-[9px] text-slate-500">(Customer PO Entry)</div>
              </div>

              <div className="w-0.5 h-3 bg-emerald-400"></div>

              {/* Box 1.2: Check Finished Goods Inventory */}
              <div className="w-full bg-white border border-[#6ee7b7] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-emerald-500 transition">
                <Boxes className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Check Finished Goods (FG) Inventory</div>
                <div className="text-[9px] text-blue-600 font-semibold">(Available Stock Query)</div>
              </div>

              <div className="w-0.5 h-3 bg-emerald-400"></div>

              {/* Diamond 1: Sufficient FG Stock? */}
              <div className="w-full relative py-2">
                <div className="bg-[#fef3c7] border-2 border-[#f59e0b] rounded-lg p-2 text-center shadow-sm">
                  <div className="text-xs font-extrabold text-[#92400e]">Sufficient FG (Finished Goods) Stock?</div>
                </div>
                {/* Branch Indicators */}
                <div className="flex justify-between items-center text-[10px] font-bold px-1 mt-1">
                  <span className="text-emerald-600">▼ Yes (In Stock)</span>
                  <span className="text-rose-600">No ➔ (To MRP)</span>
                </div>
              </div>

              <div className="w-0.5 h-3 bg-emerald-400"></div>

              {/* Box 1.3: Reserve FG for Dispatch */}
              <div className="w-full bg-white border border-[#6ee7b7] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-emerald-500 transition">
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-1 text-[10px]">✓</div>
                <div className="text-xs font-bold text-slate-800">Reserve FG (Finished Goods) for Dispatch</div>
                <div className="text-[9px] text-slate-500">(Lock Inventory)</div>
              </div>

              <div className="w-0.5 h-3 bg-emerald-400"></div>

              {/* Box 1.4: Update SO Status (Ready for Dispatch) */}
              <div className="w-full bg-white border border-[#6ee7b7] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-emerald-500 transition">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1 text-[10px]">✓</div>
                <div className="text-xs font-bold text-slate-800">Update SO (Sales Order) Status</div>
                <div className="text-[10px] text-emerald-700 font-bold">(Ready for Dispatch)</div>
              </div>

            </div>
          </div>


          {/* =========================================================================
              COLUMN 2: 2. Production Planning (BOM & Material Requirement) - BLUE
             ========================================================================= */}
          <div className="bg-[#f0f7ff] border-2 border-[#bae6fd] rounded-xl overflow-hidden flex flex-col shadow-sm">
            {/* Header */}
            <div className="bg-[#e0f2fe] border-b border-[#bae6fd] p-2.5 text-center">
              <h2 className="text-xs font-extrabold text-[#0369a1]">2. Production Planning</h2>
              <div className="text-[10px] text-[#0284c7]">(BOM &amp; Material Requirement Planning - MRP)</div>
            </div>

            {/* Boxes Flow */}
            <div className="p-3 space-y-3 flex flex-col items-center">
              
              {/* Box 2.1: Trigger Production Order / MRP */}
              <div className="w-full bg-white border border-[#38bdf8] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-blue-500 transition">
                <ClipboardCheck className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Trigger Production Order / MRP</div>
                <div className="text-[9px] text-blue-600 font-semibold">(Material Requirement Planning)</div>
              </div>

              <div className="w-0.5 h-3 bg-blue-400"></div>

              {/* Box 2.2: Multi-Level BOM Explosion */}
              <div className="w-full bg-white border border-[#38bdf8] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-blue-500 transition">
                <Layers className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Multi-Level BOM Explosion</div>
                <div className="text-[9px] text-indigo-700 font-semibold">(Bill of Materials Tree)</div>
              </div>

              <div className="w-0.5 h-3 bg-blue-400"></div>

              {/* Box 2.3: Check Raw Material Availability */}
              <div className="w-full bg-white border border-[#38bdf8] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-blue-500 transition">
                <Database className="w-4 h-4 text-slate-700 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Check RM Availability</div>
                <div className="text-[9px] text-slate-500">(Raw Material Store Check)</div>
              </div>

              <div className="w-0.5 h-3 bg-blue-400"></div>

              {/* Diamond 2: Materials Available? */}
              <div className="w-full relative py-1">
                <div className="bg-[#fef3c7] border-2 border-[#f59e0b] rounded-lg p-2 text-center shadow-sm">
                  <div className="text-xs font-extrabold text-[#92400e]">Materials Available?</div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold px-1 mt-1">
                  <span className="text-rose-600">▼ No (Shortage)</span>
                  <span className="text-emerald-600">Yes (In Stock) ▼</span>
                </div>
              </div>

              {/* Fork Branches */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {/* No: Raise Purchase Requisition */}
                <div className="bg-white border border-rose-300 rounded-lg p-2 text-center shadow-sm">
                  <ShoppingCart className="w-3.5 h-3.5 text-rose-500 mx-auto mb-0.5" />
                  <div className="text-[9px] font-bold text-rose-700 leading-tight">Raise Purchase Requisition (PR)</div>
                </div>

                {/* Yes: Generate Production Order */}
                <div className="bg-white border border-emerald-300 rounded-lg p-2 text-center shadow-sm">
                  <FileText className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-0.5" />
                  <div className="text-[9px] font-bold text-emerald-800 leading-tight">Generate Production Order (PO)</div>
                </div>
              </div>

            </div>
          </div>


          {/* =========================================================================
              COLUMN 3: 3. Raw Material & Store (Inventory Management) - AMBER
             ========================================================================= */}
          <div className="bg-[#fffbeb] border-2 border-[#fde68a] rounded-xl overflow-hidden flex flex-col shadow-sm">
            {/* Header */}
            <div className="bg-[#fef3c7] border-b border-[#fde68a] p-2.5 text-center">
              <h2 className="text-xs font-extrabold text-[#92400e]">3. Raw Material (RM) &amp; Store</h2>
              <div className="text-[10px] text-[#b45309]">(Inventory Management)</div>
            </div>

            {/* Boxes Flow */}
            <div className="p-3 space-y-3 flex flex-col items-center">
              
              {/* Box 3.1: Receive Raw Materials (GRN) */}
              <div className="w-full bg-white border border-[#f59e0b] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-amber-600 transition">
                <Truck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Receive Raw Materials (RM)</div>
                <div className="text-[10px] text-amber-700 font-semibold">(GRN - Goods Receipt Note)</div>
              </div>

              <div className="w-0.5 h-3 bg-amber-400"></div>

              {/* Box 3.2: Update RM Stock */}
              <div className="w-full bg-white border border-[#f59e0b] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-amber-600 transition">
                <Warehouse className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Update RM Stock</div>
                <div className="text-[9px] text-slate-500">(Raw Material Inventory Balance)</div>
              </div>

              <div className="w-0.5 h-3 bg-amber-400"></div>

              {/* Box 3.3: Issue Materials to Production */}
              <div className="w-full bg-white border border-[#f59e0b] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-amber-600 transition">
                <FileText className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Issue Materials to Production</div>
                <div className="text-[9px] text-slate-500">(Material Issue Slip - MIS)</div>
              </div>

              <div className="w-0.5 h-3 bg-amber-400"></div>

              {/* Box 3.4: Stock Ledger Update */}
              <div className="w-full bg-white border border-[#f59e0b] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-amber-600 transition">
                <Database className="w-4 h-4 text-slate-700 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Stock Ledger Update</div>
                <div className="text-[10px] text-amber-700 font-extrabold">(RM: Raw Material ➔ WIP: Work In Progress)</div>
              </div>

            </div>
          </div>


          {/* =========================================================================
              COLUMN 4: 4. Production (Manufacturing Process) - PURPLE
             ========================================================================= */}
          <div className="bg-[#faf5ff] border-2 border-[#e9d5ff] rounded-xl overflow-hidden flex flex-col shadow-sm">
            {/* Header */}
            <div className="bg-[#f3e8ff] border-b border-[#e9d5ff] p-2.5 text-center">
              <h2 className="text-xs font-extrabold text-[#5b21b6]">4. Production</h2>
              <div className="text-[10px] text-[#6d28d9]">(Manufacturing Process)</div>
            </div>

            {/* Boxes Flow */}
            <div className="p-3 space-y-2.5 flex flex-col items-center">
              
              {/* Box 4.1: Body Manufacturing */}
              <div className="w-full bg-white border border-[#a855f7] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-purple-600 transition">
                <Cog className="w-4 h-4 text-purple-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Body Manufacturing</div>
                <div className="text-[9px] text-slate-500">(Pressing, Welding, Polishing, Coating)</div>
              </div>

              <div className="w-0.5 h-2 bg-purple-400"></div>

              {/* Box 4.2: Receive Components */}
              <div className="w-full bg-white border border-[#a855f7] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-purple-600 transition">
                <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center mx-auto mb-0.5 text-[10px]">⇄</div>
                <div className="text-xs font-bold text-slate-800">Receive Components</div>
                <div className="text-[9px] text-purple-700 font-medium">(Bottle Body + Cap + Packaging)</div>
              </div>

              <div className="w-0.5 h-2 bg-purple-400"></div>

              {/* Box 4.3: Final Assembly */}
              <div className="w-full bg-white border border-[#a855f7] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-purple-600 transition">
                <Cog className="w-4 h-4 text-purple-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Final Assembly</div>
                <div className="text-[9px] text-slate-500">(Torque Fit &amp; Leak Testing)</div>
              </div>

              <div className="w-0.5 h-2 bg-purple-400"></div>

              {/* Box 4.4: Record Production Output */}
              <div className="w-full bg-white border border-[#a855f7] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-purple-600 transition">
                <Package className="w-4 h-4 text-purple-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Record Production Output</div>
                <div className="text-[9px] text-purple-700 font-bold">(Completed Finished Bottles)</div>
              </div>

              <div className="w-0.5 h-2 bg-purple-400"></div>

              {/* Box 4.5: Auto Backflush (Deduct RM & Components) */}
              <div className="w-full bg-emerald-50 border-2 border-emerald-500 rounded-lg p-2 shadow-sm text-center cursor-pointer hover:bg-emerald-100 transition animate-pulse">
                <Database className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
                <div className="text-xs font-extrabold text-emerald-900">⚡ Auto Backflush</div>
                <div className="text-[9px] text-emerald-700 font-extrabold">(Deduct RM: Raw Materials &amp; Components)</div>
              </div>

              <div className="w-0.5 h-2 bg-purple-400"></div>

              {/* Box 4.6: Add to Finished Goods Inventory */}
              <div className="w-full bg-white border border-[#a855f7] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-purple-600 transition">
                <Boxes className="w-4 h-4 text-blue-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Add to Finished Goods</div>
                <div className="text-[9px] text-blue-700 font-bold">(FG Inventory Credit)</div>
              </div>

            </div>
          </div>


          {/* =========================================================================
              COLUMN 5: 5. Vendor Job Work (Cap Manufacturing - Subcontracting) - YELLOW
             ========================================================================= */}
          <div className="bg-[#fefce8] border-2 border-[#fef08a] rounded-xl overflow-hidden flex flex-col shadow-sm">
            {/* Header */}
            <div className="bg-[#fef9c3] border-b border-[#fef08a] p-2.5 text-center">
              <h2 className="text-xs font-extrabold text-[#854d0e]">5. Vendor Job Work</h2>
              <div className="text-[10px] text-[#a16207]">(Cap Manufacturing - Subcontracting)</div>
            </div>

            {/* Boxes Flow */}
            <div className="p-3 space-y-2.5 flex flex-col items-center">
              
              {/* Box 5.1: Create Job Work Order (e.g., 100 pcs) */}
              <div className="w-full bg-white border border-[#eab308] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-yellow-600 transition">
                <FileText className="w-4 h-4 text-yellow-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Create Job Work Order (JWO)</div>
                <div className="text-[9px] text-amber-800 font-bold">(e.g., 100 pcs - Pieces)</div>
              </div>

              <div className="w-0.5 h-2 bg-yellow-400"></div>

              {/* Box 5.2: Issue Outward Challan (Send 100 pcs to Vendor) */}
              <div className="w-full bg-white border border-[#eab308] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-yellow-600 transition">
                <Truck className="w-4 h-4 text-amber-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Issue Outward Challan (DC)</div>
                <div className="text-[9px] text-amber-800 font-bold">(Send 100 pcs - Pieces to Vendor)</div>
              </div>

              <div className="w-0.5 h-2 bg-yellow-400"></div>

              {/* Box 5.3: Move Stock to Vendor (Vendor WIP Stock) */}
              <div className="w-full bg-white border border-[#eab308] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-yellow-600 transition">
                <Warehouse className="w-4 h-4 text-amber-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Move Stock to Vendor</div>
                <div className="text-[9px] text-amber-800 font-medium">(Vendor WIP: Work In Progress Stock)</div>
              </div>

              <div className="w-0.5 h-2 bg-yellow-400"></div>

              {/* INNER BOX: Vendor Process (Dashed Orange border) */}
              <div className="w-full bg-amber-50/80 border-2 border-dashed border-amber-400 rounded-lg p-2 text-center shadow-inner">
                <div className="text-[9px] font-extrabold text-amber-800 uppercase tracking-tight">External Subcontractor Process</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Factory className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-xs font-bold text-amber-900">Vendor Manufactures Caps</span>
                </div>
              </div>

              <div className="w-0.5 h-2 bg-yellow-400"></div>

              {/* Box 5.4: Receive Inward GRN (e.g., 80 pcs) */}
              <div className="w-full bg-white border border-[#eab308] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-yellow-600 transition">
                <Package className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Receive Inward GRN</div>
                <div className="text-[9px] text-emerald-700 font-extrabold">(Goods Receipt Note: e.g., 80 pcs)</div>
              </div>

              <div className="w-0.5 h-2 bg-yellow-400"></div>

              {/* Box 5.5: Update Vendor Pending (100 - 80 = 20 pcs) */}
              <div className="w-full bg-amber-100 border-2 border-amber-500 rounded-lg p-2 shadow-sm text-center cursor-pointer hover:bg-amber-200 transition">
                <AlertTriangle className="w-4 h-4 text-amber-700 mx-auto mb-0.5" />
                <div className="text-xs font-extrabold text-amber-950">⚡ Update Vendor Pending</div>
                <div className="text-[10px] font-mono font-extrabold text-red-600 bg-white/90 py-0.5 px-1.5 rounded mt-0.5 border border-red-300">
                  (100 Sent - 80 Recv = 20 pcs Pending)
                </div>
              </div>

              <div className="w-0.5 h-2 bg-yellow-400"></div>

              {/* Box 5.6: Send for Quality Check */}
              <div className="w-full bg-white border border-[#eab308] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-yellow-600 transition">
                <Search className="w-4 h-4 text-blue-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Send for Quality Check</div>
                <div className="text-[9px] text-blue-600">(To QC Department)</div>
              </div>

            </div>
          </div>


          {/* =========================================================================
              COLUMN 6: 6. Quality Control (Inspection & Approval) - PINK
             ========================================================================= */}
          <div className="bg-[#fdf2f8] border-2 border-[#fbcfe8] rounded-xl overflow-hidden flex flex-col shadow-sm">
            {/* Header */}
            <div className="bg-[#fce7f3] border-b border-[#fbcfe8] p-2.5 text-center">
              <h2 className="text-xs font-extrabold text-[#9d174d]">6. Quality Control (QC)</h2>
              <div className="text-[10px] text-[#be185d]">(Inspection &amp; Approval)</div>
            </div>

            {/* Boxes Flow */}
            <div className="p-3 space-y-3 flex flex-col items-center">
              
              {/* Box 6.1: Inward QC (From Vendor / Purchased) */}
              <div className="w-full bg-white border border-[#f472b6] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-pink-500 transition">
                <Search className="w-4 h-4 text-pink-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Inward QC</div>
                <div className="text-[9.5px] text-slate-600">(Quality Control: From Vendor / Purchased)</div>
              </div>

              <div className="w-0.5 h-3 bg-pink-400"></div>

              {/* Box 6.2: Inspect Components (e.g., 80 pcs) */}
              <div className="w-full bg-white border border-[#f472b6] rounded-lg p-2.5 shadow-sm text-center cursor-pointer hover:border-pink-500 transition">
                <Package className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-800">Inspect Components</div>
                <div className="text-[10px] text-pink-700 font-bold">(e.g., 80 pcs - Pieces)</div>
              </div>

              <div className="w-0.5 h-3 bg-pink-400"></div>

              {/* Diamond 3: Quality Result? */}
              <div className="w-full relative py-1">
                <div className="bg-[#fef3c7] border-2 border-[#f59e0b] rounded-lg p-2 text-center shadow-sm">
                  <div className="text-xs font-extrabold text-[#92400e]">Quality Result? (QC Gate)</div>
                </div>
                <div className="flex justify-between items-center text-[9px] font-bold px-1 mt-1">
                  <span className="text-emerald-700">Accepted (78 pcs)</span>
                  <span className="text-rose-700">Rejected (2 pcs)</span>
                </div>
              </div>

              {/* Two Branches */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {/* Accepted: Update Good Stock (78 pcs) */}
                <div className="bg-emerald-50 border border-emerald-400 rounded-lg p-2 text-center shadow-sm">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1 text-[10px]">✓</div>
                  <div className="text-[9.5px] font-extrabold text-emerald-900 leading-tight">Update Good Stock</div>
                  <div className="text-[9px] text-emerald-700 font-bold">(78 pcs - Pieces)</div>
                </div>

                {/* Rejected: Rework / Return to Vendor */}
                <div className="bg-rose-50 border border-rose-400 rounded-lg p-2 text-center shadow-sm">
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600 mx-auto mb-1" />
                  <div className="text-[9.5px] font-extrabold text-rose-900 leading-tight">Rework / Return</div>
                  <div className="text-[8.5px] text-rose-700 font-bold">(2 pcs to Vendor)</div>
                </div>
              </div>

            </div>
          </div>


          {/* =========================================================================
              COLUMN 7: 7. Dispatch & Invoicing (Delivery to Customer) - CYAN
             ========================================================================= */}
          <div className="bg-[#f0f9ff] border-2 border-[#bae6fd] rounded-xl overflow-hidden flex flex-col shadow-sm">
            {/* Header */}
            <div className="bg-[#e0f2fe] border-b border-[#bae6fd] p-2.5 text-center">
              <h2 className="text-xs font-extrabold text-[#0369a1]">7. Dispatch &amp; Invoicing</h2>
              <div className="text-[10px] text-[#0284c7]">(Customer Delivery &amp; Billing)</div>
            </div>

            {/* Boxes Flow */}
            <div className="p-3 space-y-2.5 flex flex-col items-center">
              
              {/* Box 7.1: FG Available in Store (Assembled Bottles) */}
              <div className="w-full bg-white border border-[#38bdf8] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-sky-500 transition">
                <Boxes className="w-4 h-4 text-sky-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">FG Available in Store</div>
                <div className="text-[9px] text-sky-700 font-medium">(Finished Goods Assembled Bottles)</div>
              </div>

              <div className="w-0.5 h-2 bg-sky-400"></div>

              {/* Box 7.2: Generate Pick List & Packing Slip */}
              <div className="w-full bg-white border border-[#38bdf8] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-sky-500 transition">
                <ClipboardCheck className="w-4 h-4 text-sky-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Generate Pick List</div>
                <div className="text-[9px] text-slate-500">&amp; Packing Slip</div>
              </div>

              <div className="w-0.5 h-2 bg-sky-400"></div>

              {/* Box 7.3: Create Delivery Challan (DC) */}
              <div className="w-full bg-white border border-[#38bdf8] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-sky-500 transition">
                <FileText className="w-4 h-4 text-sky-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Create Delivery Challan (DC)</div>
                <div className="text-[9px] text-slate-500">(Outward Transport Note)</div>
              </div>

              <div className="w-0.5 h-2 bg-sky-400"></div>

              {/* Box 7.4: Generate Invoice & E-way Bill */}
              <div className="w-full bg-white border border-[#38bdf8] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-sky-500 transition">
                <FileSpreadsheet className="w-4 h-4 text-sky-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Generate GST Tax Invoice</div>
                <div className="text-[9px] text-sky-700 font-bold">&amp; E-way Bill (Electronic Way Bill)</div>
              </div>

              <div className="w-0.5 h-2 bg-sky-400"></div>

              {/* Box 7.5: Dispatch to Customer (Vehicle Details) */}
              <div className="w-full bg-white border border-[#38bdf8] rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-blue-500 transition">
                <Truck className="w-4 h-4 text-blue-600 mx-auto mb-0.5" />
                <div className="text-xs font-bold text-slate-800">Dispatch to Customer</div>
                <div className="text-[9px] text-slate-500">(Vehicle Details &amp; Gate Pass)</div>
              </div>

              <div className="w-0.5 h-2 bg-sky-400"></div>

              {/* Box 7.6: Update SO Status (Completed) */}
              <div className="w-full bg-emerald-50 border border-emerald-400 rounded-lg p-2 shadow-sm text-center cursor-pointer hover:border-emerald-600 transition">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-0.5 text-[10px]">✓</div>
                <div className="text-xs font-extrabold text-emerald-900">Update SO Status</div>
                <div className="text-[9px] text-emerald-700 font-bold">(Sales Order Status - Completed)</div>
              </div>

            </div>
          </div>

        </div>


        {/* 4. BOTTOM SECTION: 3 KEY SUB-PANELS WITH FULL FORMS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
          
          {/* =========================================================================
              PANEL 1 (LEFT): Multi-Level Bill of Materials (BOM)
             ========================================================================= */}
          <div className="bg-[#f8fafc] border-2 border-[#cbd5e1] rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-[#1e293b] uppercase tracking-wide border-b border-slate-200 pb-2">
              Multi-Level Bill of Materials (BOM)
            </h3>

            {/* Tree Root: Finished Good */}
            <div className="bg-[#e2e8f0] border border-slate-300 rounded-lg p-2.5 flex items-center justify-center gap-3 shadow-inner">
              <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
                🍶
              </div>
              <div className="text-center">
                <div className="text-xs font-extrabold text-slate-900">Finished Good (FG)</div>
                <div className="text-[10px] text-blue-800 font-bold">Nanobot® Stainless Steel Bottle (1000ml)</div>
              </div>
            </div>

            {/* Tree Branches (3 Branches) */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              
              {/* Branch 1: Bottle Body */}
              <div className="bg-white border border-slate-300 rounded-lg p-2 text-center shadow-sm">
                <div className="text-lg">🧴</div>
                <div className="text-[11px] font-bold text-slate-800">Bottle Body</div>
                <div className="text-[9px] text-slate-500 mb-2">(1 pc - Piece)</div>

                <div className="space-y-1 text-left border-t border-slate-100 pt-1 text-[9px] text-slate-600">
                  <div>• <strong>SS 304</strong> Sheet <br />(Stainless Steel - 0.35 kg)</div>
                  <div>• Copper Coating Foil (1 pc)</div>
                  <div>• Powder Paint (25 ml)</div>
                </div>
              </div>

              {/* Branch 2: Bottle Cap / Lid */}
              <div className="bg-white border border-slate-300 rounded-lg p-2 text-center shadow-sm">
                <div className="text-lg">🔘</div>
                <div className="text-[11px] font-bold text-slate-800">Bottle Cap / Lid</div>
                <div className="text-[9px] text-amber-700 font-bold mb-2">(1 pc - Vendor Outsourced)</div>

                <div className="space-y-1 text-left border-t border-slate-100 pt-1 text-[9px] text-slate-600">
                  <div>• <strong>PP</strong> Lid Core <br />(Polypropylene Plastic - 1 pc)</div>
                  <div>• Silicone Gasket (1 pc)</div>
                  <div>• <strong>SS</strong> Outer Trim (1 pc)</div>
                </div>
              </div>

              {/* Branch 3: Packaging */}
              <div className="bg-white border border-slate-300 rounded-lg p-2 text-center shadow-sm">
                <div className="text-lg">📦</div>
                <div className="text-[11px] font-bold text-slate-800">Packaging</div>
                <div className="text-[9px] text-slate-500 mb-2">(1 unit - Packaging Unit)</div>

                <div className="space-y-1 text-left border-t border-slate-100 pt-1 text-[9px] text-slate-600">
                  <div>• Inner Poly Bag (1 pc)</div>
                  <div>• Printed Monocarton Box (1 pc)</div>
                </div>
              </div>

            </div>
          </div>


          {/* =========================================================================
              PANEL 2 (CENTER): Database / Master Data
             ========================================================================= */}
          <div className="bg-[#f8fafc] border-2 border-[#cbd5e1] rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-[#1e293b] uppercase tracking-wide border-b border-slate-200 pb-2">
              Database / Master Data &amp; Tables
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              
              {/* Left Column of Tables */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-blue-500">🗄️</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">User Master</div>
                    <div className="text-[9px] text-slate-500"><strong>RBAC</strong> (Roles &amp; Permissions)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-emerald-500">🗄️</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Customer Master</div>
                    <div className="text-[9px] text-slate-500">(Client Accounts &amp; GSTIN)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-amber-500">🗄️</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Vendor Master</div>
                    <div className="text-[9px] text-slate-500">(Subcontractors &amp; Suppliers)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-orange-500">🗄️</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Item Master</div>
                    <div className="text-[9px] text-slate-500">
                      <strong>RM</strong> (Raw Material), <strong>WIP</strong>, <strong>FG</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-purple-500">🗄️</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">BOM Master</div>
                    <div className="text-[9px] text-slate-500"><strong>BOM</strong> (Bill of Materials Multi-Level)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-sky-500">🗄️</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Warehouse Master</div>
                    <div className="text-[9px] text-slate-500">(Main Store, WIP, Vendor Stores)</div>
                  </div>
                </div>
              </div>

              {/* Right Column of Tables */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-rose-500">📑</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Sales Order (SO)</div>
                    <div className="text-[9px] text-slate-500">(Customer Orders)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-indigo-500">📑</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Production Order (PO)</div>
                    <div className="text-[9px] text-slate-500">(Shopfloor Work Orders)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-yellow-600">📑</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Job Work Order (JWO)</div>
                    <div className="text-[9px] text-slate-500">(Subcontracting Records)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-blue-600">📑</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">GRN / Challan (DC)</div>
                    <div className="text-[9px] text-slate-500">(Goods Receipt &amp; Delivery Slips)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-pink-600">📑</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">QC Inspection</div>
                    <div className="text-[9px] text-slate-500">(Quality Control Logs)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-purple-600">📑</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Dispatch / Invoice</div>
                    <div className="text-[9px] text-slate-500">(Tax Invoices &amp; E-Way Bills)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-700">📑</span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Stock Ledger</div>
                    <div className="text-[9px] text-slate-500">(All RM, WIP, FG Movements)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* =========================================================================
              PANEL 3 (RIGHT): Key Reports & Dashboards
             ========================================================================= */}
          <div className="bg-[#f8fafc] border-2 border-[#cbd5e1] rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-[#1e293b] uppercase tracking-wide border-b border-slate-200 pb-2">
              Key Reports &amp; Dashboards
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              
              {/* Left Column of Reports */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <BarChart3 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">FG Stock Report</div>
                    <div className="text-[9px] text-slate-500">(Finished Goods Inventory)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <Boxes className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">RM Stock Report</div>
                    <div className="text-[9px] text-slate-500">(Raw Material Inventory)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Vendor Pending Report</div>
                    <div className="text-[9px] text-sky-700 font-semibold">(Outstanding Subcontracting)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <Cog className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Production Report</div>
                    <div className="text-[9px] text-slate-500">(Output, Scrap &amp; Yield)</div>
                  </div>
                </div>
              </div>

              {/* Right Column of Reports */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Sales Order (SO) Report</div>
                    <div className="text-[9px] text-slate-500">(Fulfillment &amp; Pending)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Dispatch &amp; Invoice Report</div>
                    <div className="text-[9px] text-slate-500">(Tax Invoices &amp; E-Way Bills)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <TrendingUp className="w-4 h-4 text-blue-700 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Inventory Valuation</div>
                    <div className="text-[9px] text-slate-500">(FIFO / Weighted Average)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Vendor Aging Report</div>
                    <div className="text-[9px] text-amber-700 font-semibold">(Job Work Lead Times)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                  <ClipboardCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800">Audit Logs</div>
                    <div className="text-[9px] text-slate-500">(System User Traceability)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
