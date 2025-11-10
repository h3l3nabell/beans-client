// Response from the API that returns current stock count
export interface StockResponse {
  stock: number;
}

// Request payload to add stock (quantity only)
export interface AddStockRequest {
  quantity: number;
}

// Request payload to purchase stock (quantity only)
export interface PurchaseStockRequest {
  quantity: number;
}
