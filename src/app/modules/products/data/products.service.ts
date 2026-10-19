import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { PagedResult } from '../../models';
import { Product, ProductDetails, ProductQuery, ProductRequest } from './models';

@Service()
export class ProductsService {
  private readonly api = inject(ApiService);

  list(query: ProductQuery): Observable<PagedResult<Product>> {
    return this.api.get<PagedResult<Product>>(`products`, { params: query });
  }

  getById(id: string): Observable<ProductDetails> {
    return this.api.get<ProductDetails>(`products/${id}`);
  }

  create(payload: ProductRequest): Observable<Product> {
    return this.api.post<Product>('products', payload);
  }

  update(id: string, payload: ProductRequest): Observable<Product> {
    return this.api.put<Product>(`products/${id}`, payload);
  }

  delete(id: string): any {
    return this.api.delete<any>(`products/${id}`);
  }
}
