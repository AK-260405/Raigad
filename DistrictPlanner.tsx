
import React, { useState, useMemo } from 'react';
import { MapPin, Zap, RefreshCcw, Download, Clock, Map as MapIcon, ChevronRight } from 'lucide-react';
import { RAIGAD_POIS } from '../constants';

const DistrictPlanner: React.FC = () => {
  const [taluka, setTaluka] = useState('All Talukas');
  const [days, setDays] = useState(1);
  const [pace, setPace] = useState<'Relaxed' | 'Active'>('Relaxed');
  const [itinerary, setItinerary] = useState<any[]>([]);

  const talukas = ['All Talukas', 'Alibaug', 'Murud', 'Mahad', 'Shrivardhan', 'Karjat', 'Sudhagad', 'Mangaon'];

  const handleGenerate = () => {
    // Deterministic Algorithm
    const filtered = RAIGAD_POIS.filter(p => taluka === 'All Talukas' || p.taluka === taluka);
    const sorted = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    const spotsPerDay = pace === 'Relaxed' ? 2 : 4;
    const generatedItinerary = [];

    for (let i = 0; i < days; i++) {
      const startIndex = i * spotsPerDay;
      const daySpots = sorted.slice(startIndex, startIndex + spotsPerDay);
      
      if (daySpots.length > 0) {
        generatedItinerary.push({
          day: i + 1,
          activities: daySpots.map((spot, idx) => ({
            time: `${9 + idx * 3}:00 AM`,
            title: spot.name,
            location: `${spot.taluka}, Raigad`,
            description: spot.description.split('.')[0] + '.'
          }))
        });
      }
    }
    setItinerary(generatedItinerary);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-8">
        {!itinerary.length ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Focus Region</label>
                <select 
                  value={taluka} 
                  onChange={(e) => setTaluka(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#001F3F] appearance-none"
                >
                  {talukas.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Duration</label>
                <div className="flex gap-2">
                  {[1, 2, 3].map(d => (
                    <button 
                      key={d} 
                      onClick={() => setDays(d)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all border ${days === d ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'bg-white text-slate-400 border-slate-100'}`}
                    >
                      {d}D
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Travel Pace</label>
                <div className="flex gap-2">
                  {(['Relaxed', 'Active'] as const).map(p => (
                    <button 
                      key={p} 
                      onClick={() => setPace(p)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all border ${pace === p ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'bg-white text-slate-400 border-slate-100'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              className="w-full bg-[#001F3F] text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-100 flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> Build Itinerary
            </button>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <h3 className="text-sm font-bold text-[#001F3F] uppercase tracking-wider">Plan for {taluka === 'All Talukas' ? 'Raigad District' : taluka}</h3>
              <button onClick={() => setItinerary([])} className="p-2 rounded-lg hover:bg-slate-50 text-slate-400"><RefreshCcw className="w-3.5 h-3.5" /></button>
            </div>

            <div className="space-y-12">
              {itinerary.map(day => (
                <div key={day.day} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold bg-[#001F3F] text-white px-3 py-1 rounded-lg uppercase tracking-widest">Day {day.day}</span>
                    <div className="h-px flex-1 bg-slate-50" />
                  </div>
                  <div className="space-y-8 pl-2">
                    {day.activities.map((act: any, idx: number) => (
                      <div key={idx} className="flex gap-6 group">
                        <div className="w-14 shrink-0 pt-1 text-right">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{act.time}</span>
                        </div>
                        <div className="relative">
                          <div className="w-px h-full bg-slate-100 absolute left-1/2 -translate-x-1/2 top-4 group-last:h-0" />
                          <div className="w-2.5 h-2.5 rounded-full border-2 border-[#001F3F] bg-white relative z-10" />
                        </div>
                        <div className="flex-1 pb-2">
                          <h4 className="text-[12px] font-bold text-[#001F3F] uppercase tracking-tight mb-1">{act.title}</h4>
                          <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[9px] font-medium">{act.location}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-medium max-w-lg">{act.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <button className="flex-1 bg-slate-50 text-slate-400 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-[#001F3F] transition-colors flex items-center justify-center gap-2">
                <Download className="w-3.5 h-3.5" /> Save Plan
              </button>
              <button className="flex-1 bg-[#001F3F] text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2">
                Start Route <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictPlanner;
