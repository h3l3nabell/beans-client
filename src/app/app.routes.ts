import { Routes } from '@angular/router';
import { StockAddComponent } from './features/stock-control/components/stock-add.component';

export const routes: Routes = [
  { path: 'stock', component: StockAddComponent },
  { path: '', redirectTo: '/stock', pathMatch: 'full' },
];
