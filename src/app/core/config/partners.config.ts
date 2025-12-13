/**
 * CENTRALIZED PARTNER CONFIGURATION
 * ===================================
 * 
 * Single source of truth for all affiliate partners.
 * Easy onboarding/offboarding - just update this file.
 * 
 * Architecture:
 * - Add partner → Set active: true
 * - Remove partner → Set active: false
 * - Update affiliate ID → Change in one place
 * - Scales to unlimited partners
 */

export interface PartnerConfig {
  id: string;
  name: string;
  displayName: string;
  active: boolean;
  
  // Affiliate Details
  affiliateId: string;
  
  // Branding
  logo?: string;
  color: string;
  
  // URL Builders
  urls: {
    hotels: (params?: HotelParams) => string;
    search: (params?: SearchParams) => string;
  };
  
  // Approval-ready descriptions (network-safe)
  descriptions: {
    general: string;        // Multi-partner description
    specific: string;       // Partner-specific description
  };
}

export interface HotelParams {
  destination?: string;
  city?: string;
  cityId?: string;
  hotelId?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  rooms?: number;
}

export interface SearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
}

/**
 * PARTNER REGISTRY
 * ================
 * Add/remove partners here. System auto-adapts.
 */
export const PARTNERS: Record<string, PartnerConfig> = {
  
  // ✅ AGODA - PRIMARY INTERNATIONAL PARTNER
  agoda: {
    id: 'agoda',
    name: 'agoda',
    displayName: 'Agoda',
    active: true, // ← Set to false to disable
    
    affiliateId: '1955073',
    
    logo: 'https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg',
    color: '#FF6600',
    
    urls: {
      hotels: (params) => {
        const base = 'https://www.agoda.com/search';
        const queryParams = new URLSearchParams({
          cid: '1955073',
          city: params?.city || params?.destination || '',
          hl: 'en-us'
        });
        if (params?.checkIn) queryParams.set('checkIn', params.checkIn);
        if (params?.checkOut) queryParams.set('checkOut', params.checkOut);
        if (params?.adults) queryParams.set('adults', params.adults.toString());
        return `${base}?${queryParams.toString()}`;
      },
      search: (params) => {
        return `https://www.agoda.com/search?cid=1955073&city=${params?.destination || ''}&hl=en-us`;
      }
    },
    
    descriptions: {
      general: "TripSaver guides users to Agoda when it best fits their travel needs, such as international and luxury stays. We do not display prices or availability and only redirect users using approved affiliate links. Traffic is organic and preference-driven.",
      specific: "TripSaver guides users to Agoda when it best fits their travel needs, such as international and luxury stays. We do not display prices or availability and only redirect users using approved affiliate links."
    }
  },
  
  // ✅ MAKEMYTRIP - PRIMARY DOMESTIC PARTNER
  makemytrip: {
    id: 'makemytrip',
    name: 'makemytrip',
    displayName: 'MakeMyTrip',
    active: true, // ← Set to false to disable
    
    affiliateId: '', // Add when available
    
    color: '#E73C34',
    
    urls: {
      hotels: (params) => {
        const destination = (params?.city || params?.destination || 'india')
          .toLowerCase()
          .replace(/\s+/g, '-');
        return `https://www.makemytrip.com/hotels/hotels-in-${destination}.html`;
      },
      search: (params) => {
        const destination = (params?.destination || 'india')
          .toLowerCase()
          .replace(/\s+/g, '-');
        return `https://www.makemytrip.com/hotels/hotels-in-${destination}.html`;
      }
    },
    
    descriptions: {
      general: "TripSaver helps Indian travelers decide when MakeMyTrip is suitable, especially for budget and domestic hotel bookings. We redirect users to MakeMyTrip using affiliate links without modifying pricing or availability.",
      specific: "TripSaver helps Indian travelers decide when MakeMyTrip is suitable, especially for budget and domestic hotel bookings. We redirect users using affiliate links without modifying pricing."
    }
  },
  
  // 🔜 GOIBIBO - READY TO ACTIVATE
  goibibo: {
    id: 'goibibo',
    name: 'goibibo',
    displayName: 'Goibibo',
    active: false, // ← Set to true when ready
    
    affiliateId: '', // Add when available
    
    color: '#FF6D38',
    
    urls: {
      hotels: (params) => {
        const destination = (params?.city || params?.destination || '')
          .toLowerCase()
          .replace(/\s+/g, '-');
        return `https://www.goibibo.com/hotels/${destination}-hotels/`;
      },
      search: (params) => {
        return `https://www.goibibo.com/hotels/`;
      }
    },
    
    descriptions: {
      general: "TripSaver recommends Goibibo for domestic travelers seeking budget-friendly options with fast refunds. We redirect users using affiliate links without comparing live prices.",
      specific: "TripSaver recommends Goibibo when it suits user preferences, particularly for domestic budget travel. We redirect using affiliate links without modifying pricing."
    }
  },
  
  // 🔜 BOOKING.COM - READY TO ACTIVATE
  bookingcom: {
    id: 'bookingcom',
    name: 'bookingcom',
    displayName: 'Booking.com',
    active: false, // ← Set to true when ready
    
    affiliateId: '', // Add when available
    
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png',
    color: '#003580',
    
    urls: {
      hotels: (params) => {
        const base = 'https://www.booking.com/searchresults.html';
        const queryParams = new URLSearchParams({
          aid: '', // Add affiliate ID
          ss: params?.destination || '',
          lang: 'en-us'
        });
        return `${base}?${queryParams.toString()}`;
      },
      search: (params) => {
        return `https://www.booking.com/searchresults.html?aid=&ss=${params?.destination || ''}`;
      }
    },
    
    descriptions: {
      general: "TripSaver recommends Booking.com for travelers who prefer flexible cancellation and a wide selection of hotels. We provide decision-based recommendations and redirect users via approved affiliate links.",
      specific: "TripSaver recommends Booking.com when flexible cancellation is preferred. We redirect users to complete bookings via approved affiliate links."
    }
  }
  
};

/**
 * HELPER FUNCTIONS
 * ================
 */

// Get all active partners
export function getActivePartners(): PartnerConfig[] {
  return Object.values(PARTNERS).filter(p => p.active);
}

// Get specific partner
export function getPartner(id: string): PartnerConfig | null {
  return PARTNERS[id]?.active ? PARTNERS[id] : null;
}

// Get partner count
export function getActivePartnerCount(): number {
  return getActivePartners().length;
}

// Build partner URL
export function buildPartnerUrl(
  partnerId: string, 
  type: 'hotels' | 'search', 
  params?: HotelParams | SearchParams
): string {
  const partner = getPartner(partnerId);
  if (!partner) return '';
  return partner.urls[type](params);
}

// Get partner for footer/display
export function getPartnersForDisplay() {
  return getActivePartners().map(p => ({
    id: p.id,
    name: p.displayName,
    url: p.urls.search({}),
    logo: p.logo,
    color: p.color
  }));
}

/**
 * USAGE EXAMPLES
 * ==============
 * 
 * // Get active partners
 * const partners = getActivePartners();
 * console.log(`Active partners: ${partners.length}`);
 * 
 * // Get specific partner
 * const agoda = getPartner('agoda');
 * if (agoda) {
 *   const url = agoda.urls.hotels({ destination: 'Mumbai' });
 * }
 * 
 * // Build URL
 * const url = buildPartnerUrl('agoda', 'hotels', { destination: 'Goa' });
 * 
 * // For footer
 * const displayPartners = getPartnersForDisplay();
 * 
 * ================
 * ONBOARDING/OFFBOARDING
 * ================
 * 
 * TO ADD PARTNER:
 * 1. Add partner object above
 * 2. Set active: true
 * 3. Add affiliate ID
 * 4. Define URL builders
 * Done! System auto-adapts.
 * 
 * TO REMOVE PARTNER:
 * 1. Set active: false
 * Done! Partner hidden site-wide.
 * 
 * TO UPDATE AFFILIATE ID:
 * 1. Change affiliateId value
 * Done! Updates everywhere automatically.
 */
