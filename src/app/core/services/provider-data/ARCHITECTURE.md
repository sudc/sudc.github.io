# Provider-Agnostic Hotel Data Architecture

This service layer enables seamless integration of hotel data from multiple providers (Agoda, MakeMyTrip, Booking.com, etc.) with minimal code duplication.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Components Layer                          │
│  (AgodaHotelsComponent, MakeMyTripHotelsComponent, etc.)      │
└──────────────────────────┬──────────────────────────────────┘
                           │ depends on
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Provider-Specific Services                       │
│  AgodaDataService │ MakeMyTripDataService │ BookingDataService│
└──────────────────────────┬──────────────────────────────────┘
                           │ extends
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              BaseProviderDataService                          │
│  • CSV parsing & caching                                      │
│  • Field mapping & transformation                             │
│  • Search & filter utilities                                  │
│  • Observable-based API                                       │
└──────────────────────────┬──────────────────────────────────┘
                           │ uses
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 Data Models (Hotel interface)                 │
│  Standardized structure for all providers                     │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
src/app/core/services/provider-data/
├── provider-data.models.ts        # Shared Hotel interface & config
├── base-provider-data.service.ts  # Abstract base service
├── agoda-data.service.ts          # Concrete implementations (Agoda, MakeMyTrip, Booking)
├── csv-chunker.js                 # Node.js utility to split large CSVs
├── index.ts                        # Barrel export for clean imports
└── ARCHITECTURE.md                 # This file
```

## Key Components

### 1. **Data Models** (`provider-data.models.ts`)

```typescript
export interface Hotel {
  hotelId: string;           // Unique ID from provider
  hotelName: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice: number;
  discount: number;          // Percentage
  currency: string;
  image: string;
  description: string;
  amenities: string[];
  checkInDate: string;
  checkOutDate: string;
  provider: string;          // 'agoda' | 'makemytrip' | 'booking'
  affiliateUrl: string;
  lastUpdated: string;
}
```

This standardized interface ensures all providers return data in the same shape, allowing components to work with any provider interchangeably.

### 2. **Base Service** (`base-provider-data.service.ts`)

Abstract service implementing common functionality:

- **CSV Parsing**: Reads comma-separated files, extracts headers & rows
- **Field Mapping**: Transforms provider-specific column names to Hotel interface
- **Caching**: Stores loaded data in BehaviorSubject for performance
- **Search & Filter**: Generic methods to search by destination, filter by price
- **Observable API**: RxJS-based, lazy-loaded data streams

Key methods:

```typescript
loadHotelsFromCsv(): Observable<Hotel[]>           // Load & parse CSV
getFeaturedHotels(limit: number): Observable<Hotel[]>  // Top-rated/discounted
searchHotels(query: string): Observable<Hotel[]>   // Search by name/city
filterByPrice(min, max): Observable<Hotel[]>       // Price range filter
getCachedHotels(): Hotel[]                         // Sync access to cached data
```

### 3. **Provider Services** (`agoda-data.service.ts`)

Concrete implementations for each provider. Only need to configure:

```typescript
@Injectable({ providedIn: 'root' })
export class AgodaDataService extends BaseProviderDataService {
  constructor(http: HttpClient) {
    super(http);

    this.providerConfig = {
      name: 'agoda',
      csvPath: '/assets/agoda-hotels.csv',  // Path to CSV file
      chunkSize: 100,                       // Rows per chunk
      fieldMapping: {
        hotelId: 'Hotel ID',      // Maps CSV column → Hotel property
        hotelName: 'Hotel Name',
        city: 'City',
        // ... etc
      }
    };
  }
}
```

**To add a new provider:**

1. Copy `AgodaDataService` template
2. Change `name`, `csvPath`, and `fieldMapping`
3. Override `mapRowToHotel()` if provider-specific cleanup is needed
4. Inject in components as needed

## CSV File Management

### Large File Handling

The `csv-chunker.js` utility splits large CSV files into manageable chunks:

```bash
node src/app/core/services/provider-data/csv-chunker.js \
  assets/agoda-hotels.csv \
  src/assets/data/agoda \
  1000
```

This creates:
- `chunk-0.csv` (rows 1-1000 + header)
- `chunk-1.csv` (rows 1001-2000 + header)
- ...
- `manifest.json` (metadata for reassembly)

**Benefits for Git:**
- Chunks < 100MB are easier to commit
- Reduces memory pressure during development
- Can be rebuilt from source on deploy

### Runtime Reassembly

To load chunked files at runtime, update `csvPath` and add logic to concatenate chunks:

```typescript
// In base-provider-data.service.ts
private async loadChunkedCSV(): Promise<string> {
  const manifest = await this.http.get(`${this.providerConfig.csvPath}/manifest.json`).toPromise();
  let fullCSV = '';
  
  for (const chunk of manifest.chunks) {
    const chunkData = await this.http.get(chunk.filename, { responseType: 'text' }).toPromise();
    fullCSV += chunkData + '\n';
  }
  
  return fullCSV;
}
```

## Usage Examples

### In a Component

```typescript
import { AgodaDataService } from '../../core/services/provider-data';

@Component({...})
export class AgodaHotelsComponent {
  featuredHotels: Hotel[] = [];

  constructor(private agodaService: AgodaDataService) {}

  ngOnInit() {
    this.agodaService.loadHotelsFromCsv()
      .pipe(
        switchMap(() => this.agodaService.getFeaturedHotels(12))
      )
      .subscribe(hotels => {
        this.featuredHotels = hotels;
      });
  }
}
```

### Switching Providers

To use a different provider, just inject a different service:

```typescript
// Use MakeMyTrip instead
constructor(private hotelService: MakeMyTripDataService) {}

// Component code remains identical!
```

### Dynamic Provider Selection

```typescript
@Injectable()
export class ProviderFactory {
  constructor(
    private agoda: AgodaDataService,
    private makemytrip: MakeMyTripDataService,
    private booking: BookingComDataService
  ) {}

  getService(provider: string): BaseProviderDataService {
    switch (provider) {
      case 'agoda': return this.agoda;
      case 'makemytrip': return this.makemytrip;
      case 'booking': return this.booking;
      default: throw new Error(`Unknown provider: ${provider}`);
    }
  }
}
```

## Extending the System

### Adding a New Provider

1. **Create a new CSV with your provider's data**
   - Place in `/assets/` folder
   
2. **Create a new service**
   ```typescript
   @Injectable({ providedIn: 'root' })
   export class ExpediaDataService extends BaseProviderDataService {
     constructor(http: HttpClient) {
       super(http);
       this.providerConfig = {
         name: 'expedia',
         csvPath: '/assets/expedia-hotels.csv',
         chunkSize: 100,
         fieldMapping: { /* map Expedia columns */ }
       };
     }
   }
   ```

3. **Create a component to display data**
   ```typescript
   @Component({
     selector: 'app-expedia-hotels',
     imports: [ExpediaDataService],
     // ... template & styles
   })
   export class ExpediaHotelsComponent {
     constructor(private expediaService: ExpediaDataService) {}
     // ... same as AgodaHotelsComponent
   }
   ```

4. **Use in home page**
   ```typescript
   imports: [ExpediaHotelsComponent, AgodaHotelsComponent, ...]
   ```

### Custom Transformations

Override `mapRowToHotel()` for provider-specific logic:

```typescript
export class MakeMyTripDataService extends BaseProviderDataService {
  protected override mapRowToHotel(row, headers): Hotel | null {
    const hotel = super.mapRowToHotel(row, headers);
    
    if (hotel) {
      // MakeMyTrip-specific cleaning
      hotel.hotelName = hotel.hotelName.replace(/^[0-9]+\.\s/, ''); // Remove "1. ", "2. ", etc.
      hotel.amenities = hotel.amenities.map(a => a.toLowerCase());
    }
    
    return hotel;
  }
}
```

## Benefits of This Architecture

✅ **DRY**: CSV parsing, caching, filtering logic written once  
✅ **Extensible**: Add new providers with minimal code  
✅ **Testable**: Base service is mockable; each provider is independent  
✅ **Type-safe**: Shared Hotel interface ensures consistency  
✅ **Flexible**: Field mapping allows any CSV structure  
✅ **Observable-based**: Works well with Angular's async pipe & RxJS  
✅ **Git-friendly**: CSV chunking avoids large file commits  

## Deployment Considerations

### Build Time
- CSV files are bundled as assets
- No runtime network requests needed (assets are local)

### Runtime Performance
- Data cached in BehaviorSubject (no re-parsing)
- Lazy loading on first access
- Sync `getCachedHotels()` for immediate fallback

### Scalability
- Can swap local CSVs for API calls (just change `loadHotelsFromCsv()`)
- Add pagination if CSV grows too large
- Consider SQLite or IndexedDB for client-side querying

## Future Enhancements

- [ ] API integration instead of CSV (swap `http.get()` call)
- [ ] Real-time pricing updates via WebSocket
- [ ] Client-side SQLite for advanced filtering
- [ ] Service Worker caching for offline support
- [ ] Analytics tracking for affiliate links
- [ ] A/B testing different provider layouts
