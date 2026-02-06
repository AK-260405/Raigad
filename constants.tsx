
import { POI, Accommodation, Restaurant, Guide, Tour, Alert } from './types';

export const RAIGAD_POIS: POI[] = [
  {
    id: '1',
    name: 'Raigad Fort',
    type: 'Heritage',
    taluka: 'Mahad',
    location: { lat: 18.2347, lng: 73.4464 },
    description: 'The crowning jewel of the Maratha Empire. Perched at 2,700 feet, this "Gibraltar of the East" served as the capital under Chhatrapati Shivaji Maharaj. Explore the majestic Holi Cha Mal, the royal courtroom (Darbar), and the daunting Takmak Tok cliff.',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
    extraTime: '+4 hrs',
    rating: 4.9,
    reviews: 5200,
    features: ['Ropeway Access', 'Historical Darbar', 'Takmak Tok Point']
  },
  {
    id: '2',
    name: 'Murud-Janjira',
    type: 'Heritage',
    taluka: 'Murud',
    location: { lat: 18.2990, lng: 72.9641 },
    description: 'A colossal marine fortress situated on an oval rock off the Arabian Sea coast. Built by the Siddis, it stands as the only unconquered fort along India\'s western coast, housing sweet water wells despite being surrounded by salt water.',
    imageUrl: 'https://images.unsplash.com/photo-1590402444521-82d8c385c94d?auto=format&fit=crop&q=80&w=800',
    extraTime: '+2.5 hrs',
    rating: 4.8,
    reviews: 3100,
    features: ['Boat Ride Entrance', 'Marine Architecture', 'Ancient Canons']
  },
  {
    id: '3',
    name: 'Harihareshwar',
    type: 'Beach',
    taluka: 'Shrivardhan',
    location: { lat: 17.9941, lng: 73.0233 },
    description: 'Known as the "Dakshin Kashi" for its spiritual significance and pristine coastline. The town is surrounded by four hills offered a unique blend of pilgrimage and scenic beauty.',
    imageUrl: 'https://images.unsplash.com/photo-1544919375-3b764b889396?auto=format&fit=crop&q=80&w=800',
    extraTime: '+1.5 hrs',
    rating: 4.7,
    reviews: 1800,
    features: ['Pradakshina Path', 'Black Sand Beach', 'Ancient Shiva Temple']
  },
  {
    id: '4',
    name: 'Sudhagad Fort',
    type: 'Heritage',
    taluka: 'Sudhagad',
    location: { lat: 18.4988, lng: 73.3155 },
    description: 'A well-preserved hilltop fort near Pali. Shivaji Maharaj initially considered it for his capital before choosing Raigad. It features sprawling plateaus and the magnificent "Maha Darwaja".',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    extraTime: '+3 hrs',
    rating: 4.6,
    reviews: 950,
    features: ['Bhorai Devi Temple', 'Massive Plateau', 'Trekking Route']
  },
  {
    id: '5',
    name: 'Diveagar Beach',
    type: 'Beach',
    taluka: 'Shrivardhan',
    location: { lat: 18.1691, lng: 72.9866 },
    description: 'A 5km long stretch of shimmering sand surrounded by Suru (casuarina) trees. Famous for the Suvarna Ganesha temple.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    extraTime: '+1 hr',
    rating: 4.8,
    reviews: 2400,
    features: ['Water Sports', 'Sunset View', 'Casuarina Groves']
  },
  {
    id: '6',
    name: 'Kondana Caves',
    type: 'Tourist Spot',
    taluka: 'Karjat',
    location: { lat: 18.8152, lng: 73.3764 },
    description: 'Ancient Buddhist caves dating back to the 1st Century BC. Located in Karjat, the trek leads through lush forests and a spectacular waterfall.',
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=800',
    extraTime: '+2 hrs',
    rating: 4.5,
    reviews: 720,
    features: ['Buddhist Stupas', 'Monsoon Trek', 'Cave Inscriptions']
  },
  {
    id: '7',
    name: 'Revdanda Fort',
    type: 'Heritage',
    taluka: 'Alibaug',
    location: { lat: 18.5552, lng: 72.9332 },
    description: 'A Portuguese fort situated at the mouth of the Kundalika River. The fort is known for its sprawling walls.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
    extraTime: '+1.5 hrs',
    rating: 4.4,
    reviews: 890,
    features: ['Beach Proximity', 'Portuguese Ruins', 'Creek Views']
  },
  {
    id: '8',
    name: 'Tamhini View Point',
    type: 'View Point',
    taluka: 'Mangaon',
    location: { lat: 18.4552, lng: 73.3332 },
    description: 'A spectacular mountain pass that connects Pune to the Konkan coast. Famous for its lush green hills.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    extraTime: '+1 hr',
    rating: 4.9,
    reviews: 1500,
    features: ['Waterfall Valley', 'Foggy Pass', 'Photography Spot']
  }
];

export const ACCOMMODATIONS: Accommodation[] = [
    {
        id: 'h1',
        name: 'Radisson Blu Resort & Spa',
        type: 'Resort',
        price: 9200,
        rating: 4.8,
        reviews: 2150,
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
        features: ['Premium Spa', 'Infinity Pool', 'Private Beach Access'],
        isVerified: true
    },
    {
        id: 'h2',
        name: 'The Kokum Tree Homestay',
        type: 'Homestay',
        price: 4500,
        rating: 4.9,
        reviews: 120,
        imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=800',
        features: ['Farm-to-Table Meals', 'Nature Trails', 'Pet Friendly'],
        isVerified: true
    },
    {
        id: 'h3',
        name: 'Forest Hills Tala',
        type: 'Resort',
        price: 12000,
        rating: 4.7,
        reviews: 680,
        imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
        features: ['Luxury Glamping', 'Sunset Deck', 'Eco-Conscious'],
        isVerified: true
    },
    {
        id: 'h4',
        name: 'Savali Agri-Tourism',
        type: 'Agri-tourism',
        price: 2800,
        rating: 4.6,
        reviews: 210,
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
        features: ['Organic Orchard Tour', 'Authentic Thali', 'Rural Living'],
        isVerified: true
    }
];

export const RESTAURANTS: Restaurant[] = [
    {
        id: 'r1',
        name: 'Sanman Restaurant',
        specialty: 'Authentic Gomantak Seafood',
        isKhanaval: false,
        rating: 4.7,
        reviews: 3400,
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'r2',
        name: 'Mauli Traditional Khanaval',
        specialty: 'Wood-fired Veg Thali',
        isKhanaval: true,
        rating: 4.9,
        reviews: 1100,
        imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800'
    }
];

export const CURRENT_ALERTS: Alert[] = [
  {
    id: 'a1',
    type: 'HighTide',
    severity: 'high',
    title: 'High Tide Warning: Alibaug Coast',
    message: 'Extreme high tide (4.5m) expected at 14:45. Ferries to Murud-Janjira are suspended.'
  }
];

export const TOURS: Tour[] = [
    {
        id: 't1',
        title: 'Raigad: The Coronation Path',
        duration: '7 Hours',
        category: 'History',
        price: 1800,
        rating: 4.9,
        reviews: 1240,
        imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
        itineraryPoints: [
          { name: 'Pachad Base', lat: 10, lng: 10 },
          { name: 'Maha Darwaja', lat: 30, lng: 25 },
          { name: 'Holi Cha Mal', lat: 50, lng: 45 },
          { name: 'Rajdarbar', lat: 70, lng: 60 },
          { name: 'Jagdishwar Temple', lat: 90, lng: 85 }
        ]
    }
];
