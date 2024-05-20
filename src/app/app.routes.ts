import { Routes } from '@angular/router';
import { ShopListComponent } from './shop-list/shop-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'shop',
    component: ShopListComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
