import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecommendationEngine } from '../../core/engines/recommendation/recommendation.engine';
import { DestinationScoringEngine } from '../../core/engines/destination-scoring/destination-scoring.engine';
import { TripReadinessEngine } from '../../core/engines/trip-readiness/trip-readiness.engine';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

@Component({
  selector: 'app-trip-stepper',
  standalone: true,
  imports: [CommonModule, FormsModule, BookingModalComponent],
  templateUrl: './trip-stepper.component.html',
  styleUrls: ['./trip-stepper.component.scss'],
  providers: [DestinationScoringEngine, TripReadinessEngine, RecommendationEngine]
})
export class TripStepperComponent implements OnInit {
  private recommendationEngine = inject(RecommendationEngine);
  private cdr = inject(ChangeDetectorRef);

  // ✅ Stepper State
  currentStep = 1;
  totalSteps = 4;

  // ✅ Form Data (Persisted across steps)
  preferences = {
    interests: [] as string[],
    budget: 'moderate' as 'budget' | 'moderate' | 'premium',
    duration: '3-5' as '1' | '3-5' | '6-10',
    month: new Date().getMonth() + 1,
    climate: 'doesnt-matter' as 'warm' | 'cool' | 'doesnt-matter',
    budgetReady: true,
    docsReady: true,
    flexibleDates: true
  };

  // ✅ UI State
  uiState = {
    loading: false,
    hasResults: false,
    error: null as string | null
  };

  recommendations: any[] = [];
  isBookingModalOpen = false;
  selectedDestination: any = null;

  // ✅ Step Data
  interestOptions = [
    { icon: '🏖', label: 'Beach' },
    { icon: '🏔', label: 'Hill / Nature' },
    { icon: '🏛', label: 'Heritage' },
    { icon: '🎒', label: 'Adventure' },
    { icon: '🍽', label: 'Food & Culture' },
    { icon: '🧘', label: 'Relaxation' }
  ];

  budgetOptions = [
    { value: 'budget', label: '₹5k–₹10k' },
    { value: 'moderate', label: '₹10k–₹20k' },
    { value: 'premium', label: '₹20k+' }
  ];

  durationOptions = [
    { value: '1', label: 'Weekend' },
    { value: '3-5', label: '3–5 Days' },
    { value: '6-10', label: '6–10 Days' }
  ];

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  climateOptions = [
    { icon: '☀️', label: 'Warm', value: 'warm' },
    { icon: '❄️', label: 'Cool', value: 'cool' },
    { icon: '🌦', label: "Doesn't matter", value: 'doesnt-matter' }
  ];

  ngOnInit(): void {
    // Initialize stepper
  }

  // ✅ Navigation
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.cdr.detectChanges();
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.cdr.detectChanges();
    }
  }

  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }

  // ✅ Step Validation
  isStep1Valid(): boolean {
    return this.preferences.interests.length > 0;
  }

  isStep2Valid(): boolean {
    return !!this.preferences.budget && !!this.preferences.duration;
  }

  isStep3Valid(): boolean {
    return !!this.preferences.month && !!this.preferences.climate;
  }

  isStep4Valid(): boolean {
    return true; // All toggles have defaults
  }

  // ✅ Interest Toggle
  toggleInterest(interest: string): void {
    const index = this.preferences.interests.indexOf(interest);
    if (index > -1) {
      this.preferences.interests.splice(index, 1);
    } else {
      this.preferences.interests.push(interest);
    }
  }

  isInterestSelected(interest: string): boolean {
    return this.preferences.interests.includes(interest);
  }

  // ✅ Readiness Toggle
  toggleReadiness(field: 'budgetReady' | 'docsReady' | 'flexibleDates'): void {
    this.preferences[field] = !this.preferences[field];
  }

  // ✅ Submit & Get Recommendations
  async submitPreferences(): Promise<void> {
    if (!this.isStep4Valid()) return;

    this.uiState.loading = true;
    this.uiState.error = null;

    try {
      // Convert preferences to recommendation input format
      const input = {
        month: this.preferences.month,
        budget: this.preferences.budget,
        categories: this.preferences.interests,
        climate: this.preferences.climate === 'doesnt-matter' ? null : this.preferences.climate,
        duration: this.preferences.duration,
        budgetReady: this.preferences.budgetReady,
        docsReady: this.preferences.docsReady,
        flexibleDates: this.preferences.flexibleDates
      };

      const result = await this.recommendationEngine.getRecommendations(input).toPromise();

      if (result && result.recommendations) {
        this.recommendations = result.recommendations;
        this.uiState.hasResults = true;
        this.currentStep = this.totalSteps + 1; // Move to results view
      }
    } catch (error) {
      this.uiState.error = 'Failed to get recommendations. Please try again.';
      console.error('Recommendation error:', error);
    } finally {
      this.uiState.loading = false;
      this.cdr.detectChanges();
    }
  }

  // ✅ Result Display
  getScoreBadgeClass(score: number): string {
    if (score >= 80) return 'badge-excellent';
    if (score >= 60) return 'badge-good';
    if (score >= 40) return 'badge-fair';
    return 'badge-low';
  }

  getScoreBadgeText(score: number): string {
    if (score >= 80) return 'Highly Recommended';
    if (score >= 60) return 'Recommended';
    if (score >= 40) return 'Consider';
    return 'Lower Match';
  }

  // ✅ Booking Modal
  openBookingModal(destination: any): void {
    this.selectedDestination = destination;
    this.isBookingModalOpen = true;
  }

  closeBookingModal(): void {
    this.isBookingModalOpen = false;
    this.selectedDestination = null;
  }

  // ✅ Restart
  restartStepper(): void {
    this.currentStep = 1;
    this.preferences = {
      interests: [],
      budget: 'moderate',
      duration: '3-5',
      month: new Date().getMonth() + 1,
      climate: 'doesnt-matter',
      budgetReady: true,
      docsReady: true,
      flexibleDates: true
    };
    this.recommendations = [];
    this.uiState = { loading: false, hasResults: false, error: null };
  }
}
