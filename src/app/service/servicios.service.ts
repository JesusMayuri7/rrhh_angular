import {throwError as observableThrowError,Observable, forkJoin,from } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
import {catchError,map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpHeaders,  HttpParams  } from '@angular/common/http';
import { Car,Trabajador, Presupuesto} from '../interface';
import { environment } from '../../environments/environment';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { saveAs } from 'file-saver';

//import {Trabajador} from './../interface/trabajador';

@Injectable()
export class ServiciosService {
    private readonly API= `${environment.API}`;
    loading = true;
    error: any;
    constructor(private http: HttpClient) {

    }
    getPap() {        
      return this.http.get(this.API+'servicios/servicios')     
    }

    delPersonal(id) {      
      console.log(id);
      return this.http.delete(this.API+'servicios/personal/eliminar/'+id)     
    }

    postNuevoPersonal(data): Observable<any>{
      return this.http.post(this.API+'servicios/nuevo_personal',data);
    }
    
    postNuevoServicio(data): Observable<any>{
      return this.http.post(this.API+'servicios/nuevo_servicio',data);
    }
}
