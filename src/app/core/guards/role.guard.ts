import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@core/auth/token.service';
import { Role } from '@core/auth/auth.models';

export function roleGuard(...allowed: string[]): CanActivateFn {
  return () => {
    const tokenService = inject(TokenService);
    const router = inject(Router);
    const user = tokenService.getUser();

    if (!user) {
      return router.createUrlTree(['/auth/login']);
    }

    if (allowed.includes(user.role)) {
      return true;
    }

    return router.createUrlTree(['/dashboard']);
  };
}
