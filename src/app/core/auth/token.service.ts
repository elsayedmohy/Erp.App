import { inject, Injectable, signal } from '@angular/core';
import { APP_CONFIG } from '../config/app-config';
import { User } from '../../modules/profile/data/model';



@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly config = inject(APP_CONFIG);
  private readonly token = signal<string | null>(this.readToken());
  private readonly refreshToken = signal<string | null>(this.readRefresh());
  private readonly user = signal<User | null>(this.readUser());
  readonly tokenSignal = this.token.asReadonly();
  readonly userSignal = this.user.asReadonly();

  getToken(): string | null {
    return this.token();
  }

  getRefreshToken(): string | null {
    return this.refreshToken();
  }

  getUser(): User | null {
    return this.user();
  }

  isAuthenticated(): boolean {
    return this.token() !== null;
  }
  setUser(user: User | null): void {
    this.user.set(user);
    if(user) {
      localStorage.setItem(this.config.userStorageKey, user.toString());
    }
  }

  save(token: string, refreshToken?: string): void {
    localStorage.setItem(this.config.tokenStorageKey, token);
    this.token.set(token);
    if (refreshToken) {
      localStorage.setItem(this.config.refreshTokenStorageKey, refreshToken);
      this.refreshToken.set(refreshToken);
    }
  }

  clear(): void {
    localStorage.removeItem(this.config.tokenStorageKey);
    localStorage.removeItem(this.config.refreshTokenStorageKey);
    localStorage.removeItem(this.config.userStorageKey);
    this.token.set(null);
    this.refreshToken.set(null);
    this.user.set(null);
  }


  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.config.tokenStorageKey, accessToken);
    localStorage.setItem(this.config.refreshTokenStorageKey, refreshToken);
    this.token.set(accessToken);
    this.refreshToken.set(refreshToken);
  }

  private readRefresh(): string | null {
    return typeof localStorage === 'undefined'
      ? null
      : localStorage.getItem(this.config.refreshTokenStorageKey);
  }

  private readToken(): string | null {
    return typeof localStorage === 'undefined'
      ? null
      : localStorage.getItem(this.config.tokenStorageKey);
  }

  private readUser(): User | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    try {
      const raw = localStorage.getItem(this.config.userStorageKey);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
