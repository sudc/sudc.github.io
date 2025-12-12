import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgodaDataService, AgodaHotel } from '../../core/services/agoda-data/agoda-data.service';

@Component({
  selector: 'app-agoda-hotels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agoda-hotels.component.html',
  styleUrls: ['./agoda-hotels.component.scss']
})
export class AgodaHotelsComponent implements OnInit {
  featuredHotels: AgodaHotel[] = [];
  loading = true;
  error: string | null = null;

  constructor(private agodaService: AgodaDataService) {}

  ngOnInit() {
    this.loadFeaturedHotels();
  }

  loadFeaturedHotels() {
    this.loading = true;
    this.agodaService.getFeaturedHotels(12).subscribe({
      next: (hotels) => {
        this.featuredHotels = hotels;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading Agoda hotels:', err);
        this.error = 'Failed to load hotels. Please try again later.';
        this.loading = false;
      }
    });
  }

  trackHotelClick(hotel: AgodaHotel) {
    console.log(`Agoda Hotel Clicked: ${hotel.hotelName} (ID: ${hotel.hotelId})`);
    // Add analytics tracking here
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
