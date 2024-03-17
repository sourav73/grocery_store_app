import { Component, OnInit, computed, inject } from '@angular/core';
import { CartService } from '../../shared/services/cart/cart.service';
import { Product } from '../products/product-type';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { LoginSignupModalComponent } from '../../common/components/login-signup-modal/login-signup-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  providers: [BsModalService],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent implements OnInit {
  cartService = inject(CartService);
  modalService = inject(BsModalService);
  cart = computed(() => this.cartService.cart());
  cartTotal = computed(() => 0);
  discountedTotal = computed(() => 0);
  savedAmount = computed(() => 0);

  ngOnInit(): void {
    this.calculatePrice();
  }

  incrementProductQuantity(product: Product) {
    product.quantity += 1;
    const cartProduct = this.cart().products.find(p => p.id === product.id);
    if(cartProduct) {
      cartProduct.quantity++;
    }
  }

  decrementProductQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      const cartProduct = this.cart().products.find(p => p.id === product.id);
      if(cartProduct && cartProduct.quantity > 1) {
        cartProduct.quantity--;
      }
    }
  }

  removeProduct(productId: number) {
    this.cartService.removeItemFromCart(productId);
  }

  calculatePrice() {
    this.cartTotal = computed(() => {
      return this.cart().products.reduce(
        (current, product) => current + product.price,
        0
      );
    });
    this.discountedTotal = computed(() => {
      return this.cart().products.reduce(
        (current, product) =>
          product.discountedPrice
            ? current + product.discountedPrice
            : current + product.price,
        0
      );
    });
    this.savedAmount = computed(
      () => this.cartTotal() - this.discountedTotal()
    );
  }

  verifyLoginAndRedirect() {
    const isLoggedIn = localStorage.getItem('user');
    if(!isLoggedIn || !Object.keys(JSON.parse(isLoggedIn)).length) {
      console.log("Redirect to login");
      this.openAuthModal()
    }
  }

  openAuthModal() {
    const modalRef = this.modalService.show(LoginSignupModalComponent, {
      class: 'modal-md modal-dialog-center',
      backdrop: true,
      ignoreBackdropClick: true,
    });

    // modalRef.content?.saveSuccess.subscribe(() => {
    //   this.router.navigate(['/']);
    // });
  }
}
