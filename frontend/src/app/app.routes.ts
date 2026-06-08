import { Routes } from '@angular/router';
import { Login } from './auth/login';
import { AppLayout } from './layout/app-layout';
import { authGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';
import { TareasComponent } from './tareas/tareas';


export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'proyectos', pathMatch: 'full' },

      {
        path: 'proyectos',
        loadComponent: () =>
          import('./proyectos/proyectos').then(m => m.ProyectosComponent)
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./clientes/clientes').then(m => m.ClientesComponent)
      },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./inicio/inicio').then(m => m.InicioComponent)
      },
      {
        path: 'usuarios',
        canActivate: [authGuard, adminGuard],
        loadComponent: () =>
          import('./usuarios/usuarios').then(m => m.Usuarios)
      },
      {
        path: 'historial',
        canActivate: [authGuard, adminGuard],
        loadComponent: () =>
          import('./historial/historial').then(m => m.Historial)
      },
      {
        path: 'proyectos/:id',
        component: TareasComponent
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login').then(m => m.Login)
  },

  {
  path: 'perfil',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./perfil/perfil').then(m => m.PerfilComponent)
},

  { path: '**', redirectTo: '/login' }
];