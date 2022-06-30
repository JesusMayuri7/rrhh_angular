import { Component, OnInit,ViewEncapsulation,Input, Output } from '@angular/core';
import * as moment from 'moment';
import { ConfiguracionService } from '../../configuracion.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-add-certificado',
    templateUrl: './add_certificado.component.html',
    styleUrls: ['./add_certificado.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AddCertificadoComponent implements OnInit {
    tipo_salida:string[];
    fe_salida:Date;
    fe_ingreso:Date;
    myDate:any;
    @Input('archivo') row:any[];

    constructor(private configuracionService:ConfiguracionService) {
    }
    
    ngOnInit(): void {
        this.tipo_salida = [
            "NINGUNO",
            "RENUNCIA",
            "TERMINO",
            "FALLECIMIENTO"                        
        ];
           
/*
       this.formulario = this._formBuilder.group({
        expediente: 'I-',      
        items: this._formBuilder.array([  ])
      });
  
      this.item = this._formBuilder.group({      
          cargo:'',
          codigo_plaza: '',
          cantidad:'1',
          honorario_mensual:0,
          essalud_mensual:174.15,
          total_mensual:0,
          meses:1,
          honorario_total:0,
          essalud_total:0,
          aguinaldo_total:600,      
          total_general:0,
          periodo:'',
          desc_unidad2:'',
          org_unidad_id2:0,
          meta: {},        
          meta_2019:'',        
      });*/
    }

    ngAfterViewInit(){

    }

    baja(){
        console.log(this.row[0]);
        this.configuracionService.putCasBaja(this.row[0]).subscribe((a) => {
            console.log(a);
        })
    }

    onValueChanged(evt: any): void {  
        //console.log(evt.value);
        this.row[0].tipo_salida = evt.value;  
    } 

    changeFeSalida(e){
        console.log('change',e.value);
        console.log(moment(e.value).format('YYYY-MM-DD'));
        //var m = moment(e.value).format('YYYY-MM-DD');
        
      //  this.row[0].fe_salida = moment(e.value).format('YYYY-MM-DD')=='Invalid date'? '':moment(e.value).format('YYYY-MM-DD');        
    }
}
