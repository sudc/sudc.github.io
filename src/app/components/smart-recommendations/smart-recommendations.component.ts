import { Component, OnInit, Input, inject, NgZone, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { ResultSummaryComponent } from '../result-summary/result-summary.component';
import { DestinationCardCompactComponent } from '../destination-card-compact/destination-card-compact.component';
import { 
  RecommendationEngine, 
  RecommendationInput,
  EnhancedRecommendation 
} from '../../core/engines/recommendation/recommendation.engine';
import { DestinationScoringEngine } from '../../core/engines/destination-scoring/destination-scoring.engine';
import { TripReadinessEngine } from '../../core/engines/trip-readiness/trip-readiness.engine';
import { TrustConfigService } from '../../core/services/trust-config.service';
import { ItineraryService } from '../../core/services/itinerary/itinerary.service';
import { DestinationHeroService } from '../../core/services/destination-hero.service'; // ✅ NEW
import { ItineraryPlan } from '../../core/models/itinerary.model';
import { FALLBACK_DESTINATIONS } from '../../core/data/fallback-destinations'; // ✅ NEW: Use actual fallback data instead of hardcoded

@Component({
  selector: 'app-smart-recommendations',
  standalone: true,
  imports: [CommonModule, FormsModule, BookingModalComponent, ResultSummaryComponent, DestinationCardCompactComponent],
  providers: [DestinationScoringEngine, TripReadinessEngine, RecommendationEngine],
  templateUrl: './smart-recommendations.component.html',
  styleUrls: ['./smart-recommendations.component.scss']
})
export class SmartRecommendationsComponent implements OnInit, AfterViewInit {
  private recommendationEngine = inject(RecommendationEngine);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private trustConfigService = inject(TrustConfigService);
  private itineraryService = inject(ItineraryService);
  private heroService = inject(DestinationHeroService); // ✅ NEW
  
  // Drawer state (side panel for itinerary)
  isDrawerOpen = false;
  drawerDestination: EnhancedRecommendation | null = null;
  itineraryLoading = false;
  activeItinerary: ItineraryPlan | null = null;
  selectedDays: number | null = null;
  drawerMode: 'itinerary' | 'explore' = 'itinerary'; // ✅ NEW: Track drawer mode
  
  // Trust config
  trustBadge = 'Powered by trusted travel partners';
  affiliateDisclosure = 'We may earn a commission at no extra cost to you';
  
  // ✅ Accept preferences from parent (home component)
  @Input() userPreferences: any = null;
  @Input() showForm: boolean = true;
  
  // ✅ Single source of truth for preferences (NEVER reset)
  preferences = {
    month: new Date().getMonth() + 1,
    budget: 'moderate' as 'budget' | 'moderate' | 'premium',
    categories: [] as string[]
  };
  
  // ✅ Separate UI state (can change independently)
  uiState = {
    loading: false,
    hasResults: false,
    error: null as string | null
  };
  
  availableCategories = [
    'Beach', 'Mountain', 'Heritage', 'Adventure', 'Spiritual',
    'Hill', 'Nature', 'City', 'Snow', 'Wildlife', 'Romantic',
    'Backwaters', 'Island', 'Colonial', 'Culture'
  ];
  
  recommendations: EnhancedRecommendation[] = [];
  expandedScores: Set<number> = new Set();
  
  // ✅ Compact cards are the standard layout (not experimental)
  // Industry standard: Booking, Airbnb, Google Travel all use compact cards
  useCompactCards = true;
  
  // 📱 Mobile menu state
  mobileMenuOpen = false;
  
  // Booking modal state
  isBookingModalOpen = false;
  selectedDestination: any = null;

  // 🎠 Carousel state
  currentCardIndex = 0;

  // 📊 Grid layout state
  showAllResults = false;

  // ✅ Days available for current itinerary (dynamic, not hardcoded)
  availableDays: number[] = [3, 4, 5, 7]; // Default, will be updated based on loaded itinerary

  ngOnInit(): void {
    console.log('🎯 [SmartRecommendations] Component initialized');
    console.log('🎯 [SmartRecommendations] showForm:', this.showForm);
    console.log('🎯 [SmartRecommendations] userPreferences:', this.userPreferences);
    console.log('🎯 [SmartRecommendations] Template should be rendering now...');
    
    // Fetch trust config from MongoDB (non-blocking)
    this.trustConfigService.getConfig().subscribe(config => {
      this.trustBadge = config.trustBadge;
      this.affiliateDisclosure = config.affiliateDisclosure;
    });

    // ✅ If preferences passed from parent, use them and auto-load
    if (this.userPreferences) {
      console.log('🎯 [SmartRecommendations] Using preferences from parent');
      this.preferences = {
        month: this.userPreferences.month,
        budget: this.userPreferences.budget,
        categories: this.userPreferences.categories
      };
      // Auto-load recommendations with parent's preferences
      this.getRecommendations();
    } else {
      console.log('🎯 [SmartRecommendations] No parent preferences, waiting for user input');
      console.log('🎯 [SmartRecommendations] User should see the form now');
    }
    // Otherwise user will see empty state and click button manually
  }

  ngAfterViewInit(): void {
    if (this.recommendations && this.recommendations.length > 0) {
      console.log(`✅ [RENDERER] ${this.recommendations.length} destination cards rendered to DOM`);
      console.log(`✅ [RENDERER] User can now click cards to expand`);
    }
  }

  // ✅ Button label based on state (3 states)
  getButtonLabel(): string {
    if (this.uiState.loading) {
      return '⏳ Finding best destinations...';
    }
    return this.uiState.hasResults ? '🔄 Refine Recommendations' : '🔍 Get Recommendations';
  }

  // ✅ Button disabled only during loading
  isButtonDisabled(): boolean {
    return this.uiState.loading;
  }

  // ✅ Inputs disabled during loading (but NOT cleared)
  areInputsDisabled(): boolean {
    return this.uiState.loading;
  }

  toggleCategory(category: string): void {
    const index = this.preferences.categories.indexOf(category);
    if (index > -1) {
      this.preferences.categories.splice(index, 1);
      console.log(`🎯 [SmartRecommendations] Interest removed: ${category}`);
    } else {
      this.preferences.categories.push(category);
      console.log(`🎯 [SmartRecommendations] Interest added: ${category}`);
    }
    console.log(`🎯 [SmartRecommendations] Current interests:`, this.preferences.categories);
    // Don't auto-trigger - wait for explicit button click
  }

  toggleScoreDetails(index: number): void {
    if (this.expandedScores.has(index)) {
      this.expandedScores.delete(index);
    } else {
      this.expandedScores.add(index);
    }
  }

  isScoreExpanded(index: number): boolean {
    return this.expandedScores.has(index);
  }

  getScoreBreakdown(rec: EnhancedRecommendation): any {
    const dest = rec.destination;
    const prefs = this.preferences;
    
    let timingScore = 0;
    let budgetScore = 0;
    let interestScore = 0;
    let climateScore = 0;
    let popularityScore = 0;

    // ✅ FIXED: Use the actual interest score from the engine if available
    if ((rec as any).interestMatchScore !== undefined) {
      interestScore = (rec as any).interestMatchScore;
    } else {
      // Fallback: recalculate (should not happen)
      if (prefs.categories.length > 0 && dest.categories && dest.categories.length > 0) {
        const matches = dest.categories.filter(cat => prefs.categories.includes(cat));
        interestScore = Math.min(23, matches.length * 11);
      }
    }

    // Timing (36 max - /100 scale)
    if (dest.bestMonths && dest.bestMonths.length > 0) {
      const normalizedBestMonths = dest.bestMonths.map(m => {
        if (typeof m === 'string') {
          const monthMap: Record<string, number> = {
            'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
            'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
          };
          return monthMap[m] || 0;
        }
        return m;
      });
      
      if (normalizedBestMonths.includes(prefs.month)) {
        timingScore = 36;
      } else if (dest.avoidMonths && dest.avoidMonths.includes(prefs.month)) {
        timingScore = 9;
      } else {
        timingScore = 18;
      }
    } else if (dest.avoidMonths && dest.avoidMonths.length > 0 && dest.avoidMonths.includes(prefs.month)) {
      timingScore = 9;
    } else {
      timingScore = 18;
    }

    // Budget (27 max - /100 scale)
    if (dest.budget === prefs.budget) {
      budgetScore = 27;
    } else {
      const budgetOrder = ['budget', 'moderate', 'premium'];
      const destIndex = budgetOrder.indexOf(dest.budget);
      const prefIndex = budgetOrder.indexOf(prefs.budget);
      const diff = Math.abs(destIndex - prefIndex);
      budgetScore = diff === 1 ? 13 : 4;
    }

    // Climate (14 max - /100 scale)
    climateScore = rec.overallRecommendationScore >= 80 ? 14 : (rec.overallRecommendationScore >= 65 ? 9 : 5);

    // Popularity (0 - included in the 100)
    const popularDestinations = ['goa', 'manali', 'jaipur', 'kerala', 'leh', 'andaman'];
    const destId = (dest as any)._id || rec.destinationId;
    popularityScore = popularDestinations.includes(destId) ? 0 : 0; // No popularity bonus in /100 scale

    // ✅ USE DISPLAYSCORE FROM ENGINE - NO RECALCULATION
    const displayTotal = rec.displayScore;
    
    return {
      timing: { score: timingScore, max: 36 },
      budget: { score: budgetScore, max: 27 },
      interest: { score: interestScore, max: 23 },
      climate: { score: climateScore, max: 14 },
      popularity: { score: popularityScore, max: 0 },
      total: timingScore + budgetScore + interestScore + climateScore + popularityScore,
      totalMax: 100,
      // ✅ Use displayScore from engine (single source of truth)
      displayTotal,
      displayMax: 100
    };
  }

  // ✅ UPDATED: Never disable booking - all destinations shown have relevance
  isBookingDisabled(rec: EnhancedRecommendation): boolean {
    // With new scoring: all destinations get at least 5pts for interest
    // so booking is ALWAYS enabled
    return false;
  }

  // ✅ NEW: Get contextual button text based on interest match type
  getBookingButtonText(rec: EnhancedRecommendation): string {
    const matchMessage = (rec as any).interestMatchMessage || 'secondary';
    
    switch (matchMessage) {
      case 'primary':
        return '� View booking options →';
      case 'secondary':
        return '➜ View booking options →';
      case 'weak':
        return 'ℹ️ View booking options →';
      default:
        return 'View booking options →';
    }
  }

  // ✅ NEW: Check if recommendation should not be displayed at all
  isInvalidRecommendation(rec: EnhancedRecommendation): boolean {
    const actualInterestMatch = (rec as any).interestMatchScore || 0;
    const calculated = this.calculateInterestMatchScore(rec.destination);
    
    // Hide if either engine or component calculates 0 interest match
    if (actualInterestMatch === 0 || calculated === 0) {
      console.log(`🚫 HIDING INVALID: ${rec.destination.state} (engine: ${actualInterestMatch}, component: ${calculated})`);
      return true; // Hidden from view
    }
    return false;
  }

  // ✅ NEW: Get booking disabled message
  getBookingDisabledMessage(rec: EnhancedRecommendation): string {
    const actualInterestMatch = (rec as any).interestMatchScore || 0;
    if (actualInterestMatch === 0) {
      return 'This destination doesn\'t match your selected interests';
    }
    return '';
  }

  // ✅ NEW: Calculate interest match score for safety check
  private calculateInterestMatchScore(dest: any): number {
    console.log(`\n🔐 SAFETY CHECK: ${dest.state}`);
    console.log(`   Destination categories: ${JSON.stringify(dest.categories)}`);
    console.log(`   User preferences: ${JSON.stringify(this.preferences.categories)}`);
    
    if (this.preferences.categories.length === 0) {
      console.log(`   ⚠️ No user preferences set`);
      return 0;
    }
    
    const normUserCategories = this.preferences.categories.map(cat => cat.toLowerCase());
    const matches = dest.categories.filter((cat: string) => {
      const included = normUserCategories.includes(cat.toLowerCase());
      console.log(`     - ${cat}: ${included}`);
      return included;
    });
    
    const score = matches.length > 0 ? Math.min(25, matches.length * 12) : 0;
    console.log(`   Score: ${score}/25 (matched: ${JSON.stringify(matches)})`);
    return score;
  }

  getMonthName(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1] || '';
  }

  formatBudget(budget: string): string {
    const budgetMap: { [key: string]: string } = {
      'budget': '₹10k-20k',
      'moderate': '₹15k-30k',
      'premium': '₹30k+'
    };
    return budgetMap[budget] || budget;
  }

  hasInterestMatch(categories: string[]): boolean {
    if (this.preferences.categories.length === 0) return false;
    return categories.some(cat => this.preferences.categories.includes(cat));
  }

  getMatchedInterests(categories: string[]): string[] {
    return categories.filter(cat => this.preferences.categories.includes(cat));
  }

  async getRecommendations(): Promise<void> {
    // ✅ Only change UI state, NEVER touch preferences
    console.log('🚀 [LOADER] "Get Recommendations" button clicked!');
    console.log(`🚀 [LOADER] Month: ${this.preferences.month}, Budget: ${this.preferences.budget}`);
    console.log(`🚀 [LOADER] Interests: ${this.preferences.categories.join(', ') || 'NONE'}`);
    console.log('🚀 [LOADER] Getting recommendations from engine...');
    
    this.uiState.loading = true;
    this.uiState.error = null;
    this.recommendations = [];
    this.expandedScores.clear();
    this.cdr.markForCheck();

    try {
      const input: RecommendationInput = {
        userPreferences: {
          month: this.preferences.month,
          budget: this.preferences.budget,
          categories: this.preferences.categories
        }
      };

      console.log('⏳ [LOADER] Input sent to engine:', input);
      // ✅ No timeout needed - using instant static fallback (MongoDB service disabled for now)
      const result = await this.recommendationEngine.process(input);
      
      console.log(`✅ [LOADER] Engine returned: ${result.recommendations.length} recommendations`);
      console.log(`✅ [LOADER] Success flag: ${result.success}`);
      
      // Run UI updates in Angular zone to ensure change detection
      this.ngZone.run(() => {
        if (result.success && result.recommendations.length > 0) {
          console.log(`\n🔄 [DEDUP] ================================`);
          console.log(`🔄 [Dedup] Raw results from engine: ${result.recommendations.length} items`);
          
          // ✅ DEDUPLICATE by destination name to prevent showing same place twice
          const uniqueDestinations = new Map<string, typeof result.recommendations[0]>();
          const removedDuplicates: string[] = [];
          
          for (const rec of result.recommendations) {
            const key = rec.destination.name.toLowerCase();
            if (!uniqueDestinations.has(key)) {
              uniqueDestinations.set(key, rec);
              console.log(`   ✅ Keeping: ${rec.destination.name} (score: ${rec.overallRecommendationScore}%)`);
            } else {
              removedDuplicates.push(rec.destination.name);
              console.log(`   ❌ Removing duplicate: ${rec.destination.name}`);
            }
          }
          
          // Convert back to array and take top 6
          this.recommendations = Array.from(uniqueDestinations.values()).slice(0, 6);
          this.uiState.hasResults = true;
          
          console.log(`✅ [Dedup] Final unique destinations: ${this.recommendations.length}`);
          console.log(`📋 [Dedup] Showing: ${this.recommendations.map(r => r.destination.name).join(', ')}`);
          if (removedDuplicates.length > 0) {
            console.log(`❌ [Dedup] Removed ${removedDuplicates.length} duplicates: ${removedDuplicates.join(', ')}`);
          }
          console.log('✅ [LOADER] Recommendation cards should now be visible on page');
          console.log('✅ [LOADER] Cards ready for user interaction (click to expand)');
        } else {
          // Engine returned empty results - fallback to showing all available destinations
          console.log('⚠️ [LOADER] No recommendations found from engine (empty or failed)');
          console.log('⚠️ [LOADER] Falling back to sample destinations from FALLBACK_DESTINATIONS');
          // Fallback: Show popular destinations when engine returns no results
          this.recommendations = this.getSampleDestinations();
          this.uiState.hasResults = true;
          if (this.recommendations.length > 0) {
            console.log(`✅ [LOADER] Showing ${this.recommendations.length} fallback destinations`);
          }
        }
        this.cdr.markForCheck();
      });
    } catch (err: any) {
      console.error('❌ [LOADER] Recommendation error:', err);
      // Run error handling in Angular zone
      this.ngZone.run(() => {
        this.recommendations = [];
        this.uiState.hasResults = true;
        this.cdr.markForCheck();
      });
    } finally {
      // ✅ Stop loading immediately (no artificial delays)
      this.ngZone.run(() => {
        this.uiState.loading = false;
        this.cdr.markForCheck();
        console.log('✅ [LOADER STOP] Recommendation loading complete!');
      });
    }
  }

  getRecommendationTypeClass(type: string): string {
    switch (type) {
      case 'highly-recommended':
        return 'badge-high';
      case 'recommended':
        return 'badge-medium';
      case 'consider':
        return 'badge-consider';
      default:
        return 'badge-low';
    }
  }

  getRecommendationTypeLabel(type: string): string {
    switch (type) {
      case 'highly-recommended':
        return '⭐ Highly Recommended';
      case 'recommended':
        return '👍 Recommended';
      case 'consider':
        return '🤔 Worth Considering';
      case 'hidden':
        return 'Hidden';
      default:
        return 'Consider';
    }
  }

  // ✅ NEW: Check if we have no results and provide smart guidance
  hasNoResults(): boolean {
    return !this.uiState.loading && this.uiState.hasResults && this.recommendations.length === 0;
  }

  // ✅ NEW: Generate smart fallback message
  getNoResultsMessage(): string {
    const interestText = this.preferences.categories.length > 0 
      ? this.preferences.categories.join(', ').toLowerCase()
      : 'your selected interests';

    const monthText = this.getMonthName(this.preferences.month);
    const budgetText = this.formatBudget(this.preferences.budget);

    return `We couldn't find perfect ${interestText} destinations for ${monthText} at ${budgetText} budget.`;
  }

  // ✅ NEW: Generate suggestions to refine search
  getSuggestionsForNoResults(): string[] {
    const suggestions: string[] = [];

    // Suggest increasing budget
    if (this.preferences.budget === 'budget') {
      suggestions.push('Consider increasing your budget to moderate for more options');
    }

    // Suggest different travel months
    const alternativeMonths = this.getAlternativeMonths();
    if (alternativeMonths.length > 0) {
      suggestions.push(`Try traveling in ${alternativeMonths.join(' or ')} for better options`);
    }

    // Suggest broadening interests
    if (this.preferences.categories.length <= 1) {
      suggestions.push('Try selecting 2-3 interest categories for better matches');
    } else {
      suggestions.push('Try adding more diverse interest categories to broaden results');
    }

    return suggestions.length > 0 ? suggestions : ['Try adjusting your preferences'];
  }

  // ✅ NEW: Find alternative months with better destination availability
  private getAlternativeMonths(): string[] {
    const alternatives: string[] = [];
    const popularMonths = [3, 4, 10, 11]; // March, April, Oct, Nov
    const currentMonth = this.preferences.month;

    for (const month of popularMonths) {
      if (month !== currentMonth) {
        alternatives.push(this.getMonthName(month));
        if (alternatives.length >= 2) break;
      }
    }

    return alternatives;
  }

  openBookingModal(rec: EnhancedRecommendation): void {
    // 📊 LOG RECOMMENDATION CLICK - For analytics (console for now)
    const clickLog = {
      timestamp: new Date().toISOString(),
      event: 'recommendation_click',
      destination: rec.destination.state,
      score: rec.overallRecommendationScore,
      recommendationType: rec.recommendationType,
      userPreferences: {
        month: this.preferences.month,
        budget: this.preferences.budget,
        categories: this.preferences.categories
      }
    };
    
    console.log('📌 RECOMMENDATION CLICK:', clickLog);
    // TODO: Send to analytics service (Amplitude, Mixpanel, GA4, etc.)
    // this.analyticsService.track('recommendation_click', clickLog);
    
    this.selectedDestination = rec.destination;
    this.isBookingModalOpen = true;
  }

  closeBookingModal(): void {
    this.isBookingModalOpen = false;
    this.selectedDestination = null;
  }

  // 🎠 Navigate to next card
  nextCard(): void {
    if (this.currentCardIndex < this.recommendations.length - 1) {
      this.currentCardIndex++;
    }
  }

  // 🎠 Navigate to previous card
  previousCard(): void {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    }
  }

  // 📱 Toggle mobile menu
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // 📱 Close mobile menu
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  // 📋 Open itinerary in side drawer
  openItinerary(rec: EnhancedRecommendation): void {
    this.drawerDestination = rec;
    this.selectedDays = 3; // Default to 3 days
    this.itineraryLoading = true;
    this.activeItinerary = null;
    this.isDrawerOpen = true;
    
    // ✅ TRY BY DESTINATION NAME FIRST (not state)
    // e.g., "Bangalore", "Coorg", "Goa" - actual cities with itineraries
    let destName = rec.destination.name;
    console.log(`\n📍 [DRAWER OPEN] ================================`);
    console.log(`📍 [Itinerary] Opening drawer for recommendation:`);
    console.log(`  - Destination Name: ${destName}`);
    console.log(`  - Destination State: ${rec.destination.state}`);
    console.log(`  - Country: ${rec.destination.country}`);
    console.log(`  - Match Score: ${rec.overallRecommendationScore}%`);
    console.log(`  - Trying to load itinerary for: "${destName}"`);
    
    // ✅ Discover available days for this destination
    this.discoverAvailableDays(destName, rec.destination);
    
    // Load itinerary for this destination (pass destination data for smart mapping)
    this.itineraryService.generatePlan(destName, this.selectedDays, {
      travelType: this.preferences.categories as any,
      pace: 'moderate',
      destinationData: rec.destination
    }).subscribe({
      next: (itinerary: any) => {
        if (itinerary) {
          // ✅ Itinerary exists - show it
          console.log(`✅ [Itinerary] Successfully loaded for ${destName}`);
          console.log(`   - Days: ${itinerary.days}`);
          console.log(`   - Title: ${itinerary.title}`);
          this.drawerMode = 'itinerary';
          this.activeItinerary = itinerary;
          this.itineraryLoading = false;
          this.cdr.markForCheck();
        } else {
          // ❌ No itinerary - switch to explore mode
          console.log(`⚠️ [Itinerary] No itinerary found for ${destName}. Switching to explore mode for ${rec.destination.state}`);
          this.drawerMode = 'explore';
          this.itineraryLoading = false;
          this.cdr.markForCheck();
        }
      },
      error: (err: any) => {
        console.error(`❌ [Itinerary] Error loading itinerary for ${destName}:`, err);
        // Fallback to explore mode on error
        this.drawerMode = 'explore';
        this.itineraryLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  // 📋 Handle day selection change - reload itinerary with new duration
  onDaySelected(days: number): void {
    console.log(`\n📅 [DAY CHANGE] ================================`);
    console.log(`📅 [Day Selection] Button clicked for ${days} days`);
    console.log(`📅 [Day Selection] User selected: ${days} days`);
    
    if (!this.drawerDestination) {
      console.warn('❌ [Day Selection] No destination selected - cannot reload');
      return;
    }

    console.log(`📅 [Day Selection] Reloading itinerary for: ${this.drawerDestination.destination.name}`);
    console.log(`📅 [Day Selection] Destination state: ${this.drawerDestination.destination.state}`);
    console.log(`📅 [Day Selection] Destination type: ${this.drawerDestination.destination.type}`);
    this.selectedDays = days;
    this.itineraryLoading = true;
    this.activeItinerary = null;

    // ✅ Use destination name (not state) for itinerary lookup
    const destName = this.drawerDestination.destination.name;
    
    // Load itinerary with new duration - pass destination data for smart mapping
    this.itineraryService.generatePlan(destName, days, {
      travelType: this.preferences.categories as any,
      pace: 'moderate',
      destinationData: this.drawerDestination.destination
    }).subscribe({
      next: (itinerary: any) => {
        console.log(`✅ [Day Selection] Itinerary loaded successfully`);
        if (itinerary) {
          console.log(`   - Days: ${itinerary.days || 'unknown'}`);
          console.log(`   - Title: ${itinerary.title || 'unknown'}`);
          console.log(`   - Destination: ${itinerary.destination || 'unknown'}`);
        } else {
          console.warn(`⚠️ [Day Selection] Itinerary object is null/empty`);
        }
        this.activeItinerary = itinerary;
        this.itineraryLoading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error(`❌ [Day Selection] Error loading ${days}-day itinerary for ${destName}:`, err.message);
        this.itineraryLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Discover which day durations are actually available for current destination
   * Tests 2, 3, 4, 5, 7 days and only enables buttons for durations that have data
   * @param destName Name of the destination
   * @param destination Optional destination object with type/state for smart mapping
   */
  private discoverAvailableDays(destName: string, destination?: any): void {
    if (!destName) {
      this.availableDays = [3]; // Default to 3 if no destination
      return;
    }

    const potentialDays = [2, 3, 4, 5, 7];
    const found: number[] = [];
    let checkedCount = 0;

    console.log(`🔍 [AvailableDays] Discovering available days for ${destName}...`);
    if (destination) {
      console.log(`   Type: ${destination.type}, State: ${destination.state}`);
    }

    // Test each duration to see if itinerary data exists
    for (const days of potentialDays) {
      this.itineraryService.generatePlan(destName, days, {
        travelType: this.preferences.categories as any,
        pace: 'moderate',
        destinationData: destination
      }).subscribe({
        next: (itinerary: any) => {
          checkedCount++;
          if (itinerary && itinerary.title) {
            found.push(days);
            console.log(`✅ [AvailableDays] ${days} days available for ${destName}`);
            console.log(`     Title: "${itinerary.title}"`);
          } else {
            console.log(`⚠️ [AvailableDays] ${days} days returned null/empty for ${destName}`);
          }
          
          // Update availableDays once we've checked all
          if (checkedCount === potentialDays.length) {
            this.availableDays = found.length > 0 ? found : [3];
            console.log(`📌 [AvailableDays] Final available days: ${this.availableDays.join(', ')}`);
            console.log(`📌 [AvailableDays] Only these day buttons will be enabled`);
            this.cdr.markForCheck();
          }
        },
        error: (err) => {
          checkedCount++;
          console.log(`⚠️ [AvailableDays] ${days} days not available for ${destName}`);
          
          // Update availableDays once we've checked all
          if (checkedCount === potentialDays.length) {
            this.availableDays = found.length > 0 ? found : [3];
            console.log(`📌 [AvailableDays] Final available days: ${this.availableDays.join(', ')}`);
            console.log(`📌 [AvailableDays] Only these day buttons will be enabled`);
            this.cdr.markForCheck();
          }
        }
      });
    }
  }

  // ✅ NEW: Get drawer header background style (hero image)
  getDrawerHeaderBackground(): any {
    if (!this.drawerDestination) return {};
    return this.heroService.getCardBackgroundStyle(this.drawerDestination.destination);
  }

  // 📋 Close drawer
  closeItinerary(): void {
    this.isDrawerOpen = false;
    this.drawerDestination = null;
    this.activeItinerary = null;
    this.selectedDays = null;
    this.drawerMode = 'itinerary'; // ✅ Reset mode
  }

  // 📋 Placeholder methods (kept for compatibility)
  isDestinationExpanded(rec: EnhancedRecommendation): boolean {
    return false;
  }

  isActiveDestination(rec: EnhancedRecommendation): boolean {
    return false;
  }

  getPlanTripButtonLabel(rec: EnhancedRecommendation): string {
    return 'Plan ' + (this.selectedDays || 3) + ' Days →';
  }


  // 🏨 Open hotel booking (from itinerary CTA)
  openHotelBooking(): void {
    if (this.selectedDestination) {
      this.openBookingModal(this.selectedDestination);
    }
  }

  // 🚌 Open bus booking (from itinerary CTA)
  openBusBooking(): void {
    // TODO: Implement bus booking redirect to affiliate
    console.log('Opening bus booking for:', this.activeDestination);
  }

  // 🧳 Open essentials shopping (from itinerary CTA)
  openEssentialsShopping(): void {
    // TODO: Implement essentials shopping redirect to affiliate
    console.log('Opening essentials shopping');
  }

  // Get current active destination for display
  get activeDestination(): string {
    return this.activeItinerary?.destination || '';
  }

  // 🎯 Get sample destinations as fallback when engine returns 0 results
  private getSampleDestinations(): EnhancedRecommendation[] {
    console.log('\n🎯 [FALLBACK] ================================');
    console.log('🎯 [Fallback] Using FALLBACK_DESTINATIONS (61 pre-curated destinations)');
    console.log(`🎯 [Fallback] Total available: ${FALLBACK_DESTINATIONS.length} destinations`);
    
    if (!FALLBACK_DESTINATIONS || FALLBACK_DESTINATIONS.length === 0) {
      console.warn('⚠️ [Fallback] No fallback destinations available!');
      return [];
    }

    // Convert FALLBACK_DESTINATIONS to EnhancedRecommendation format
    const enhanced = FALLBACK_DESTINATIONS.map((dest, index) => {
      console.log(`  ${index + 1}. ${dest.name} (${dest.type}, ${dest.state}) - Budget: ${dest.budget}`);
      
      return {
        destinationId: dest.id,
        destination: dest,
        score: 65, // Neutral score for fallback
        displayScore: 65,
        reasons: [`${dest.type.charAt(0).toUpperCase() + dest.type.slice(1)} destination`, `Budget: ${dest.budget}`],
        badges: [dest.type.toUpperCase(), dest.state],
        overallRecommendationScore: 65,
        recommendationType: 'consider' as const,
        warnings: []
      };
    });

    // Take top 6 destinations
    const selected = enhanced.slice(0, 6);
    console.log(`✅ [Fallback] Selected ${selected.length} for display: ${selected.map(r => r.destination.name).join(', ')}`);
    console.log('✅ [Fallback] These are popular destinations to get started');
    console.log('✅ [Fallback] User can refine by setting preferences for personalized recommendations');
    
    return selected;
  }
}
