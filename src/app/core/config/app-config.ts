import { InjectionToken } from '@angular/core';
import { environment } from '../../../environment/environment.development';

export interface AppConfig {
  readonly apiBaseUrl: string;
  readonly production: boolean;
  readonly appName: string;
  readonly tokenStorageKey: string;
  readonly refreshTokenStorageKey: string;
  readonly userStorageKey: string;
  readonly themeStorageKey: string;
}

export const appConfig: AppConfig = {
  ...environment,
  appName: 'ERP',
  tokenStorageKey: 'access_token',
  refreshTokenStorageKey: 'refresh_token',
  userStorageKey: 'user',
  themeStorageKey: 'tuiDark',
};

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  factory: () => appConfig,
});
