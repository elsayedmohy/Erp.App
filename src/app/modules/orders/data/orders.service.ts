import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { PagedResult, PageQuery } from '../../models';
import { CreateOrderRequest, Order, UpdateOrderRequest } from './models';

@Service()
export class OrdersService {
  private readonly api = inject(ApiService);

  list(query: PageQuery): Observable<PagedResult<Order>> {
    return this.api.get<PagedResult<Order>>(`orders`, { params: query });
  }

  getById(id: string): Observable<Order> {
    return this.api.get<Order>(`orders/${id}`);
  }

  create(payload: CreateOrderRequest): Observable<Order> {
    return this.api.post<Order>('orders', payload);
  }

  update(id: string, payload: UpdateOrderRequest): Observable<Order> {
    return this.api.put<Order>(`orders/${id}`, payload);
  }

  delete(id: string): any {
    return this.api.delete<any>(`orders/${id}`);
  }
}
