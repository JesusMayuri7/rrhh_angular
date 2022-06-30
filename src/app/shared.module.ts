import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/core';
import { HttpConfigInterceptor } from './service/http.config.interceptor';

export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [
           { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
        ]
      };
    }
  }