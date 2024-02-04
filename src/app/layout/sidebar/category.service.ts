import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ListOutput, SingleObjectOutput } from '../../common/types/responses';
import { CategorySidebar } from './types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseApi: string = environment.baseApiUrl;
  http = inject(HttpClient);

  constructor() {}

  getCategories() {
    return this.http.get<ListOutput<CategorySidebar>>(
      this.baseApi + '/categories'
    );
  }
}
