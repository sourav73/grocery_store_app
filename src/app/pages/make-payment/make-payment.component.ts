import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../shared/services/cart/cart.service';

@Component({
  selector: 'app-make-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.scss',
})
export class MakePaymentComponent implements OnInit {
  cartService = inject(CartService);
  billingForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.createBillingForm();
  }

  createBillingForm() {
    this.billingForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      phone: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      deliveryAddress: new FormControl<string>('', [Validators.required]),
      paymentType: new FormControl<string>('', [Validators.required]),
      transactionId: new FormControl<string>('', [Validators.required]),
    });
  }
}
