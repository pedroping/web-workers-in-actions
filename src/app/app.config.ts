import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { TranslateService } from '@core/services/translate/translate.service';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

const translateInjection = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    const translateService = inject(TranslateService);
    return () => translateService.startDomain();
  },
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr(),
    provideHttpClient(),
    translateInjection,
  ],
};
