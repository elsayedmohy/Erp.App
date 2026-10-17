import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { PagedResult, PageQuery } from '../../models';
import { CreateInvoiceRequest, Invoice, UpdateInvoiceRequest } from './models';

@Service()
export class InvoiceService {
  private readonly api = inject(ApiService);

  list(query: PageQuery): Observable<PagedResult<Invoice>> {
    return this.api.get<PagedResult<Invoice>>(`invoices`, { params: query });
  }

  getById(id: string): Observable<Invoice> {
    return this.api.get<Invoice>(`invoices/${id}`);
  }

  create(payload: CreateInvoiceRequest): Observable<Invoice> {
    return this.api.post<Invoice>('invoices', payload);
  }

  update(id: string, payload: UpdateInvoiceRequest): Observable<Invoice> {
    return this.api.put<Invoice>(`invoices/${id}`, payload);
  }

  delete(id: string): any {
    return this.api.delete<any>(`invoices/${id}`);
  }
}
