import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-purchase',
  template: `
    <div>
      <h2>Purchase Beans</h2>
      <input [(ngModel)]="quantity" type="number" placeholder="Quantity" min="1" />
      <button (click)="onAddStock()">Purchase Beans</button>

      @if (currentStock() !== null) {
      <p>
        Current stock of beans: <strong>{{ currentStock() }}</strong>
      </p>
      } @if (message()) {
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
  currentStock = signal<number | null>(null);

  constructor(private stockService: StockService) {}

  onAddStock() {
    this.stockService.purchaseStock(this.quantity).subscribe({
      next: (res) => {
        this.currentStock.set(res.stock);
        this.message.set(`Successfully removed ${this.quantity} beans!`);
        this.quantity = 0; // Reset input
      },
      error: (err) => {
        this.message.set(`Error: ${err.message || 'Failed to buy beans from stock'}`);
      },
    });
  }
}
