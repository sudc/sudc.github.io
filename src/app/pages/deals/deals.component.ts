import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { AnalyticsService } from '../../core/services/analytics/analytics.service';
import { AgodaDataService, AgodaHotel } from '../../core/services/agoda-data/agoda-data.service';

interface Deal {
  id: string;
  title: string;
  description: string;
  category: 'hotel';
  image: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  city: string;
  rating: number;
  platform: string;
  affiliateUrl: string;
  featured: boolean;
}

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss'
})
export class DealsComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private analytics = inject(AnalyticsService);
  private agodaService = inject(AgodaDataService);
  
  deals: Deal[] = [];
  filteredDeals: Deal[] = [];
  activeFilter: string = 'all';
  loading = true;

  constructor() {
    this.loadAgodaDeals();
  }

  ngOnInit() {
    this.titleService.setTitle('Best Agoda Hotel Deals & Offers - Up to 50% Off | TripSaver');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Get the best Agoda hotel deals today! Top-rated hotels with exclusive discounts. Save up to 50% on verified deals across India and worldwide destinations.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'Agoda deals, hotel deals, discount offers, cheap hotels, Agoda hotel booking, travel offers India' 
    });
  }

  private loadAgodaDeals() {
    this.agodaService.getAllHotels().subscribe({
      next: (data) => {
        const allHotels = Object.values(data.cities)
          .flat()
          .filter((hotel: AgodaHotel) => hotel.discount && parseFloat(hotel.discount) > 0)
          .sort((a: AgodaHotel, b: AgodaHotel) => parseFloat(b.discount) - parseFloat(a.discount))
          .slice(0, 20);

        this.deals = allHotels.map((hotel: AgodaHotel, index: number) => ({
          id: hotel.hotel_id,
          title: hotel.hotel_name,
          description: `${hotel.star_rating}★ hotel in ${hotel.city}`,
          category: 'hotel' as const,
          image: hotel.image_url || `https://picsum.photos/600/400?random=${index}`,
          originalPrice: hotel.original_price || 'N/A',
          discountedPrice: hotel.final_price,
          discount: hotel.discount ? `${hotel.discount}% OFF` : '0% OFF',
          city: hotel.city,
          rating: parseFloat(hotel.star_rating) || 0,
          platform: 'Agoda',
          affiliateUrl: this.analytics.addUTMToUrl(hotel.agoda_url, 'tripsaver_deals', 'affiliate'),
          featured: index < 6
        }));

        this.filteredDeals = this.deals;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading Agoda deals:', error);
        this.loading = false;
      }
    });
  }

  selectedCategory: string = 'all';

  get featuredDeals(): Deal[] {
    return this.deals.filter(deal => deal.featured);
  }

  filterDeals(category: string) {
    this.selectedCategory = category;
    this.activeFilter = category;
    
    // Since we only have hotel deals from Agoda, filtering is simpler
    if (category === 'all' || category === 'hotel') {
      this.filteredDeals = this.deals;
    } else {
      this.filteredDeals = [];
    }
    
    this.analytics.trackFilter('deal_category', category);
  }

  trackDealClick(deal: Deal) {
    this.analytics.trackDealClick(
      deal.title,
      deal.platform,
      deal.discount,
      deal.discountedPrice
    );
  }

  getCategoryIcon(category: string): string {
    return 'hotel';
  }

  getCategoryColor(category: string): string {
    return '#2563eb';
  }
}
