import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockResponse } from '../features/stock-control/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://localhost:7023/api/v1/stock';

  constructor(private http: HttpClient) {}

  postAddStock(quantity: number): Observable<StockResponse> {
    return this.http.post<StockResponse>(`${this.apiUrl}/add`, quantity);
  }

  postPurchaseStock(quantity: number): Observable<StockResponse> {
    return this.http.post<StockResponse>(`${this.apiUrl}/purchase`, quantity);
  }

  getTotalStock(): Observable<StockResponse> {
    return this.http.get<StockResponse>(`${this.apiUrl}/total`);
  }
}
