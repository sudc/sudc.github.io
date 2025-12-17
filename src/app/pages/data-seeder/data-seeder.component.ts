import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DESTINATIONS_DATA } from '../../core/engines/destination/destinations.data';

interface MongoInsertResponse {
  insertedIds: string[];
}

@Component({
  selector: 'app-data-seeder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-8">
      <h1 class="text-3xl font-bold mb-6">Data Seeder</h1>
      
      <div class="mb-8 p-4 bg-blue-50 rounded">
        <h2 class="text-xl font-semibold mb-2">Destinations Data</h2>
        <p class="mb-4">Total destinations to insert: {{ destinationCount }}</p>
        <button 
          (click)="seedDestinations()"
          [disabled]="isSeeding"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
          {{ isSeeding ? 'Seeding...' : 'Seed Destinations to MongoDB' }}
        </button>
      </div>

      <div *ngIf="message" class="p-4 rounded mb-4"
           [class.bg-green-50]="isSuccess"
           [class.bg-red-50]="!isSuccess">
        <p class="font-semibold" [class.text-green-700]="isSuccess" [class.text-red-700]="!isSuccess">
          {{ message }}
        </p>
      </div>

      <div *ngIf="insertedIds.length > 0" class="p-4 bg-gray-50 rounded">
        <h3 class="font-semibold mb-2">Inserted IDs ({{ insertedIds.length }}):</h3>
        <div class="max-h-64 overflow-y-auto">
          <ul class="list-disc pl-5 text-sm">
            <li *ngFor="let id of insertedIds">{{ id }}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DataSeederComponent {
  private http = inject(HttpClient);
  
  destinationCount = Object.keys(DESTINATIONS_DATA).length;
  isSeeding = false;
  message = '';
  isSuccess = false;
  insertedIds: string[] = [];

  private readonly MONGODB_CONFIG = {
    dataApiUrl: 'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1',
    // ⚠️ SECURITY: Credentials removed - set via environment variables
    apiKey: 'YOUR_API_KEY_FROM_ENV',
    dataSource: 'Cluster0',
    database: 'tripsaver'
  };

  async seedDestinations() {
    this.isSeeding = true;
    this.message = '';
    this.insertedIds = [];

    try {
      // Convert destinations data to array format with _id
      const destinations = Object.entries(DESTINATIONS_DATA).map(([id, data]) => ({
        _id: id,
        ...data
      }));

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'api-key': this.MONGODB_CONFIG.apiKey
      });

      const body = {
        dataSource: this.MONGODB_CONFIG.dataSource,
        database: this.MONGODB_CONFIG.database,
        collection: 'destinations',
        documents: destinations
      };

      const response = await this.http.post<MongoInsertResponse>(
        `${this.MONGODB_CONFIG.dataApiUrl}/action/insertMany`,
        body,
        { headers }
      ).toPromise();

      if (response?.insertedIds) {
        this.insertedIds = Object.values(response.insertedIds);
        this.isSuccess = true;
        this.message = `Successfully inserted ${this.insertedIds.length} destinations!`;
      }
    } catch (error: any) {
      this.isSuccess = false;
      this.message = `Error seeding data: ${error.message || 'Unknown error'}`;
      console.error('Seeding error:', error);
    } finally {
      this.isSeeding = false;
    }
  }
}
