import { Injectable, inject } from '@angular/core';
import { AffiliateConfigService } from '../affiliate-config.service';
import { AffiliateType, CTAType } from '../../models/itinerary.model';

export interface AffiliateLink {
  url: string;
  provider: string;
  destination?: string;
}

/**
 * Affiliate Mapping Service
 * Maps CTA types to affiliate provider URLs
 * Centralized location for all affiliate links
 */
@Injectable({
  providedIn: 'root'
})
export class AffiliateMappingService {
  private affiliateConfig = inject(AffiliateConfigService);

  /**
   * Get affiliate link for a CTA type and optional destination
   */
  getAffiliateLink(
    ctaType: CTAType,
    destination?: string,
    itemName?: string
  ): AffiliateLink | null {
    const config = this.affiliateConfig.getCurrentConfig();

    if (!config) {
      console.warn('Affiliate config not loaded');
      return null;
    }

    switch (ctaType) {
      case 'hotel':
        return this.buildHotelLink(destination, config);
      case 'activity':
        return this.buildActivityLink(destination, itemName, config);
      case 'essential':
        return this.buildEssentialLink(itemName, config);
      case 'transport':
        return this.buildTransportLink(destination, config);
      case 'food':
        return this.buildFoodLink(destination, config);
      default:
        return null;
    }
  }

  /**
   * Build hotel affiliate link (Agoda)
   */
  private buildHotelLink(destination: string | undefined, config: any): AffiliateLink {
    const agoda = config.partners['agoda'];
    if (!agoda) {
      return { url: 'https://www.agoda.com', provider: 'agoda' };
    }

    let url = agoda.baseUrl;
    if (destination) {
      url += `?cid=${agoda.affiliateId}&searchQuery=${encodeURIComponent(destination)}`;
    } else {
      url += `?cid=${agoda.affiliateId}`;
    }

    return {
      url,
      provider: 'agoda',
      destination
    };
  }

  /**
   * Build activity/tour affiliate link (GetYourGuide)
   */
  private buildActivityLink(
    destination: string | undefined,
    activity?: string,
    config?: any
  ): AffiliateLink {
    // Using GetYourGuide as default activity provider
    const baseUrl = 'https://www.getyourguide.com/';
    let url = baseUrl;

    if (destination) {
      url += `${destination.toLowerCase()}`;
      if (activity) {
        url += `/t.${encodeURIComponent(activity)}`;
      }
      url += '?partner_id=tripsaver';
    }

    return {
      url,
      provider: 'getyourguide',
      destination
    };
  }

  /**
   * Build travel essentials affiliate link (Amazon/Flipkart)
   */
  private buildEssentialLink(itemName: string | undefined, config: any): AffiliateLink {
    const amazon = config.partners['amazon'];
    if (!amazon) {
      return { url: 'https://www.amazon.in', provider: 'amazon' };
    }

    let url = amazon.baseUrl + '?k=';
    if (itemName) {
      url += encodeURIComponent(`travel ${itemName}`);
    } else {
      url += encodeURIComponent('travel essentials');
    }
    url += `&tag=${amazon.affiliateId}`;

    return {
      url,
      provider: 'amazon'
    };
  }

  /**
   * Build transport affiliate link (AbhiBus)
   */
  private buildTransportLink(destination: string | undefined, config: any): AffiliateLink {
    const abhibus = config.partners['abhibus'];
    if (!abhibus) {
      return { url: 'https://inr.deals/kQK6mx', provider: 'abhibus' };
    }

    // AbhiBus typically uses direct link
    return {
      url: abhibus.baseUrl,
      provider: 'abhibus',
      destination
    };
  }

  /**
   * Build food/dining affiliate link (MakeMyTrip)
   */
  private buildFoodLink(destination: string | undefined, config: any): AffiliateLink {
    // Using MakeMyTrip restaurants as default
    const baseUrl = 'https://www.makemytrip.com/restaurants/';
    let url = baseUrl;

    if (destination) {
      url += destination.toLowerCase();
    }

    return {
      url,
      provider: 'makemytrip',
      destination
    };
  }

  /**
   * Get all available affiliate providers
   */
  getAvailableProviders(): string[] {
    const config = this.affiliateConfig.getCurrentConfig();
    if (!config || !config.partners) {
      return [];
    }
    return Object.keys(config.partners).filter((key) => config.partners[key].active);
  }

  /**
   * Track affiliate click (for analytics)
   */
  trackAffiliateClick(
    ctaType: CTAType,
    provider: string,
    destination?: string,
    itemName?: string
  ): void {
    const trackingData = {
      ctaType,
      provider,
      destination,
      itemName,
      timestamp: new Date().toISOString()
    };

    // Log to console for debugging
    console.log('📊 Affiliate Click Tracked:', trackingData);

    // Send to analytics (gtag if available)
    if ((window as any).gtag) {
      (window as any).gtag('event', 'affiliate_click', {
        cta_type: ctaType,
        provider: provider,
        destination: destination,
        item_name: itemName
      });
    }
  }

  /**
   * Build campaign URL with UTM parameters
   */
  buildCampaignUrl(
    baseUrl: string,
    campaign: string = 'trip-planner',
    source: string = 'tripsaver'
  ): string {
    const url = new URL(baseUrl);
    url.searchParams.append('utm_source', source);
    url.searchParams.append('utm_medium', 'affiliate');
    url.searchParams.append('utm_campaign', campaign);
    return url.toString();
  }
}
