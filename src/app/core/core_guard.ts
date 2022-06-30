import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';

import {Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoreGuard implements CanActivate{
  token: string;

  constructor(private authService: AuthService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.autenticated().pipe(
      map((response: { status: boolean}) => {          
      if (response.status) {          
        return true;
      }
      this.router.navigate(['/login']);
      return false;
      }), catchError((error) => {
          this.router.navigate(['/login']);
          return of(false);
      }));

  }
}