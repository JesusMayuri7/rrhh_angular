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
    @Input('archivo') row:any[];

    constructor(private casService:BaseCasService) {
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

        this.fe_salida = this.row[0].fe_salida?? moment(Date()).format('YYYY-MM-DD');
      //  console.log('despues',this.fe_salida);
      //  this.fe_ingreso = this.row[0].fe_ingreso; 
       // moment.locale('es');
                
       // this.myDate = moment(this.fe_ingreso).format('YYYY-MM-DD');                    
    }

    ngAfterViewInit(){

    }

    alta(){
        console.log(this.row[0]);
        this.casService.putCasAlta(this.row[0]).subscribe((a) => {
            console.log(a);
        })
    }

    onValueChanged(evt: any): void {  
        //console.log(evt.value);
        this.row[0].tipo_salida = evt.value;  
    } 

    changeFeIngreso(e){
        console.log('change',e.value);
        console.log(moment(e.value).format('YYYY-MM-DD'));
        //var m = moment(e.value).format('YYYY-MM-DD');
        
        this.row[0].fe_ingreso = moment(e.value).format('YYYY-MM-DD')=='Invalid date'? '':moment(e.value).format('YYYY-MM-DD');        
    }
}
