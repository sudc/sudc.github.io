/**
 * DESTINATION SCORING ENGINE
 * ==========================
 * 
 * Comprehensive scoring engine for destinations based on multiple factors
 */

import { Injectable } from '@angular/core';
import { BaseEngine, BaseEngineConfig, BaseEngineResult } from '../base.engine';
import { Destination, DESTINATIONS_DATA } from '../destination/destinations.data';

export interface UserPreferences {
  categories: string[];
  month: number;
  budget: 'budget' | 'moderate' | 'premium';
  climate?: string[];
}

export interface ScoredDestination {
  destinationId: string;
  destination: Destination;
  score: number;
  reasons: string[];
  badges: string[];
  interestMatchScore?: number; // ✅ NEW: Explicit interest score
}

export interface DestinationScoringInput {
  userPreferences: UserPreferences;
}

export interface DestinationScoringResult extends BaseEngineResult {
  recommendations: ScoredDestination[];
  totalDestinationsScored: number;
}

@Injectable()
export class DestinationScoringEngine extends BaseEngine<DestinationScoringInput, DestinationScoringResult> {
  
  protected config: BaseEngineConfig = {
    name: 'DestinationScoringEngine',
    version: '2.0.0',
    enabled: true
  };

  async process(input: DestinationScoringInput): Promise<DestinationScoringResult> {
    this.log('Starting destination scoring with enhanced algorithm');

    if (!this.validateInput(input)) {
      throw new Error('Invalid input');
    }

    // 🚀 SKIP MongoDB entirely - use static data IMMEDIATELY (no async wait)
    console.warn('⚠️ MongoDB disabled - using instant static data');
    let destinations = Object.values(DESTINATIONS_DATA) as Destination[];
    console.log(`📊 Loaded ${destinations.length} destinations from static data (instant)`);

    const scored: ScoredDestination[] = [];
    
    // 🔒 HARD FILTER: Only process destinations matching user interests
    const userCategories = input.userPreferences.categories || [];
    console.log(`\n🎯 USER INTERESTS (raw):`, userCategories);
    console.log(`🎯 USER INTERESTS (count): ${userCategories.length}`);
    
    for (const destination of destinations) {
      // ✅ HARD FILTER: Skip destinations that don't match user interests
      if (userCategories.length > 0) {
        console.log(`\n🔍 Checking ${destination.state}...`);
        console.log(`   Categories: ${JSON.stringify(destination.categories)}`);
        console.log(`   User wants: ${JSON.stringify(userCategories)}`);
        
        const hasInterestMatch = destination.categories.some(cat => {
          const matches = userCategories.includes(cat);
          console.log(`     - ${cat} in user categories? ${matches}`);
          return matches;
        });
        
        if (!hasInterestMatch) {
          console.log(`   ⏭️ FILTERED OUT: No match found`);
          continue; // Skip this destination entirely - NEVER show it
        } else {
          const matchedCats = destination.categories.filter(c => userCategories.includes(c));
          console.log(`   ✅ PASSED FILTER: Matches ${JSON.stringify(matchedCats)}`);
        }
      }

      const { score, reasons, badges, interestMatchScore } = this.scoreDestination(destination, input.userPreferences);
      scored.push({
        destinationId: (destination as any)._id || '',
        destination,
        score,
        reasons,
        badges,
        interestMatchScore // ✅ Pass the actual interest score
      });
    }

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    this.log(`Scored ${scored.length} destinations (after interest filtering)`);
    console.log(`📋 Final destinations after filtering:`, scored.map(s => `${s.destination.state} (${s.score}%)`));

    return {
      engineName: this.config.name,
      timestamp: new Date(),
      success: true,
      recommendations: scored.slice(0, 10),
      totalDestinationsScored: scored.length
    };
  }

  protected validateInput(input: DestinationScoringInput): boolean {
    return !!input?.userPreferences && 
           typeof input.userPreferences.month === 'number';
  }

  private scoreDestination(
    dest: Destination, 
    prefs: UserPreferences
  ): { score: number; reasons: string[]; badges: string[]; interestMatchScore: number } {
    let score = 0;
    let interestMatchScore = 0; // ✅ Track explicitly
    const reasons: string[] = [];
    const badges: string[] = [];
    
    console.log(`\n📍 SCORING: ${dest.state}`);
    console.log(`   User categories: ${prefs.categories.join(', ') || 'NONE'}`);
    console.log(`   Destination categories: ${dest.categories.join(', ')}`);
    
    // 1. Perfect Timing (40 points max)
    if (dest.bestMonths.includes(prefs.month)) {
      score += 40;
      reasons.push('✓ Perfect time to visit');
      badges.push('Perfect Season');
    } else if (dest.avoidMonths.includes(prefs.month)) {
      score -= 30;
      reasons.push('⚠ Not ideal season');
    } else {
      score += 10;
      reasons.push('○ Acceptable season');
    }
    
    // 2. Budget Match (30 points max)
    if (dest.budget === prefs.budget) {
      score += 30;
      reasons.push('✓ Matches your budget');
      badges.push('Budget Match');
    } else {
      const budgetOrder = ['budget', 'moderate', 'premium'];
      const destIndex = budgetOrder.indexOf(dest.budget);
      const prefIndex = budgetOrder.indexOf(prefs.budget);
      const diff = Math.abs(destIndex - prefIndex);
      
      if (diff === 1) {
        score += 15;
        reasons.push('○ Close to your budget');
      } else {
        score += 5;
        reasons.push('⚠ Different budget range');
      }
    }
    
    // 3. Category Match (25 points max) - ✅ CRITICAL
    if (prefs.categories && prefs.categories.length > 0) {
      const matchingCategories = dest.categories.filter(cat => 
        prefs.categories.includes(cat)
      );
      
      console.log(`   📊 Interest matching: ${JSON.stringify(matchingCategories)}`);
      
      if (matchingCategories.length > 0) {
        interestMatchScore = Math.min(25, matchingCategories.length * 12);
        score += interestMatchScore;
        reasons.push(`✓ ${matchingCategories.length} matching interest${matchingCategories.length > 1 ? 's' : ''}`);
        console.log(`   ✅ Interest match found! Score: ${interestMatchScore}/25`);
        
        if (matchingCategories.length >= 2) {
          badges.push('Perfect Match');
        }
      } else {
        console.log(`   ❌ NO INTEREST MATCH FOUND - This should have been filtered!`);
        interestMatchScore = 0;
      }
    } else {
      console.log(`   ⚠️ No user categories provided`);
    }
    
    // 4. Climate Preference (15 points max)
    if (prefs.climate && prefs.climate.length > 0) {
      if (prefs.climate.includes(dest.climate)) {
        score += 15;
        reasons.push('✓ Ideal climate for you');
        badges.push('Great Weather');
      }
    }
    
    // 5. Bonus Points for Special Cases
    // Popular destinations bonus
    const popularDestinations = ['goa', 'manali', 'jaipur', 'kerala', 'leh', 'andaman'];
    const destId = (dest as any)._id || '';
    if (popularDestinations.includes(destId)) {
      score += 5;
      badges.push('Popular Choice');
    }
    
    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score));
    
    console.log(`   🎯 Final Score: ${score}/100 (Interest: ${interestMatchScore}/25)\n`);
    
    return { score, reasons, badges, interestMatchScore };
  }
}

