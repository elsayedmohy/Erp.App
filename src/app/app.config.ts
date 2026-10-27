import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideTaiga, tuiDateFormatProvider } from '@taiga-ui/core';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { tuiInputDateOptionsProvider } from '@taiga-ui/kit';
import { TuiDay } from '@taiga-ui/cdk';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideTaiga(),
    tuiDateFormatProvider({
      mode: 'dd/mm/yyyy',
      separator: '-',
    }),
    tuiInputDateOptionsProvider({
      valueTransformer: {
        fromControlValue: (value: Date | null): TuiDay | null =>
          value && TuiDay.fromUtcNativeDate(value),
        toControlValue: (value: TuiDay | null): string | null => value?.toString() || null,
      },
    }),
  ],
};
