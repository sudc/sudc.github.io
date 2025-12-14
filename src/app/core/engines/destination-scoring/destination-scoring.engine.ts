/**
 * DESTINATION SCORING ENGINE
 * ==========================
 * 
 * Simple scoring engine for destinations
 */

import { Injectable } from '@angular/core';
import { BaseEngine, BaseEngineConfig, BaseEngineResult } from '../base.engine';
import { DESTINATIONS_DATA, Destination } from '../destination/destinations.data';

export interface UserPreferences {
  categories: string[];
  month: number;
  budget: 'budget' | 'moderate' | 'premium';
}

export interface ScoredDestination {
  destinationId: string;
  destination: Destination;
  score: number;
  reasons: string[];
}

export interface DestinationScoringInput {
  userPreferences: UserPreferences;
}

export interface DestinationScoringResult extends BaseEngineResult {
  recommendations: ScoredDestination[];
}

@Injectable()
export class DestinationScoringEngine extends BaseEngine<DestinationScoringInput, DestinationScoringResult> {
  
  protected config: BaseEngineConfig = {
    name: 'DestinationScoringEngine',
    version: '1.0.0',
    enabled: true
  };

  async process(input: DestinationScoringInput): Promise<DestinationScoringResult> {
    this.log('Starting destination scoring');

    if (!this.validateInput(input)) {
      throw new Error('Invalid input');
    }

    const scored: ScoredDestination[] = [];
    
    for (const [id, destination] of Object.entries(DESTINATIONS_DATA)) {
      const score = this.scoreDestination(destination, input.userPreferences);
      scored.push({
        destinationId: id,
        destination,
        score,
        reasons: [`Score: ${score}`]
      });
    }

    scored.sort((a, b) => b.score - a.score);

    return {
      engineName: this.config.name,
      timestamp: new Date(),
      success: true,
      recommendations: scored.slice(0, 5)
    };
  }

  protected validateInput(input: DestinationScoringInput): boolean {
    return !!input?.userPreferences;
  }

  private scoreDestination(dest: Destination, prefs: UserPreferences): number {
    let score = 50;
    
    // Budget match
    if (dest.budget === prefs.budget) {
      score += 20;
    }
    
    // Month match
    if (dest.bestMonths.includes(prefs.month)) {
      score += 30;
    }
    
    return score;
  }
}
