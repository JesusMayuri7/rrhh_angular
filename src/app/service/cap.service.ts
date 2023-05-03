
import {throwError as observableThrowError, Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders,  HttpParams  } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver';
//import {Trabajador} from './../interface/trabajador';

@Injectable()
export class CapService {
    private readonly API= `${environment.API}`;
    constructor(private http: HttpClient) {

    }
  
    private onError(error: Response | any) {
      console.error(error.message || error);
      return observableThrowError(error.message || error);
    }

    getDescarga(){
      return this.http.get(this.API+'cap/rpt_vigente_cap', { headers: new HttpHeaders({
        'Authorization': '{data}',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }), responseType: 'blob'}).pipe(
      map(
        
          // Log the result or error
          (data:Blob) => {
          //var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
          saveAs(data);
          },
          error => console.log(error)
       ));
    }

    getCap() {        
         return this.http.get(this.API+'activos/cap/2019');        
     }
 
    getNombres(dni):Observable<any> {        
      return this.http.post(this.API+'activos/trabajador/dni',dni);        
    }

    postDni(trabajaodr):Observable<any> {        
      return this.http.post(this.API+'activos/trabajador/nuevo',trabajaodr);        
    }

     getMatrizData() {        
      return this.http.get(this.API+'activos/matriz_data');     
    }

    

     private handleError(error: HttpResponse<any>) {
         return observableThrowError(error.statusText);
     }

     postMatriz(data): Observable<any>{
        return this.http.post(this.API+'activos/nuevo_matriz',data);
      }

     postMatrizControl(data): Observable<any>{
        return this.http.post(this.API+'activos/matriz_control',data);
      }

}
