import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { TokenService } from '@core/auth/token.service';
import { ProfileResponse } from './model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly api = inject(ApiService);
  private readonly tokens = inject(TokenService);

  readonly profile = signal<ProfileResponse | null>(null);

  load(): void {
    this.refresh().subscribe({
      error: () => this.profile.set(null),
    });
  }

  refresh(): Observable<ProfileResponse> {
    return this.api.get<ProfileResponse>('profile/me').pipe(tap((p) => this.apply(p)));
  }

  private apply(p: ProfileResponse): void {
    this.profile.set(p);

    const token = this.tokens.getToken();
    const user = this.tokens.getUser();
    if (token && user) {
      this.tokens.save(token);
      this.tokens.setUser({
        ...user,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
      });
    }
  }
}
