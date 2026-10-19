import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { PagedResult, PageQuery } from '../../models';
import { Category, CreateCategoryRequest } from './models';

@Service()
export class CategoriesService {
  private readonly api = inject(ApiService);

  list(query?: PageQuery): Observable<PagedResult<Category>> {
    return this.api.get<PagedResult<Category>>(`categories`, { params: query });
  }

  getById(id: string): Observable<Category> {
    return this.api.get<Category>(`categories/${id}`);
  }

  create(payload: CreateCategoryRequest): Observable<Category> {
    return this.api.post<Category>('categories', payload);
  }

  update(id: string, payload: CreateCategoryRequest): Observable<Category> {
    return this.api.put<Category>(`categories/${id}`, payload);
  }

  delete(id: string): any {
    return this.api.delete<any>(`categories/${id}`);
  }
}
