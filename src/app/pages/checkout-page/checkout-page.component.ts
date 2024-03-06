import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../shared/services/cart/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent {
  cartService = inject(CartService);
  cart = computed(() => this.cartService.cart());
}
