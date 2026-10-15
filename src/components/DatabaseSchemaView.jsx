import React from 'react';
import { Database, Table, Key, Link2, Server } from 'lucide-react';

export default function DatabaseSchemaView() {
  const schemas = [
    {
      table: 'tbl_Users & tbl_User_Roles',
      module: 'Security & RBAC',
      color: 'blue',
      description: 'Stores user credentials, hashed passwords, departmental role mappings, and MFA tokens.',
      fields: [
        { name: 'User_ID', type: 'INT (PK, Auto)', desc: 'Unique user identifier' },
        { name: 'Username', type: 'VARCHAR(50)', desc: 'Login username / email' },
        { name: 'Password_Hash', type: 'VARCHAR(255)', desc: 'Argon2 / BCrypt hash' },
        { name: 'Role_ID', type: 'INT (FK)', desc: 'Foreign key to tbl_Roles' },
        { name: 'Department', type: 'VARCHAR(50)', desc: 'Sales, Store, Production, etc.' },
        { name: 'Is_Active', type: 'BOOLEAN', desc: 'Active/inactive employee flag' }
      ]
    },
    {
      table: 'tbl_Job_Work_Orders & tbl_Job_Work_Challans',
      module: 'Vendor Subcontracting (ઢાંકણું)',
      color: 'amber',
      description: 'Tracks outward Challans (100 sent), inward GRN receipts (80 received), and automatically calculates 20 units pending.',
      fields: [
        { name: 'Challan_ID', type: 'INT (PK, Auto)', desc: 'Unique Job Work Challan Number' },
        { name: 'Vendor_ID', type: 'INT (FK)', desc: 'Cap vendor (e.g. Apex Polymers)' },
        { name: 'Item_Sent_Code', type: 'VARCHAR(30)', desc: 'Raw material or parts issued' },
        { name: 'Qty_Sent', type: 'INT', desc: 'Quantity dispatched (e.g. 100 pcs)' },
        { name: 'Qty_Received', type: 'INT', desc: 'Quantity received at gate (e.g. 80 pcs)' },
        { name: 'Qty_Pending', type: 'COMPUTED (Sent - Recv)', desc: 'Auto-calculated: 20 pcs pending' },
        { name: 'Due_Date', type: 'DATE', desc: 'GST 180-day delivery timeline' },
        { name: 'Challan_Status', type: 'ENUM', desc: 'PENDING, PARTIAL, COMPLETED' }
      ]
    },
    {
      table: 'tbl_BOM_Header & tbl_BOM_Details',
      module: 'Multi-Level BOM Architecture',
      color: 'purple',
      description: 'Stores parent-child relationships and consumption ratios for the finished steel bottle.',
      fields: [
        { name: 'BOM_ID', type: 'INT (PK, Auto)', desc: 'Unique Bill of Materials ID' },
        { name: 'FG_Item_Code', type: 'VARCHAR(30) (FK)', desc: 'Finished bottle (FG-SS-1000)' },
        { name: 'Component_Item_Code', type: 'VARCHAR(30)', desc: 'SS Sheet, Cap (ઢાંકણું), Gasket, Box' },
        { name: 'Quantity_Per_Unit', type: 'DECIMAL(10,4)', desc: '0.350kg sheet, 1.0 cap, 1.0 box' },
        { name: 'Scrap_Percentage', type: 'DECIMAL(5,2)', desc: 'Allowance (e.g. 2% metal scrap)' },
        { name: 'Is_Outsourced', type: 'BOOLEAN', desc: 'TRUE for Cap (ઢાંકણું), FALSE for Body' }
      ]
    },
    {
      table: 'tbl_Stock_Ledger & tbl_Inventory_Stock',
      module: 'Real-Time Inventory & Backflush',
      color: 'emerald',
      description: 'Perpetual stock ledger updated atomically upon finished bottle assembly entry.',
      fields: [
        { name: 'Transaction_ID', type: 'BIGINT (PK, Auto)', desc: 'Unique atomic ledger transaction' },
        { name: 'Item_Code', type: 'VARCHAR(30) (FK)', desc: 'Raw material, WIP, or FG code' },
        { name: 'Warehouse_ID', type: 'INT', desc: 'RM Store, WIP Store, FG Store' },
        { name: 'Debit_Credit', type: 'ENUM(IN, OUT)', desc: 'Stock inward or stock backflush outward' },
        { name: 'Quantity', type: 'DECIMAL(12,4)', desc: 'Quantity moved' },
        { name: 'Running_Balance', type: 'DECIMAL(14,4)', desc: 'Real-time perpetual stock' },
        { name: 'Reference_Doc', type: 'VARCHAR(50)', desc: 'WO-XXXX, GRN-XXXX, DC-XXXX' }
      ]
    },
    {
      table: 'tbl_Sales_Orders & tbl_Dispatch_Records',
      module: 'Sales & Outward Fulfillment',
      color: 'cyan',
      description: 'Customer purchase orders, stock reservations, packing lists, tax invoices, and E-Way bills.',
      fields: [
        { name: 'SO_ID', type: 'INT (PK, Auto)', desc: 'Unique Sales Order number' },
        { name: 'Customer_ID', type: 'INT (FK)', desc: 'Customer account master' },
        { name: 'Ordered_Qty', type: 'INT', desc: 'Requested units (e.g. 500 bottles)' },
        { name: 'Dispatched_Qty', type: 'INT', desc: 'Packed and dispatched count' },
        { name: 'Invoice_No', type: 'VARCHAR(50)', desc: 'GST Tax Invoice number' },
        { name: 'Eway_Bill_No', type: 'VARCHAR(20)', desc: '12-digit government E-Way Bill' },
        { name: 'Fulfillment_Status', type: 'ENUM', desc: 'ALLOCATED, PACKED, DISPATCHED' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-950">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/30">
            Database Architecture & Table Schema
          </span>
          <h2 className="text-xl lg:text-2xl font-bold text-white mt-1.5">
            Relational Data Schema Supporting Job Work & Backflushing
          </h2>
          <p className="text-xs lg:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
            Entity-relationship structure powering the ERP flow: role-based auth, multi-level BOM explosion, vendor subcontracting pending tracking, perpetual stock ledgers, and sales dispatch.
          </p>
        </div>
      </div>

      {/* Schema Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schemas.map((s, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {s.module}
                </span>
                <h3 className="text-sm font-bold text-white mt-1 flex items-center gap-1.5 font-mono">
                  <Table className="w-4 h-4 text-blue-400" />
                  {s.table}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              {s.description}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead className="bg-slate-950/70 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-1.5 px-2.5 text-left">Column Name</th>
                    <th className="py-1.5 px-2.5 text-left">Data Type</th>
                    <th className="py-1.5 px-2.5 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {s.fields.map((f, fIdx) => (
                    <tr key={fIdx} className="hover:bg-slate-800/30">
                      <td className="py-1.5 px-2.5 text-blue-300 font-semibold">{f.name}</td>
                      <td className="py-1.5 px-2.5 text-amber-300/90 text-[11px]">{f.type}</td>
                      <td className="py-1.5 px-2.5 text-slate-400 font-sans text-[11px]">{f.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
