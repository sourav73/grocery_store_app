import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserInputDto } from '../../types/auth-type';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-signup-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-signup-modal.component.html',
  styleUrl: './login-signup-modal.component.scss',
})
export class LoginSignupModalComponent {
  bsModalRef = inject(BsModalRef);
  userService = inject(AuthService);
  toastrService = inject(ToastrService);
  @Output() saveSuccess: EventEmitter<void> = new EventEmitter();
  userForm: FormGroup = new FormGroup({});
  ngUnsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', Validators.required),
      phone: new FormControl<string>(''),
      address: new FormControl<string>(''),
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  onSubmit() {
    const userInfo = this.userForm.value;
    const userToAddOrUpdate: UserInputDto = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      phone: userInfo.phone,
      address: userInfo.address,
    };

    this.userService
      .registerCustomer(userToAddOrUpdate)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        if (res.data) {
          this.bsModalRef.hide();
          this.toastrService.success('Registered Succeffully');
          this.saveSuccess.emit();
        } else {
          this.toastrService.error('Registration Failed!');
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
