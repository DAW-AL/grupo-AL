import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "./auth-store";

export const adminGuard: CanActivateFn = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    if (authStore.estaAutenticado() && authStore.obtenerRol() === 'admin') return true;

    return router.createUrlTree(["/proyectos"]);
};