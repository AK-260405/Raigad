
export interface POI {
  id: string;
  name: string;
  type: 'Tourist Spot' | 'Heritage' | 'Beach' | 'View Point' | 'Waterfall';
  taluka: 'Alibaug' | 'Murud' | 'Mahad' | 'Shrivardhan' | 'Karjat' | 'Sudhagad' | 'Mangaon' | 'Panvel';
  location: { lat: number; lng: number };
  description: string;
  imageUrl: string;
  distanceFromUser?: string;
  extraTime?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'Resort' | 'Homestay' | 'Hotel' | 'Agri-tourism';
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  features: string[];
  isVerified: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  specialty: string;
  isKhanaval: boolean;
  rating: number;
  reviews: number;
  imageUrl: string;
}

export interface Guide {
  id: string;
  name: string;
  expertise: string[];
  languages: string[];
  rating: number;
  reviews: number;
  pricePerDay: number;
  imageUrl: string;
  isCertified: boolean;
}

export interface Tour {
  id: string;
  title: string;
  duration: string;
  category: 'History' | 'Nature' | 'Culinary' | 'Adventure';
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  guideId?: string;
  itineraryPoints?: { name: string; lat: number; lng: number }[];
}

export interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    title: string;
    location: string;
    description: string;
  }[];
}

export interface Alert {
  id: string;
  type: 'HighTide' | 'Rainfall' | 'General';
  severity: 'high' | 'medium' | 'low';
  title: string;
  message: string;
}
