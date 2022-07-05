import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CertificacionCasService {
    private readonly API= `${environment.API}`;

    constructor(private http: HttpClient) {

    }
    
    getAreas():Observable<any> {        
      return this.http.get(this.API+'configuracion/areas');        
    }

    postAdjudicarPlaza(data):Observable<any> {
      return this.http.post(this.API+'tramite/certificacion_plaza_update',data);        
    }
    
    postCertificacionValidar(data):Observable<any> {        
      return this.http.post(this.API+'cas/certificacion_validar',data);        
    }

    putCertificacionCargoUpdate(data):Observable<any> {        
      return this.http.put(this.API+'cas/certificacion_cargo_update',data);        
    }

    postCreateCertificacionDetallePublicacion(data):Observable<any>{
      return this.http.post(this.API+'cas/create_certificacion_detalle_publicacion',data);        
    }

    postUpdateSolicitud(data):Observable<any>{
      return this.http.put(this.API+'cas/certificacion_update_solicitud',data);        
    }

    getMetas() {        
      return this.http.get(this.API+'presupuesto/get_metas/2022')     
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
      return this.http.get(this.API+'cas/publicacion');     
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
