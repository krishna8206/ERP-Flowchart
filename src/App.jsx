import React from 'react';
import CompleteERPFlowchartView from './components/CompleteERPFlowchartView';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-200/70 p-1 sm:p-3 lg:p-5 flex justify-center items-start font-sans antialiased">
      <div className="w-full max-w-[1550px]">
        <CompleteERPFlowchartView />
      </div>
    </div>
  );
}
