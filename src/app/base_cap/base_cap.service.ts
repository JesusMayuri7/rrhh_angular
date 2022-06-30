import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseCapService {
    private readonly API= `${environment.API}`;

    constructor(private http: HttpClient) {

    }

    postCapDesignacion(data):Observable<any> {        
      return this.http.post(this.API+'cap/base_cap/pap_alta',data);        
    }

    getMetas(anio:string):Observable<any> {        
      return this.http.get(this.API+'presupuesto/get_metas/'+anio);        
    }

    getAirhspCap():Observable<any> {        
      return this.http.get(this.API+'activos/airhsp');        
    }

    postCasConcurso(data):Observable<any> {        
      return this.http.post(this.API+'cas/base_cap/nuevo_concurso',data);        
    }

    putCapBaja(data):Observable<any> {        
      return this.http.put(this.API+'cap/base_cap/cap_baja',data);        
    }

    postCapAlta(data):Observable<any> {        
      return this.http.post(this.API+'cap/base_cap/pap_alta',data);        
    }
    
    postBaseCas(data):Observable<any> {        
      return this.http.post(this.API+'cap/base_cap_update',data);        
    }
    
    getSigaNetCap() {        
      return this.http.get(this.API+'cap/siga_net_cap')     
    }

    getDependencias() {        
      return this.http.get(this.API+'presupuestal/dependencias')     
    }




    
}
