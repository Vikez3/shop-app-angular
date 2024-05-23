import { Component, OnInit } from '@angular/core';
import { AllProductTypes, ProductType } from '../../../assets/data';
import { ProductsService } from '../../services/products.service';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { CommonModule } from '@angular/common';
import { FilterProductsPipe } from '../../pipes/filter-products.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [
    ProductsListComponent,
    CommonModule,
    FilterProductsPipe,
    RouterLink,
  ],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss',
})
export class ShopListComponent implements OnInit {
  products: ProductType[] = [];

  productsTypes: string[] = AllProductTypes;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
