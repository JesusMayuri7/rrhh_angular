import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseCasService {
    private readonly API= `${environment.API}`;

    constructor(private http: HttpClient) {

    }

    getDependencias():Observable<any> {        
      return this.http.get(this.API+'presupuestal/dependencias');        
    }

    getHistorialCas(base_cas_id:number):Observable<any> {   
      console.log('getHistorialCas ',base_cas_id)     
      return this.http.get(this.API+'cas/base_cas_historial/'+base_cas_id);        
    }

    postCasDesignacion(data):Observable<any> {        
      return this.http.post(this.API+'cas/base_cas/nuevo_designacion',data);        
    }

    postCasConcurso(data):Observable<any> {        
      return this.http.post(this.API+'cas/base_cas/nuevo_concurso',data);        
    }

    putCasBaja(data):Observable<any> {        
      return this.http.put(this.API+'cas/base_cas/cas_baja',data);        
    }

    putCasAlta(data):Observable<any> {        
      return this.http.put(this.API+'cas/base_cas/cas_alta',data);        
    }
    
    getMetas(anio:string):Observable<any> {        
      return this.http.get(this.API+'presupuesto/get_metas/'+anio);        
    }

    postBaseCas(data):Observable<any> {        
      return this.http.post(this.API+'cas/base_cas_update',data);        
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
