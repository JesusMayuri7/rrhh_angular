
//import {throwError as observableThrowError, Observable, forkJoin,from } from 'rxjs';

import {catchError,map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpHeaders,  HttpParams  } from '@angular/common/http';
import { Presupuesto} from '../interface';
import { environment } from '../../environments/environment';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

//import {Trabajador} from './../interface/trabajador';

const starshipQuery = gql`
query algo($mes: Int) {
  presupuestoQuery(mes: $mes) {
            id,
            fuente,
            especifica,
            detalle,
            idactividad,
            actividad,
            meta,
            pim,
            Total,
            Saldo,
            enero,
            febrero,
            marzo,
            abril,
            mayo,
            junio,
            julio,
            agosto,
            setiembre,
            octubre,
            noviembre,
            diciembre,
            analisis
        }        
      peaQuery {
        id2,
        nombres,
        nrocap,
        situacion2,
        basico,
        enero,
            febrero,
            marzo,
            abril,
            mayo,
            junio,
            julio,
            agosto,
            setiembre,
            octubre,
            noviembre,
            diciembre
                }
}
`;

@Injectable()
export class PresupuestoService {
    private readonly API= `${environment.API}`;
    loading = true;
    error: any;
    constructor(private http: HttpClient,private apollo: Apollo) {

    }

    getPresupuesto(mes:number):Observable<any[]>  {
       // return this.http.get<any[]>(this.API+'presupuesto'); 
       /*this.apollo.query({
        query: starshipQuery
      })
      .valueChanges
      .pipe(
        map(result => result.data.allCourses)
      );
*/

        
       return  this.apollo.watchQuery<Presupuesto>({
          query: starshipQuery,
          variables: {
            mes: mes,
          },
        })
        .valueChanges.pipe(
          //map((response: any) => <any[]>response)
          map((response: any) => <any[]> this.join(response.data.presupuestoQuery,response.data.peaQuery))
        );
    }  
    
    join(cabecera:any, detalle:any){
      return cabecera.map((cab: { id: any; }) => {  // itera cada item array cab       
        let paso = detalle.filter((det: { id2: any; }) => (det.id2 == cab.id));  // filtra cada item , y devuelve solo los que cumplen                           
        let completo:any = Object.assign([], cab); // crea una copia 
        completo['pea']=paso;  // crea un nuevo argumento 'det' y asigna un nuevo valor 'paso'
        return completo;       
      })
  } 

    getDescarga(mes: string){
      return this.http.get(this.API+'presupuesto_export/'+mes, { headers: new HttpHeaders({
        'Authorization': '{data}',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }), responseType: 'blob'}).pipe(
      map(
        
          // Log the result or error
          (data:Blob) => {
          //var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
          saveAs(data);
          },
          (error: any) => console.log(error)
       ));
    }
    
    private extractData(res: Response) {
      //let body = <Presupuesto[]>res.json();    // return array from json file
      //return body || [];     // also return empty array if there is no data
    }


    join2(cabecera:any, detalle:any){
        return cabecera.map((cab: { Id: any; Id2: any; enero: any; febrero: any; }) => {
          return detalle
          .filter((det: { Id2: any; }) => det.Id2 == cab.Id)
          .map((det: any) => {
            return {
              Id: cab.Id2,
              dni: cab.enero,              
              nombre: cab.febrero,
              det :det
            }
          })
        }).reduce((a:any,b:any) =>{
          return a.concat(b);
        }, []);    
      }

       


    
    
}
