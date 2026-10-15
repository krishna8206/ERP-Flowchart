import React from 'react';
import { ROLE_PROFILES } from '../data/flowchartData';
import { ShieldCheck, Lock, CheckCircle2, Eye, Key } from 'lucide-react';

export default function RBACMatrixView({ onSelectRole, activeRole }) {
  const permissions = [
    {
      role: 'Sales Executive',
      badge: 'Commercial',
      color: 'sky',
      allowed: ['Create Sales Order (SO)', 'Customer Master View', 'Check Available FG Stock', 'Order Tracking'],
      restricted: ['Raw Material Costs', 'Vendor Subcontracting Rates', 'BOM Recipe Alteration', 'Inventory Ledger Edits'],
      modules: ['Sales Dashboard', 'Customer CRM', 'Dispatch Status']
    },
    {
      role: 'Store & Inventory Manager',
      badge: 'Inventory',
      color: 'emerald',
      allowed: ['Raw Material Inward (GRN)', 'Issue RM to Production', 'Stock Transfers', 'Vendor Stock Balance', 'Min/Max Reorder Alerts'],
      restricted: ['Sales Profit Margins', 'Customer Invoicing', 'Production Recipe Editing'],
      modules: ['RM Warehouse', 'WIP Store', 'FG Store', 'Stock Ledger']
    },
    {
      role: 'Production Head / Engineer',
      badge: 'Manufacturing',
      color: 'purple',
      allowed: ['Multi-Level BOM Master', 'Work Order Scheduling', 'Machine Logs', 'Assembly Output Entry', 'Trigger BOM Backflush'],
      restricted: ['Customer Pricing', 'Tax Invoicing', 'Vendor Ledger Reconciliation'],
      modules: ['BOM Master', 'Shop Floor Execution', 'Assembly Terminal']
    },
    {
      role: 'Vendor & Job-Work Officer',
      badge: 'Subcontracting',
      color: 'amber',
      allowed: ['Vendor Master', 'Issue Job Work Challans (100 Pcs)', 'Log Vendor Inward (80 Pcs)', 'Auto Pending Ledger (20 Pcs)', 'Vendor Reminders'],
      restricted: ['Finished Goods Dispatch', 'Sales Orders', 'Production Costs'],
      modules: ['Subcontracting Portal', 'Vendor Ledger', 'Challan Register']
    },
    {
      role: 'Quality Assurance (QC)',
      badge: 'Quality Gates',
      color: 'indigo',
      allowed: ['Inward Vendor QC (Caps)', 'In-Process Thermal Leak Test', 'Final Bottle Assembly QC', 'Rejection & Rework Slips'],
      restricted: ['Financial Vouchers', 'Stock Quantity Adjustment', 'Sales Margin Views'],
      modules: ['QC Dashboard', 'AQL Inspection Forms', 'Rework Logs']
    },
    {
      role: 'Dispatch & Logistics',
      badge: 'Shipping',
      color: 'cyan',
      allowed: ['Pick List Verification', 'Carton Barcode Scanning', 'Generate Packing Slip', 'Tax Invoicing & E-Way Bill', 'Outward Gate Pass'],
      restricted: ['BOM Design', 'Raw Material Purchases', 'Machine Parameters'],
      modules: ['Dispatch Bay', 'Invoice Generator', 'E-Way Bill Portal']
    },
    {
      role: 'Super Admin / Director',
      badge: 'Full Access',
      color: 'rose',
      allowed: ['Full System Configuration', 'User & Role Permissions Management', 'Executive Audit Logs', 'Profit & Loss Reports', 'All Modules'],
      restricted: ['None (Complete System Authority)'],
      modules: ['All 7 ERP Modules + Security & Audit Logs']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 via-slate-900 to-slate-950">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/30">
              Role-Based Access Control (RBAC) Specification
            </span>
            <h2 className="text-xl lg:text-2xl font-bold text-white mt-1.5">
              Role & Rights Security Matrix Across All 7 Departments
            </h2>
            <p className="text-xs lg:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              "કોઈ બી યુઝર લોગિન થાય ને એને રોલ એન્ડ રાઇટ્સ બેઝ્ડ રોલ આપેલો હશે."
              Strict permission encapsulation ensures complete operational segregation and data privacy across departments.
            </p>
          </div>
          <div className="flex-shrink-0 bg-blue-500/10 border border-blue-500/30 px-5 py-3 rounded-xl text-center">
            <div className="text-xs text-blue-300 font-medium">Configured Security Roles</div>
            <div className="font-mono text-2xl font-extrabold text-blue-400 mt-0.5">
              7 Profiles
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Role & Department</th>
                <th className="py-3 px-4">Allowed Permissions & Actions</th>
                <th className="py-3 px-4">Restricted Access (Data Walls)</th>
                <th className="py-3 px-4">Accessible Modules</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {permissions.map((p, idx) => {
                const roleId = ROLE_PROFILES[idx]?.id || 'admin';
                const isSelected = activeRole === roleId;

                return (
                  <tr key={idx} className={`hover:bg-slate-850/50 transition-colors ${isSelected ? 'bg-blue-950/20' : ''}`}>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-blue-400" />
                        <span>{p.role}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 mt-1 inline-block">
                        {p.badge}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <ul className="space-y-1">
                        {p.allowed.map((item, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1.5 text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <ul className="space-y-1">
                        {p.restricted.map((item, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5 text-rose-300/80">
                            <Lock className="w-3 h-3 text-rose-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.modules.map((mod, mIdx) => (
                          <span key={mIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                            {mod}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onSelectRole(roleId)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {isSelected ? 'Active View' : 'Simulate View'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
