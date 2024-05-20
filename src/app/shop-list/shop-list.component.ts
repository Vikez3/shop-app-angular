import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductType } from '../../assets/data';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss',
})
export class ShopListComponent implements OnInit {
  products: ProductType[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
    console.log(this.products);
  }
}
