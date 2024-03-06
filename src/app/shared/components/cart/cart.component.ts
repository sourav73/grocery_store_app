import { Component, OnInit, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../../pages/products/product-type';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartService = inject(CartService);
  cart = computed(() => this.cartService.cart());
  isCartOpened = computed(() => this.cartService.isCartOpened());
  ngOnInit(): void {
  }

  removeProduct(productId: number) {
    this.cartService.removeItemFromCart(productId);
  }

  incrementProductQuantity(product: Product) {
    product.quantity += 1;
  }

  decrementProductQuantity(product: Product) {
    if(product.quantity > 1) {
      product.quantity -= 1;
    }
  }
}
