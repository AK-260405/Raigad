
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Heart,
  Share2,
  CheckCircle2,
  Wifi,
  Coffee,
  Car,
  Users,
  ShieldAlert,
  Navigation2,
  Map as MapIcon
} from 'lucide-react';

interface Props {
  item: any;
  category: 'accommodation' | 'restaurant' | 'guide' | 'tour' | 'poi';
  onBack: () => void;
}

const DotMapVisualization = ({ points }: { points: { name: string; lat: number; lng: number }[] }) => {
  if (!points || points.length === 0) return null;

  return (
    <div className="space-y-6 pt-10 border-t border-slate-100">
      <div className="flex items-center gap-2 px-1">
        <MapIcon className="w-4 h-4 text-[#001F3F]" />
        <h3 className="text-sm font-bold text-[#001F3F] uppercase tracking-widest">Expedition Trace</h3>
      </div>
      
      <div className="relative w-full aspect-video bg-[#001F3F]/[0.02] border border-slate-100 rounded-[2rem] p-10 overflow-hidden flex items-center justify-center">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#001F3F 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative w-full h-full max-w-lg mx-auto">
          {/* SVG Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <path
              d={`M ${points.map(p => `${p.lng}%,${100 - p.lat}%`).join(' L ')}`}
              fill="none"
              stroke="#001F3F"
              strokeWidth="2"
              strokeDasharray="4 6"
              className="opacity-20"
            />
          </svg>

          {/* Points */}
          {points.map((p, idx) => (
            <div 
              key={idx}
              className="absolute group transition-all duration-500 hover:scale-110"
              style={{ left: `${p.lng}%`, bottom: `${p.lat}%`, transform: 'translate(-50%, 50%)' }}
            >
              <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm transition-all duration-300 ${idx === 0 ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : idx === points.length - 1 ? 'bg-red-500 ring-4 ring-red-500/20' : 'bg-[#001F3F]'}`} />
              
              {/* Tooltip Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-white border border-slate-100 px-3 py-1.5 rounded-lg shadow-xl z-20">
                <span className="text-[10px] font-bold text-[#001F3F] uppercase tracking-tight">{p.name}</span>
              </div>

              {/* Static Labels for Start/End */}
              {(idx === 0 || idx === points.length - 1) && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{idx === 0 ? 'Start' : 'Destination'}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500" />
             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Base Camp</span>
           </div>
           <div className="flex items-center gap-2">
             <Navigation2 className="w-3 h-3 text-[#001F3F] opacity-40" />
             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Historical Path</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500" />
             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Summit</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const PropertyDetail: React.FC<Props> = ({ item, category, onBack }) => {
  const [bookingStep, setBookingStep] = useState<'idle' | 'confirming' | 'success'>('idle');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);

  const handleBooking = () => {
    setBookingStep('confirming');
    setTimeout(() => {
      setBookingStep('success');
    }, 1200);
  };

  const isBookingEnabled = ['accommodation', 'tour', 'guide', 'restaurant'].includes(category);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all text-[#001F3F] font-bold text-[11px] uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl bg-white border border-slate-100 hover:shadow-sm"><Heart className="w-4 h-4 text-slate-400" /></button>
          <button className="p-2.5 rounded-xl bg-white border border-slate-100 hover:shadow-sm"><Share2 className="w-4 h-4 text-slate-400" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
          </div>

          <div className="space-y-6 px-1">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[#001F3F] uppercase tracking-tight leading-none">{item.name || item.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1 text-slate-900">
                  <Star className="w-4 h-4 fill-slate-900" />
                  <span>{item.rating || '4.9'}</span>
                  <span className="text-slate-300 ml-0.5">({item.reviews || '120'} reviews)</span>
                </div>
                <div className="flex items-center gap-1 uppercase tracking-widest">
                  <MapPin className="w-4 h-4" />
                  <span>{item.taluka || 'Raigad District'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#001F3F] uppercase tracking-widest">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {item.description || "Immerse yourself in the authentic spirit of Raigad. This experience is curated to highlight the historical depth and natural beauty of the region, providing a comfortable yet authentic encounter with the capital's heritage."}
              </p>
            </div>

            {/* Path Visualization for Tours */}
            {category === 'tour' && item.itineraryPoints && (
              <DotMapVisualization points={item.itineraryPoints} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-50">
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Highlights</h3>
                <ul className="space-y-2.5">
                  {(item.features || ['Heritage Trails', 'Local Cuisine', 'Expert Guidance', 'Safety Support']).map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Amenities</h3>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50 w-16 text-slate-400"><Wifi className="w-4 h-4" /><span className="text-[8px] font-bold">Wifi</span></div>
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50 w-16 text-slate-400"><Coffee className="w-4 h-4" /><span className="text-[8px] font-bold">Food</span></div>
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50 w-16 text-slate-400"><Car className="w-4 h-4" /><span className="text-[8px] font-bold">Car</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-100/50 space-y-6">
              {isBookingEnabled ? (
                <>
                  <div className="flex items-baseline justify-between border-b border-slate-50 pb-4">
                    <span className="text-2xl font-bold text-[#001F3F]">₹{item.price?.toLocaleString() || item.pricePerDay?.toLocaleString()}</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{category === 'accommodation' ? 'per night' : 'per guest'}</span>
                  </div>

                  {bookingStep === 'success' ? (
                    <div className="text-center py-4 space-y-3">
                      <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto"><CheckCircle2 className="w-6 h-6 text-emerald-500" /></div>
                      <h4 className="text-lg font-bold text-[#001F3F] uppercase">Confirmed!</h4>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Confirmation sent to your portal.</p>
                      <button onClick={onBack} className="w-full bg-[#001F3F] text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest mt-4">Close</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase text-slate-400 ml-1">Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#001F3F]" onChange={(e) => setDate(e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase text-slate-400 ml-1">Guests</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input type="number" min="1" placeholder="Number of guests" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#001F3F]" onChange={(e) => setGuests(parseInt(e.target.value))} />
                        </div>
                      </div>
                      <button 
                        onClick={handleBooking}
                        disabled={bookingStep === 'confirming' || !date}
                        className="w-full bg-[#001F3F] text-white py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                      >
                        {bookingStep === 'confirming' ? 'Requesting...' : 'Book Experience'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100"><MapPin className="w-6 h-6 text-[#001F3F]/20" /></div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#001F3F]">Local Gem</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Open to public access. No booking required.</p>
                  <button onClick={onBack} className="w-full border border-slate-200 text-[#001F3F] py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50">Back to Explorer</button>
                </div>
              )}
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
               <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0" />
               <p className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest">Verified by Board. Safe for solo & family travelers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
