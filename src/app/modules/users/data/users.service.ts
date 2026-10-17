import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { PagedResult } from '../../models';
import { UpdateUserRequest, UserQuery, UserRequest, UserResponse } from './models';

@Service()
export class UsersService {
  private readonly api = inject(ApiService);

  list(query: UserQuery): Observable<PagedResult<UserResponse>> {
    return this.api.get<PagedResult<UserResponse>>(`users`, { params: query });
  }

  getById(id: string): Observable<UserResponse> {
    return this.api.get<UserResponse>(`users/${id}`);
  }

  create(payload: UserRequest): Observable<UserResponse> {
    return this.api.post<UserResponse>('users', payload);
  }

  update(id: string, payload: UpdateUserRequest): Observable<UserResponse> {
    return this.api.put<UserResponse>(`users/${id}`, payload);
  }

  delete(id: string): any {
    return this.api.delete<any>(`users/${id}`);
  }
}

