/**
 * BASE ENGINE (Abstract Class)
 * =============================
 * 
 * Foundation for all TripSaver engines.
 */

import { Injectable } from '@angular/core';

export interface BaseEngineConfig {
  name: string;
  version: string;
  enabled: boolean;
}

export interface BaseEngineResult {
  engineName: string;
  timestamp: Date;
  success: boolean;
  metadata?: Record<string, any>;
}

@Injectable()
export abstract class BaseEngine<TInput, TOutput extends BaseEngineResult> {
  
  protected abstract config: BaseEngineConfig;

  abstract process(input: TInput): TOutput | Promise<TOutput>;

  protected abstract validateInput(input: TInput): boolean;

  getConfig(): BaseEngineConfig {
    return this.config;
  }

  isEnabled(): boolean {
    return this.config.enabled;
  }

  protected log(message: string, data?: any): void {
    console.log(`[${this.config.name}] ${message}`, data || '');
  }

  protected logError(message: string, error?: any): void {
    console.error(`[${this.config.name}] ERROR: ${message}`, error || '');
  }
}

export enum EngineType {
  RECOMMENDATION = 'recommendation',
  TRIP_READINESS = 'trip_readiness',
  DESTINATION = 'destination',
  DESTINATION_SCORING = 'destination_scoring'
}
