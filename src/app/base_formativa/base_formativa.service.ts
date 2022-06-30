import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseFormativaService {
    private readonly API= `${environment.API}`;

    constructor(private http: HttpClient) {

    }
    
    postBaseCas(data):Observable<any> {        
      return this.http.post(this.API+'cas/base_cas_update',data);        
    }

    getBaseCas() {        
      return this.http.get(this.API+'formativa/base_formativa')     
    }

    getAirHspFormativa() {        
      return this.http.get(this.API+'formativa/airhsp_formativa')     
    }

    getSigaFormtiva() {        
      return this.http.get(this.API+'formativa/siga_formativa')     
    }

    getBaseFormativaProyeccionEjec() {        
      return this.http.get(this.API+'formativa/base_formativa')     
    }

    getMetas(anio:string):Observable<any> {        
      return this.http.get(this.API+'presupuesto/get_metas/'+anio);        
    }

    getDependencias():Observable<any> {        
      return this.http.get(this.API+'presupuestal/dependencias');        
    }
    
}
