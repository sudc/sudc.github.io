import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface AgodaHotel {
  hotelId: string;
  hotelName: string;
  city: string;
  country: string;
  rating: number;
  reviewScore: number;
  numberOfReviews: number;
  priceFrom: number;
  currency: string;
  imageUrl: string;
  description: string;
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  affiliateUrl: string;
  // Add more fields based on your CSV structure
}

@Injectable({
  providedIn: 'root'
})
export class AgodaDataService {
  private csvPath = 'assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv';

  constructor(private http: HttpClient) {}

  /**
   * Load and parse Agoda hotel data from CSV
   */
  loadHotelData(): Observable<AgodaHotel[]> {
    return this.http.get(this.csvPath, { responseType: 'text' }).pipe(
      map(csvData => this.parseCSV(csvData))
    );
  }

  /**
   * Parse CSV data into structured hotel objects
   */
  private parseCSV(csvData: string): AgodaHotel[] {
    const lines = csvData.split('\n');
    const headers = this.parseCSVLine(lines[0]);
    const hotels: AgodaHotel[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      
      const values = this.parseCSVLine(lines[i]);
      const hotel = this.mapToHotel(headers, values);
      if (hotel) {
        hotels.push(hotel);
      }
    }

    return hotels;
  }

  /**
   * Parse a single CSV line handling quoted values
   */
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  /**
   * Map CSV row to AgodaHotel object
   * Adjust field mappings based on actual CSV structure
   */
  private mapToHotel(headers: string[], values: string[]): AgodaHotel | null {
    try {
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      // Map CSV columns to AgodaHotel interface
      // ADJUST THESE MAPPINGS based on your actual CSV column names
      return {
        hotelId: row['hotel_id'] || row['id'] || '',
        hotelName: row['hotel_name'] || row['name'] || '',
        city: row['city'] || '',
        country: row['country'] || '',
        rating: parseFloat(row['rating'] || row['star_rating'] || '0'),
        reviewScore: parseFloat(row['review_score'] || row['score'] || '0'),
        numberOfReviews: parseInt(row['number_of_reviews'] || row['reviews'] || '0'),
        priceFrom: parseFloat(row['price_from'] || row['price'] || '0'),
        currency: row['currency'] || 'USD',
        imageUrl: row['image_url'] || row['image'] || '',
        description: row['description'] || '',
        amenities: (row['amenities'] || '').split('|').filter((a: string) => a.trim()),
        coordinates: {
          latitude: parseFloat(row['latitude'] || row['lat'] || '0'),
          longitude: parseFloat(row['longitude'] || row['lng'] || '0')
        },
        affiliateUrl: this.buildAffiliateUrl(row['hotel_id'] || row['id'])
      };
    } catch (error) {
      console.error('Error parsing hotel row:', error);
      return null;
    }
  }

  /**
   * Build Agoda affiliate URL for a hotel
   */
  private buildAffiliateUrl(hotelId: string): string {
    return `https://www.agoda.com/partners/partnersearch.aspx?pcs=10&cid=1955073&hl=en-us&hid=${hotelId}`;
  }

  /**
   * Filter hotels by city
   */
  getHotelsByCity(city: string): Observable<AgodaHotel[]> {
    return this.loadHotelData().pipe(
      map(hotels => hotels.filter(h => 
        h.city.toLowerCase().includes(city.toLowerCase())
      ))
    );
  }

  /**
   * Get top rated hotels
   */
  getTopRatedHotels(limit: number = 10): Observable<AgodaHotel[]> {
    return this.loadHotelData().pipe(
      map(hotels => hotels
        .filter(h => h.reviewScore > 0)
        .sort((a, b) => b.reviewScore - a.reviewScore)
        .slice(0, limit)
      )
    );
  }

  /**
   * Search hotels by name or city
   */
  searchHotels(query: string): Observable<AgodaHotel[]> {
    return this.loadHotelData().pipe(
      map(hotels => hotels.filter(h => 
        h.hotelName.toLowerCase().includes(query.toLowerCase()) ||
        h.city.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  /**
   * Get hotels by price range
   */
  getHotelsByPriceRange(min: number, max: number): Observable<AgodaHotel[]> {
    return this.loadHotelData().pipe(
      map(hotels => hotels.filter(h => 
        h.priceFrom >= min && h.priceFrom <= max
      ))
    );
  }

  /**
   * Get featured hotels (high rating + good reviews)
   */
  getFeaturedHotels(limit: number = 6): Observable<AgodaHotel[]> {
    return this.loadHotelData().pipe(
      map(hotels => hotels
        .filter(h => h.rating >= 4 && h.reviewScore >= 8 && h.numberOfReviews >= 50)
        .sort((a, b) => b.reviewScore - a.reviewScore)
        .slice(0, limit)
      )
    );
  }
}
