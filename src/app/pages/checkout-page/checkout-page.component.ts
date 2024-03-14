import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../shared/services/cart/cart.service';
import { Product } from '../products/product-type';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent {
  cartService = inject(CartService);
  cart = computed(() => this.cartService.cart());


  incrementProductQuantity(product: Product) {
    product.quantity += 1;
  }

  decrementProductQuantity(product: Product) {
    if(product.quantity > 1) {
      product.quantity -= 1;
    }
  }

  removeProduct(productId: number) {
    this.cartService.removeItemFromCart(productId);
  }

  calculatePrice() {
    
  }
}
