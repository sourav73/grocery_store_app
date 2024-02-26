import { Component, Input } from '@angular/core';
import { Product } from '../product-type';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-item-card',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './product-item-card.component.html',
  styleUrl: './product-item-card.component.scss',
})
export class ProductItemCardComponent {
  @Input() product: Product = {} as Product;
  quantity: number = 1;

  increaseQuantity() {
    this.quantity += 1;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }
}
