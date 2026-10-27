import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { PagedResult } from '../../models';
import {
  CreateOrderRequest,
  Order,
  OrderDetails,
  OrderQuery,
  UpdateOrderRequest,
  UpdateOrderStatusRequest,
} from './models';

@Service()
export class OrdersService {
  private readonly api = inject(ApiService);

  list(query: OrderQuery): Observable<PagedResult<Order>> {
    return this.api.get<PagedResult<Order>>(`orders`, { params: query });
  }

  getById(id: string): Observable<OrderDetails> {
    return this.api.get<OrderDetails>(`orders/${id}`);
  }

  create(payload: CreateOrderRequest): Observable<Order> {
    return this.api.post<Order>('orders', payload);
  }

  update(id: string, payload: UpdateOrderRequest): Observable<Order> {
    return this.api.put<Order>(`orders/${id}`, payload);
  }

  updateStatus(id: string, payload: UpdateOrderStatusRequest): Observable<Order> {
    return this.api.patch<Order>(`orders/${id}/status`, payload);
  }

  delete(id: string): any {
    return this.api.delete<any>(`orders/${id}`);
  }
}
