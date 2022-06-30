
import {throwError as observableThrowError, Observable, forkJoin,from } from 'rxjs';

import {catchError,map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpHeaders,  HttpParams  } from '@angular/common/http';
import { Presupuesto} from '../interface';
import { environment } from '../../environments/environment';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { saveAs } from 'file-saver';

//import {Trabajador} from './../interface/trabajador';

const starshipQuery = gql`
query algo {
  peaQuery {
            id            
      }     
  }   
`;

@Injectable()
export class PeaService {
    private readonly API= `${environment.API}`;
    loading = true;
    error: any;
    constructor(private http: HttpClient,private apollo: Apollo) {

    }

    getPea():Observable<Presupuesto[]>  {      
       return  this.apollo.watchQuery<Presupuesto>({
          query: starshipQuery,          
        })
        .valueChanges.pipe(
          map((response: any) => <any[]>response.data.presupuestoQuery)
        );
    }     

    getDescarga(mes){
      return this.http.get(this.API+'presupuesto_export/'+mes, { headers: new HttpHeaders({
        'Authorization': '{data}',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }), responseType: 'blob'}).pipe(
      map(
        
          // Log the result or error
          data => {
          var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
          saveAs(data);
          },
          error => console.log(error)
       ));
    }
    

    join(cabecera, detalle){
        return cabecera.map(cab => {
          return detalle
          .filter(det => det.Id2 == cab.Id)
          .map(det => {
            return {
              Id: cab.Id2,
              dni: cab.enero,              
              nombre: cab.febrero,
              det :det
            }
          })
        }).reduce((a,b) =>{
          return a.concat(b);
        }, []);    
      }  
    
}
