import { Component, OnInit,ViewEncapsulation,Input, Output } from '@angular/core';
import * as moment from 'moment';
import { BaseCapService } from '../base_cap.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-base-cap-baja',
    templateUrl: './base_cap_baja.component.html',
    styleUrls: ['./base_cap_baja.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BaseCapBajaComponent implements OnInit {
    tipo_salida:string[];
    fe_salida:Date;
    fe_ingreso:Date;
    myDate:any;
    @Input('archivo') row:any[];

    constructor(private capService:BaseCapService) {
    }
    
    ngOnInit(): void {
        this.tipo_salida = [
            "NINGUNO",
            "RENUNCIA",
            "TERMINO",  
            "LICENCIA_SG",
            "LICENCIA_CG",
            "JUBILACION",
            "FALLECIMIENTO"                      
        ];
            console.log('detalle',this.row);

        this.fe_salida = this.row[0].fe_salida;
      //  this.fe_ingreso = this.row[0].fe_ingreso;
       // moment.locale('es');
                
       // this.myDate = moment(this.fe_ingreso).format('YYYY-MM-DD');                    
    }

    ngAfterViewInit(){

    }

    baja(){
        console.log(this.row[0]);
        this.capService.putCapBaja(this.row[0]).subscribe((a) => {
            console.log(a);
        })
    }

    onValueChanged(evt: any): void {  
        //console.log(evt.value);
        this.row[0].tipo_salida = evt.value;  
    } 

    changeFeSalida(e){
        console.log(moment(e.value).format('YYYY-MM-DD'));
        this.row[0].fe_salida =moment(e.value).format('YYYY-MM-DD');        
    }
}
