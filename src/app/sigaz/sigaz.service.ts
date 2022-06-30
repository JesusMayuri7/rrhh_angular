import {throwError as observableThrowError, Observable, forkJoin,from } from 'rxjs';

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
export class SigaZService {
    private readonly API= `${environment.API}`;
    loading = true;
    error: any;
    constructor(private http: HttpClient) {

    }
    postOrdenes(data,pagina) {        
      return this.http.post(this.API+'servicios/sigaz/listar'+pagina,data)     
    }
    
    postControl(data) {        
      return this.http.post(this.API+'servicios/zonal/actualizar_control',data);
    }
}
