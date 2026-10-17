import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { Customer, CustomerRequest } from './model';
import { PagedResult, PageQuery } from '../../models';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  private readonly api = inject(ApiService);

  list(query: PageQuery): Observable<PagedResult<Customer>> {
    return this.api.get<PagedResult<Customer>>(`customers`, { params: query });
  }

  getById(id: string): Observable<Customer> {
    return this.api.get<Customer>(`customers/${id}`);
  }

  create(payload: CustomerRequest): Observable<Customer> {
    return this.api.post<Customer>('customers', payload);
  }

  update(id: string, payload: CustomerRequest): Observable<Customer> {
    return this.api.put<Customer>(`customers/${id}`, payload);
  }

  delete(id: string): any {
    return this.api.delete<any>(`customers/${id}`);
  }
}
