import { Component, OnInit,ViewEncapsulation,Input, ViewChild } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';  
import * as moment from 'moment';
import { BaseCasService } from '../base_cas.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-base-cas-designacion',
    templateUrl: './base_cas_designacion.component.html',
    styleUrls: ['./base_cas_designacion.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BaseCasDesignacionComponent implements OnInit {
    dataSource:any[];
    @Input('archivo') row:any[];
    @ViewChild(DxDataGridComponent) grid: DxDataGridComponent;

    constructor(private httpClient: HttpClient,private casService:BaseCasService) {
        let that = this;  
        /*that.popup.instance.option("width", '90%');  
        window.addEventListener("resize", function(){  
            //if(that.popup.instance.option("width")!=="100%"){  
               that.popup.instance.option("width", '100%');  
           // }  
        })*/  
    }
    
    ngOnInit(): void {
            console.log('detalle',this.row);
            this.cargaData(this);
    }

    alta(e){
        let data_alta:any;
         data_alta = Object.assign({},this.grid.instance.getSelectedRowsData()[0]);        
         data_alta['org_unidad_id'] = this.row[0].org_unidad_id;
         data_alta['base_cas_id'] = this.row[0].id;
         data_alta['codigo_plaza'] = this.row[0].codigo_plaza;
         data_alta['cargo'] = this.row[0].cargo;
         data_alta['detalle'] = this.row[0].detalle;
         data_alta['fecha_fin_vigencia_cas'] = this.row[0].fecha_fin_vigencia_cas;
         data_alta['tipo_ingreso'] = 'DESIGNACION';
        console.log('conprobar',data_alta);
        this.casService.postCasDesignacion(data_alta).subscribe((a) => {
            console.log(a);
        })
       // console.log(this.grid.instance.getSelectedRowsData()[0]);
    }

    onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift(
                {
                location: 'before',
                template: 'plazaTemplate'
                }, {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'refresh',
                    onClick: this.cargaData.bind(this)
                }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'plus',
                        onClick: this.alta.bind(this)
                    }
                }
        );
    }

    cargaData(a) {    
        let header = new HttpHeaders({'content-type':'application/json'});  
        a.dataSource = new CustomStore({          
          key: "id_personal",
          load: ()=>this.httpClient.get("http://rrhh.pvn.gob.pe/api/cas/personal/nuevo_designacion").toPromise().
           then(result => {        
            console.log(result);            
            return {
                data: result['data'],                                    
              //  sumary:588            
               // groupCount: result.groupCount*/
            };
        })                   
      });
    }
}
