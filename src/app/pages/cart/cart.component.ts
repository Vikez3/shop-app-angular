import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../assets/data';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  products: ProductType[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCart();
  }

  private updateCart(): void {
    this.cartService.getProducts().subscribe((products) => {
      this.products = products;
      this.updateTotalPrice();
    });
  }

  private updateTotalPrice(): void {
    this.cartService.getTotalPrice().subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
  }

  quantityIncrement(productId: number): void {
    this.cartService.incrementQuantity(productId).subscribe(() => {
      this.updateCart();
    });
  }

  quantityDecrement(productId: number): void {
    this.cartService.decrementQuantity(productId).subscribe(() => {
      this.updateCart();
    });
  }

  deleteProduct(productId: number): void {
    this.cartService.deleteProduct(productId).subscribe(() => {
      this.updateCart();
    });
  }
}
