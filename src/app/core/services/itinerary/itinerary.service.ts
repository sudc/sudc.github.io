import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ItineraryPlan, PlannerPreferences } from '../../models/itinerary.model';
import { ItineraryProvider, AdvancedFilters } from '../../models/itinerary-provider.interface';
import { JsonItineraryProvider } from '../../providers/json-itinerary.provider';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  /**
   * Provider abstraction - switch between JSON and AI
   * Can be controlled via environment variables or feature flags
   */
  private provider: ItineraryProvider = inject(JsonItineraryProvider);

  private currentPlan = new BehaviorSubject<ItineraryPlan | null>(null);
  public currentPlan$ = this.currentPlan.asObservable();

  private preferences = new BehaviorSubject<PlannerPreferences>({
    travelType: []
  });
  public preferences$ = this.preferences.asObservable();

  private filters = new BehaviorSubject<AdvancedFilters>({});
  public filters$ = this.filters.asObservable();

  constructor() {}

  /**
   * Set the provider (for testing or dynamic switching)
   */
  setProvider(provider: ItineraryProvider): void {
    this.provider = provider;
  }

  /**
   * Generate itinerary for destination and duration
   * Delegates to provider - can be JSON or AI
   */
  generatePlan(
    destination: string,
    days: number,
    preferences?: PlannerPreferences,
    filters?: AdvancedFilters
  ): Observable<ItineraryPlan | null> {
    if (preferences) {
      this.preferences.next(preferences);
    }
    if (filters) {
      this.filters.next(filters);
    }

    // Call provider and update current plan
    return this.provider.getItinerary(destination, days, preferences, filters);
  }

  /**
   * Get current plan
   */
  getPlan(): ItineraryPlan | null {
    return this.currentPlan.value;
  }

  /**
   * Get current plan as observable
   */
  getPlan$(): Observable<ItineraryPlan | null> {
    return this.currentPlan$;
  }

  /**
   * Set preferences
   */
  setPreferences(prefs: PlannerPreferences): void {
    this.preferences.next(prefs);
  }

  /**
   * Set advanced filters
   */
  setFilters(filters: AdvancedFilters): void {
    this.filters.next(filters);
  }

  /**
   * Get filters
   */
  getFilters(): AdvancedFilters {
    return this.filters.value;
  }

  /**
   * Get available destinations
   */
  async getDestinations() {
    return this.provider.getAvailableDestinations();
  }

  /**
   * Get available durations for destination
   */
  async getDurations(destination: string) {
    return this.provider.getAvailableDurations(destination);
  }

  /**
   * Clear current plan
   */
  clearPlan(): void {
    this.currentPlan.next(null);
    this.preferences.next({ travelType: [] });
    this.filters.next({});
  }

  /**
   * Check if provider is ready
   */
  async isProviderReady(): Promise<boolean> {
    return this.provider.isReady();
  }
}
