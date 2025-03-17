import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Router configuration
    provideRouter(
      routes,
      withViewTransitions(), // Enable view transitions for smoother navigation
      withComponentInputBinding(), // Allow passing data via route parameters
    ),
    
    // HTTP configuration
    provideHttpClient(
      withInterceptors([AuthInterceptor]), // Add auth interceptor for JWT handling
      withJsonpSupport(), // Enable JSONP for cross-origin requests if needed
    ),
    
    // Animation support
    provideAnimations(), // Añadir este proveedor
    
    // Import NgBootstrap and shared modules
    importProvidersFrom(
      NgbModule,
      SharedModule,
    ),
  ],
};
