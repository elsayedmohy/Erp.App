import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { TokenService } from '@core/auth/token.service';
import { User } from './model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly api = inject(ApiService);
  private readonly tokens = inject(TokenService);

  readonly profile = signal<User | null>(null);

  load(): void {
    this.refresh().subscribe({
      error: () => this.profile.set(null),
    });
  }

  refresh(): Observable<User> {
    return this.api.get<User>('profile/me').pipe(tap((p) => this.apply(p)));
  }

  private apply(p: User): void {
    this.profile.set(p);

    const token = this.tokens.getToken();
    const user = this.tokens.getUser();

    if (token) {
      this.tokens.save(token);
    }

    if (user) {
      this.tokens.setUser({
        ...user,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
      });
    }else {
      this.tokens.setUser(p);
    }
  }
}
