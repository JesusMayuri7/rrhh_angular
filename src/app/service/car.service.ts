import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders,  HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car,Trabajador} from '../interface';
//import {Trabajador} from './../interface/trabajador';
import { environment } from '../../environments/environment';

@Injectable()
export class CarService {
    private readonly API= `${environment.API}`;
    
    constructor(private http: HttpClient) {

    }
  
    postTodo(post) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');


        return <Observable<any>>this.http.post(this.API+'todo',post , {headers} );
      
    }

   
    private onError(error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }


     deleteTodo(id) {        
         return <Observable<any>> this.http
             .delete(this.API+'todo/'+id);
             
     }

    getTodo():Observable<any[]> {        
         return <Observable<any>> this.http
             .get(this.API+'todo');   
            
     }
 
     private handleError(error: HttpResponse<any>) {
         return Observable.throw(error.statusText);
     }

}
