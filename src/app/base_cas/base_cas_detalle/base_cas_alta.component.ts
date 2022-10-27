import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit,ViewEncapsulation,Input, Output } from '@angular/core';
import * as moment from 'moment';
import { BaseCasService } from '../base_cas.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-base-cas-alta',
    templateUrl: './base_cas_alta.component.html',
    styleUrls: ['./base_cas_alta.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BaseCasAltaComponent implements OnInit {
    tipo_ingreso:string[];
    fe_salida:Date;
    fe_ingreso:Date;
    myDate:any;
    meta_selected:any;
    @Input('metas') metas2:any[];
    @Input('archivo') row:any[];
    isVisible = false;
    type = 'info';
    message = '';

    constructor(private casService:BaseCasService) {
        console.log('alta x dni ',this.metas2);
    }
    
    ngOnInit(): void {
        this.tipo_ingreso = [
            "NINGUNO",
            "REINGRESO",
            "DESIGNACION", 
            "CONCURSO",           
            "DESPLAZAMIENTO"                       
        ];
        //console.log('antes',this.fe_salida);

        //this.fe_salida = this.row[0].fe_salida ?? moment(Date()).format('YYYY-MM-DD');
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

    alta(){
        console.log(this.row[0]);
        if(this.row[0].estado_actual == 'VACANTE'){

            this.casService.putCasAlta(this.row[0]).subscribe((a) => {
                console.log(a);
            })
        }        
            else{
                this.toast('error','Error, el registro debe estar VACANTE')
            }        
    }

    onValueChanged(evt: any): void {  
        //console.log(evt.value);
        this.row[0].tipo_salida = evt.value;  
    } 

    onTipoIngresoChanged(evt: any): void {  
        //console.log(evt.value);
        this.row[0].tipo_ingreso = evt.value;  
    } 

    changeFeIngreso(e){
        console.log('change',e.value);
        console.log(moment(e.value).format('YYYY-MM-DD'));
        //var m = moment(e.value).format('YYYY-MM-DD');
        
        this.row[0].fe_ingreso = moment(e.value).format('YYYY-MM-DD')=='Invalid date'? '':moment(e.value).format('YYYY-MM-DD');        
    }
}
