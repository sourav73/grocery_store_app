import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-payment',
  standalone: true,
  imports: [],
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.scss'
})
export class MakePaymentComponent {
  billingForm: FormGroup = new FormGroup({});

  createBillingForm() {
    this.billingForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      phone: new FormControl<string>('', [Validators.required]),
      addressOne: new FormControl<string>('', [Validators.required]),
      addressTwo: new FormControl<string>(''),
      zipCode: new FormControl<string>('', [Validators.required]),
      
    });
  }
}
