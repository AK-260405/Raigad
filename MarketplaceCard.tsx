
import React from 'react';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

interface Props {
  item: any;
  category: 'accommodation' | 'restaurant' | 'guide' | 'tour' | 'poi';
  onClick?: () => void;
}

const MarketplaceCard: React.FC<Props> = ({ item, category, onClick }) => {
  return (
    <div className="group cursor-pointer flex flex-col gap-3" onClick={onClick}>
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
        <img 
          src={item.imageUrl} 
          alt={item.name || item.title} 
          className="w-full h-full object-cover" 
        />
        
        {/* Verification Badge */}
        {(item.isVerified || item.isCertified) && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#001F3F] px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            Verified
          </div>
        )}

        {/* Price Tag Overlay */}
        {category !== 'poi' && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl flex items-center justify-between shadow-md">
              <span className="text-xs font-bold text-[#001F3F]">₹{item.price?.toLocaleString() || item.pricePerDay?.toLocaleString()}</span>
              <span className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">{category === 'accommodation' ? 'night' : 'guest'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold text-[14px] text-[#001F3F] uppercase tracking-tight truncate">
            {item.name || item.title}
          </h4>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3 h-3 text-slate-900 fill-slate-900" />
            <span className="text-[11px] font-bold text-[#001F3F]">{item.rating || '4.8'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
          <MapPin className="w-3 h-3" />
          {item.taluka ? `${item.taluka}, Raigad` : 'Regional Landmark'}
        </div>
        
        <p className="text-[10px] text-slate-500 font-medium line-clamp-1 pt-1 opacity-70">
          {item.type || item.specialty || item.category || 'Experience Destination'}
        </p>
      </div>
    </div>
  );
};

export default MarketplaceCard;
