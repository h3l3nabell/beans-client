import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../services/stock.service';
import { StockStoreService } from '../services/stock-store.service';

@Component({
  selector: 'app-stock-purchase',
  template: `
    <div>
      <h2>Purchase Beans</h2>
      <input [(ngModel)]="quantity" type="number" placeholder="Quantity" min="1" />
      <button (click)="onPurchaseStock()">Purchase Beans</button>

      @if (message()) {
      <p class="message">{{ message() }}</p>
      }
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class StockPurchaseComponent {
  quantity = 0;
  message = signal('');

  constructor(private stockService: StockService, private stockStore: StockStoreService) {}

  onPurchaseStock() {
    this.stockService.purchaseStock(this.quantity).subscribe({
      next: (res) => {
        // SignalR will update the stock automatically, but we can also update locally
        this.stockStore.updateStock(res.stock);
        this.message.set(`Successfully purchased ${this.quantity} beans!`);
        this.quantity = 0; // Reset input
      },
      error: (err) => {
        this.message.set(`Error: ${err.message || 'Failed to purchase beans from stock'}`);
      },
    });
  }
}
