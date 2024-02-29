import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../types/cart-interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartService = inject(CartService);
  cart: Cart = this.cartService.cart();
  ngOnInit(): void {
    console.log(this.cart)
  }
}
