import { Injectable, computed, signal } from '@angular/core';
import { Cart } from '../../types/cart-interface';
import { Product } from '../../../pages/products/product-type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalProducts = signal<number>(0);
  totalPrice = signal<number>(0);
  products = signal<Product[]>([]);
  cart = computed<Cart>(() => {
    return {
      totalPrice: this.totalProducts(),
      totalProducts: this.totalProducts(),
      products: this.products(),
    };
  });

  updateCart() {
    this.calculateTotalProducts();
    this.calculateTotalAmount();
  }
  calculateTotalAmount() {
    this.totalPrice.set(
      this.products().reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );
  }

  calculateTotalProducts() {
    this.totalProducts.set(this.products().length);
  }

  addItemToCart(product: Product) {
    this.products.update((prevProducts) => {
      const productIndex = this.products().findIndex(
        (p) => p.id === product.id
      );
      if (productIndex > -1) {
        return prevProducts.map((p, i) =>
          i === productIndex
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      } else {
        return [...prevProducts, product];
      }
    });
    this.updateCart();
  }

  removeItemFromCart(productId: number) {
    this.products.set(this.products().filter((p) => p.id !== productId));
    this.updateCart();
  }
}
