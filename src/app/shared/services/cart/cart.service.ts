import { Injectable, computed, signal } from '@angular/core';
import { Cart } from '../../types/cart-interface';
import { Product } from '../../../pages/products/product-type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  isCartOpened = signal<boolean>(false);
  totalProducts = signal<number>(0);
  totalPrice = signal<number>(0);
  savedAmount = signal<number>(0);
  discountedTotalPrice = signal<number>(0);
  products = signal<Product[]>([]);
  cart = computed<Cart>(() => {
    return {
      totalPrice: this.totalPrice(),
      discountedPrice: this.discountedTotalPrice(),
      savedAmount: this.savedAmount(),
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
        (current, product) => current + product.price * product.quantity,
        0
      )
    );

    this.discountedTotalPrice.set(
      this.products().reduce(
        (current, product) =>
          product.discountedPrice
            ? current + product.discountedPrice * product.quantity
            : current + product.price * product.quantity,
        0
      )
    );

    this.savedAmount.set(this.totalPrice() - this.discountedTotalPrice());
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

  incrementQuantity(product: Product) {
    product.quantity += 1;
    this.calculateTotalAmount();
  }

  decrementQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.calculateTotalAmount();
    }
  }
}
