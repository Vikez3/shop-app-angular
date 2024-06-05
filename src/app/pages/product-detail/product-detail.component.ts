import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductType } from '../../../assets/data';
import { CartService } from '../../services/cart.service';
import { Location } from '@angular/common';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product!: ProductType;
  idParam!: number;
  popupVisible: boolean = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idParam = +params['id'];

      if (this.idParam) {
        this.productsService.getProductById(this.idParam).subscribe(
          (data) => {
            if (data) {
              this.product = data;
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

  addProduct(): void {
    const newProduct: ProductType = this.product;
    this.cartService.setProducts(newProduct);
    this.popupVisible = true;
  }
  goBack(): void {
    this.location.back();
  }
  closePopup(): void {
    this.popupVisible = false;
  }
}
