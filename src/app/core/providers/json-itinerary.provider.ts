/**
 * JSON Itinerary Provider
 * Current implementation using static JSON data
 * Phase 1 provider
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ItineraryProvider,
  AdvancedFilters
} from '../models/itinerary-provider.interface';
import { ItineraryPlan, PlannerPreferences } from '../models/itinerary.model';
import {
  SAMPLE_ITINERARIES,
  getItinerary,
  getAvailableDestinations,
  getAvailableDurations
} from '../data/sample-itineraries';

@Injectable({
  providedIn: 'root'
})
export class JsonItineraryProvider implements ItineraryProvider {
  /**
   * Get itinerary from static JSON
   */
  getItinerary(
    destination: string,
    days: number,
    preferences?: PlannerPreferences,
    filters?: AdvancedFilters
  ): Observable<ItineraryPlan | null> {
    let itinerary = getItinerary(destination, days);

    if (itinerary && filters) {
      itinerary = this.applyFilters(itinerary, filters);
    }

    return of(itinerary);
  }

  /**
   * Get available destinations
   */
  async getAvailableDestinations(): Promise<
    Array<{ name: string; value: string }>
  > {
    return getAvailableDestinations();
  }

  /**
   * Get available durations for destination
   */
  async getAvailableDurations(destination: string): Promise<number[]> {
    return getAvailableDurations(destination);
  }

  /**
   * JSON provider is always ready
   */
  async isReady(): Promise<boolean> {
    return true;
  }

  /**
   * Apply advanced filters to itinerary
   * Modifies CTAs and activities based on filters
   */
  private applyFilters(
    itinerary: ItineraryPlan,
    filters: AdvancedFilters
  ): ItineraryPlan {
    const filtered = JSON.parse(JSON.stringify(itinerary)); // Deep clone

    filtered.itinerary = filtered.itinerary.map((day: any) => {
      // Filter CTAs based on budget
      if (filters.budget) {
        day.ctas = day.ctas.filter((cta: any) =>
          this.isCTAVisibleForBudget(cta, filters.budget!)
        );
      }

      // Filter CTAs based on pace
      if (filters.pace) {
        day.activities = day.activities.filter((activity: string) =>
          this.isActivityVisibleForPace(activity, filters.pace!)
        );
      }

      return day;
    });

    return filtered;
  }

  /**
   * Helper: Check if CTA should be visible for budget level
   */
  private isCTAVisibleForBudget(cta: any, budget: string): boolean {
    // By default, show all CTAs
    // Can be extended with metadata like: cta.budgetLevel = ['mid', 'luxury']
    return true;
  }

  /**
   * Helper: Check if activity should be visible for pace
   */
  private isActivityVisibleForPace(activity: string, pace: string): boolean {
    // Quick-paced activities: water sports, extreme sports
    // Relaxed activities: beach, spa, nature walks
    const quickActivities = [
      'water sports',
      'rock climbing',
      'paragliding',
      'trekking',
      'skiing'
    ];
    const relaxedActivities = [
      'beach',
      'walks',
      'spa',
      'rest',
      'relaxation',
      'dining'
    ];

    const activityLower = activity.toLowerCase();

    if (pace === 'fast') {
      return quickActivities.some(a => activityLower.includes(a));
    } else if (pace === 'relaxed') {
      return relaxedActivities.some(a => activityLower.includes(a));
    }

    // balanced: show all
    return true;
  }
}
