import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthorizationService);
    const router = inject(Router);

    if (authService.isAuthorized()) {
        return true;
    }

    return router.parseUrl('/login');
};
