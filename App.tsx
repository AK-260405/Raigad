
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Home, 
  Hotel, 
  UtensilsCrossed, 
  Compass,
  Search,
  Award,
  ArrowRight,
  MapPin,
  Navigation,
  Filter,
  Menu,
  User,
  LogOut,
  Settings,
  Heart,
  Calendar,
  Globe,
  Tag,
  Banknote,
  Bell,
  X,
  AlertCircle
} from 'lucide-react';
import DistrictPlanner from './components/DistrictPlanner';
import MarketplaceCard from './components/MarketplaceCard';
import SmartRouteExplorer from './components/SmartRouteExplorer';
import PropertyDetail from './components/PropertyDetail';
import SafetyPanel from './components/SafetyPanel';
import { ACCOMMODATIONS, RESTAURANTS, RAIGAD_POIS, TOURS, CURRENT_ALERTS } from './constants';

type Tab = 'Explore' | 'Stays' | 'Dining' | 'Tours' | 'Planner';

const SectionBanner = ({ title, imageUrl }: { title: string; imageUrl: string }) => (
  <section className="relative h-32 rounded-3xl overflow-hidden mb-10 group shadow-sm">
    <img src={imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={title} />
    <div className="absolute inset-0 bg-black/40 flex items-center px-8">
      <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{title}</h2>
    </div>
  </section>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Explore');
  const [selectedItem, setSelectedItem] = useState<{ item: any, category: string } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Explore Filters
  const [talukaFilter, setTalukaFilter] = useState('All Talukas');
  const [typeFilter, setTypeFilter] = useState('All Types');

  // Stays Filters
  const [stayTypeFilter, setStayTypeFilter] = useState('All Types');
  const [stayPriceFilter, setStayPriceFilter] = useState('All Prices');

  const talukas = ['All Talukas', 'Alibaug', 'Murud', 'Mahad', 'Shrivardhan', 'Karjat', 'Sudhagad', 'Mangaon', 'Panvel'];
  const poiTypes = ['All Types', 'Tourist Spot', 'Heritage', 'Beach', 'View Point', 'Waterfall'];
  const stayTypes = ['All Types', 'Resort', 'Homestay', 'Hotel', 'Agri-tourism'];
  const priceRanges = ['All Prices', 'Budget', 'Mid-range', 'Luxury'];

  const filteredPois = useMemo(() => {
    return RAIGAD_POIS.filter(poi => {
      const matchTaluka = talukaFilter === 'All Talukas' || poi.taluka === talukaFilter;
      const matchType = typeFilter === 'All Types' || poi.type === typeFilter;
      return matchTaluka && matchType;
    });
  }, [talukaFilter, typeFilter]);

  const filteredStays = useMemo(() => {
    return ACCOMMODATIONS.filter(stay => {
      const matchType = stayTypeFilter === 'All Types' || stay.type === stayTypeFilter;
      let matchPrice = true;
      if (stayPriceFilter === 'Budget') matchPrice = stay.price < 3000;
      else if (stayPriceFilter === 'Mid-range') matchPrice = stay.price >= 3000 && stay.price <= 7000;
      else if (stayPriceFilter === 'Luxury') matchPrice = stay.price > 7000;
      return matchType && matchPrice;
    });
  }, [stayTypeFilter, stayPriceFilter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectItem = (item: any, category: string) => {
    setSelectedItem({ item, category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button
      onClick={() => {
        setSelectedItem(null);
        setActiveTab(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className={`flex flex-col items-center gap-1 transition-all px-4 py-1.5 rounded-2xl relative group ${
        activeTab === id && !selectedItem
        ? 'text-[#001F3F]' 
        : 'text-slate-400 hover:text-slate-700'
      }`}
    >
      <Icon className={`w-4 h-4 transition-transform group-active:scale-90 ${activeTab === id && !selectedItem ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
      <span className="text-[9px] font-bold tracking-tight uppercase">{label}</span>
      {activeTab === id && !selectedItem && (
        <span className="absolute -bottom-1 w-1 h-1 bg-[#001F3F] rounded-full" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-white text-[#1e293b] relative font-sans">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Premium Minimalist Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setActiveTab('Explore'); setSelectedItem(null); }}>
            <Compass className="w-5 h-5 text-[#001F3F] group-hover:rotate-12 transition-transform" />
            <span className="text-lg font-bold tracking-tighter text-[#001F3F]">Raigad.</span>
          </div>

          <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 gap-3 min-w-[300px] hover:bg-slate-100 transition-colors cursor-pointer group">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#001F3F]" />
            <span className="text-[11px] font-semibold text-slate-400">Search landmarks, stays...</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2.5 rounded-full relative transition-all active:scale-95 ${isNotificationsOpen ? 'bg-slate-100 text-[#001F3F]' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                <Bell className="w-4 h-4" />
                {CURRENT_ALERTS.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
                  <div className="px-5 py-2 border-b border-slate-50 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Regional Alerts</p>
                    <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-300 hover:text-slate-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto no-scrollbar py-2">
                    {CURRENT_ALERTS.length > 0 ? (
                      CURRENT_ALERTS.map(alert => (
                        <div key={alert.id} className="px-5 py-4 hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-50">
                          <div className="flex gap-4">
                            <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${alert.severity === 'high' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                              <AlertCircle className="w-4 h-4" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="text-[11px] font-bold text-[#001F3F] uppercase tracking-tight">{alert.title}</h5>
                              <p className="text-[10px] text-slate-500 leading-relaxed">{alert.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-10 text-center space-y-2 px-5">
                        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">No active alerts</p>
                        <p className="text-[9px] text-slate-400">The region is currently safe for travel.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-3 pr-1.5 py-1.5 hover:shadow-md transition-all active:scale-95"
              >
                <Menu className="w-4 h-4 text-slate-500" />
                <div className="w-8 h-8 rounded-full bg-[#001F3F] flex items-center justify-center border border-slate-200 overflow-hidden text-white">
                  <User className="w-4 h-4" />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
                  <div className="px-4 py-3 border-b border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Hello</p>
                    <p className="text-xs font-bold text-[#001F3F] truncate">Traveler</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <Calendar className="w-3.5 h-3.5" /> Trips
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <Heart className="w-3.5 h-3.5" /> Favorites
                    </button>
                  </div>
                  <div className="h-px bg-slate-50 mx-4 my-1" />
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <Settings className="w-3.5 h-3.5" /> Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut className="w-3.5 h-3.5" /> Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-8 pb-32">
        
        {selectedItem ? (
          <PropertyDetail 
            item={selectedItem.item} 
            category={selectedItem.category as any} 
            onBack={() => setSelectedItem(null)} 
          />
        ) : (
          <div className="space-y-12">
            {activeTab === 'Explore' && (
              <div className="animate-in fade-in duration-500">
                <SectionBanner 
                  title="Discover Raigad" 
                  imageUrl="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=2000" 
                />

                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Region</span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {talukas.map(t => (
                          <button 
                            key={t} 
                            onClick={() => setTalukaFilter(t)}
                            className={`px-5 py-2 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${talukaFilter === t ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-1">
                        <Filter className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Type</span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {poiTypes.map(type => (
                          <button 
                            key={type} 
                            onClick={() => setTypeFilter(type)}
                            className={`px-5 py-2 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${typeFilter === type ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-end justify-between border-b border-slate-100 pb-2">
                      <h2 className="text-lg font-bold text-[#001F3F] uppercase tracking-tight">Cultural Landmarks</h2>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{filteredPois.length} Results</span>
                    </div>
                    {filteredPois.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredPois.map(poi => (
                          <MarketplaceCard key={poi.id} item={poi} category="poi" onClick={() => handleSelectItem(poi, 'poi')} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center border border-slate-100 rounded-3xl bg-slate-50/50">
                        <p className="text-slate-400 text-sm font-medium">No experiences found for this selection.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Stays' && (
              <div className="animate-in fade-in duration-500">
                <SectionBanner 
                  title="Curated Lodging" 
                  imageUrl="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" 
                />

                <div className="space-y-10 mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Property Type</span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {stayTypes.map(type => (
                          <button 
                            key={type} 
                            onClick={() => setStayTypeFilter(type)}
                            className={`px-5 py-2 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${stayTypeFilter === type ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-1">
                        <Banknote className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Price Range</span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {priceRanges.map(range => (
                          <button 
                            key={range} 
                            onClick={() => setStayPriceFilter(range)}
                            className={`px-5 py-2 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${stayPriceFilter === range ? 'bg-[#001F3F] text-white border-[#001F3F]' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-end justify-between border-b border-slate-100 pb-2">
                      <h2 className="text-lg font-bold text-[#001F3F] uppercase tracking-tight">Available Stays</h2>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{filteredStays.length} Results</span>
                    </div>
                    {filteredStays.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredStays.map(item => <MarketplaceCard key={item.id} item={item} category="accommodation" onClick={() => handleSelectItem(item, 'accommodation')} />)}
                      </div>
                    ) : (
                      <div className="py-20 text-center border border-slate-100 rounded-3xl bg-slate-50/50">
                        <p className="text-slate-400 text-sm font-medium">No stays match your current filters.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Dining' && (
              <div className="animate-in fade-in duration-500">
                <SectionBanner 
                  title="Konkan Gastronomy" 
                  imageUrl="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=2000" 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {RESTAURANTS.map(item => <MarketplaceCard key={item.id} item={item} category="restaurant" onClick={() => handleSelectItem(item, 'restaurant')} />)}
                </div>
              </div>
            )}

            {activeTab === 'Tours' && (
              <div className="animate-in fade-in duration-500">
                <SectionBanner 
                  title="Verified Expeditions" 
                  imageUrl="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=2000" 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {TOURS.map(item => <MarketplaceCard key={item.id} item={item} category="tour" onClick={() => handleSelectItem(item, 'tour')} />)}
                </div>
              </div>
            )}

            {activeTab === 'Planner' && (
              <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500">
                <SectionBanner 
                  title="Route Explorer" 
                  imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
                />
                
                {/* Google Maps style explorer with Smart Discovery */}
                <SmartRouteExplorer />

                <div className="pt-10 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-[#001F3F] mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <Calendar className="w-4 h-4" /> Quick Regional Plans
                  </h3>
                  <DistrictPlanner />
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Elegant Floating Bottom Nav */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-6 pointer-events-none">
        <nav className="max-w-md mx-auto bg-white/90 backdrop-blur-2xl border border-slate-200/50 shadow-2xl rounded-2xl p-2 flex items-center justify-around pointer-events-auto">
          <NavItem id="Explore" icon={Home} label="Exp" />
          <NavItem id="Stays" icon={Hotel} label="Stays" />
          <NavItem id="Dining" icon={UtensilsCrossed} label="Dine" />
          <NavItem id="Tours" icon={Award} label="Tours" />
          <NavItem id="Planner" icon={Compass} label="Plan" />
        </nav>
      </div>
    </div>
  );
};

export default App;
