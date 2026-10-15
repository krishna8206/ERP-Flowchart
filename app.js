// ===================================================================
// Steel Bottle Manufacturing ERP - Interactive Controller
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Mermaid.js
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: 'transparent',
        primaryColor: '#1e293b',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#3b82f6',
        lineColor: '#64748b',
        secondaryColor: '#172554',
        tertiaryColor: '#0f172a',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '13px'
      },
      flowchart: {
        curve: 'basis',
        useMaxWidth: false,
        htmlLabels: true
      }
    });
  }

  // 2. Tab Navigation
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      navTabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 3. Diagram Zoom & Pan Controls
  let zoomLevel = 1;
  const svgContainer = document.getElementById('svgFlowchartContainer');
  const mermaidContainer = document.getElementById('mermaidMaster');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetZoomBtn = document.getElementById('resetZoomBtn');

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (zoomLevel < 2) {
        zoomLevel += 0.15;
        applyZoom();
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (zoomLevel > 0.6) {
        zoomLevel -= 0.15;
        applyZoom();
      }
    });
  }

  if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', () => {
      zoomLevel = 1;
      applyZoom();
    });
  }

  function applyZoom() {
    if (svgContainer) {
      svgContainer.style.transform = `scale(${zoomLevel})`;
    }
    if (mermaidContainer) {
      mermaidContainer.style.transform = `scale(${zoomLevel})`;
    }
  }

  // 4. Interactive Simulation 1: BOM Assembly & Backflushing
  const bottleInput = document.getElementById('bottleInput');
  const simulateBOMBtn = document.getElementById('simulateBOMBtn');
  const bomImpactList = document.getElementById('bomImpactList');

  function updateBOMSimulation() {
    const qty = parseInt(bottleInput.value, 10) || 0;
    if (qty <= 0) return;

    const ssSheetKg = (qty * 0.35).toFixed(2);
    const capsQty = qty;
    const gasketsQty = qty;
    const boxesQty = qty;
    const paintMl = qty * 25;

    bomImpactList.innerHTML = `
      <li><span class="item-name">Finished Steel Bottles (FG)</span> <span class="val positive">+${qty} units (Added to FG Store)</span></li>
      <li><span class="item-name">SS 304 Stainless Steel Sheet</span> <span class="val negative">-${ssSheetKg} kg</span></li>
      <li><span class="item-name">Cap Assemblies / ઢાંકણા (Vendor Outward Stock)</span> <span class="val negative">-${capsQty} units</span></li>
      <li><span class="item-name">Food-Grade Silicone Gaskets</span> <span class="val negative">-${gasketsQty} units</span></li>
      <li><span class="item-name">Powder Coating Paint Material</span> <span class="val negative">-${paintMl} ml</span></li>
      <li><span class="item-name">Printed Packaging Boxes</span> <span class="val negative">-${boxesQty} units</span></li>
    `;
  }

  if (simulateBOMBtn && bottleInput) {
    simulateBOMBtn.addEventListener('click', updateBOMSimulation);
    bottleInput.addEventListener('input', updateBOMSimulation);
  }

  // 5. Interactive Simulation 2: Vendor Job Work Balance Tracker (ઢાંકણું)
  const sentQtyInput = document.getElementById('sentQty');
  const recvQtyInput = document.getElementById('recvQty');
  const displaySent = document.getElementById('displaySent');
  const displayRecv = document.getElementById('displayRecv');
  const displayPending = document.getElementById('displayPending');
  const vendorStatusMsg = document.getElementById('vendorStatusMsg');

  function updateVendorCalculation() {
    const sent = parseInt(sentQtyInput.value, 10) || 0;
    const recv = parseInt(recvQtyInput.value, 10) || 0;
    const pending = sent - recv;

    displaySent.textContent = `${sent} pcs`;
    displayRecv.textContent = `${recv} pcs`;

    if (pending > 0) {
      displayPending.className = 'text-amber';
      displayPending.textContent = `${pending} pcs PENDING`;
      vendorStatusMsg.style.display = 'block';
      vendorStatusMsg.className = 'status-msg';
      vendorStatusMsg.innerHTML = `⚠️ <strong>Action Required:</strong> ${pending} pieces are outstanding with vendor. Automatic follow-up notification queued for vendor store.`;
    } else if (pending === 0) {
      displayPending.className = 'text-emerald';
      displayPending.textContent = `0 pcs (Fulfilled)`;
      vendorStatusMsg.style.display = 'block';
      vendorStatusMsg.className = 'status-msg';
      vendorStatusMsg.style.background = 'rgba(16, 185, 129, 0.15)';
      vendorStatusMsg.style.color = '#a7f3d0';
      vendorStatusMsg.innerHTML = `✅ <strong>Order Complete:</strong> All ${sent} pieces have been received and reconciled in the store ledger.`;
    } else {
      displayPending.className = 'text-rose';
      displayPending.textContent = `+${Math.abs(pending)} Excess Received`;
      vendorStatusMsg.style.display = 'block';
      vendorStatusMsg.className = 'status-msg';
      vendorStatusMsg.style.background = 'rgba(244, 63, 94, 0.15)';
      vendorStatusMsg.style.color = '#fecdd3';
      vendorStatusMsg.innerHTML = `ℹ️ <strong>Excess Receipt:</strong> Received ${Math.abs(pending)} more pieces than Challan quantity. Quality Inspector review required.`;
    }
  }

  if (sentQtyInput && recvQtyInput) {
    sentQtyInput.addEventListener('input', updateVendorCalculation);
    recvQtyInput.addEventListener('input', updateVendorCalculation);
  }

  // 6. Print / Export Handler
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
