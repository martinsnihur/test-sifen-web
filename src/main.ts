import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => {
    console.error('Application bootstrap failed:', err);
    // Additional error handling like error reporting service could be added here
    if (!environment.production) {
      // Only show detailed errors in development
      console.error('Details:', err.stack || err);
    }
  });
