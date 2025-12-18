import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnhancedRecommendation } from '../../core/engines/recommendation/recommendation.engine';

@Component({
  selector: 'app-destination-card-compact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-card-compact.component.html',
  styleUrls: ['./destination-card-compact.component.scss']
})
export class DestinationCardCompactComponent {
  @Input() recommendation!: EnhancedRecommendation;
  @Output() bookingClicked = new EventEmitter<EnhancedRecommendation>();

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
   * Handle booking button click
   */
  onBookingClick(): void {
    this.bookingClicked.emit(this.recommendation);
  }
}
