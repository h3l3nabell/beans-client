import { Component } from '@angular/core';
import { StockAddComponent } from './stock-add.component';
import { StockPurchaseComponent } from './stock-purchase.component';

@Component({
  selector: 'app-stock-control',
  template: `
    <div class="stock-control">
      <app-stock-add />
      <app-stock-purchase />
    </div>
  `,
  styles: [
    `
      .stock-control {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 600px;
        margin: 0 auto;
      }
    `,
  ],
  standalone: true,
  imports: [StockAddComponent, StockPurchaseComponent],
})
export class StockControlComponent {}
