import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseProviderDataService } from './base-provider-data.service';
import { Hotel, ProviderConfig } from './provider-data.models';

/**
 * Agoda-specific hotel data service
 * Handles parsing of Agoda CSV files with their specific column names
 * Easily extended to support MakeMyTrip, Booking.com, etc. by creating similar services
 */
@Injectable({ providedIn: 'root' })
export class AgodaDataService extends BaseProviderDataService {
  constructor(http: HttpClient) {
    super(http);

    // Configure Agoda-specific settings
    // CSV path points to the Agoda CSV file in assets
    // Field mapping translates Agoda CSV column names to our Hotel interface
    this.providerConfig = {
      name: 'agoda',
      // Public Google Drive direct-download URL for the uploaded CSV
      csvPath: 'https://drive.google.com/uc?export=download&id=1vYalVP7-H0SA1jCcVTTBTPaTkkjDADrY',
      chunkSize: 100, // Process 100 rows at a time
      fieldMapping: {
        // Update these based on actual Agoda CSV column names
        hotelId: 'Hotel ID',
        hotelName: 'Hotel Name',
        city: 'City',
        country: 'Country',
        rating: 'Rating',
        reviewCount: 'Review Count',
        pricePerNight: 'Price Per Night',
        originalPrice: 'Original Price',
        discount: 'Discount %',
        currency: 'Currency',
        image: 'Image URL',
        description: 'Description',
        amenities: 'Amenities',
        checkInDate: 'Check-in Date',
        checkOutDate: 'Check-out Date',
        affiliateUrl: 'Affiliate URL'
      }
    };
  }

  /**
   * Override to add Agoda-specific transformations
   * e.g., clean up Agoda-specific formatting
   */
  protected override mapRowToHotel(row: Record<string, string>, headers: string[]): Hotel | null {
    const hotel = super.mapRowToHotel(row, headers);

    if (hotel) {
      // Agoda-specific cleaning/transformation
      hotel.hotelName = hotel.hotelName.trim();
      // Add more Agoda-specific logic here if needed
    }

    return hotel;
  }
}
