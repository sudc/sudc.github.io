/**
 * DESTINATION SCORING ENGINE
 * ==========================
 * 
 * Comprehensive scoring engine for destinations based on multiple factors
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEngine, BaseEngineConfig, BaseEngineResult } from '../base.engine';
import { Destination, DESTINATIONS_DATA } from '../destination/destinations.data';
import { environment } from '../../../../environments/environment';

export interface UserPreferences {
  categories: string[];
  month: number;
  budget: 'budget' | 'moderate' | 'premium';
  climate?: string[];
}

export interface ScoredDestination {
  destinationId: string;
  destination: Destination;
  score: number; // Internal /110 score (hidden from UI)
  displayScore: number; // Display /100 score (shown to users)
  reasons: string[];
  badges: string[];
  interestMatchScore?: number; // ✅ NEW: Explicit interest score
  interestMatchMessage?: string; // ✅ Match type: primary, secondary, weak
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
  private http = inject(HttpClient);
  
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

    // 🚀 LOAD DATA FROM MONGODB BACKEND
    let destinations: Destination[] = [];
    
    try {
      console.log('📡 Fetching destinations from MongoDB backend...');
      const response = await this.http.get<Destination[]>(
        `${environment.apiBaseUrl}/api/destinations`
      ).toPromise();
      
      if (response && response.length > 0) {
        destinations = response;
        console.log(`✅ Loaded ${destinations.length} destinations from MongoDB`);
      } else {
        throw new Error('Empty response from backend');
      }
    } catch (err: any) {
      console.warn('⚠️ MongoDB backend failed, NO fallback:', err.message);
      // COMMENTED OUT - Testing backend only
      // destinations = Object.values(DESTINATIONS_DATA) as Destination[];
      // console.log(`📊 Using fallback: ${destinations.length} destinations from static data`);
      destinations = [];
    }

    const scored: ScoredDestination[] = [];
    
    // 🔒 HARD FILTER: Only process destinations matching user interests
    const userCategories = (input.userPreferences.categories || []).map(cat => cat.toLowerCase());
    console.log(`\n🎯 USER INTERESTS (raw):`, input.userPreferences.categories);
    console.log(`🎯 USER INTERESTS (normalized):`, userCategories);
    console.log(`🎯 USER INTERESTS (count): ${userCategories.length}`);
    
    for (const destination of destinations) {
      // ✅ HARD FILTER: Skip destinations that don't match user interests
      if (userCategories.length > 0) {
        console.log(`\n🔍 Checking ${destination.state}...`);
        console.log(`   Categories: ${JSON.stringify(destination.categories)}`);
        console.log(`   User wants: ${JSON.stringify(userCategories)}`);
        
        const hasInterestMatch = destination.categories.some(cat => {
          const matches = userCategories.includes(cat.toLowerCase());
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

      const { score, displayScore, reasons, badges, interestMatchScore, interestMatchMessage } = this.scoreDestination(destination, input.userPreferences);
      scored.push({
        destinationId: (destination as any)._id || '',
        destination,
        score,
        displayScore,
        reasons,
        badges,
        interestMatchScore,
        interestMatchMessage
      });
    }

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    this.log(`Scored ${scored.length} destinations (after interest filtering)`);
    console.log(`📋 Final destinations after filtering:`, scored.map(s => `${s.destination.state} (${s.displayScore}/100)`));

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
  ): { score: number; displayScore: number; reasons: string[]; badges: string[]; interestMatchScore: number; interestMatchMessage: string } {
    let score = 0; // Internal /110 scale
    let interestMatchScore = 0; // Track explicitly
    let interestMatchMessage = 'secondary'; // Default to secondary match
    const reasons: string[] = [];
    const badges: string[] = [];
    
    console.log(`\n📍 SCORING: ${dest.state}`);
    console.log(`   User categories: ${prefs.categories.join(', ') || 'NONE'}`);
    console.log(`   Destination categories: ${dest.categories.join(', ')}`);
    
    // 1. Perfect Timing (36 points max - /100 scale)
    if (dest.bestMonths.includes(prefs.month)) {
      score += 36;
      reasons.push('✓ Perfect time to visit');
      badges.push('Perfect Season');
    } else if (dest.avoidMonths.includes(prefs.month)) {
      score -= 27;
      reasons.push('⚠ Not ideal season');
    } else {
      score += 9;
      reasons.push('○ Acceptable season');
    }
    
    // 2. Budget Match (27 points max - /100 scale)
    if (dest.budget === prefs.budget) {
      score += 27;
      reasons.push('✓ Matches your budget');
      badges.push('Budget Match');
    } else {
      const budgetOrder = ['budget', 'moderate', 'premium'];
      const destIndex = budgetOrder.indexOf(dest.budget);
      const prefIndex = budgetOrder.indexOf(prefs.budget);
      const diff = Math.abs(destIndex - prefIndex);
      
      if (diff === 1) {
        score += 13;
        reasons.push('○ Close to your budget');
      } else {
        score += 4;
        reasons.push('⚠ Different budget range');
      }
    }
    
    // 3. Category Match (25 points max) - ✅ CRITICAL
    if (prefs.categories && prefs.categories.length > 0) {
      const normUserCategories = prefs.categories.map(cat => cat.toLowerCase());
      const matchingCategories = dest.categories.filter(cat => 
        normUserCategories.includes(cat.toLowerCase())
      );
      
      console.log(`   📊 Interest matching: ${JSON.stringify(matchingCategories)}`);
      
      if (matchingCategories.length >= 1) {
        // Primary match: destination has 2+ of user's selected interests
        if (matchingCategories.length >= 2) {
          interestMatchScore = 23;
          interestMatchMessage = 'primary';
          reasons.push(`✅ Matches your ${matchingCategories.length} selected interests`);
          badges.push('Perfect Match');
        } 
        // Secondary match: destination has 1 of user's interests
        else {
          interestMatchScore = 14; // Partial credit
          interestMatchMessage = 'secondary';
          reasons.push(`⚠️ Partial match — has ${matchingCategories[0]} experiences`);
        }
        score += interestMatchScore;
        console.log(`   ✅ Interest match: ${matchingCategories.length} category/ies. Score: ${interestMatchScore}/23 (${interestMatchMessage})`);
      } 
      // Weak match: destination doesn't match but passed hard filter? (shouldn't happen)
      else {
        interestMatchScore = 5; // Minimum credit
        interestMatchMessage = 'weak';
        score += interestMatchScore;
        console.log(`   ℹ️ Limited interest match. Score: ${interestMatchScore}/23 (weak)`);
      }
    } else {
      console.log(`   ⚠️ No user categories provided`);
    }
    
    // 4. Climate Preference (14 points max - /100 scale)
    if (prefs.climate && prefs.climate.length > 0) {
      if (prefs.climate.includes(dest.climate)) {
        score += 14;
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
    
    // Ensure score is within bounds (0-100)
    score = Math.max(0, Math.min(100, score));
    
    // ✅ FIXED: Score is now /100 - no conversion needed
    const displayScore = score;
    
    console.log(`   🎯 Final Score: ${displayScore}/100 (Interest: ${interestMatchScore}/23)\n`);
    
    return { score, displayScore, reasons, badges, interestMatchScore, interestMatchMessage };
  }
}

