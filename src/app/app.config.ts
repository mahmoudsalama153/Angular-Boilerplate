import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { PRIMENG_CONFIG } from './core/configs/primeng-config';

export const appConfig: ApplicationConfig = {
  providers: [
    PRIMENG_CONFIG,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    MessageService,
  ],
};
