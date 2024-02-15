import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { SingleObjectOutput } from '../../types/responses';
import { UserInputDto } from '../../types/auth-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl = environment.baseApiUrl;
  http = inject(HttpClient);
  constructor() {}

  registerCustomer(
    user: UserInputDto
  ): Observable<SingleObjectOutput<boolean>> {
    return this.http.post<SingleObjectOutput<boolean>>(
      `${this.baseApiUrl}/Customer`,
      user
    );
  }
}
