/**
 * Partner Links Configuration
 * 
 * This file centralizes all affiliate partner links for easy management.
 * To add a new partner, simply add their configuration to the partners object.
 * 
 * Usage:
 * import { PARTNER_LINKS, getPartnerLink } from './core/config/partner-links.config';
 * const agodaLink = getPartnerLink('agoda', { destination: 'goa' });
 */

export interface PartnerConfig {
  name: string;
  displayName: string;
  baseUrl: string;
  affiliateId: string;
  logo: string;
  brandColor: string;
  buildUrl: (params?: PartnerParams) => string;
  widget?: {
    enabled: boolean;
    scriptUrl?: string;
    widgetId?: string;
    config?: any;
  };
  active: boolean;
}

export interface PartnerParams {
  pcs?: string;
  destination?: string;
  city?: string;
  cityId?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  [key: string]: any;
}

/**
 * Partner Links Configuration
 * Add new partners here with their base URLs and affiliate IDs
 */
export const PARTNER_LINKS: Record<string, PartnerConfig> = {
  agoda: {
    name: 'agoda',
    displayName: 'Agoda',
    baseUrl: 'https://www.agoda.com',
    affiliateId: '1955073',
    logo: 'https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg',
    brandColor: '#D7263D',
    buildUrl: (params?: PartnerParams) => {
      const base = 'https://www.agoda.com/partners/partnersearch.aspx';
      const queryParams = new URLSearchParams({
        pcs: params?.['pcs'] || '1',
        cid: '1955073',
        'hl': 'en-us',
        ...(params?.cityId && { city: params.cityId })
      });
      return `${base}?${queryParams.toString()}`;
    },
    widget: {
      enabled: true,
      scriptUrl: '//cdn0.agoda.net/images/sherpa/js/sherpa_init1_08.min.js',
      widgetId: 'adgshp-30325076',
      config: {
        crt: '7593686995288',
        version: '1.04',
        width: '320px',
        height: '420px',
        ReferenceKey: 'a6wO5dpZi0qUoFlWf3lOdA==',
        Layout: 'SquareCalendar',
        Language: 'en-us',
        Cid: '1955073',
        Hid: '0',
        DestinationName: 'undefined',
        OverideConf: false
      }
    },
    active: true
  },

  booking: {
    name: 'booking',
    displayName: 'Booking.com',
    baseUrl: 'https://www.booking.com',
    affiliateId: 'REPLACE_WITH_AFFILIATE_ID', // Update when you get the ID
    logo: 'https://q-xx.bstatic.com/xdata/images/xphoto/300x300/140007451.png',
    brandColor: '#003580',
    buildUrl: (params?: PartnerParams) => {
      const base = 'https://www.booking.com/searchresults.html';
      const queryParams = new URLSearchParams({
        aid: 'REPLACE_WITH_AFFILIATE_ID',
        label: 'tripsaver',
        ...(params?.city && { ss: params.city })
      });
      return `${base}?${queryParams.toString()}`;
    },
    widget: {
      enabled: false // Enable when Booking.com widget is available
    },
    active: false // Set to true when affiliate ID is ready
  },

  makemytrip: {
    name: 'makemytrip',
    displayName: 'MakeMyTrip',
    baseUrl: 'https://www.makemytrip.com',
    affiliateId: 'REPLACE_WITH_AFFILIATE_ID', // Update when you get the ID
    logo: 'https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/mmt-logo.png',
    brandColor: '#E73C34',
    buildUrl: (params?: PartnerParams) => {
      const base = 'https://www.makemytrip.com/hotels/';
      const queryParams = new URLSearchParams({
        campaign: 'REPLACE_WITH_AFFILIATE_ID',
        ...(params?.city && { checkin: params.city })
      });
      return `${base}?${queryParams.toString()}`;
    },
    widget: {
      enabled: false // Enable when MakeMyTrip widget is available
    },
    active: false // Set to true when affiliate ID is ready
  },

  goibibo: {
    name: 'goibibo',
    displayName: 'Goibibo',
    baseUrl: 'https://www.goibibo.com',
    affiliateId: 'REPLACE_WITH_AFFILIATE_ID', // Update when you get the ID
    logo: 'https://gos3.ibcdn.com/gologo-2-1457952749.png',
    brandColor: '#EE2A24',
    buildUrl: (params?: PartnerParams) => {
      const base = 'https://www.goibibo.com/hotels/';
      const queryParams = new URLSearchParams({
        utm_source: 'REPLACE_WITH_AFFILIATE_ID',
        utm_medium: 'affiliate',
        utm_campaign: 'tripsaver'
      });
      return `${base}?${queryParams.toString()}`;
    },
    widget: {
      enabled: false // Enable when Goibibo widget is available
    },
    active: false // Set to true when affiliate ID is ready
  }
};

/**
 * HOW TO ADD A NEW PARTNER (3 Easy Steps):
 * 
 * 1. Add partner configuration to PARTNER_LINKS above:
 *    newpartner: {
 *      name: 'newpartner',
 *      displayName: 'New Partner Name',
 *      baseUrl: 'https://www.partner.com',
 *      affiliateId: 'YOUR_AFFILIATE_ID',
 *      logo: 'https://partner.com/logo.svg',
 *      brandColor: '#FF0000',
 *      buildUrl: (params) => `https://partner.com/search?aid=YOUR_ID`,
 *      widget: { enabled: false },
 *      active: true
 *    }
 * 
 * 2. The partner will automatically appear in:
 *    - Footer "Special Deals" section
 *    - All pages using getActivePartners()
 * 
 * 3. To remove a partner: Set active: false or delete the entry
 * 
 * That's it! No need to touch any other files.
 */

/**
 * Get all ACTIVE partners only
 * @returns Array of active partners
 */
export function getActivePartners(): Array<{ id: string; config: PartnerConfig }> {
  return Object.entries(PARTNER_LINKS)
    .filter(([_, config]) => config.active)
    .map(([id, config]) => ({ id, config }));
}

/**
 * Get partner link with optional parameters
 * @param partnerId - The partner identifier
 * @param params - Optional parameters for the link
 * @returns The complete affiliate URL
 */
export function getPartnerLink(partnerId: string, params?: PartnerParams): string {
  const partner = PARTNER_LINKS[partnerId];
  if (!partner) {
    console.warn(`Partner '${partnerId}' not found in configuration`);
    return '#';
  }
  return partner.buildUrl(params);
}

/**
 * Get all enabled partner widgets (active + widget enabled)
 * @returns Array of partners with enabled widgets
 */
export function getEnabledWidgets(): Array<{ id: string; config: PartnerConfig }> {
  return Object.entries(PARTNER_LINKS)
    .filter(([_, config]) => config.active && config.widget?.enabled)
    .map(([id, config]) => ({ id, config }));
}

/**
 * Get partner configuration
 * @param partnerId - The partner identifier
 * @returns Partner configuration or undefined
 */
export function getPartnerConfig(partnerId: string): PartnerConfig | undefined {
  return PARTNER_LINKS[partnerId];
}

/**
 * List of all available partners (active only)
 */
export function getAvailablePartners(): string[] {
  return Object.entries(PARTNER_LINKS)
    .filter(([_, config]) => config.active)
    .map(([id]) => id);
}

/**
 * Helper to check if a partner is active
 */
export function isPartnerActive(partnerId: string): boolean {
  const partner = PARTNER_LINKS[partnerId];
  return partner ? partner.active : false;
}
