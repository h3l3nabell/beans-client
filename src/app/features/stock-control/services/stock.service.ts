import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/api.service';
import { StockResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private apiService: ApiService) {}

  addStock(quantity: number): Observable<StockResponse> {
    // Could add feature-specific logic here if needed
    return this.apiService.postAddStock(quantity);
  }

  purchaseStock(quantity: number): Observable<StockResponse> {
    // Could add feature-specific logic here if needed
    return this.apiService.postPurchaseStock(quantity);
  }

  getTotalStock(quantity: number): Observable<StockResponse> {
    // Could add feature-specific logic here if needed
    return this.apiService.getTotalStock(quantity);
  }
}
