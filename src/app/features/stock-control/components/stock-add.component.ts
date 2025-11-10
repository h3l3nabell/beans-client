import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-add',
  template: `
    <div>
      <h2>Add Beans</h2>
      <input [(ngModel)]="quantity" type="number" placeholder="Quantity" min="1" />
      <button (click)="onAddStock()">Add Beans</button>

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
export class StockAddComponent {
  quantity = 0;
  message = signal('');
  currentStock = signal<number | null>(null);

  constructor(private stockService: StockService) {}

  onAddStock() {
    this.stockService.addStock(this.quantity).subscribe({
      next: (res) => {
        this.currentStock.set(res.stock);
        this.message.set(`Successfully added ${this.quantity} beans!`);
        this.quantity = 0; // Reset input
      },
      error: (err) => {
        this.message.set(`Error: ${err.message || 'Failed to add beans to stock'}`);
      },
    });
  }
}
