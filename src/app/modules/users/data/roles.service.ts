import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { PagedResult, PageQuery } from '../../models';
import { RoleRequest, RoleResponse, RoleSummery } from './models';

@Service()
export class RolesService {
  private readonly api = inject(ApiService);

  list(query?: PageQuery): Observable<PagedResult<RoleSummery>> {
    return this.api.get<PagedResult<RoleSummery>>(`roles`, { params: query });
  }

  getById(id: string): Observable<RoleResponse> {
    return this.api.get<RoleResponse>(`roles/${id}`);
  }

  create(payload: RoleRequest): Observable<RoleResponse> {
    return this.api.post<RoleResponse>('roles', payload);
  }

  update(id: string, payload: RoleRequest): Observable<RoleResponse> {
    return this.api.put<RoleResponse>(`roles/${id}`, payload);
  }

  delete(id: string): any {
    return this.api.delete<any>(`roles/${id}`);
  }
}
