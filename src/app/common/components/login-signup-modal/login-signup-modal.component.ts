import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserInputDto } from '../../types/auth-type';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-signup-modal',
  standalone: true,
  imports: [ReactiveFormsModule, TabsModule],
  templateUrl: './login-signup-modal.component.html',
  styleUrl: './login-signup-modal.component.scss',
})
export class LoginSignupModalComponent implements OnInit, AfterViewInit {
  bsModalRef = inject(BsModalRef);
  userService = inject(AuthService);
  toastrService = inject(ToastrService);
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  @Input() isLoginTab = false;
  @Output() saveSuccess: EventEmitter<void> = new EventEmitter();
  registrationForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});
  ngUnsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.registrationForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', Validators.required),
      confirmPassword: new FormControl<string>('', Validators.required),
      phone: new FormControl<string>(''),
      address: new FormControl<string>(''),
    });

    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', Validators.required),
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  onSubmit() {
    const userInfo = this.registrationForm.value;
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

  onLogin() {
    const formData = this.loginForm.value;
    const user = {
      email: formData.email
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.closeModal();
  }

  ngAfterViewInit(): void {
    if(!this.isLoginTab) {
      if (this.staticTabs?.tabs[1]) {
        this.staticTabs.tabs[1].active = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
