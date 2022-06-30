
import {throwError as observableThrowError, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders,  HttpParams  } from '@angular/common/http';

//import {Trabajador} from './../interface/trabajador';
import { environment } from '../../environments/environment';

@Injectable()
export class GuardiasService {
    private readonly API= `${environment.API}`;
    constructor(private http: HttpClient) {

    }
  
    private onError(error: Response | any) {
      console.error(error.message || error);
      return observableThrowError(error.message || error);
    }

    getFotoTrabajador(dni): Observable<any[]> {
        console.log('recibiendo '+dni);
         return this.http
             .get(this.API+'/trabajador/'+dni).pipe(
             map((response: HttpResponse<any[]>) => {     
                 return  <any>response;
             }),
             catchError(this.handleError),);
     }

    getGuardias() {        
         return this.http.get(this.API+'activos/guardias')        
     }
 
     private handleError(error: HttpResponse<any>) {
         return observableThrowError(error.statusText);
     }




}
