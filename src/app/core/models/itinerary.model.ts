/**
 * Itinerary Data Model
 * Core structure for Trip Planner feature
 */

export type AffiliateType = 'agoda' | 'getyourguide' | 'amazon' | 'abhibus' | 'makemytrip' | 'flipkart';
export type CTAType = 'hotel' | 'activity' | 'essential' | 'transport' | 'food';

export interface ItineraryCTA {
  type: CTAType;
  label: string;
  affiliate: AffiliateType;
  link?: string; // Will be filled by affiliate service
  emoji?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  emoji?: string;
  places: string[];
  activities: string[];
  ctas: ItineraryCTA[];
}

export interface ItineraryPlan {
  destination: string;
  destinationEmoji?: string;
  days: number;
  title: string;
  description: string;
  itinerary: ItineraryDay[];
  bestTime?: string;
  budget?: string;
}

export interface ItineraryDatabase {
  [destination: string]: {
    [days: number | string]: ItineraryPlan;
  };
}

export interface PlannerPreferences {
  travelType: ('relaxed' | 'family' | 'adventure' | 'budget')[];
  accommodation?: 'budget' | 'mid-range' | 'luxury';
  pace?: 'slow' | 'moderate' | 'fast';
  destinationData?: any; // ✅ Destination object from MongoDB API (for smart itinerary mapping)
}
