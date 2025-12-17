import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of, timeout } from 'rxjs';
import { Destination } from '../../engines/destination/destinations.data';

interface MongoDocument {
  _id: string;
  [key: string]: any;
}

interface MongoResponse<T> {
  documents: T[];
}

interface TrustBadge {
  _id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

interface TrustMessage {
  _id: string;
  message: string;
  category: string;
  order: number;
}

@Injectable()
export class MongoDBService {
  private http = inject(HttpClient);

  private readonly CONFIG = {
    // ⚠️ SECURITY: Credentials removed from source code
    // Set via environment variables: MONGODB_PUBLIC_KEY, MONGODB_PRIVATE_KEY
    dataApiUrl: 'https://ap-south-1.aws.data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1',
    apiKey: 'YOUR_API_KEY_FROM_ENV',
    dataSource: 'Cluster0',
    database: 'tripsaver'
  };

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': this.CONFIG.apiKey
    });
  }

  /**
   * Get all destinations from MongoDB via backend proxy
   * Uses Render.com backend to handle CORS for GitHub Pages
   * Includes 5-second timeout and fallback to static data
   * 
   * ⚠️ TEMPORARILY DISABLED - Using static data until MongoDB credentials are fixed
   */
  getAllDestinations(): Observable<Destination[]> {
    // ❌ COMMENTED OUT - Backend service disabled due to MongoDB API auth error (cannot find app using Client App ID 'gzggipjk')
    // const backendUrl = 'https://tripsaver-github-io.onrender.com/api/destinations';
    // 
    // // Try backend proxy first (with 5-second timeout)
    // return this.http.post<MongoResponse<Destination>>(
    //   backendUrl,
    //   {},
    //   { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    // ).pipe(
    //   timeout(5000), // 5-second timeout
    //   map(response => {
    //     console.log('✅ Backend Proxy Response:', response);
    //     return response.documents || [];
    //   }),
    //   catchError(error => {
    //     console.error('❌ Backend proxy failed:', error.status, error.message);
    //     if (error.status === 0 || error.name === 'TimeoutError') {
    //       console.warn('⚠️ MongoDB/Backend timeout or unreachable');
    //     } else if (error.error?.error) {
    //       console.warn('⚠️ MongoDB Error:', error.error.error);
    //     }
    //     console.warn('⚠️ Falling back to static destination data (this works perfectly!)');
    //     console.info('ℹ️ All features work with static data - no functionality lost');
    //     return of([]);
    //   })
    // );

    // ✅ USING STATIC DATA DIRECTLY - No loader hang, full functionality maintained
    console.log('📦 Using static destination data (Backend temporarily disabled)');
    return of([]);
  }

  /**
   * Get a single destination by ID
   * ❌ DISABLED - Using static data only
   */
  getDestination(id: string): Observable<Destination | null> {
    // COMMENTED OUT - Backend disabled due to MongoDB credentials issue
    // const body = {
    //   dataSource: this.CONFIG.dataSource,
    //   database: this.CONFIG.database,
    //   collection: 'destinations',
    //   filter: { _id: id }
    // };
    //
    // return this.http.post<MongoResponse<Destination>>(
    //   `${this.CONFIG.dataApiUrl}/action/findOne`,
    //   body,
    //   { headers: this.getHeaders() }
    // ).pipe(
    //   map(response => response.documents[0] || null),
    //   catchError(error => {
    //     console.error(`Error fetching destination ${id}:`, error);
    //     return of(null);
    //   })
    // );
    return of(null);
  }

  /**
   * Search destinations by filters
   * ❌ DISABLED - Using static data only
   */
  searchDestinations(filters: {
    categories?: string[];
    budget?: string;
    climate?: string;
    state?: string;
  }): Observable<Destination[]> {
    // COMMENTED OUT - Backend disabled due to MongoDB credentials issue
    // const filter: any = {};
    //
    // if (filters.categories && filters.categories.length > 0) {
    //   filter.categories = { $in: filters.categories };
    // }
    // if (filters.budget) {
    //   filter.budget = filters.budget;
    // }
    // if (filters.climate) {
    //   filter.climate = filters.climate;
    // }
    // if (filters.state) {
    //   filter.state = filters.state;
    // }
    //
    // return this.http.post<MongoResponse<Destination>>(
    //   '/api/mongo/search',
    //   { filter }
    // ).pipe(
    //   map(response => response.documents),
    //   catchError(error => {
    //     console.error('Error searching destinations:', error);
    //     return of([]);
    //   })
    // );
    return of([]);
  }

  /**
   * Get destinations by month (best time to visit)
   * ❌ DISABLED - Using static data only
   */
  getDestinationsByMonth(month: number): Observable<Destination[]> {
    // COMMENTED OUT - Backend disabled due to MongoDB credentials issue
    // const body = {
    //   dataSource: this.CONFIG.dataSource,
    //   database: this.CONFIG.database,
    //   collection: 'destinations',
    //   filter: {
    //     bestMonths: { $in: [month] }
    //   }
    // };
    //
    // return this.http.post<MongoResponse<Destination>>(
    //   `${this.CONFIG.dataApiUrl}/action/find`,
    //   body,
    //   { headers: this.getHeaders() }
    // ).pipe(
    //   map(response => response.documents),
    //   catchError(error => {
    //     console.error(`Error fetching destinations for month ${month}:`, error);
    //     return of([]);
    //   })
    // );
    return of([]);
  }

  /**
   * Get trust badges for building credibility
   * ❌ DISABLED - Using static data only
   */
  getTrustBadges(): Observable<TrustBadge[]> {
    // COMMENTED OUT - Backend disabled due to MongoDB credentials issue
    // const body = {
    //   dataSource: this.CONFIG.dataSource,
    //   database: this.CONFIG.database,
    //   collection: 'trust_badges',
    //   sort: { order: 1 }
    // };
    //
    // return this.http.post<MongoResponse<TrustBadge>>(
    //   `${this.CONFIG.dataApiUrl}/action/find`,
    //   body,
    //   { headers: this.getHeaders() }
    // ).pipe(
    //   map(response => response.documents),
    //   catchError(error => {
    //     console.error('Error fetching trust badges:', error);
    //     return of([]);
    //   })
    // );

    return of([]);
  }

  /**
   * Get trust messages for building credibility
   * ❌ DISABLED - Using static data only
   */
  getTrustMessages(category?: string): Observable<TrustMessage[]> {
    // COMMENTED OUT - Backend disabled due to MongoDB credentials issue
    // const filter = category ? { category } : {};
    //
    // const body = {
    //   dataSource: this.CONFIG.dataSource,
    //   database: this.CONFIG.database,
    //   collection: 'trust_messages',
    //   filter,
    //   sort: { order: 1 }
    // };
    //
    // return this.http.post<MongoResponse<TrustMessage>>(
    //   `${this.CONFIG.dataApiUrl}/action/find`,
    //   body,
    //   { headers: this.getHeaders() }
    // ).pipe(
    //   map(response => response.documents),
    //   catchError(error => {
    //     console.error('Error fetching trust messages:', error);
    //     return of([]);
    //   })
    // );

    return of([]);
  }
}
