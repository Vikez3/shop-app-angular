import { Injectable } from '@angular/core';
import { ProductType } from '../../assets/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: ProductType[] = [];
  totalPrice: number = 0;

  constructor() {
    this.loadProductsFromLocalStorage();
    this.calculateTotalPrice();
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

  private calculateTotalPrice(): void {
    this.totalPrice = this.products.reduce((total, product) => {
      return total + product.price * (product.quantity || 0);
    }, 0);
  }

  getProducts(): Observable<ProductType[]> {
    return of(this.products);
  }

  getTotalPrice(): Observable<number> {
    return of(this.totalPrice);
  }

  setProducts(product: ProductType): Observable<ProductType[]> {
    const existingProduct = this.products.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      this.products.push({ ...product, quantity: 1 });
    }
    this.saveProductsToLocalStorage();
    this.calculateTotalPrice();
    return of(this.products);
  }

  incrementQuantity(productId: number): Observable<ProductType[]> {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.quantity = (product.quantity || 0) + 1;
      this.saveProductsToLocalStorage();
      this.calculateTotalPrice();
    }
    return of(this.products);
  }

  decrementQuantity(productId: number): Observable<ProductType[]> {
    const product = this.products.find((p) => p.id === productId);
    if (product && product.quantity) {
      product.quantity -= 1;
      if (product.quantity <= 0) {
        this.products = this.products.filter((p) => p.id !== productId);
      }
      this.saveProductsToLocalStorage();
      this.calculateTotalPrice();
    }
    return of(this.products);
  }

  deleteProduct(productId: number): Observable<ProductType[]> {
    this.products = this.products.filter((p) => p.id !== productId);
    this.saveProductsToLocalStorage();
    this.calculateTotalPrice();
    return of(this.products);
  }
}
