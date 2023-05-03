import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, ReplaySubject, of } from 'rxjs';
import { catchError, finalize, map, switchMap, concatMap, retry, first, take } from 'rxjs/operators';
import { Router, NavigationStart, NavigationError, NavigationEnd, NavigationCancel } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginResponse } from '../shared/model/login-response';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private pendingRequests = 0;
  private filteredUrlPatterns: RegExp[] = [];

  private pendingRequestsStatus: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private router: Router, private authService:AuthService) {
    //debugger;
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.pendingRequestsStatus.next(true);
      }

      if ((event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel)) {
        this.pendingRequestsStatus.next(false);
      }
    });
  }

  private shouldBypass(url: string): boolean {
    return this.filteredUrlPatterns.some(e => {
      return e.test(url);
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //debugger;
    const shouldBypass = this.shouldBypass(req.url);
    
    
    const token: string = localStorage.getItem('token');

    
    if(!this.isLogin(req.url))
    {                        
              req = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                })
            });
            if (!req.headers.has('Content-Type')) {
                    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
                  }

                  req = req.clone({ headers: req.headers.set('Accept', '*/*') });           
    
          if (!shouldBypass) {
            this.pendingRequests++;

            if (1 === this.pendingRequests) {              
              this.pendingRequestsStatus.next(true);
            }
          }
          let intReq = req;
          intReq = this.addToken(req, token);

    return next.handle(req).pipe((
      map(event => {
        return event;
      }),
      //take(1),
      catchError( (error) => {
        console.log('error intereptor');
        if(error.status === 401)
        {
          if(this.authService.isLogged)
          {
            return this.authService.refresh(token).pipe(concatMap((data: LoginResponse) => {
              console.log('refreshing....');
              localStorage.setToken('token',data.token);
              intReq = this.addToken(req, data.token);
              return next.handle(intReq);
            }));         
          }
          console.log('error....interceptor 401');
          return of(error);   
        }
        console.log('error....interceptor');
          return of(error);
    
      }),
      finalize(() => {
        //debugger;
        if (!shouldBypass) {
          this.pendingRequests--;

          if (0 === this.pendingRequests) {
            this.pendingRequestsStatus.next(false);
          }
        }
      })
    ));

    }
    return next.handle(req);
  }

  private isLogin(url: string): boolean {
		return url.search('login') != -1;
  }
  
  
 private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}