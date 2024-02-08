import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListOutput } from '../../common/types/responses';
import { Product } from './product-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseApiUrl = environment.baseApiUrl;
  http = inject(HttpClient);
  constructor() {}

  getProducts(categoryId: number): Observable<ListOutput<Product>> {
    return this.http.get<ListOutput<Product>>(
      `${this.baseApiUrl}/Product/category/${categoryId}`
    );
  }
}
