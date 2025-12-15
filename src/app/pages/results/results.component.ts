import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SmartRecommendationsComponent } from '../../components/smart-recommendations/smart-recommendations.component';
import { TrustBadgesComponent } from '../../components/trust-badges/trust-badges.component';

/**
 * SCREEN 2 - DESTINATION SCORING RESULTS
 * 
 * Active Engine: Destination Scoring Engine
 * 
 * Goal: Show intelligence + explain "why"
 * 
 * Features:
 * - Displays top destination recommendations
 * - Shows expandable score breakdown (40pts Timing + 30pts Budget + 25pts Interest + 15pts Climate)
 * - Provides "Improve Accuracy" link to Trip Readiness inputs
 * - Shows "View Booking Options" CTA leading to booking modal
 */

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SmartRecommendationsComponent,
    TrustBadgesComponent
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  travelMonth: string = '';
  budgetRange: string = '';
  interests: string[] = [];
  climate: string = '';
  recommendations: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get preferences from query params
    this.route.queryParams.subscribe(params => {
      this.travelMonth = params['month'] || '';
      this.budgetRange = params['budget'] || '';
      this.interests = params['interests'] ? params['interests'].split(',') : [];
      
      // Get recommendations from sessionStorage
      const storedRecommendations = sessionStorage.getItem('recommendations');
      if (storedRecommendations) {
        this.recommendations = JSON.parse(storedRecommendations);
      }
      
      this.isLoading = false;
    });

    // Set SEO meta tags
    document.title = 'Destination Recommendations - TripSaver';
  }

  // Improve accuracy by taking Trip Readiness test (optional)
  improveAccuracy(): void {
    // Navigate to Trip Readiness screen (Screen 3)
    // This will be implemented when Trip Readiness component is created
    console.log('Navigating to Trip Readiness form...');
    // this.router.navigate(['/trip-readiness']);
  }

  resetPreferences(): void {
    // Clear session storage and navigate back home
    sessionStorage.removeItem('preferences');
    sessionStorage.removeItem('recommendations');
    // this.router.navigate(['/']);
  }
}
