import { Component, computed, inject } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginSignupModalComponent } from '../../common/components/login-signup-modal/login-signup-modal.component';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart/cart.service';
import { Product } from '../../pages/products/product-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  providers:[BsModalService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  modalService = inject(BsModalService);
  router = inject(Router);
  cartService = inject(CartService);
  totalProduct = computed(() => this.cartService.cart().totalProducts);

  ngOnInit(): void {
    const cartProducts: Product[] = JSON.parse(localStorage.getItem('cartProducts')!) || [];
    this.cartService.products.set(cartProducts);
    this.cartService.updateCart();
  }
  openAuthModal() {
    const modalRef = this.modalService.show(LoginSignupModalComponent, {
      class: 'modal-md modal-dialog-center',
      backdrop: true,
      ignoreBackdropClick: true,
    });

    modalRef.content?.saveSuccess.subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  openCart() {
    this.cartService.isCartOpened.set(true);
  }
}
