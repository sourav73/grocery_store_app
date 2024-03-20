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

  ngOnInit(): void {
    
  }

  incrementProductQuantity(product: Product) {
    this.cartService.incrementQuantity(product);
  }

  decrementProductQuantity(product: Product) {
    this.cartService.decrementQuantity(product);
  }

  removeProduct(productId: number) {
    this.cartService.removeItemFromCart(productId);
  }

  verifyLoginAndRedirect() {
    const isLoggedIn = localStorage.getItem('user');
    if(!isLoggedIn || !Object.keys(JSON.parse(isLoggedIn)).length) {
      console.log("Redirect to login");
      this.openAuthModal();
    }
  }

  openAuthModal() {
    const initialState = {
      isLoginTab: false
    };
    const modalRef = this.modalService.show(LoginSignupModalComponent, {
      initialState,
      class: 'modal-md modal-dialog-center',
      backdrop: true,
      ignoreBackdropClick: true,
    });

    // modalRef.content?.saveSuccess.subscribe(() => {
    //   this.router.navigate(['/']);
    // });
  }
}
