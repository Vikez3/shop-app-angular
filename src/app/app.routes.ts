import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductTypeListComponent } from './pages/product-type-list/product-type-list.component';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: 'shop',
    component: ShopListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  { path: ':type', component: ProductTypeListComponent },
  { path: ':type/:id', component: ProductDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];
