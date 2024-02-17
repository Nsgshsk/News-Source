import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Token } from './models/Token';


export function tokenGetter() {
  return localStorage.getItem("access");
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  importProvidersFrom(
    JwtModule.forRoot({
      config: {
        tokenGetter: (tokenGetter),
        allowedDomains: ["127.0.0.1:8000"],
        disallowedRoutes: ["http://127.0.0.1:8000/api/auth/token/",
          "http://127.0.0.1:8000/api/auth/token/refresh/",
          "http://127.0.0.1:8000/api/auth/register/"],
      },
    }),
  ),
  provideHttpClient(
    withInterceptorsFromDi()
  ),]
};
