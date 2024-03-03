import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { Product } from '../product-type';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-product-item-card',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './product-item-card.component.html',
  styleUrl: './product-item-card.component.scss',
})
export class ProductItemCardComponent implements OnInit {
  cartService = inject(CartService);
  @Input() product: Product = {} as Product;
  isInCart!: boolean;
  ngOnInit(): void {
    this.product.quantity = 1;
    this.isInCart = this.cartService.cart().products.findIndex(p => p.id === this.product.id) > -1 ? true : false;
  }

  increaseQuantity() {
    this.product.quantity += 1;
  }

  decreaseQuantity() {
    if (this.product.quantity > 1) {
      this.product.quantity -= 1;
    }
  }

  addToCart() {
    this.cartService.addItemToCart(this.product);
    this.isInCart = true
  }

  removeFromCart() {
    this.isInCart = false;
    this.cartService.removeItemFromCart(this.product.id);
  }
}
