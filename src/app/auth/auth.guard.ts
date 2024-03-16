import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!localStorage.getItem('testUser')) {
    router.navigate(['/login'])
    return false;
  }

  return true;
};



/*
export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.checkLogin().pipe(
    map(() => true),
    catchError(() => {
      return router.createUrlTree(['route-to-fallback-page']);
    })
  );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
*/