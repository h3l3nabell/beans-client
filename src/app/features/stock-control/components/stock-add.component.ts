import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../services/stock.service';
import { StockStoreService } from '../services/stock-store.service';

@Component({
  selector: 'app-stock-add',
  template: `
    <div>
      <h2>Add Beans To Stock</h2>
      <input [(ngModel)]="quantity" type="number" placeholder="Quantity" min="1" />
      <button (click)="onAddStock()">Add Beans</button>

      @if (message()) {
      <p class="message">{{ message() }}</p>
      }
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class StockAddComponent {
  quantity = 0;
  message = signal('');

  constructor(private stockService: StockService, private stockStore: StockStoreService) {}

  onAddStock() {
    this.stockService.addStock(this.quantity).subscribe({
      next: (res) => {
        // SignalR will update the stock automatically, but we can also update locally
        this.stockStore.updateStock(res.stock);
        this.message.set(`Successfully added ${this.quantity} beans!`);
        this.quantity = 0; // Reset input
      },
      error: (err) => {
        this.message.set(`Error: ${err.message || 'Failed to add beans to stock'}`);
      },
    });
  }
}
