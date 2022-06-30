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
export class OrganigramaService {
    private readonly API= `${environment.API}`;
    loading = true;
    error: any;
    constructor(private http: HttpClient) {

    }
    getPap() {        
      return this.http.get(this.API+'servicios/organigrama')     
    }
    
}
