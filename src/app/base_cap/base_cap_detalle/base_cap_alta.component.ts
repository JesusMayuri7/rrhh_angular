import { Component, OnInit,ViewEncapsulation,Input, Output } from '@angular/core';
import * as moment from 'moment';
import { BaseCapService } from '../base_cap.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-base-cap-alta',
    templateUrl: './base_cap_alta.component.html',
    styleUrls: ['./base_cap_alta.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BaseCapAltaComponent implements OnInit {
    tipo_ingreso:string[];
    tipo_salida:string[];
    fe_salida:Date;
    fe_ingreso:Date;
    myDate:any;
    @Input('archivo') row:any[];

    constructor(private capService:BaseCapService) {
    }
    
    ngOnInit(): void {
        this.tipo_ingreso = [
            "NINGUNO",
            "REINGRESO",
            "CONCURSO",  
            "DESIGNACION", 
            "PACTO_CONTRARIO"        
        ];

            console.log('detalle',this.row);

        this.fe_ingreso = this.row[0].fe_ingreso;
      //  this.fe_ingreso = this.row[0].fe_ingreso;
       // moment.locale('es');
                
       // this.myDate = moment(this.fe_ingreso).format('YYYY-MM-DD');                    
    }

    ngAfterViewInit(){

    }

    alta(){
        console.log("detalle",this.row[0]);
        this.capService.postCapAlta(this.row[0]).subscribe((a) => {
            console.log(a);
        })
    }

    onValueChanged(evt: any): void {  
        //console.log(evt.value);
        this.row[0].tipo_ingreso = evt.value;  
    } 

    changeFeIngreso(e){
        console.log(moment(e.value).format('YYYY-MM-DD'));
        this.row[0].fe_ingreso =moment(e.value).format('YYYY-MM-DD');        
    }
}
