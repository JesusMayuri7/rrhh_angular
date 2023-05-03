import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanLoad} from '@angular/router';

import {Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppGuardLoad implements CanLoad {

  constructor(private authService: AuthService,private router:Router){  }

  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    console.log('can load');
    return this.authService.autenticated().pipe(
      map((response ) => {     
        console.log('can load '+JSON.stringify(response));
      if (response) {          
        return true;
      }
      //this.router.navigate(['/login']);
      return false;
      }), catchError((error) => {
        //console.log(error);
          this.router.navigate(['/login']);
          return of(false);
      }));
  }


  
  

  


 
}