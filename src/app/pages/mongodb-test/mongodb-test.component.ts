import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mongodb-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px;">
      <h2>MongoDB Connection Test</h2>
      <button (click)="testConnection()">Test MongoDB Data API</button>
      <button (click)="insertDestination()">Insert Test Destination</button>
      
      <div *ngIf="loading" style="margin-top: 20px;">Loading...</div>
      
      <div *ngIf="result" style="margin-top: 20px;">
        <h3>Result:</h3>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">{{ result | json }}</pre>
      </div>
      
      <div *ngIf="error" style="margin-top: 20px; color: red;">
        <h3>Error:</h3>
        <pre style="background: #fee; padding: 10px; border-radius: 5px;">{{ error }}</pre>
      </div>
    </div>
  `
})
export class MongoDbTestComponent {
  result: any = null;
  error: any = null;
  loading = false;

  private readonly dataApiUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1';
  private readonly apiKey = '5c39bfd7-bc63-4656-b088-a147ca8ba608';
  private readonly dataSource = 'Cluster0';
  private readonly database = 'tripsaver';

  constructor(private http: HttpClient) {}

  testConnection() {
    this.loading = true;
    this.result = null;
    this.error = null;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': this.apiKey
    });

    const body = {
      dataSource: this.dataSource,
      database: this.database,
      collection: 'destinations'
    };

    this.http.post(`${this.dataApiUrl}/action/find`, body, { headers })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.result = response;
          console.log('MongoDB Response:', response);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || JSON.stringify(err);
          console.error('MongoDB Error:', err);
        }
      });
  }

  insertDestination() {
    this.loading = true;
    this.result = null;
    this.error = null;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': this.apiKey
    });

    const body = {
      dataSource: this.dataSource,
      database: this.database,
      collection: 'destinations',
      document: {
        id: 'goa',
        state: 'Goa',
        categories: ['Beach', 'Party'],
        bestMonths: [11, 12, 1, 2],
        avoidMonths: [6, 7, 8],
        climate: 'tropical',
        budget: 'moderate',
        agoda: 'goa-in',
        createdAt: new Date().toISOString()
      }
    };

    this.http.post(`${this.dataApiUrl}/action/insertOne`, body, { headers })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.result = response;
          console.log('Insert Response:', response);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || JSON.stringify(err);
          console.error('Insert Error:', err);
        }
      });
  }
}
