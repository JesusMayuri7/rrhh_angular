import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {throwError as observableThrowError, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class DesignacionService {
    private readonly API= `${environment.API}`;

    constructor(private http: HttpClient) {

    }

    getNombres(dni):Observable<any> {        
      return this.http.post(this.API+'activos/trabajador/dni',dni);        
    }
    
    getDesignaciones() {        
      return this.http.get(this.API+'control/designaciones_index');     
    }

    getUnidad(){
      return this.http.get(this.API+'activos/unidad');     
    }

    postDni(trabajaodr):Observable<any> {        
      return this.http.post(this.API+'activos/trabajador/nuevo',trabajaodr);        
    }

    postMatriz(data): Observable<any>{
      return this.http.post(this.API+'control/designaciones_create',data);
    }
    
}
