import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';

import {Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoreGuardChild implements CanActivateChild {
  token: string;

  constructor(private authService: AuthService,private router:Router){}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('can child '+next.url);
      return this.authService.autenticated().pipe(
        map((response: { status: boolean}) => { 
          console.log('cah child autentecated '+JSON.stringify(response));
        if (response.status) {          
          return true;
        }
        //this.router.navigate(['/login']);
        return false;
        }), catchError((error) => {
            console.log('can child error');
            this.router.navigate(['/login']);
            return of(false);
        }));


  }
}

/*        res => {
        if (response.status) {          
          return true;
        }
        this.router.navigate(['/login']);        
        return false;
        }), catchError((error) => {
            console.log(this.authService.isLogged);
           // this.authService.refresh().
            this.router.navigate(['/login']);
            return of(false);
        }));*/