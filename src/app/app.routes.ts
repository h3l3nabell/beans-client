import { Routes } from '@angular/router';
import { StockControlComponent } from './features/stock-control/components/stock-control.component';

export const routes: Routes = [
  { path: 'stock', component: StockControlComponent },
  { path: '', redirectTo: '/stock', pathMatch: 'full' },
];
