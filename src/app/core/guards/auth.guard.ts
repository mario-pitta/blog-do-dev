import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  console.log('entrou no guard');
  if (!localStorage.getItem('user')) {
    console.log('não tem usuario....')
    router.navigate(['/login']);
    return false; // não autorizado
  }

  console.log('tem usuario....')
  return true;
};
