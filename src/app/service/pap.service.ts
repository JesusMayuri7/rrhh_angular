
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
export class PapService {
    private readonly API= `${environment.API}`;
    loading = true;
    error: any;
    constructor(private http: HttpClient) {

    }
    getPapLaudo() {        
      return this.http.get(this.API+'activos/pap/2019')     
    }
    
    getPapAir() {        
      return this.http.get(this.API+'activos/pap_air')     
    }
}
