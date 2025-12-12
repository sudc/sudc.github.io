# Agoda CSV Data Integration

This guide shows you how to customize the Agoda hotel data integration for your website.

## CSV File Location
The Agoda data file is located at:
```
src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv
```

## How to Update Column Mappings

Open `src/app/core/services/agoda-data/agoda-data.service.ts` and locate the `mapToHotel()` method.

### Step 1: Check Your CSV Column Names
First, open your CSV file and note the exact column names in the header row.

### Step 2: Update the Mapping
In the `mapToHotel()` method, update the column names to match your CSV:

```typescript
private mapToHotel(headers: string[], values: string[]): AgodaHotel | null {
  // ...
  return {
    hotelId: row['YourActualHotelIdColumn'],        // Change this
    hotelName: row['YourActualHotelNameColumn'],    // Change this
    city: row['YourActualCityColumn'],              // Change this
    country: row['YourActualCountryColumn'],        // Change this
    rating: parseFloat(row['YourActualRatingColumn'] || '0'),
    reviewScore: parseFloat(row['YourActualScoreColumn'] || '0'),
    numberOfReviews: parseInt(row['YourActualReviewsColumn'] || '0'),
    priceFrom: parseFloat(row['YourActualPriceColumn'] || '0'),
    currency: row['YourActualCurrencyColumn'] || 'USD',
    imageUrl: row['YourActualImageColumn'] || '',
    description: row['YourActualDescriptionColumn'] || '',
    amenities: (row['YourActualAmenitiesColumn'] || '').split('|'),
    coordinates: {
      latitude: parseFloat(row['YourActualLatColumn'] || '0'),
      longitude: parseFloat(row['YourActualLngColumn'] || '0')
    },
    affiliateUrl: this.buildAffiliateUrl(row['YourActualHotelIdColumn'])
  };
}
```

## Common CSV Column Name Patterns

Here are typical column names Agoda might use:

### Hotel ID
- `hotel_id`, `hotelId`, `id`, `property_id`, `Hotel ID`

### Hotel Name
- `hotel_name`, `hotelName`, `name`, `property_name`, `Hotel Name`

### Location
- `city`, `City`, `destination`, `location`
- `country`, `Country`, `country_code`

### Rating & Reviews
- `rating`, `star_rating`, `stars`, `hotel_rating`
- `review_score`, `rating_score`, `score`, `guest_rating`
- `number_of_reviews`, `review_count`, `reviews`, `total_reviews`

### Price
- `price`, `price_from`, `starting_price`, `min_price`, `Price`
- `currency`, `Currency`, `price_currency`

### Images
- `image_url`, `image`, `photo_url`, `main_image`, `thumbnail`

### Description
- `description`, `hotel_description`, `about`, `summary`

### Amenities
- `amenities`, `facilities`, `features`, `services`

### Coordinates
- `latitude`, `lat`, `Latitude`
- `longitude`, `lng`, `lon`, `Longitude`

## Usage in Components

### Display on Homepage
Already integrated! The component `<app-agoda-hotels>` is now showing on the homepage.

### Display on Hotels Page
```typescript
// In hotels.component.html, add:
<app-agoda-hotels></app-agoda-hotels>

// In hotels.component.ts, add to imports:
import { AgodaHotelsComponent } from '../../shared/components/agoda-hotels/agoda-hotels.component';
```

### Filter by City
```typescript
this.agodaService.getHotelsByCity('Mumbai').subscribe(hotels => {
  this.hotels = hotels;
});
```

### Get Top Rated
```typescript
this.agodaService.getTopRatedHotels(10).subscribe(hotels => {
  this.topHotels = hotels;
});
```

### Search Hotels
```typescript
this.agodaService.searchHotels('beach resort').subscribe(hotels => {
  this.searchResults = hotels;
});
```

### Filter by Price
```typescript
this.agodaService.getHotelsByPriceRange(1000, 5000).subscribe(hotels => {
  this.affordableHotels = hotels;
});
```

## Customization Tips

### 1. Change Number of Hotels Displayed
In `agoda-hotels.component.ts`:
```typescript
this.agodaService.getFeaturedHotels(20).subscribe(...) // Change 20 to any number
```

### 2. Add Filters
Create filter buttons in the template and use the service methods.

### 3. Sort Options
Add custom sorting in the component:
```typescript
hotels.sort((a, b) => a.priceFrom - b.priceFrom); // Sort by price
hotels.sort((a, b) => b.reviewScore - a.reviewScore); // Sort by rating
```

### 4. Customize Card Design
Edit `agoda-hotels.component.scss` to change colors, spacing, and layout.

## Troubleshooting

### If hotels don't load:
1. Check browser console for errors
2. Verify CSV file is in `src/assets/`
3. Check column mappings match your CSV
4. Ensure CSV is UTF-8 encoded

### If images don't show:
- Add fallback image URL in `onerror` attribute
- Check if CSV has image URLs

### If prices look wrong:
- Verify currency column
- Check if prices need conversion
- Adjust number formatting in template

## Need Help?
Check the console logs - the service logs detailed error messages when parsing fails.
