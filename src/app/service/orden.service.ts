import {throwError as observableThrowError, Observable, forkJoin,from } from 'rxjs';

import {catchError,map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpHeaders,  HttpParams  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { saveAs } from 'file-saver';

//import {Trabajador} from './../interface/trabajador';

@Injectable()
export class OrdenService {
    private readonly API= `${environment.API}`;
    loading = true;
    error: any;
    constructor(private http: HttpClient) {

    }
    postOrdenes(data,pagina) {        
      return this.http.post(this.API+'servicios/ordenes'+pagina,data)     
    }
    
    postControl(data) {        
      return this.http.post(this.API+'servicios/sede/actualizar_control',data);
    }

    getDescarga(){
      return this.http.get(this.API+'servicios/ordenes_sigamef_export/', { headers: new HttpHeaders({
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

}
