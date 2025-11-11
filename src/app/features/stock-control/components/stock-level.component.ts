import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockStoreService } from '../services/stock-store.service';

@Component({
  selector: 'app-stock-level',
  template: `
    <div class="stock-level">
      <h2>Current Beans Stock Level</h2>
      @if (stockStore.currentStock() !== null) {
      <div class="stock-display">
        <span class="stock-value">{{ stockStore.currentStock() }}</span>
        <span class="stock-label">beans in stock</span>
      </div>
      } @else {
      <p>Loading beans stock level...</p>
      }
    </div>
  `,
  styles: [
    `
      .stock-level {
        background: #f5f5f5;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
      }

      .stock-level h2 {
        margin-top: 0;
        color: #333;
      }

      .stock-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .stock-value {
        font-size: 3rem;
        font-weight: bold;
        color: #2c3e50;
      }

      .stock-label {
        font-size: 1.2rem;
        color: #666;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class StockLevelComponent implements OnInit {
  constructor(public stockStore: StockStoreService) {}

  ngOnInit(): void {
    // Load initial stock value when component initializes
    this.stockStore.loadInitialStock();
  }
}
