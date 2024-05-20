import { Injectable } from '@angular/core';
import { Products, ProductType } from '../assets/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: ProductType[] = Products;

  getProducts(): Observable<ProductType[]> {
    return of(this.products);
  }
}
