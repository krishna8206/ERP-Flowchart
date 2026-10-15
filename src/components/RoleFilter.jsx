import React from 'react';
import { ROLE_PROFILES } from '../data/flowchartData';
import { ShieldCheck, UserCheck, Eye } from 'lucide-react';

export default function RoleFilter({ activeRole, onSelectRole }) {
  const currentRole = ROLE_PROFILES.find(r => r.id === activeRole) || ROLE_PROFILES[0];

  return (
    <div className="bg-slate-900/60 border-y border-white/5 py-3 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Role Pill Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Simulate User Role:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {ROLE_PROFILES.map((role) => {
              const isActive = role.id === activeRole;
              return (
                <button
                  key={role.id}
                  onClick={() => onSelectRole(role.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/50 scale-[1.02]'
                      : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    role.id === 'admin' ? 'bg-rose-400' :
                    role.id === 'vendor_desk' ? 'bg-amber-400' :
                    role.id === 'store' ? 'bg-emerald-400' :
                    role.id === 'production' ? 'bg-purple-400' :
                    role.id === 'sales' ? 'bg-sky-400' : 'bg-cyan-400'
                  }`} />
                  {role.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Active Role Summary */}
        <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/40">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>Active View: <strong className="text-slate-200">{currentRole.name}</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-300">{currentRole.visiblePhases.length} Phases Visible</span>
        </div>

      </div>
    </div>
  );
}
