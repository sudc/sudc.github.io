import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Hotel, ProviderConfig, ParsedHotelData } from './provider-data.models';

/**
 * Abstract base service for all hotel data providers
 * Handles CSV parsing, chunking, caching, and transformation
 */
@Injectable({ providedIn: 'root' })
export abstract class BaseProviderDataService {
  protected providerConfig!: ProviderConfig;
  protected cachedHotels$ = new BehaviorSubject<Hotel[]>([]);
  protected isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(protected http: HttpClient) {}

  /**
   * Load and parse CSV file from assets
   * Supports large files by loading/parsing in chunks
   */
  loadHotelsFromCsv(): Observable<Hotel[]> {
    this.isLoading$.next(true);

    return this.http.get(this.providerConfig.csvPath, { responseType: 'text' }).pipe(
      map((csvText) => this.parseCSV(csvText)),
      tap((hotels) => {
        this.cachedHotels$.next(hotels);
        this.isLoading$.next(false);
      }),
      catchError((error) => {
        console.error(`Failed to load hotels from ${this.providerConfig.name}:`, error);
        this.isLoading$.next(false);
        throw error;
      })
    );
  }

  /**
   * Parse CSV text into Hotel objects
   * Respects field mapping for flexible column naming
   */
  protected parseCSV(csvText: string): Hotel[] {
    const lines = csvText.split('\n').filter((line) => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim());
    const hotels: Hotel[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim());
      const row: Record<string, string> = {};

      headers.forEach((header, idx) => {
        row[header] = values[idx] || '';
      });

      const hotel = this.mapRowToHotel(row, headers);
      if (hotel) hotels.push(hotel);
    }

    return hotels;
  }

  /**
   * Transform a CSV row into a Hotel object using provider's field mapping
   * Override in subclass to customize transformation
   */
  protected mapRowToHotel(row: Record<string, string>, headers: string[]): Hotel | null {
    try {
      const map = this.providerConfig.fieldMapping;
      return {
        hotelId: row[map['hotelId']] || '',
        hotelName: row[map['hotelName']] || '',
        city: row[map['city']] || '',
        country: row[map['country']] || '',
        rating: parseFloat(row[map['rating']] || '0'),
        reviewCount: parseInt(row[map['reviewCount']] || '0', 10),
        pricePerNight: parseFloat(row[map['pricePerNight']] || '0'),
        originalPrice: parseFloat(row[map['originalPrice']] || '0'),
        discount: parseFloat(row[map['discount']] || '0'),
        currency: row[map['currency']] || 'INR',
        image: row[map['image']] || '',
        description: row[map['description']] || '',
        amenities: row[map['amenities']]?.split(';').map((a) => a.trim()) || [],
        checkInDate: row[map['checkInDate']] || '',
        checkOutDate: row[map['checkOutDate']] || '',
        provider: this.providerConfig.name,
        affiliateUrl: row[map['affiliateUrl']] || '',
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error mapping row to hotel:', row, error);
      return null;
    }
  }

  /**
   * Get featured hotels (e.g., top-rated or discounted)
   */
  getFeaturedHotels(limit: number = 12): Observable<Hotel[]> {
    return this.cachedHotels$.pipe(
      map((hotels) =>
        hotels
          .sort((a, b) => (b.rating + b.discount / 100) - (a.rating + a.discount / 100))
          .slice(0, limit)
      )
    );
  }

  /**
   * Search hotels by destination
   */
  searchHotels(query: string): Observable<Hotel[]> {
    return this.cachedHotels$.pipe(
      map((hotels) =>
        hotels.filter((h) =>
          h.hotelName.toLowerCase().includes(query.toLowerCase()) ||
          h.city.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  /**
   * Filter hotels by price range
   */
  filterByPrice(minPrice: number, maxPrice: number): Observable<Hotel[]> {
    return this.cachedHotels$.pipe(
      map((hotels) =>
        hotels.filter((h) => h.pricePerNight >= minPrice && h.pricePerNight <= maxPrice)
      )
    );
  }

  /**
   * Get loading state
   */
  getLoadingState(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  /**
   * Get cached hotels (synchronous fallback)
   */
  getCachedHotels(): Hotel[] {
    return this.cachedHotels$.value;
  }
}
