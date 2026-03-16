import { APP_BASE_HREF, LocationStrategy } from '@angular/common';
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
  withHashLocation,
} from '@angular/router';
import { MemoryLocationStrategy } from '@core/services/memory-location/memory-location.service';
import { TranslateService } from '@core/services/translate/translate.service';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { environment } from 'src/environments/environment';

const translateInjection = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    const translateService = inject(TranslateService);
    return () => translateService.startDomain();
  },
  multi: true,
};

const webCompAppConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr(),
    provideHttpClient(),
    translateInjection,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: MemoryLocationStrategy },
  ],
};

const baseAppConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr(),
    provideHttpClient(),
    translateInjection,
  ],
};

export const appConfig: ApplicationConfig = environment.isWebComponent
  ? webCompAppConfig
  : baseAppConfig;
