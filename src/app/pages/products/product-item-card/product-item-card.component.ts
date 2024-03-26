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
  isInCart = computed(() => this.cartService.cart().products.findIndex(p => p.id === this.product.id) > -1 ? true : false);
  ngOnInit(): void {
    this.product.quantity = 1;
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
    this.cartService.addItemToCart({...this.product});
    // this.isInCart = true;
    this.updateLocalStorageCart();
  }

  removeFromCart() {
    // this.isInCart = false;
    this.cartService.removeItemFromCart(this.product.id);
  }

  updateLocalStorageCart() {
    const cartProducts: Product[] = JSON.parse(localStorage.getItem('cartProducts')!) || [];
    const existingProduct = cartProducts.find(p => p.id === this.product.id);
    if(existingProduct) {
      existingProduct.quantity += this.product.quantity;
    } else {
      cartProducts.push(this.product);
    }
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }

  removeFromLocalStorage() {
    const cartProducts: Product[] = JSON.parse(localStorage.getItem('cartProducts') || '');
    const existingProductIndex = cartProducts.findIndex(p => p.id === this.product.id);
    if(existingProductIndex > -1) {
      cartProducts.splice(existingProductIndex, 1);
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
  }
}
