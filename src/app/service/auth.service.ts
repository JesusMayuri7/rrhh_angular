import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { environment } from '../../environments/environment';

import {  Router } from '@angular/router';
import { first, map, catchError, tap, concatMap, mapTo } from 'rxjs/operators';
import { LoginResponse } from '../shared/model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly API= `${environment.API}`;
  isLogged : boolean = false;

  constructor(private http: HttpClient,private router:Router) {
  
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email: email, password: password };        
    console.log('aut service login');
    return this.http.post<LoginResponse>(environment.API + 'auth/login',body)
    .pipe(tap(
      (res: LoginResponse) => {
        if (res.status) {          
          this.isLogged = true;
          localStorage.setItem('token',res.token);
        }
      }),
      catchError((error)=>{
        console.log('error login cathError '+error);
        return of(error);
      })

    );
}

  autenticated(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.API + 'auth/autenticated',[]).pipe(
      map(response  => {        
      if (response.status) {          
        return response;
      }                  
      })
      ,
      catchError((error)=>{
        console.log('autenticate error '+JSON.stringify(error));
         localStorage.removeItem('token');
         this.isLogged = false;
         //this.router.navigate(['/login']);
         return Observable.throw(error.message || "server error.");
      }));
  }

 

  logout() {
     console.log('salir authService');
     return this.http.post(environment.API + 'auth/logout',[]).pipe(
        tap((res) => {
           console.log(res);
          console.log('salir service');
          localStorage.removeItem('token');
          this.isLogged = false;
          //this.router.navigate(['/login']); 
        }),
        catchError(error => {
          console.log(error);
          //alert(error.error);
          return of(false);
        }));
  }
  

  refresh(token:String): Observable<any> {
    let headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
  });
  let options = { headers: headers };
    return this.http.post<LoginResponse>(environment.API + 'auth/refresh',[],options).pipe(
      tap(response  => {        
      if (response.status) { 
        localStorage.setItem('token',response.token);
        return response;
      }            
      }),catchError((error) => {          
          // this.authService.refresh().          
          return Observable.throw(error.message || "server error.");
      }));
  }



}