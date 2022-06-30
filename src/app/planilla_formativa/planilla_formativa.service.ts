import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PlanillaFormativaService {
    private readonly API= `${environment.API}`;

    constructor(private http: HttpClient) {

    }
    
    postBaseCas(data):Observable<any> {        
      return this.http.post(this.API+'cas/base_cas_update',data);        
    }

    postProyeccionCas(data):Observable<any> {        
      return this.http.post(this.API+'cas/planilla/proyeccion_cas',data);        
    }

        getAirHsp() {        
      return this.http.get(this.API+'cas/airhsp')     
    }

    getBaseCas() {        
      return this.http.get(this.API+'cas/base_cas')     
    }

    getSigaNet():Observable<any> {        
      return this.http.get(this.API+'cas/siga_net_ingresos');     
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

    getUnidadesMetas(){
      return this.http.get(this.API+'cas/unidades_metas');     
    }

    getDireccion(){
      return this.http.get(this.API+'activos/unidad');     
    }

    getConvocatoria(){
      return this.http.get(this.API+'cas/convocatoria/list_convocatoria');     
    }

    postDni(trabajaodr):Observable<any> {        
      return this.http.post(this.API+'activos/trabajador/nuevo',trabajaodr);        
    }

    postConvocatoria(data): Observable<any>{
      return this.http.post(this.API+'cas/convocatoria',data);
    }

    postConvocatorias(data): Observable<any>{
      return this.http.post(this.API+'cas/convocatorias',data);
    }

    postPlaza(data): Observable<any>{
      return this.http.post(this.API+'cas/nueva_plaza',data);
    }
    
}
