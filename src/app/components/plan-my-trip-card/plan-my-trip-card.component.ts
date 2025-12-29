import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plan-my-trip-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="plan-card">
      <div class="card-content">
        <div class="card-icon">✨</div>
        <h3>Smart Trip Planner</h3>
        <p>From inspiration to itinerary — discover destinations that match you</p>
        <div class="features">
          <div class="feature">🎯 Preference-based discovery</div>
          <div class="feature">📍 Destination suggestions</div>
          <div class="feature">📅 Day-wise itinerary</div>
        </div>
      </div>
      <a routerLink="/smart-planner" class="cta-button">
        Start Planning
        <span class="arrow">→</span>
      </a>
    </div>
  `,
  styles: [`
    .plan-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      padding: 24px;
      color: white;
      text-align: center;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .plan-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
    }

    .card-content {
      flex: 1;
    }

    .card-icon {
      font-size: 40px;
      margin-bottom: 12px;
    }

    .plan-card h3 {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 600;
    }

    .plan-card > p {
      margin: 0 0 16px 0;
      opacity: 0.95;
      font-size: 14px;
      line-height: 1.5;
    }

    .features {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }

    .feature {
      font-size: 13px;
      opacity: 0.9;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      align-self: center;
    }

    .cta-button:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: white;
      transform: translateX(2px);
    }

    .arrow {
      transition: transform 0.2s ease;
    }

    .cta-button:hover .arrow {
      transform: translateX(4px);
    }

    @media (max-width: 600px) {
      .plan-card {
        padding: 16px;
      }

      .plan-card h3 {
        font-size: 18px;
      }
    }
  `]
})
export class PlanMyTripCardComponent {}
