// Complete ERP Flowchart Data Structure for Steel Bottle Manufacturing
// Based on Shivanshu Sir's recording specifications

export const ERP_PHASES = [
  {
    id: 'auth_rbac',
    number: '01',
    title: 'Authentication & Role-Based Access Control (RBAC)',
    shortTitle: 'Login & RBAC',
    badge: 'Security & Access',
    color: 'blue',
    description: 'Every user logs in with role-specific credentials. The ERP grants access rights tailored to their department, restricting unauthorized pricing, recipe formulas, or stock edits.',
    boxes: [
      {
        id: 'box_login',
        code: 'SEC-01',
        title: 'User Login & Credential Verification',
        department: 'IT / Security',
        role: 'All Users',
        description: 'Single sign-on or encrypted login verifying User ID, Password, and Active Status.',
        inputs: ['Username', 'Encrypted Password', 'Device IP / Session Token'],
        process: ['Authenticate user credentials against User Master table', 'Verify multi-factor authentication (MFA) if enabled', 'Generate JWT session token with expiration time'],
        outputs: ['Authenticated User Session', 'User ID & Role ID mapping'],
        tables: ['tbl_Users', 'tbl_User_Roles', 'tbl_Audit_Logs'],
        alerts: ['Account lock on 5 failed attempts', 'Concurrent login warning']
      },
      {
        id: 'box_rbac_matrix',
        code: 'SEC-02',
        title: 'Role & Permission Enforcement Engine',
        department: 'System Core',
        role: 'System Administrator',
        description: 'Dynamic permission middleware that filters visible navigation menus, action buttons (Create/Edit/Approve/Delete), and data row-level security.',
        inputs: ['Role_ID', 'Module_Route_Requested', 'Action_Type'],
        process: ['Map user role to Permission Matrix', 'Sales: Restrict RM purchase prices and BOM formulas', 'Store Keeper: Full visibility of stock ledger; restricted from sales margins', 'Production: Access to BOM execution and assembly logs; restricted from billing', 'Vendor Desk: Access to Job Work Challans, Vendor Master, and Pending Ledgers'],
        outputs: ['Custom Dynamic Navigation Bar', 'Authorized Screen Layout'],
        tables: ['tbl_Roles', 'tbl_Permissions', 'tbl_Role_Permissions_Map'],
        alerts: ['403 Access Denied on unauthorized route attempt']
      }
    ]
  },
  {
    id: 'sales_mrp',
    number: '02',
    title: 'Sales Order Processing & Stock Reservation',
    shortTitle: 'Sales & MRP',
    badge: 'Demand Generation',
    color: 'sky',
    description: 'Customer order capture, credit verification, and instant inventory check against Finished Goods (FG) stock to determine immediate dispatch vs production trigger.',
    boxes: [
      {
        id: 'box_so_create',
        code: 'SO-01',
        title: 'Sales Order (SO) Creation & Commercial Approval',
        department: 'Sales & Commercial',
        role: 'Sales Executive / Manager',
        description: 'Formal customer purchase order entered into ERP with item specifications (e.g., 500 pcs 1000ml SS Thermo Bottle).',
        inputs: ['Customer PO Number', 'Item Code (FG-SS-1000)', 'Quantity (e.g. 500 pcs)', 'Delivery Date', 'Payment Terms'],
        process: ['Validate Customer Master and Credit Limit', 'Apply pricing tiers and tax calculations (GST)', 'Lock Sales Order with unique tracking ID #SO-2026-XXXX'],
        outputs: ['Approved Sales Order Document', 'Stock Allocation Trigger'],
        tables: ['tbl_Customer_Master', 'tbl_Sales_Orders', 'tbl_Sales_Order_Items'],
        alerts: ['Credit limit exceeded notification', 'Price deviation warning']
      },
      {
        id: 'box_fg_check',
        code: 'SO-02',
        title: 'Finished Goods (FG) Inventory Stock Check',
        department: 'Store & Inventory',
        role: 'Automated System / Store Keeper',
        description: 'Instant database lookup comparing ordered quantity with available unreserved Finished Goods in the warehouse.',
        inputs: ['Item_Code: FG-SS-1000', 'Requested Qty: 500 units'],
        process: ['Query `Current_Physical_Stock` minus `Already_Reserved_Stock`', 'If Available Stock >= 500: Allocate FG and send directly to Dispatch', 'If Available Stock < 500: Calculate Net Production Shortage and trigger MRP'],
        outputs: ['Stock Allocation Slip (if available)', 'Production Requisition Note (if shortage)'],
        tables: ['tbl_Inventory_Stock', 'tbl_Stock_Reservations'],
        alerts: ['Stock deficit alert pushed to Production Planning']
      },
      {
        id: 'box_mrp_trigger',
        code: 'MRP-01',
        title: 'Material Requirement Planning (MRP) Run',
        department: 'Production Planning & Control (PPC)',
        role: 'Production Planner',
        description: 'Calculates the exact gross and net raw material quantities required by exploding the Multi-Level BOM against current stock.',
        inputs: ['Net Production Quantity Needed', 'Standard Bill of Materials (BOM-SS-1000)'],
        process: ['Calculate total SS sheet weight required (0.35kg per bottle)', 'Calculate total caps required (1 cap per bottle)', 'Check current RM store balances for steel sheets and caps', 'Generate Work Orders for shop floor and Purchase/Job-Work orders for vendors'],
        outputs: ['Production Work Order #WO-XXXX', 'Subcontracting Requisition for Caps'],
        tables: ['tbl_Production_Work_Orders', 'tbl_MRP_Runs', 'tbl_Material_Requisitions'],
        alerts: ['Raw material lead-time bottleneck warning']
      }
    ]
  },
  {
    id: 'bom_architecture',
    number: '03',
    title: 'Multi-Level Bill of Materials (BOM) Architecture',
    shortTitle: 'BOM Explosion',
    badge: 'Engineering & Formula',
    color: 'purple',
    description: 'Detailed hierarchical formula defining how 1 finished Stainless Steel Bottle is constructed from child sub-assemblies, raw materials, and packaging units.',
    boxes: [
      {
        id: 'box_bom_master',
        code: 'BOM-01',
        title: 'BOM Master: Finished Good (FG-SS-1000)',
        department: 'R&D / Design / Engineering',
        role: 'Technical Head / Production Engineer',
        description: 'Parent BOM definition for 1 unit of 1000ml Stainless Steel Vacuum Bottle.',
        inputs: ['Parent Item Code: FG-SS-1000', 'Revision Version: v2.4'],
        process: ['Defines Component 1: Bottle Body Sub-Assembly (1:1 ratio)', 'Defines Component 2: Bottle Cap / ઢાંકણું Assembly (1:1 ratio - Outsourced)', 'Defines Component 3: Packaging Unit (1:1 ratio)', 'Configures standard scrap allowances (e.g. 2% metal cutting scrap)'],
        outputs: ['Active Production BOM Formula Tree'],
        tables: ['tbl_BOM_Header', 'tbl_BOM_Details', 'tbl_Item_Master'],
        alerts: ['BOM revision change requires engineering change order (ECO)']
      },
      {
        id: 'box_bom_body',
        code: 'BOM-02',
        title: 'Sub-Assembly 1: Bottle Body Composition',
        department: 'In-House Fabrication',
        role: 'Production Supervisor',
        description: 'Breakdown of materials required to fabricate the double-walled insulated bottle body.',
        inputs: ['BOM Level 1 Child Item'],
        process: ['Food-Grade SS 304 Stainless Steel Sheet: 0.350 kg', 'Copper Thermal Foil Insulation: 1 pc', 'Electrostatic Powder Coating / Paint: 25 ml', 'Vacuum Getter Tablet: 1 pc'],
        outputs: ['Shop Floor Material Pick List'],
        tables: ['tbl_BOM_Details', 'tbl_Standard_Operations'],
        alerts: ['SS Coil thickness tolerance monitor (0.6mm +/- 0.02mm)']
      },
      {
        id: 'box_bom_cap',
        code: 'BOM-03',
        title: 'Sub-Assembly 2: Cap / ઢાંકણું Assembly (Vendor)',
        department: 'Subcontracting / Outsource Desk',
        role: 'Vendor Desk Manager',
        description: 'Breakdown of the outsourced cap component as emphasized in Shivanshu Sir\'s instructions.',
        inputs: ['BOM Level 1 Child Item (Outsource Category)'],
        process: ['Food-grade Polypropylene (PP) Threaded Core: 1 pc', 'Food-grade Silicone Leakproof Ring / Gasket: 1 pc', 'Outer Stainless Steel Cap Ring / Trim: 1 pc', 'Supplied by approved specialized vendor under Job Work agreement'],
        outputs: ['Vendor Subcontracting Specification'],
        tables: ['tbl_BOM_Details', 'tbl_Vendor_Components_Map'],
        alerts: ['Food safety FDA / LFGB compliance certificate required']
      },
      {
        id: 'box_bom_pack',
        code: 'BOM-04',
        title: 'Sub-Assembly 3: Packaging & Protection Unit',
        department: 'Packaging & Store',
        role: 'Packaging Supervisor',
        description: 'Materials required for retail presentation and transit protection.',
        inputs: ['BOM Level 1 Packaging Item'],
        process: ['Protective EPE Foam / Poly Bubble Sleeve: 1 pc', 'Printed Monocarton Outer Box with Barcode: 1 pc', 'Master Corrugated Carton (shared 1/24 unit per bottle): 0.0416 unit'],
        outputs: ['Packaging Material Issue Slip'],
        tables: ['tbl_BOM_Details'],
        alerts: ['Box artwork revision verification']
      }
    ]
  },
  {
    id: 'vendor_jobwork',
    number: '04',
    title: 'Vendor Subcontracting & Job Work Tracking (ઢાંકણું)',
    shortTitle: 'Job Work (ઢાંકણું)',
    badge: 'Core Voice Highlight',
    color: 'amber',
    description: 'Detailed lifecycle of outsourced cap manufacturing: Issue 100 pieces to vendor, receive 80 pieces at factory gate, and automatically track the 20 pieces pending balance with alerts.',
    boxes: [
      {
        id: 'box_vendor_select',
        code: 'JW-01',
        title: 'Vendor Selection & Rate Contract Verification',
        department: 'Procurement / Subcontracting',
        role: 'Vendor Desk Executive',
        description: 'Select registered vendor specialized in plastic injection molding and cap manufacturing from the Vendor Master.',
        inputs: ['Required Component: Cap Assembly (ઢાંકણું)', 'Vendor Master List'],
        process: ['Select approved vendor: Apex Polymers & Molders', 'Verify active GSTIN, vendor rating, and subcontracting rate contract', 'Check vendor current open liabilities and credit balance'],
        outputs: ['Selected Vendor Profile & Ledger Link'],
        tables: ['tbl_Vendor_Master', 'tbl_Vendor_Rate_Contracts'],
        alerts: ['Alert if vendor has overdue pending components > 30 days']
      },
      {
        id: 'box_challan_issue',
        code: 'JW-02',
        title: 'Job Work Order & Outward Delivery Challan (100 Pcs)',
        department: 'Store & Dispatch',
        role: 'Store Keeper / Job Work Manager',
        description: 'Generate statutory GST Job Work Delivery Challan and issue raw materials / orders to the vendor.',
        inputs: ['Job Work Order #JWO-2026-089', 'Order Quantity: 100 Pieces', 'Issued Materials: PP Granules / Semi-finished Parts'],
        process: ['Generate Outward Delivery Challan under GST Section 143', 'Debit 100 units from `Main Raw Material Store`', 'Credit 100 units to `WIP - Subcontractor Stock (Apex Caps)`', 'Record dispatched vehicle number and delivery due date'],
        outputs: ['Printed GST Job Work Challan (3 Copies)', 'Inventory Movement Slip'],
        tables: ['tbl_Job_Work_Orders', 'tbl_Job_Work_Challans', 'tbl_Stock_Ledger'],
        alerts: ['180-day GST return threshold countdown begins']
      },
      {
        id: 'box_vendor_inward',
        code: 'JW-03',
        title: 'Factory Gate Inward GRN (80 Pcs Received)',
        department: 'Security & Inward Store',
        role: 'Gate Security & Inward Clerk',
        description: 'Vendor returns with completed caps. Inward entry logs physical count received.',
        inputs: ['Original Challan #JWO-2026-089', 'Vendor Delivery Slip: 80 Pcs Completed Caps'],
        process: ['Physical gate receipt and vehicle entry logging', 'Log Goods Receipt Note (GRN) against original Challan #JWO-2026-089', 'Record received count = 80 Pieces into quarantine inspection bay'],
        outputs: ['GRN Document #GRN-2026-142', 'Quarantine Inspection Tag'],
        tables: ['tbl_GRN_Header', 'tbl_GRN_Items', 'tbl_Gate_Passes'],
        alerts: ['Partial receipt flagged on Challan']
      },
      {
        id: 'box_auto_pending',
        code: 'JW-04',
        title: '⚡ Automated Pending Balance Calculation (20 Pcs PENDING)',
        department: 'ERP Core Engine',
        role: 'Automated Accounting Logic',
        description: 'As specified by Shivanshu Sir: Software calculates 100 sent minus 80 received and displays 20 pending balance in real-time.',
        inputs: ['Challan Qty: 100 pcs', 'GRN Inward Qty: 80 pcs'],
        process: ['Formula: `Pending_Qty = Challan_Qty - Sum(GRN_Qty_Received)`', '100 - 80 = 20 Pieces', 'Update Vendor Subcontracting Ledger: 20 pcs remaining with Apex Polymers', 'Trigger automatic status update: Challan Status = "Partially Received / Pending"', 'Schedule automated SMS / Email reminder to vendor for the 20 pending units'],
        outputs: ['Updated Vendor Outstanding Ledger', 'Pending Liability Alert Widget on Dashboard'],
        tables: ['tbl_Job_Work_Challans (Status: PARTIAL)', 'tbl_Vendor_Stock_Ledger'],
        alerts: ['⚠️ RED ALERT: 20 Caps Outstanding with Vendor! Production buffer status updated']
      },
      {
        id: 'box_qc_inward',
        code: 'JW-05',
        title: 'Inward Quality Check (QC Inspection of 80 Caps)',
        department: 'Quality Control (QC)',
        role: 'QC Inspector',
        description: 'Verify dimensional tolerances, thread engagement, and leakproof gasket placement.',
        inputs: ['80 Units from Inward Bay', 'Quality Inspection Standard (AQL 1.0)'],
        process: ['Sample pressure and torque testing on sample caps', 'Test silicone seal elasticity and odorlessness', 'QC Result: 78 Units Accepted, 2 Units Rejected / Rework', 'Rejected 2 units debited back to Vendor Rework account', 'Accepted 78 units moved to Available Assembly WIP Store'],
        outputs: ['QC Inspection Certificate', 'Store Transfer Voucher'],
        tables: ['tbl_QC_Inspection_Logs', 'tbl_Stock_Ledger'],
        alerts: ['Rejection rate = 2.5% (within acceptable 3% vendor tolerance)']
      }
    ]
  },
  {
    id: 'inhouse_production',
    number: '05',
    title: 'In-House Flask Body Production & Processing',
    shortTitle: 'Body Fabrication',
    badge: 'Manufacturing',
    color: 'indigo',
    description: 'Transforming stainless steel sheets into precision double-walled insulated flask bodies using mechanical presses, vacuum chambers, and surface finishing.',
    boxes: [
      {
        id: 'box_metal_forming',
        code: 'PRD-01',
        title: 'SS Sheet Blanking, Deep Drawing & Necking',
        department: 'Press Shop',
        role: 'Machine Operator / Press Supervisor',
        description: 'Hydraulic multi-stage press draws SS 304 sheet into inner flask and outer flask.',
        inputs: ['SS 304 Coil / Sheet (0.35kg per unit)', 'Work Order #WO-XXXX'],
        process: ['Circular blanking from steel coil with optimized scrap nesting', 'Deep drawing into seamless cylinder cups', 'Neck forming and thread rolling on inner mouth'],
        outputs: ['Inner Flask & Outer Flask Components', 'Metal Scrap Logged in Scrap Store'],
        tables: ['tbl_Production_Logs', 'tbl_Machine_Telemetry'],
        alerts: ['Hydraulic pressure sensor monitoring']
      },
      {
        id: 'box_vacuum_sealing',
        code: 'PRD-02',
        title: 'Laser Seam Welding & Vacuum Chamber Sealing',
        department: 'Welding & Vacuum Line',
        role: 'Welding Specialist',
        description: 'Welds inner and outer vessels together and evacuates air to create thermal insulation.',
        inputs: ['Inner Flask', 'Outer Flask', 'Copper Thermal Wrap', 'Getter Tablet'],
        process: ['Automated orbital laser welding of base and mouth joints', 'Transfer to high-vacuum furnace at 500°C for 4 hours', 'Air evacuation to create 10^-4 Torr insulation vacuum', 'Thermal temperature retention test (hot water temp check after 1 hr)'],
        outputs: ['Insulated Raw Bottle Bodies', 'Thermal Test Certificate'],
        tables: ['tbl_Vacuum_Furnace_Batches', 'tbl_QC_Thermal_Logs'],
        alerts: ['Vacuum drop alert rejects defective flasks immediately']
      },
      {
        id: 'box_surface_finish',
        code: 'PRD-03',
        title: 'Surface Polishing & Electrostatic Powder Coating',
        department: 'Paint & Surface Finishing',
        role: 'Finishing Technician',
        description: 'Applying mirror polish or durable electrostatic powder coat finish.',
        inputs: ['Vacuum Tested Flask Bodies', 'Powder Coating Powder (25ml equivalent)'],
        process: ['Degreasing and ultrasonic cleaning wash', 'Electrostatic powder spray application', 'Baking in curing oven at 180°C for 20 minutes', 'Surface scratch and gloss inspection'],
        outputs: ['Finished Powder Coated Bottle Bodies'],
        tables: ['tbl_Finishing_Logs', 'tbl_Paint_Consumption'],
        alerts: ['Oven temperature curve log']
      }
    ]
  },
  {
    id: 'assembly_backflush',
    number: '06',
    title: 'Final Assembly & Automated BOM Backflush',
    shortTitle: 'Assembly & Backflush',
    badge: 'Core ERP Highlight',
    color: 'emerald',
    description: 'Combining bottle body with cap, final QC stamp, finished good entry, and real-time automated deduction of all raw materials from inventory ledgers.',
    boxes: [
      {
        id: 'box_final_assembly',
        code: 'ASY-01',
        title: 'Final Assembly (Body + Cap + Packaging)',
        department: 'Assembly Line',
        role: 'Assembly Line Leader',
        description: 'Physical integration of the steel body with the vendor-supplied cap and silicone gasket.',
        inputs: ['Finished Bottle Body: 1 pc', 'Inspected Bottle Cap (ઢાંકણું): 1 pc', 'Silicone Gasket: 1 pc', 'Packaging Box: 1 pc'],
        process: ['Fit silicone seal into cap groove and torque-fit onto bottle neck', '100% pneumatic leak test on automated rotary tester', 'Place in poly sleeve and insert into individual printed box'],
        outputs: ['Ready Finished Goods (FG) Bottles'],
        tables: ['tbl_Assembly_Output_Logs'],
        alerts: ['Automated leak sensor buzzer on seal failure']
      },
      {
        id: 'box_fg_entry',
        code: 'ASY-02',
        title: 'Finished Goods (FG) Production Entry Inward',
        department: 'Shop Floor to Store Transfer',
        role: 'Production Supervisor',
        description: 'Operator logs completed bottle batch into ERP terminal (e.g. +100 Finished Bottles).',
        inputs: ['Batch Number: BAT-2026-10', 'Quantity Completed: 100 Units', 'Work Order #WO-XXXX'],
        process: ['Scan operator barcode and enter finished quantity', 'System validates quantity against open Work Order limit', 'Credit Finished Goods Warehouse inventory ledger (+100 units)'],
        outputs: ['FG Production Inward Receipt #FGR-2026-098'],
        tables: ['tbl_FG_Receipts', 'tbl_Inventory_Stock'],
        alerts: ['Triggers the automated backflushing engine immediately']
      },
      {
        id: 'box_auto_backflush',
        code: 'ASY-03',
        title: '⚡ Real-Time BOM Backflushing (Auto-Deduction Engine)',
        department: 'ERP Inventory Engine',
        role: 'Automated Database Transaction',
        description: 'As explicitly instructed by Shivanshu Sir: The moment 1 bottle is entered into inventory, all raw materials for the body and cap are automatically deducted.',
        inputs: ['FG Inward: +100 Units FG-SS-1000', 'Active BOM Formula'],
        process: [
          'Atomic SQL Database Transaction executes across 6 tables:',
          'Deduct SS 304 Sheet: 100 * 0.35kg = -35.00 kg from RM Store',
          'Deduct Bottle Caps (ઢાંકણા): 100 * 1 = -100 Units from WIP Cap Store',
          'Deduct Silicone Gaskets: 100 * 1 = -100 Units from RM Store',
          'Deduct Powder Paint: 100 * 25ml = -2,500 ml from Consumables Store',
          'Deduct Printed Inner Boxes: 100 * 1 = -100 Units from Packaging Store',
          'Post balanced double-entry accounting in Material Consumption Ledger'
        ],
        outputs: ['Real-Time Inventory Balance Update across All Stores', 'Material Consumption Costing Voucher'],
        tables: ['tbl_Stock_Ledger', 'tbl_Material_Consumption_Vouchers', 'tbl_General_Ledger'],
        alerts: ['✅ Zero human manual ledger entries required! Real-time inventory accuracy maintained']
      }
    ]
  },
  {
    id: 'store_dispatch',
    number: '07',
    title: 'Store Management, Invoicing & Customer Dispatch',
    shortTitle: 'Store & Dispatch',
    badge: 'Fulfillment & Logistics',
    color: 'cyan',
    description: 'Finished goods bin storage, digital pick list generation, barcode verification, GST tax invoicing, e-Way bill generation, and outward gate dispatch.',
    boxes: [
      {
        id: 'box_fg_warehouse',
        code: 'STR-01',
        title: 'Finished Goods Warehouse Bin Allocation',
        department: 'FG Warehouse',
        role: 'Store Keeper',
        description: 'System assigns pallet and bin location for finished bottles awaiting dispatch.',
        inputs: ['100 Packed Units from Assembly', 'Warehouse Bin Map'],
        process: ['Scan barcode and assign to Bin Location: Rack B, Shelf 04', 'ERP reflects stock as "Available for Sales Allocation"', 'Update min/max threshold meters and safety stock levels'],
        outputs: ['Bin Location Tag', 'Real-Time FG Stock Dashboard'],
        tables: ['tbl_Warehouse_Bins', 'tbl_Inventory_Stock'],
        alerts: ['Safety stock replenishment indicator']
      },
      {
        id: 'box_pick_pack',
        code: 'DSP-01',
        title: 'Sales Order Pick List & Master Carton Packing',
        department: 'Dispatch Bay',
        role: 'Dispatch Officer / Packaging Boy',
        description: 'Generate pick list against Sales Order, pick cartons from bins, and prepare master shipping carton.',
        inputs: ['Sales Order #SO-2026-088', 'Required: 500 units'],
        process: ['Generate digital pick list with exact bin routes', 'Scan individual carton 2D QR codes to eliminate picking errors', 'Pack 24 individual bottles per heavy-duty master corrugated carton', 'Apply shipping barcode label and weigh master cartons'],
        outputs: ['Verified Pick List', 'Master Packing Slip'],
        tables: ['tbl_Pick_Lists', 'tbl_Packing_Slips'],
        alerts: ['Barcode mismatch prevents incorrect product dispatch']
      },
      {
        id: 'box_tax_invoice',
        code: 'DSP-02',
        title: 'Tax Invoice & GST E-Way Bill Generation',
        department: 'Billing & Accounts',
        role: 'Accountant / Commercial Officer',
        description: 'Generate statutory GST tax invoice, transport delivery challan, and API integration with government E-Way Bill portal.',
        inputs: ['Verified Packing Slip', 'Customer GSTIN', 'Transport Vehicle Number'],
        process: ['Generate GST Compliant Tax Invoice with HSN Code 7323 (Stainless Steel Articles)', 'Calculate CGST + SGST (Intra-state) or IGST (Inter-state)', 'Fetch automated 12-digit E-Way Bill Number via NIC API', 'Print Delivery Challan and driver transit dossier'],
        outputs: ['Tax Invoice Original for Buyer', 'Active E-Way Bill Document', 'Driver Delivery Challan'],
        tables: ['tbl_Tax_Invoices', 'tbl_Eway_Bills', 'tbl_Customer_Ledger'],
        alerts: ['Invoice locked against post-billing edits']
      },
      {
        id: 'box_gate_outward',
        code: 'DSP-03',
        title: 'Factory Gate Outward Pass & Customer Tracking',
        department: 'Security & Logistics',
        role: 'Gate Security & Logistics Desk',
        description: 'Physical vehicle inspection, security gate pass stamping, order fulfillment, and automated customer tracking notification.',
        inputs: ['Delivery Vehicle', 'Invoice & E-Way Bill Copies', 'Driver Identity'],
        process: ['Verify vehicle number against E-Way bill at factory gate', 'Gate officer scans invoice QR code to stamp Outward Gate Pass', 'System marks Sales Order status as "FULFILLED & DISPATCHED"', 'Send automated dispatch email & SMS with live transporter tracking link to customer'],
        outputs: ['Stamped Outward Gate Pass', 'Closed Sales Order #SO-2026-088', 'Delivery Notification Sent'],
        tables: ['tbl_Gate_Passes', 'tbl_Sales_Orders (Status: FULFILLED)', 'tbl_Shipment_Tracking'],
        alerts: ['🎉 Complete order lifecycle completed with end-to-end ERP audit trail!']
      }
    ]
  }
];

export const ROLE_PROFILES = [
  {
    id: 'admin',
    name: 'Super Admin / Director',
    color: 'rose',
    badge: 'Full Access',
    visiblePhases: ['auth_rbac', 'sales_mrp', 'bom_architecture', 'vendor_jobwork', 'inhouse_production', 'assembly_backflush', 'store_dispatch'],
    description: 'Executive view of all business operations, financial margins, real-time bottlenecks, vendor liability balances, and audit trails.'
  },
  {
    id: 'sales',
    name: 'Sales Executive',
    color: 'sky',
    badge: 'Commercial',
    visiblePhases: ['auth_rbac', 'sales_mrp', 'store_dispatch'],
    description: 'Customer order logging, available finished goods stock lookup, pricing quotation, order status tracking, and dispatch delivery confirmation.'
  },
  {
    id: 'store',
    name: 'Store & Inventory Manager',
    color: 'emerald',
    badge: 'Inventory',
    visiblePhases: ['auth_rbac', 'sales_mrp', 'vendor_jobwork', 'assembly_backflush', 'store_dispatch'],
    description: 'Raw material inward, real-time stock ledgers across stores (RM, WIP, FG), automated BOM consumption verification, and safety stock reorder alerts.'
  },
  {
    id: 'production',
    name: 'Production Head / Engineer',
    color: 'purple',
    badge: 'Manufacturing',
    visiblePhases: ['auth_rbac', 'bom_architecture', 'inhouse_production', 'assembly_backflush'],
    description: 'BOM formula management, shop floor work order scheduling, vacuum furnace monitoring, assembly line outputs, and backflush authorization.'
  },
  {
    id: 'vendor_desk',
    name: 'Vendor & Job-Work Officer',
    color: 'amber',
    badge: 'Subcontracting',
    visiblePhases: ['auth_rbac', 'vendor_jobwork', 'assembly_backflush'],
    description: 'Cap vendor liaison, outward job work challans (100 pcs sent), inward receipts (80 pcs received), and real-time vendor pending liability balance (20 pcs pending).'
  },
  {
    id: 'qc',
    name: 'Quality Assurance (QC) Inspector',
    color: 'indigo',
    badge: 'Quality Gates',
    visiblePhases: ['auth_rbac', 'vendor_jobwork', 'inhouse_production', 'assembly_backflush'],
    description: 'Inward vendor cap inspection (e.g. 78 accepted, 2 rework), in-process vacuum insulation test, and final bottle leakproof certification.'
  },
  {
    id: 'dispatch',
    name: 'Dispatch & Logistics Officer',
    color: 'cyan',
    badge: 'Shipping',
    visiblePhases: ['auth_rbac', 'sales_mrp', 'store_dispatch'],
    description: 'Pick list execution, carton barcode scanning, packing slips, tax invoicing, GST E-Way bills, and outward factory gate clearance.'
  }
];
