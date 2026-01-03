import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EnhancedRecommendation } from '../../core/engines/recommendation/recommendation.engine';
import { DestinationHeroService } from '../../core/services/destination-hero.service';

@Component({
  selector: 'app-destination-card-compact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-card-compact.component.html',
  styleUrls: ['./destination-card-compact.component.scss']
})
export class DestinationCardCompactComponent implements OnInit {
  @Input() recommendation!: EnhancedRecommendation;
  @Output() bookingClicked = new EventEmitter<EnhancedRecommendation>();
  @Output() planTripClicked = new EventEmitter<EnhancedRecommendation>();

  private router = inject(Router);
  private heroService = inject(DestinationHeroService); // ✅ NEW: Hero service

  // Expansion state
  isExpanded = false;
  selectedDays: number | null = null;
  readonly dayOptions = [2, 3, 4, 5];

  ngOnInit(): void {
    console.log(`🎴 [DestinationCard] Card rendered for: ${this.recommendation?.destination?.name}`);
    console.log(`🎴 [DestinationCard] State: ${this.recommendation?.destination?.state}`);
    console.log(`🎴 [DestinationCard] Ready for user interaction (click to expand)`);
  }

  /**
   * ✅ NEW: Get background style for hero image
   */
  getCardBackgroundStyle(): any {
    return this.heroService.getCardBackgroundStyle(this.recommendation.destination);
  }

  /**
   * ✅ NEW: Get popular places for explore mode
   */
  getPopularPlaces(): string[] {
    return this.heroService.getPopularPlaces(this.recommendation.destination);
  }

  /**
   * Get top 2 categories from destination
   */
  get topBadges(): string[] {
    if (!this.recommendation?.destination?.categories || this.recommendation.destination.categories.length === 0) {
      return [];
    }
    return this.recommendation.destination.categories.slice(0, 2);
  }

  /**
   * Get badge class for styling
   */
  getBadgeClass(badge: string): string {
    const badgeMap: Record<string, string> = {
      'Beach': 'badge-beach',
      'Mountain': 'badge-mountain',
      'Heritage': 'badge-heritage',
      'City': 'badge-city',
      'Spiritual': 'badge-spiritual',
      'Wildlife': 'badge-wildlife',
      'Island': 'badge-island',
      'Adventure': 'badge-adventure'
    };
    return badgeMap[badge] || 'badge-default';
  }

  /**
   * Determine score color based on value
   */
  getScoreColor(): string {
    const score = this.recommendation?.overallRecommendationScore || 0;
    if (score >= 80) return 'score-excellent';
    if (score >= 60) return 'score-good';
    if (score >= 40) return 'score-fair';
    return 'score-low';
  }

  /**
   * Toggle expanded view
   */
  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
    const city = this.recommendation?.destination?.state;
    console.log(`🎴 [Card] ${city} - Expansion: ${this.isExpanded}`);
    console.log(`🎴 [Card] ${city} - isExpanded=${this.isExpanded}, selectedDays=${this.selectedDays}`);
    // Reset days selection when collapsing
    if (!this.isExpanded) {
      this.selectedDays = null;
      console.log(`🎴 [Card] ${city} - Days reset to null`);
    } else {
      // Auto-select 3 days when expanding
      this.selectedDays = 3;
      console.log(`🎴 [Card] ${city} - Auto-selected 3 days`);
    }
  }

  /**
   * Select number of days (deprecated - moved to drawer)
   * Kept for backward compatibility but no longer emits events
   */
  selectDays(days: number): void {
    this.selectedDays = this.selectedDays === days ? null : days;
    const city = this.recommendation?.destination?.state;
    console.log(`🎴 [Card] Note: Day selection moved to drawer for ${city}`);
  }

  /**
   * Get CTA button label
   * Always "Plan This Trip" since we skip inline expansion
   */
  getCtaLabel(): string {
    return 'Plan This Trip';
  }

  /**
   * Check if CTA button should be disabled
   * Always enabled since we skip inline expansion and go straight to drawer
   */
  isCtaDisabled(): boolean {
    return false;
  }

  /**
   * Handle CTA button click - directly opens drawer with itinerary
   * Skips inline expansion to prevent layout shifts
   */
  onCtaClick(): void {
    const city = this.recommendation?.destination?.state;
    console.log(`🎴 [Card] CTA button clicked on ${city}`);
    
    // Get destination name for itinerary lookup
    const destination = this.recommendation.destination;
    console.log(`🎴 [Card] ACTION: Opening drawer for ${destination.state}`);
    console.log(`🎴 [Card] → destination.name=${destination.name}, destination.state=${destination.state}`);
    
    // Default to 3 days
    this.selectedDays = 3;
    
    // Emit event immediately (drawer handles expansion, no inline layout shift)
    this.planTripClicked.emit(this.recommendation);
  }

  /**
   * Handle booking button click (Essentials modal)
   */
  onEssentialsClick(): void {
    this.bookingClicked.emit(this.recommendation);
  }
}
