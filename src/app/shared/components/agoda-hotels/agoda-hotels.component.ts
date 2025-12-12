import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgodaDataService, Hotel } from '../../../core/services/provider-data';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-agoda-hotels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agoda-hotels.component.html',
  styleUrls: ['./agoda-hotels.component.scss']
})
export class AgodaHotelsComponent implements OnInit, OnDestroy {
  featuredHotels: Hotel[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private agodaService: AgodaDataService) {}

  ngOnInit(): void {
    this.loadFeaturedHotels();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadFeaturedHotels(): void {
    this.loading = true;
    this.error = null;

    this.agodaService.loadHotelsFromCsv()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // After CSV loads, get featured hotels
          this.agodaService.getFeaturedHotels(12)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (hotels: Hotel[]) => {
                this.featuredHotels = hotels;
                this.loading = false;
              },
              error: (err: any) => {
                console.error('Error loading featured hotels:', err);
                this.error = 'Failed to load featured hotels. Please try again later.';
                this.loading = false;
              }
            });
        },
        error: (err: any) => {
          console.error('Error loading Agoda hotels CSV:', err);
          this.error = 'Failed to load hotel data. Please try again later.';
          this.loading = false;
        }
      });
  }

  trackHotelClick(hotel: Hotel): void {
    console.log(`Agoda Hotel Clicked: ${hotel.hotelName} (ID: ${hotel.hotelId})`);
    // Add analytics tracking here
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
