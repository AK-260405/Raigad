
import React from 'react';
import { CURRENT_ALERTS } from '../constants';
import { 
  AlertCircle, 
  Waves, 
  CloudRain, 
  ShieldCheck, 
  Activity, 
  BellRing, 
  Wind, 
  Thermometer,
  ShieldAlert,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const SafetyPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40">
      {/* Header Dashboard Area */}
      <div className="p-8 lg:p-10 border-b border-slate-50 bg-gradient-to-br from-white to-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-2 py-1 bg-red-50 text-red-600 rounded-lg w-fit">
              <Activity className="w-3 h-3 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live Feed</span>
            </div>
            <h3 className="text-2xl font-bold text-[#001F3F] tracking-tight uppercase">Regional Pulse</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time safety & weather intelligence for Raigad District</p>
          </div>
          
          <div className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 pr-6 border-r border-slate-100">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Avg Temp</p>
                <p className="text-xs font-bold text-[#001F3F]">28°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Wind Speed</p>
                <p className="text-xs font-bold text-[#001F3F]">12 km/h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 lg:p-10">
        <div className="space-y-6">
          {CURRENT_ALERTS.map((alert) => (
            <div 
              key={alert.id} 
              className={`group relative p-6 rounded-[2rem] border transition-all duration-300 hover:shadow-xl ${
                alert.severity === 'high' 
                ? 'bg-white border-red-100 shadow-lg shadow-red-500/5' 
                : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Visual Indicator */}
                <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${
                  alert.severity === 'high' ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-[#001F3F] text-white'
                }`}>
                  {alert.type === 'HighTide' ? <Waves className="w-8 h-8" /> : <CloudRain className="w-8 h-8" />}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                      alert.severity === 'high' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">• Coastal Alert</span>
                  </div>
                  
                  <h4 className="text-[15px] font-bold text-[#001F3F] uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    {alert.title}
                  </h4>
                  
                  <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-2xl">
                    {alert.message}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-2">
                       <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Impact: Ferries & Marine Travel</span>
                    </div>
                    <button className="text-[9px] font-bold uppercase tracking-widest text-[#001F3F] flex items-center gap-1 hover:gap-2 transition-all">
                      Full Protocol <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {CURRENT_ALERTS.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
                <ShieldCheck className="w-10 h-10 text-emerald-500" />
              </div>
              <h4 className="text-sm font-bold text-[#001F3F] uppercase tracking-widest">Region Secure</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                No active severe alerts detected. Enjoy your journey through the district safely.
              </p>
            </div>
          )}

          {/* Quick Access Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-10 border-t border-slate-50">
            <button className="flex items-center justify-between p-5 bg-slate-900 text-white rounded-[1.5rem] group hover:bg-black transition-all">
              <div className="text-left">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Safety Resource</p>
                <p className="text-[11px] font-black uppercase tracking-widest">Emergency Dispatch</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
            
            <button className="flex items-center justify-between p-5 bg-white border border-slate-200 text-[#001F3F] rounded-[1.5rem] group hover:border-[#001F3F] transition-all">
              <div className="text-left">
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Navigation Aid</p>
                <p className="text-[11px] font-black uppercase tracking-widest">Offline Trail Maps</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <BellRing className="w-4 h-4 text-[#001F3F]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyPanel;
