import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthStore {

    private readonly router: Router = inject(Router);

    guardarToken(token: string): void {
        sessionStorage.setItem("accessToken", token);
    }

    obtenerToken(): string | null {
        return sessionStorage.getItem("accessToken");
    }

    cerrarSesion(): void {
        sessionStorage.removeItem("accessToken");
        this.router.navigateByUrl("/login");
    }

    private decodificarPayload(): { nombre: string; sub: number; rol: string; exp?: number } | null {
        const token = this.obtenerToken();
        if (!token) return null;
        try {
            const base64 = token.split('.')[1]; // nos quedamos con la parte del medio
            return JSON.parse(atob(base64.replace(/-/g, '+').replace(/_/g, '/')));
        } catch {
            // Si el token está malformado o corrupto, devolvemos null
            return null;
        }
    }


    obtenerNombre(): string {
        return this.decodificarPayload()?.nombre ?? 'Usuario';
    }

    obtenerRol(): string {
        return this.decodificarPayload()?.rol ?? '';
    }


    estaAutenticado(): boolean {
        const p = this.decodificarPayload();
        if (!p) return false;
        if (p.exp && Date.now() / 1000 > p.exp) {
            this.cerrarSesion();
            return false;
        }
        return true;
    }

}