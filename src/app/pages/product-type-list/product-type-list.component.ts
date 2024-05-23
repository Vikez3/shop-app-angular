import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from '../../../assets/data';
import { FilterProductsPipe } from '../../pipes/filter-products.pipe';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from '../../components/products-list/products-list.component';

@Component({
  selector: 'app-product-type-list',
  standalone: true,
  imports: [CommonModule, ProductsListComponent],
  templateUrl: './product-type-list.component.html',
  styleUrl: './product-type-list.component.scss',
  providers: [FilterProductsPipe],
})
export class ProductTypeListComponent {
  productType: string = '';
  products: ProductType[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private filterProductsPipe: FilterProductsPipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productType = params['type'];
      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    this.productsService.getProducts().subscribe((data: ProductType[]) => {
      this.products = this.filterProductsPipe.transform(data, this.productType);
    });
  }
}
