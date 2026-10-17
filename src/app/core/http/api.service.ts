import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../config/app-config';

type QueryPrimitive = string | number | boolean;
type QueryValue = QueryPrimitive | readonly QueryPrimitive[] | null | undefined;

export type QueryParams = HttpParams | { readonly [key: string]: QueryValue } | object;

export interface RequestOptions {
  readonly params?: QueryParams;
  readonly context?: HttpContext;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  get<T>(path: string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(this.url(path), this.toOptions(options));
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Observable<T> {
    return this.http.post<T>(this.url(path), body, this.toOptions(options));
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions): Observable<T> {
    return this.http.put<T>(this.url(path), body, this.toOptions(options));
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions): Observable<T> {
    return this.http.patch<T>(this.url(path), body, this.toOptions(options));
  }

  delete<T>(path: string, options?: RequestOptions): Observable<T> {
    return this.http.delete<T>(this.url(path), this.toOptions(options));
  }

  private toOptions(options?: RequestOptions): { params?: HttpParams; context?: HttpContext } {
    return {
      params: options?.params ? toHttpParams(options.params) : undefined,
      context: options?.context,
    };
  }

  private url(path: string): string {
    const normalized = path.replace(/^\/+/, '');
    return `${this.config.apiBaseUrl}/${normalized}`;
  }
}

function toHttpParams(source: QueryParams): HttpParams {
  if (source instanceof HttpParams) return source;

  let params = new HttpParams();
  for (const [key, value] of Object.entries(source) as [string, QueryValue][]) {
    if (value === null || value === undefined || value === '') continue;

    if (Array.isArray(value)) {
      for (const item of value) params = params.append(key, String(item));
    } else {
      params = params.set(key, String(value));
    }
  }
  return params;
}
