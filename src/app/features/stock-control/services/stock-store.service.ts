import { Injectable, signal } from '@angular/core';
import { SignalrService } from './signalr.service';
import { ApiService } from '../../../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class StockStoreService {
  // Shared stock state accessible by all components
  private stockSignal = signal<number | null>(null);
  readonly currentStock = this.stockSignal.asReadonly();

  constructor(private signalrService: SignalrService, private apiService: ApiService) {
    this.initializeSignalR();
  }

  private async initializeSignalR(): Promise<void> {
    // Connect to SignalR hub
    console.log('🔌 Attempting to connect to SignalR...');
    await this.signalrService.connect();

    // Listen for stock updates from SignalR
    const hubConnection = this.signalrService.getHubConnection();

    hubConnection.on('StockUpdated', (newStockLevel: number) => {
      console.log('📦 SignalR: Stock updated to', newStockLevel);
      this.stockSignal.set(newStockLevel);
    });

    console.log('👂 Listening for "StockUpdated" events from SignalR');
  }

  // Load initial stock value from API
  async loadInitialStock(): Promise<void> {
    this.apiService.getTotalStock().subscribe({
      next: (res) => {
        this.stockSignal.set(res.stock);
      },
      error: (err) => {
        console.error('Failed to load initial stock:', err);
      },
    });
  }

  // Manual update (used after local operations if needed)
  updateStock(value: number): void {
    this.stockSignal.set(value);
  }
}
