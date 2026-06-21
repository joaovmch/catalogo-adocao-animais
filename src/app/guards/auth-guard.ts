import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

/**
 * Protege rotas privadas: se não houver sessão ativa, redireciona para
 * /login em vez de deixar acessar a rota.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estaAutenticado()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
