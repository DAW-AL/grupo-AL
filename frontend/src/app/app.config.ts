import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth-interceptor';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { MessageService } from 'primeng/api';

const MiPreset = definePreset(Aura, {
  primitive: {
    fontFamily: "'Montserrat', sans-serif",
    purple: {
      50:  '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#7C6FCD',
      600: '#6d5fc4',
      700: '#5b4fb0',
      800: '#4a3f96',
      900: '#3b3278',
      950: '#2e2760',
    }
  },
  semantic: {
    primary: {
      50:  '{purple.50}',
      100: '{purple.100}',
      200: '{purple.200}',
      300: '{purple.300}',
      400: '{purple.400}',
      500: '{purple.500}',
      600: '{purple.600}',
      700: '{purple.700}',
      800: '{purple.800}',
      900: '{purple.900}',
      950: '{purple.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0:   '#ffffff',
          50:  '#f5f5f7',
          100: '#ececef',
          200: '#e0e0e5',
          300: '#d0d0d8',
          400: '#b0b0bc',
          500: '#8e8e9e',
          600: '#6e6e80',
          700: '#4e4e60',
          800: '#333344',
          900: '#1e1e2e',
          950: '#111120',
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: MiPreset,
        options: {
          darkModeSelector: '.dark'
        }
      }
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService
  ]
};