import { Injectable } from '@angular/core';
import { Products, ProductType } from '../../assets/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: ProductType[] = Products;

  constructor() {}

  getProducts(): Observable<ProductType[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<ProductType | null> {
    const product = this.products.find((p) => p.id === id);
    return of(product || null);
  }
}
