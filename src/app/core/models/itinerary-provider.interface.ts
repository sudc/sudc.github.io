/**
 * Itinerary Provider Interface
 * Abstraction for different itinerary sources
 * Allows seamless switching between JSON and AI providers
 */

import { Observable } from 'rxjs';
import { ItineraryPlan, PlannerPreferences } from '../models/itinerary.model';

export interface AdvancedFilters {
  budget?: 'low' | 'mid' | 'luxury';
  pace?: 'relaxed' | 'balanced' | 'fast';
  accommodation?: 'hotel' | 'hostel' | 'homestay';
  travelType?: 'family' | 'couple' | 'solo' | 'group';
}

export interface ItineraryProvider {
  /**
   * Get itinerary for destination and duration
   * Returns Observable to support both sync (JSON) and async (AI) sources
   */
  getItinerary(
    destination: string,
    days: number,
    preferences?: PlannerPreferences,
    filters?: AdvancedFilters
  ): Observable<ItineraryPlan | null>;

  /**
   * Get available destinations
   */
  getAvailableDestinations(): Promise<Array<{ name: string; value: string }>>;

  /**
   * Get available durations for a destination
   */
  getAvailableDurations(destination: string): Promise<number[]>;

  /**
   * Check if provider is ready (e.g., API connection established)
   */
  isReady(): Promise<boolean>;
}
