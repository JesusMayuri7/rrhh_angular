import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {  NgModule } from '@angular/core';
import { ServiceModule } from './service/service.module';

import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
//import {HttpLinkModule} from 'apollo-angular-link-http';
import {  HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//import { HttpConfigInterceptor } from './service/http.config.interceptor';
//import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpConfigInterceptor } from './service/http.config.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import {DialogModule} from 'primeng/dialog';
import { AuthModule } from './auth/auth.module';

import { AppGuardLoad } from './app_guard_load';
import { AppGuardCan } from './app_guard_can';
//import { FlexLayoutModule } from '@angular/flex-layout';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [ AppComponent  ],
  imports: [    
    ApolloModule,
   // HttpLinkModule,
    BrowserAnimationsModule,   
/*     FormsModule,
    ReactiveFormsModule, */
    HttpClientModule,
    AppRoutingModule,
    DialogModule,
    AuthModule,
    //FlexLayoutModule,
    ServiceModule.forRoot(),
//    SharedModule.forRoot()
   // RouterModule.forRoot(routeConfig)
  ],  
  providers: [
    AppGuardLoad,
    AppGuardCan,
    {
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: "http://rrhh.pvn.gob.pe/graphql"
        })
      }
    },
    deps: [HttpLink],
  },
  
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }

],
 //bootstrap: [ShellComponent]
  bootstrap: [AppComponent]
})
export class AppModule {  
 }
