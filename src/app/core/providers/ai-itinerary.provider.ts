/**
 * AI Itinerary Provider (Phase 2)
 * Skeleton for AI-generated itineraries
 * To be implemented with LLM integration in Phase 2
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ItineraryProvider,
  AdvancedFilters
} from '../models/itinerary-provider.interface';
import { ItineraryPlan, PlannerPreferences } from '../models/itinerary.model';
import { JsonItineraryProvider } from './json-itinerary.provider';

@Injectable({
  providedIn: 'root'
})
export class AiItineraryProvider implements ItineraryProvider {
  /**
   * Fallback to JSON provider for now
   * In Phase 2, replace this with actual AI API call
   */
  private jsonProvider = new JsonItineraryProvider();

  /**
   * Get AI-generated itinerary
   * Phase 2: Call to LLM API (OpenAI, Claude, etc.)
   */
  getItinerary(
    destination: string,
    days: number,
    preferences?: PlannerPreferences,
    filters?: AdvancedFilters
  ): Observable<ItineraryPlan | null> {
    // Phase 2 Implementation:
    // 1. Build prompt from destination, days, preferences, filters
    // 2. Call LLM API
    // 3. Parse response to ItineraryPlan model
    // 4. Cache result (optional)
    // 5. Return Observable

    // For now, fallback to JSON provider
    return this.jsonProvider.getItinerary(
      destination,
      days,
      preferences,
      filters
    );
  }

  /**
   * Get available destinations from AI (or cached list)
   */
  async getAvailableDestinations(): Promise<
    Array<{ name: string; value: string }>
  > {
    // Phase 2: Could fetch from API or use expanded list
    return this.jsonProvider.getAvailableDestinations();
  }

  /**
   * Get available durations
   */
  async getAvailableDurations(destination: string): Promise<number[]> {
    return this.jsonProvider.getAvailableDurations(destination);
  }

  /**
   * Check if AI API is ready
   */
  async isReady(): Promise<boolean> {
    // Phase 2: Check API key, connectivity, etc.
    return this.jsonProvider.isReady();
  }

  /**
   * Phase 2: Generate itinerary prompt
   * Helper method for LLM integration
   */
  private buildPrompt(
    destination: string,
    days: number,
    preferences?: PlannerPreferences,
    filters?: AdvancedFilters
  ): string {
    // Example prompt structure for Phase 2
    // This will be sent to LLM API

    let prompt = `Generate a ${days}-day itinerary for ${destination}.\n`;

    if (preferences?.travelType?.length) {
      prompt += `Travel style: ${preferences.travelType.join(', ')}\n`;
    }

    if (filters?.budget) {
      prompt += `Budget level: ${filters.budget}\n`;
    }

    if (filters?.pace) {
      prompt += `Pace: ${filters.pace}\n`;
    }

    prompt += `Return as JSON with this structure:
    {
      "destination": "...",
      "days": number,
      "title": "...",
      "description": "...",
      "itinerary": [
        {
          "day": number,
          "title": "...",
          "places": [...],
          "activities": [...],
          "ctas": [
            {
              "type": "hotel|activity|essential|transport|food",
              "label": "...",
              "affiliate": "agoda|getyourguide|amazon|abhibus|makemytrip"
            }
          ]
        }
      ]
    }`;

    return prompt;
  }
}
