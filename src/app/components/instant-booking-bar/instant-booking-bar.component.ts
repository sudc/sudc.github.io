import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../core/services/booking.service';

declare const gtag: Function;

@Component({
  selector: 'app-instant-booking-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instant-booking-bar.component.html',
  styleUrls: ['./instant-booking-bar.component.scss']
})
export class InstantBookingBarComponent {
  private bookingService = inject(BookingService);

  /**
   * Trigger hotel booking on parent page
   * For "Intent Users" who already know destination
   */
  openHotelBooking(): void {
    if (typeof gtag !== 'undefined') {
      (window as any).gtag('event', 'hotel_booking_intent', {
        event_category: 'Intent User',
        event_label: 'Sticky Bar - Hotels',
        source: 'global_action_bar'
      });
    }
    this.bookingService.triggerHotelBooking();
  }

  /**
   * Trigger bus booking on parent page
   * AbhiBus affiliate link
   */
  openBusBooking(): void {
    if (typeof gtag !== 'undefined') {
      (window as any).gtag('event', 'bus_booking_intent', {
        event_category: 'Intent User',
        event_label: 'Sticky Bar - Bus',
        source: 'global_action_bar'
      });
    }
    this.bookingService.triggerBusBooking();
  }

  /**
   * Trigger essentials shopping on parent page
   * Amazon affiliate link
   */
  openEssentialsShopping(): void {
    if (typeof gtag !== 'undefined') {
      (window as any).gtag('event', 'essentials_intent', {
        event_category: 'Intent User',
        event_label: 'Sticky Bar - Essentials',
        source: 'global_action_bar'
      });
    }
    this.bookingService.triggerEssentials();
  }
}
