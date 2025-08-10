import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { mockBackendInterceptor } from './interceptors/mock-backend.interceptor';

export const appConfig: ApplicationConfig = {
  
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    // Mock Backend para testing - comenta withInterceptors en la línea siguiente para usar el backend real
    provideHttpClient(withFetch(), withInterceptors([mockBackendInterceptor]))
   ]
};
