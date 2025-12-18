/**
 * DEPRECATED: Destinations Data (Static)
 * ======================================
 * 
 * This file is NO LONGER USED.
 * 
 * All destination data is now stored in MongoDB Atlas.
 * 
 * Frontend fetches destinations via API:
 * GET /api/destinations
 * 
 * For development, use the MongoDB seed endpoint:
 * GET /api/seed-destinations
 * 
 * See: MONGODB_MIGRATION_GUIDE.md for setup instructions
 */

// Type definitions maintained for backward compatibility
export type DestinationType = 'beach' | 'hill' | 'city' | 'heritage' | 'island' | 'wildlife' | 'spiritual' | 'adventure';

export type DestinationCategory = 
  | 'Beach' | 'Mountain' | 'Hill' | 'Heritage' | 'Spiritual'
  | 'Adventure' | 'Nature' | 'Wildlife' | 'City' | 'Coastal'
  | 'Backwaters' | 'Party' | 'Romantic' | 'Snow' | 'Ski'
  | 'Colonial' | 'Island' | 'Culture' | 'Lake' | 'Temple';

export type ClimateType = 
  | 'tropical' | 'cold' | 'hot' | 'moderate' | 'humid'
  | 'cool' | 'extreme' | 'cold_desert' | 'wet';

export type BudgetType = 'budget' | 'moderate' | 'premium' | 'low' | 'medium' | 'high';

export interface ExperienceScores {
  beach?: number;
  adventure?: number;
  relaxation?: number;
  nightlife?: number;
  family?: number;
  couple?: number;
  cultural?: number;
  spiritual?: number;
  nature?: number;
  wildlife?: number;
  heritage?: number;
  romance?: number;
  [key: string]: number | undefined;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  country?: string;
  type: DestinationType;
  categories?: DestinationCategory[];
  tags?: string[];
  bestMonths?: number[] | string[];
  avoidMonths?: number[];
  climate?: ClimateType;
  budget?: BudgetType;
  scores: ExperienceScores;
  agoda?: string;
  idealTripDays?: number;
}

// ⚠️ EMPTY - All data now in MongoDB Atlas
export const DESTINATIONS_DATA: Record<string, Destination> = {};
