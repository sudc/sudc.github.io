/**
 * Provider-agnostic data models
 * Use these interfaces across all hotel data providers (Agoda, MakeMyTrip, Booking.com, etc.)
 */

export interface Hotel {
  hotelId: string;
  hotelName: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice: number;
  discount: number;
  currency: string;
  image: string;
  description: string;
  amenities: string[];
  checkInDate: string;
  checkOutDate: string;
  provider: string; // 'agoda', 'makemytrip', 'booking', etc.
  affiliateUrl: string;
  lastUpdated: string;
}

export interface ProviderConfig {
  name: string; // 'agoda', 'makemytrip', 'booking'
  csvPath: string;
  chunkSize: number;
  fieldMapping: Record<string, string>; // Maps CSV columns to Hotel interface
}

export interface ParsedHotelData {
  hotels: Hotel[];
  provider: string;
  totalRecords: number;
  parseTime: number; // ms
}
