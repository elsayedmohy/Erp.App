import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { APP_CONFIG } from '../config/app-config';
import { ApiService } from '@core/http/api.service';
import { TokenService } from '@core/auth/token.service';
import { AuthResponse, LoginRequest } from '@core/auth/auth.models';
import { toApiErrorResponse } from '@core/utils/api-error.util';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly tokenService = inject(TokenService);
  private readonly config = inject(APP_CONFIG);

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('auth/login', credentials).pipe(
      switchMap((result) =>
        result
          ? this.persist(result, credentials.email)
          : throwError(() =>
              toApiErrorResponse(result),
            ),
      ),
      catchError((error: unknown) => throwError(() => toApiErrorResponse(error))),
    );
  }

  logout(): void {
    const refreshToken = this.tokenService.getRefreshToken();
    this.tokenService.clear();
    if (refreshToken) {
      this.api.post<void>('auth/logout', { refreshToken }).subscribe({ error: () => {} });
    }
  }

  private persist(
    response: AuthResponse,
    email: string,
    initialName = '',
  ): Observable<AuthResponse> {
    this.tokenService.save(response.token, response.RefreshToken);
    return of(response);
  }
}

