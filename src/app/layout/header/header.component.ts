import { Component, inject } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginSignupModalComponent } from '../../common/components/login-signup-modal/login-signup-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers:[BsModalService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  modalService = inject(BsModalService);
  router = inject(Router);
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
}
