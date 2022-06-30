import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';

import {Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuardCan implements CanActivate{
  token: string;

  constructor(private authService: AuthService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('guard login');
      if(this.authService.isLogged)         
      {
          this.router.navigate(['/v1']);
          return false;
      } 
      return true;
       
    }

}