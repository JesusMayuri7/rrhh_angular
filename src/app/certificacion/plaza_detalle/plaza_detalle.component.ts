import { Component, OnInit,ViewEncapsulation,Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'
import { CertificacionCasService } from '../certificacion_cas.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-plaza-detalle',
    templateUrl: './plaza_detalle.component.html',
    styleUrls: ['./plaza_detalle.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class PlazaDetalleComponent implements OnInit {
    estados: string[];
    estado_final: any[];
    formulario:any;
    @Input('archivo') row:any[];

    constructor(private formBuilder: FormBuilder,private plazaService: CertificacionCasService) {
    }
    
    ngOnInit(): void {
        this.estados = [
            "PENDIENTE",
            "GANADOR",
            "CONTRATADO",
            "NO_ADJUDICO",
            "NO_CUBIERTA"
            
        ];

        this.estado_final = [
          {estado:"PENDIENTE" },
          {estado:"GANADOR" },
          {estado:"CONTRATADO" },
          {estado:"NO_ADJUDICO" },
          {estado:"NO_CUBIERTA" }
          
      ];




      //      console.log('detalle',this.row);
       // this.formulario = this.createFormGroupWithBuilder(this.formBuilder);
    }



    actualizar(){
      console.log(this.row[0]);
      this.plazaService.postAdjudicarPlaza(this.row[0]).subscribe( (a) => {
         console.log(a);
      });
    }

    onValueChanged(evt: any): void {  
      //console.log(evt.value);
      this.row[0].estado_final = evt.value;  
    } 

    createFormGroupWithBuilder(formBuilder: FormBuilder) {
        return formBuilder.group({
          personalData: formBuilder.group({
            estado: 'PENDIENTE',
            dni: [this.row[0].dni],
            nombres: [this.row[0].nombres],
          }),
          certificacion_detalle_id: [this.row[0].certificacion_detalle_id],
          publicacion_id: [this.row[0].publicacion_id]
        });
      }
}
