// RideNet Solution — Mock Data

export type Vehicle = {
  id: string
  name: string
  brand: string
  category: 'sedan' | 'suv' | 'luxury' | 'van' | 'truck'
  seats: number
  transmission: 'Auto' | 'Manual'
  pricePerDay: number
  image: string
  fuel: string
  available: boolean
  features: string[]
}

export type Tour = {
  id: string
  name: string
  destination: string
  duration: string
  fromPrice: number
  rating: number
  reviewCount: number
  image: string
  badge?: string
  highlights: string[]
  groupSize: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type Booking = {
  id: string
  reference: string
  customerName: string
  customerPhone: string
  customerEmail: string
  serviceType: 'Car Rental' | 'Airport Transfer' | 'City Tour' | 'Safari' | 'Corporate' | 'Event' | 'Freight' | 'Customs'
  serviceDetail: string
  date: string
  time: string
  pickupLocation?: string
  dropoffLocation?: string
  flightNumber?: string
  groupSize?: number
  notes?: string
  status: BookingStatus
  budget?: string
  assignedDriver?: string
  assignedVehicle?: string
  createdAt: string
}

export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Toyota Fortuner',
    brand: 'Toyota',
    category: 'suv',
    seats: 7,
    transmission: 'Auto',
    pricePerDay: 180,
    image: '/images/fortuner.jpg',
    fuel: 'Diesel',
    available: true,
    features: ['4WD', 'AC', 'Bluetooth', 'USB Charging'],
  },
  {
    id: 'v2',
    name: 'Toyota Land Cruiser 200',
    brand: 'Toyota',
    category: 'luxury',
    seats: 7,
    transmission: 'Auto',
    pricePerDay: 320,
    image: '/images/landcruiser.jpg',
    fuel: 'Diesel',
    available: true,
    features: ['4WD', 'Leather Seats', 'Sunroof', 'GPS'],
  },
  {
    id: 'v3',
    name: 'Toyota Hiace',
    brand: 'Toyota',
    category: 'van',
    seats: 14,
    transmission: 'Manual',
    pricePerDay: 220,
    image: '/images/hiace.jpg',
    fuel: 'Diesel',
    available: true,
    features: ['AC', 'Large Cargo Space', 'Roof Rack'],
  },
  {
    id: 'v4',
    name: 'Mercedes-Benz E-Class',
    brand: 'Mercedes',
    category: 'luxury',
    seats: 5,
    transmission: 'Auto',
    pricePerDay: 280,
    image: '/images/eclass.jpg',
    fuel: 'Petrol',
    available: false,
    features: ['Leather Seats', 'Ambient Lighting', 'Premium Sound'],
  },
  {
    id: 'v5',
    name: 'Toyota Corolla',
    brand: 'Toyota',
    category: 'sedan',
    seats: 5,
    transmission: 'Auto',
    pricePerDay: 85,
    image: '/images/corolla.jpg',
    fuel: 'Petrol',
    available: true,
    features: ['AC', 'Bluetooth', 'Fuel Efficient'],
  },
  {
    id: 'v6',
    name: 'Ford Ranger',
    brand: 'Ford',
    category: 'truck',
    seats: 5,
    transmission: 'Auto',
    pricePerDay: 150,
    image: '/images/ranger.jpg',
    fuel: 'Diesel',
    available: true,
    features: ['4WD', 'Canopy', 'Tow Bar', 'Payload 1T'],
  },
]

export const tours: Tour[] = [
  {
    id: 't1',
    name: 'Victoria Falls Day Trip',
    destination: 'Victoria Falls, Livingstone',
    duration: '1 Day',
    fromPrice: 120,
    rating: 4.9,
    reviewCount: 284,
    image: '/images/victoria-falls.jpg',
    badge: 'Best Seller',
    highlights: ['Guided tour', 'Lunch included', 'Hotel transfer'],
    groupSize: '2–12 pax',
  },
  {
    id: 't2',
    name: 'Lower Zambezi Safari',
    destination: 'Lower Zambezi National Park',
    duration: '3 Days',
    fromPrice: 480,
    rating: 4.8,
    reviewCount: 136,
    image: '/images/zambezi-safari.jpg',
    badge: 'Reserve now / Pay later',
    highlights: ['Game drives', 'Canoe safari', 'Full board', 'Park fees'],
    groupSize: '2–8 pax',
  },
  {
    id: 't3',
    name: 'Lusaka City & Culture Tour',
    destination: 'Lusaka',
    duration: '4 Hours',
    fromPrice: 55,
    rating: 4.6,
    reviewCount: 98,
    image: '/images/lusaka-tour.jpg',
    highlights: ['Market visit', 'Museum', 'Local lunch'],
    groupSize: '1–10 pax',
  },
  {
    id: 't4',
    name: 'South Luangwa Safari Package',
    destination: 'South Luangwa National Park',
    duration: '5 Days',
    fromPrice: 950,
    rating: 4.9,
    reviewCount: 217,
    image: '/images/luangwa.jpg',
    badge: 'Reserve now / Pay later',
    highlights: ['Walking safari', 'Night drives', 'Lodge', 'All meals'],
    groupSize: '2–6 pax',
  },
]

export const bookings: Booking[] = [
  {
    id: 'b1',
    reference: 'RN-0042',
    customerName: 'James Mwale',
    customerPhone: '+260 97 123 4567',
    customerEmail: 'james.mwale@email.com',
    serviceType: 'Airport Transfer',
    serviceDetail: 'Kenneth Kaunda Intl → Intercontinental Hotel',
    date: '2026-03-02',
    time: '14:30',
    pickupLocation: 'Kenneth Kaunda International Airport',
    dropoffLocation: 'Intercontinental Hotel, Lusaka',
    flightNumber: 'QZ 408',
    notes: 'VIP guest, meet & greet required',
    status: 'pending',
    createdAt: '2026-02-28T08:12:00Z',
  },
  {
    id: 'b2',
    reference: 'RN-0041',
    customerName: 'Chanda Mwanza',
    customerPhone: '+260 96 987 6543',
    customerEmail: 'c.mwanza@corp.co.zm',
    serviceType: 'Car Rental',
    serviceDetail: 'Toyota Fortuner — 5 days',
    date: '2026-03-01',
    time: '09:00',
    notes: 'Corporate rate, invoice needed',
    status: 'confirmed',
    assignedDriver: 'Moses Banda',
    assignedVehicle: 'Toyota Fortuner (ABK 4521)',
    createdAt: '2026-02-27T14:30:00Z',
  },
  {
    id: 'b3',
    reference: 'RN-0040',
    customerName: 'Sarah Johnson',
    customerPhone: '+44 7700 900 123',
    customerEmail: 's.johnson@travel.uk',
    serviceType: 'Safari',
    serviceDetail: 'Lower Zambezi — 3 day safari',
    date: '2026-03-05',
    time: '07:00',
    groupSize: 4,
    notes: 'Vegetarian meal request for 2 guests',
    status: 'confirmed',
    assignedDriver: 'Peter Lungu',
    assignedVehicle: 'Toyota Land Cruiser (ADE 7823)',
    createdAt: '2026-02-26T10:00:00Z',
  },
  {
    id: 'b4',
    reference: 'RN-0039',
    customerName: 'Bwalya Enterprises Ltd',
    customerPhone: '+260 21 123 4567',
    customerEmail: 'admin@bwalya.co.zm',
    serviceType: 'Freight',
    serviceDetail: 'Ndola → Lusaka — 3 tons',
    date: '2026-02-28',
    time: '06:00',
    pickupLocation: 'Ndola Industrial Area',
    dropoffLocation: 'Lusaka CBD Warehouse',
    notes: 'Fragile goods — electronics',
    status: 'completed',
    assignedVehicle: 'Isuzu FRR (ABZ 1290)',
    createdAt: '2026-02-20T08:00:00Z',
  },
  {
    id: 'b5',
    reference: 'RN-0038',
    customerName: 'Mutale Phiri',
    customerPhone: '+260 95 456 7890',
    customerEmail: 'mutale.phiri@gmail.com',
    serviceType: 'City Tour',
    serviceDetail: 'Lusaka City & Culture Tour',
    date: '2026-02-27',
    time: '09:30',
    groupSize: 3,
    status: 'completed',
    createdAt: '2026-02-25T16:20:00Z',
  },
  {
    id: 'b6',
    reference: 'RN-0037',
    customerName: 'MTN Zambia (Event)',
    customerPhone: '+260 21 432 1000',
    customerEmail: 'events@mtn.zm',
    serviceType: 'Event',
    serviceDetail: 'Annual Awards Night — 8 vehicles',
    date: '2026-03-08',
    time: '17:00',
    notes: '8 sedans, drivers in formal attire required',
    status: 'pending',
    createdAt: '2026-02-28T09:45:00Z',
  },
]

export const kpiData = {
  newLeads: 12,
  pending: 5,
  confirmed: 8,
  completed: 34,
  totalRevenue: 18420,
  monthlyGrowth: 23,
}
