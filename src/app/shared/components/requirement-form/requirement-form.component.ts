import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface UserRequirements {
  destination: string;
  travelType: 'solo' | 'couple' | 'family' | 'business' | null;
  budgetRange: 'budget' | 'midrange' | 'luxury' | null;
  preferences: {
    internationalBrands: boolean;
    indianChains: boolean;
    freeCancellation: boolean;
    payAtHotel: boolean;
    mobileDeal: boolean;
    couponsCashback: boolean;
  };
}

@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent {
  @Output() formSubmit = new EventEmitter<UserRequirements>();
  @Output() closeForm = new EventEmitter<void>();

  currentStep = 1;
  totalSteps = 4;

  // Form data
  destination = '';
  travelType: 'solo' | 'couple' | 'family' | 'business' | null = null;
  budgetRange: 'budget' | 'midrange' | 'luxury' | null = null;
  preferences = {
    internationalBrands: false,
    indianChains: false,
    freeCancellation: false,
    payAtHotel: false,
    mobileDeal: false,
    couponsCashback: false
  };

  // Popular destinations
  popularDestinations = [
    'Goa', 'Mumbai', 'Delhi', 'Bangalore', 'Jaipur',
    'Udaipur', 'Kerala', 'Manali', 'Shimla', 'Agra',
    'Dubai', 'Bangkok', 'Singapore', 'Bali', 'Maldives'
  ];

  isStep1Valid(): boolean {
    return this.destination.trim().length > 0;
  }

  isStep2Valid(): boolean {
    return this.travelType !== null;
  }

  isStep3Valid(): boolean {
    return this.budgetRange !== null;
  }

  isStep4Valid(): boolean {
    return true; // Preferences are optional
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1: return this.isStep1Valid();
      case 2: return this.isStep2Valid();
      case 3: return this.isStep3Valid();
      case 4: return this.isStep4Valid();
      default: return false;
    }
  }

  nextStep(): void {
    if (this.canProceed() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectTravelType(type: 'solo' | 'couple' | 'family' | 'business'): void {
    this.travelType = type;
  }

  selectBudget(range: 'budget' | 'midrange' | 'luxury'): void {
    this.budgetRange = range;
  }

  submitForm(): void {
    if (!this.canProceed()) return;

    const requirements: UserRequirements = {
      destination: this.destination,
      travelType: this.travelType,
      budgetRange: this.budgetRange,
      preferences: { ...this.preferences }
    };

    this.formSubmit.emit(requirements);
  }

  close(): void {
    this.closeForm.emit();
  }

  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
