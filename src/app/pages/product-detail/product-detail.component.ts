import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../assets/data';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product!: ProductType;
  idParam!: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idParam = +params['id'];

      if (this.idParam) {
        this.productsService.getProductById(this.idParam).subscribe(
          (data) => {
            if (data) {
              this.product = data;
              console.log(data);
            } else {
              console.log('Product not found');
            }
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      } else {
        console.log('No product ID provided');
      }
    });
  }
}
