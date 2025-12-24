import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Event subjects
  private hotelBookingSubject = new BehaviorSubject<boolean>(false);
  private busBookingSubject = new BehaviorSubject<boolean>(false);
  private essentialsSubject = new BehaviorSubject<boolean>(false);

  // Observables
  hotelBooking$ = this.hotelBookingSubject.asObservable();
  busBooking$ = this.busBookingSubject.asObservable();
  essentials$ = this.essentialsSubject.asObservable();

  constructor() {}

  /**
   * Trigger hotel booking modal
   */
  triggerHotelBooking(): void {
    this.hotelBookingSubject.next(true);
  }

  /**
   * Close hotel booking modal
   */
  closeHotelBooking(): void {
    this.hotelBookingSubject.next(false);
  }

  /**
   * Trigger bus booking modal
   */
  triggerBusBooking(): void {
    this.busBookingSubject.next(true);
  }

  /**
   * Close bus booking modal
   */
  closeBusBooking(): void {
    this.busBookingSubject.next(false);
  }

  /**
   * Trigger essentials modal
   */
  triggerEssentials(): void {
    this.essentialsSubject.next(true);
  }

  /**
   * Close essentials modal
   */
  closeEssentials(): void {
    this.essentialsSubject.next(false);
  }
}
