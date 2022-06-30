import { Component, OnInit,ViewEncapsulation,Input, Output, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'
import { CertificacionCasService } from '../certificacion_cas.service';
import * as moment from 'moment';

@Component({
    //moduleId: module.id,
    selector: 'zd-plaza-convocatoria',
    templateUrl: './plaza_convocatoria.component.html',
    styleUrls: ['./plaza_convocatoria.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class PlazaConvocatoriaComponent implements OnInit {
    estados: string[];
    formulario:any;
    @Input('archivo') row:any[];
    convocatorias:any[];
    selectedItems: any[] = [];

    constructor(private formBuilder: FormBuilder,private plazaService: CertificacionCasService) {
    }
    
    ngOnInit(): void {
        this.estados = [
            "PENDIENTE",
            "GANADOR",
            "CONTRATADO",
            "NO_ADJUDICADO",            
        ];     
       this.formulario = this.createFormGroupWithBuilder(this.formBuilder);  
       console.log('detalle',this.row);
    }

    actualizar(a){
     console.log('actualizar',this.row[0]);
      this.formulario.patchValue({'certificacion_id':this.row[0].certificacion_id});   
      this.formulario.patchValue({'solicitud':this.row[0].solicitud});   
      this.formulario.patchValue({'fecha_solicitud':this.row[0].fecha_solicitud});   
      console.log(this.formulario.value);  
     this.plazaService.postUpdateSolicitud(this.formulario.value).subscribe( (a) => {
         console.log(a);
      });
    }

    changeFechaDoc(e){
      this.row[0].fecha_solicitud = moment(e.value).format('YYYY-MM-DD');      
      this.formulario.patchValue({'fecha_solicitud':this.row[0].fecha_solicitud});   
    }


    createFormGroupWithBuilder(formBuilder: FormBuilder) {
        return formBuilder.group({
          certificacion_id: [this.row[0].certificacion_id],
          solicitud: [],
          fecha_solicitud:[]
        });
      }
}
