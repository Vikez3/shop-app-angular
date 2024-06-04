import { Injectable } from '@angular/core';
import { ProductType } from '../../assets/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: ProductType[] = [];

  constructor() {
    this.loadProductsFromLocalStorage();
  }

  private loadProductsFromLocalStorage(): void {
    const storedProducts = localStorage.getItem('cartProducts');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
  }

  private saveProductsToLocalStorage(): void {
    localStorage.setItem('cartProducts', JSON.stringify(this.products));
  }

  getProducts(): Observable<ProductType[]> {
    return of(this.products);
  }

  setProducts(product: ProductType): Observable<ProductType[]> {
    const existingProduct = this.products.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      this.products.push({ ...product, quantity: 1 });
    }
    this.saveProductsToLocalStorage();
    return of(this.products);
  }
}
