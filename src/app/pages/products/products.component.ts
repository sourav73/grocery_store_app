import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Product } from './product-type';
import { ProductService } from './product.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ProductItemCardComponent } from './product-item-card/product-item-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductItemCardComponent],
  providers: [BsModalService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  modalService = inject(BsModalService);
  toastrService = inject(ToastrService);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  ngUnsubscribe$ = new Subject<void>();
  products: Product[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((r) => {
      this.getProducts(r['categoryId']);
    });
  }
  constructor() {}

  getProducts(categoryId: number) {
    this.productService.getProducts(categoryId).subscribe((res) => {
      if (res.data.length) {
        this.products = res.data;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
