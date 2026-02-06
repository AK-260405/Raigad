
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Clock, 
  ChevronRight, 
  Plus, 
  Map as MapIcon, 
  ArrowDown,
  Settings2,
  Milestone,
  Info
} from 'lucide-react';
import { getSmartRouteSuggestions } from '../services/geminiService';

const SmartRouteExplorer: React.FC = () => {
  const [origin, setOrigin] = useState('Alibaug');
  const [dest, setDest] = useState('Raigad Fort');
  const [radius, setRadius] = useState(10);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!origin || !dest) return;
    setLoading(true);
    try {
      const results = await getSmartRouteSuggestions(origin, dest, radius);
      setSuggestions(results);
      setHasSearched(true);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Navigation Sidebar */}
        <div className="lg:w-1/3 bg-slate-50/50 border-r border-slate-100 p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#001F3F] rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#001F3F] uppercase tracking-wider">Route Discovery</h3>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">USP: Along-the-path POIs</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative space-y-3">
              <div className="absolute left-[15px] top-8 bottom-8 w-px bg-slate-200 border-dashed" />
              
              <div className="relative flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center z-10 shadow-sm">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                </div>
                <div className="flex-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Origin</label>
                  <input 
                    type="text" 
                    value={origin} 
                    onChange={(e) => setOrigin(e.target.value)} 
                    className="w-full bg-white border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#001F3F] transition-all"
                  />
                </div>
              </div>

              <div className="relative flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-red-500 flex items-center justify-center z-10 shadow-sm">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Destination</label>
                  <input 
                    type="text" 
                    value={dest} 
                    onChange={(e) => setDest(e.target.value)} 
                    className="w-full bg-white border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#001F3F] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Search Buffer</span>
                </div>
                <span className="text-[10px] font-bold text-[#001F3F]">{radius}km</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={radius} 
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-full accent-[#001F3F] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[8px] font-medium text-slate-400 leading-tight">
                Adjust radius to discover hidden gems further from the main highway.
              </p>
            </div>

            <button 
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-[#001F3F] text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>Detect Smart Path <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Results / Interactive Path */}
        <div className="flex-1 p-8 lg:p-12 bg-white overflow-y-auto no-scrollbar">
          {!hasSearched ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
              <div className="w-24 h-24 bg-slate-50 rounded-[3rem] flex items-center justify-center border border-slate-100">
                <Milestone className="w-10 h-10 text-slate-300" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#001F3F] uppercase tracking-widest">Map detection inactive</h4>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest max-w-[220px]">Enter locations to reveal regional POIs on your path.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-[#001F3F] uppercase tracking-tight">Optimized Expedition Path</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Found {suggestions.length} relevant stops within {radius}km</p>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Est. Travel Time</span>
                    <span className="text-xs font-bold text-[#001F3F]">~3h 45m</span>
                  </div>
                </div>
              </div>

              {/* Vertical Path Feed */}
              <div className="relative pl-8 border-l-2 border-slate-100 space-y-12 pb-10">
                
                {/* START NODE */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Journey Start</span>
                    <h5 className="text-sm font-bold text-[#001F3F] uppercase tracking-tight">{origin}</h5>
                  </div>
                </div>

                {/* SUGGESTED STOPS */}
                {suggestions.map((poi, idx) => (
                  <div key={idx} className="relative group animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="absolute -left-[43px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-white border-2 border-[#001F3F] flex items-center justify-center shadow-sm group-hover:bg-[#001F3F] transition-colors">
                      <Plus className="w-3.5 h-3.5 text-[#001F3F] group-hover:text-white" />
                    </div>
                    
                    <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-slate-200 transition-all cursor-pointer">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-[#001F3F]/5 text-[#001F3F] text-[8px] font-bold uppercase tracking-widest">{poi.type}</span>
                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">• Detour Point</span>
                          </div>
                          <h5 className="text-[15px] font-bold text-[#001F3F] uppercase tracking-tight">{poi.name}</h5>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Off-Route</div>
                            <div className="text-xs font-bold text-[#001F3F]">{poi.distanceFromRoute}</div>
                          </div>
                          <div className="w-px h-6 bg-slate-100" />
                          <div className="text-right">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Added Time</div>
                            <div className="text-xs font-bold text-emerald-600">{poi.extraTime}</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">{poi.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                        <button className="text-[9px] font-bold uppercase tracking-widest text-[#001F3F] flex items-center gap-1.5 hover:underline">
                          Explore History <ChevronRight className="w-3 h-3" />
                        </button>
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                          <Info className="w-3 h-3" /> Safe Zone
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* END NODE */}
                <div className="relative pt-4">
                  <div className="absolute -left-[41px] top-5 w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow-sm" />
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">Final Destination</span>
                    <h5 className="text-sm font-bold text-[#001F3F] uppercase tracking-tight">{dest}</h5>
                  </div>
                </div>

              </div>

              {/* ACTION FOOTER */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <button className="flex-[2] bg-[#001F3F] text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl shadow-slate-300 flex items-center justify-center gap-2 hover:bg-black transition-all">
                  <MapIcon className="w-4 h-4" /> Synchronize to GPS
                </button>
                <button className="flex-1 border border-slate-200 text-[#001F3F] py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
                  Share Itinerary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartRouteExplorer;
