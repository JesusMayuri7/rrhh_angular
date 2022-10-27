import { Component, OnInit,ViewEncapsulation,Input, Output } from '@angular/core';
import * as moment from 'moment';
import { BaseCasService } from '../base_cas.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-base-cas-baja',
    templateUrl: './base_cas_baja.component.html',
    styleUrls: ['./base_cas_baja.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BaseCasBajaComponent implements OnInit {
    tipo_salida:string[];
    fe_salida:Date;
    fe_ingreso:Date;
    myDate:any;
    @Input('archivo') row:any[];
    isVisible = false;
    type = 'info';
    message = '';

    constructor(private casService:BaseCasService) {
    }
    
    ngOnInit(): void {
        this.tipo_salida = [
            "NINGUNO",
            "RENUNCIA",
            "TERMINO",
            "LICENCIA_SG",
            "LICENCIA_CG",
            "FALLECIMIENTO" ,
            "DESPLAZAMIENTO",
            "DESTITUCION",
            "LICENCIA_DE"                       
        ];
        //console.log('antes',this.fe_salida);

        this.fe_salida = this.row[0].fe_salida?? moment(Date()).format('YYYY-MM-DD');
      //  console.log('despues',this.fe_salida);
      //  this.fe_ingreso = this.row[0].fe_ingreso; 
       // moment.locale('es');
                
       // this.myDate = moment(this.fe_ingreso).format('YYYY-MM-DD');                    
    }

    toast(_type:string,_message:string) {
        this.type = _type;
        this.message = _message;
        this.isVisible = true;
      }

    ngAfterViewInit(){

    }

    baja(){
        if(this.row[0].estado_actual=='OCUPADO')
        {
        console.log(this.row[0]);
        this.casService.putCasBaja(this.row[0]).subscribe((a) => {
            console.log(a);
        })
        }
        else{
            this.toast('error','El registro debe estar OCUPADO');
        }
    }

    onValueChanged(evt: any): void {  
        //console.log(evt.value);
        this.row[0].tipo_salida = evt.value;  
    } 

    changeFeSalida(e){
        console.log('change',e.value);
        console.log(moment(e.value).format('YYYY-MM-DD'));
        //var m = moment(e.value).format('YYYY-MM-DD');
        
        this.row[0].fe_salida = moment(e.value).format('YYYY-MM-DD')=='Invalid date'? '':moment(e.value).format('YYYY-MM-DD');        
    }
}
