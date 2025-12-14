// TEMPORARILY DISABLED - NOT USED YET
/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Destination {
  _id: string;
  name: string;
  slug: string;
  state: string;
  region: string;
  tagline: string;
  description: string;
  hero_image: string;
  categories: string[];
  budget_level: 'budget' | 'moderate' | 'premium';
  accessibility: 'Easy' | 'Moderate' | 'Challenging';
  best_months: number[];
  off_season_months: number[];
  monsoon_months: number[];
  peak_season_months: number[];
  climate: any;
  weather_details: any;
  crowd_patterns: any;
  experience_tags: any;
  top_attractions: string[];
  activities: string[];
  avg_stay_days: number;
  connectivity: any;
  sources: string[];
  created_at: string;
  updated_at: string;
}

export interface TrustBadge {
  _id: string;
  engine_type: string;
  name: string;
  badge_label: string;
  badge_icon: string;
  badge_color: string;
  color_hex: string;
  background_hex: string;
  border_hex: string;
  tooltip_text: string;
  short_description: string;
  full_description: string;
  placement_recommendations: string[];
  typical_score_range: string;
  score_labels: any;
  enabled: boolean;
  priority: number;
  created_at: string;
}

export interface TrustMessage {
  _id: string;
  message_type: string;
  context: string;
  content: string;
  placement: string;
  enabled: boolean;
  priority: number;
}

@Injectable({
  providedIn: 'root'
})
export class MongoDbService {
  private apiUrl = environment.mongodb.dataApiUrl;
  private dataSource = environment.mongodb.dataSource;
  private database = environment.mongodb.database;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': environment.mongodb.apiKey
    });
  }

  // ==========================================
  // DESTINATIONS
  // ==========================================

  /**
   * Get all destinations
   */
  getDestinations(): Observable<Destination[]> {
    return this.http.post<any>(
      `${this.apiUrl}/action/find`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.destinations
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.documents || [])
    );
  }

  /**
   * Get single destination by ID
   */
  getDestination(id: string): Observable<Destination | null> {
    return this.http.post<any>(
      `${this.apiUrl}/action/findOne`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.destinations,
        filter: { _id: id }
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.document || null)
    );
  }

  /**
   * Search destinations by categories, budget, and month
   */
  searchDestinations(params: {
    categories?: string[];
    budgetLevel?: string;
    month?: number;
    accessibility?: string;
  }): Observable<Destination[]> {
    const filter: any = {};
    
    if (params.categories && params.categories.length > 0) {
      filter.categories = { $in: params.categories };
    }
    
    if (params.budgetLevel) {
      filter.budget_level = params.budgetLevel;
    }
    
    if (params.month) {
      filter.best_months = params.month;
    }

    if (params.accessibility) {
      filter.accessibility = params.accessibility;
    }

    return this.http.post<any>(
      `${this.apiUrl}/action/find`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.destinations,
        filter: filter
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.documents || [])
    );
  }

  /**
   * Get destinations by category
   */
  getDestinationsByCategory(category: string): Observable<Destination[]> {
    return this.http.post<any>(
      `${this.apiUrl}/action/find`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.destinations,
        filter: { categories: category }
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.documents || [])
    );
  }

  /**
   * Get destinations best for specific month
   */
  getDestinationsForMonth(month: number): Observable<Destination[]> {
    return this.http.post<any>(
      `${this.apiUrl}/action/find`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.destinations,
        filter: { best_months: month }
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.documents || [])
    );
  }

  // ==========================================
  // TRUST BADGES
  // ==========================================

  /**
   * Get all enabled trust badges
   */
  getTrustBadges(): Observable<TrustBadge[]> {
    return this.http.post<any>(
      `${this.apiUrl}/action/find`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.trustBadges,
        filter: { enabled: true },
        sort: { priority: 1 }
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.documents || [])
    );
  }

  /**
   * Get badge by engine type
   */
  getBadgeByEngine(engineType: string): Observable<TrustBadge | null> {
    return this.http.post<any>(
      `${this.apiUrl}/action/findOne`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.trustBadges,
        filter: { engine_type: engineType }
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.document || null)
    );
  }

  // ==========================================
  // TRUST MESSAGES
  // ==========================================

  /**
   * Get trust messages by context
   */
  getTrustMessages(context?: string): Observable<TrustMessage[]> {
    const filter: any = { enabled: true };
    
    if (context) {
      filter.context = context;
    }
    
    return this.http.post<any>(
      `${this.apiUrl}/action/find`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.trustMessages,
        filter: filter,
        sort: { priority: 1 }
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.documents || [])
    );
  }

  /**
   * Get single trust message by ID
   */
  getTrustMessage(id: string): Observable<TrustMessage | null> {
    return this.http.post<any>(
      `${this.apiUrl}/action/findOne`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.trustMessages,
        filter: { _id: id }
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.document || null)
    );
  }

  /**
   * Get trust messages by type (hero, footer, modal, etc.)
   */
  getTrustMessagesByType(messageType: string): Observable<TrustMessage[]> {
    return this.http.post<any>(
      `${this.apiUrl}/action/find`,
      {
        dataSource: this.dataSource,
        database: this.database,
        collection: environment.mongodb.collections.trustMessages,
        filter: { message_type: messageType, enabled: true },
        sort: { priority: 1 }
      },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.documents || [])
    );
  }
}
*/
