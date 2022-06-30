import { Component, OnInit,ViewEncapsulation,Input, ViewChild } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';  
import * as moment from 'moment';
import { BaseCapService } from '../base_cap.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-base-cap-designacion',
    templateUrl: './base_cap_designacion.component.html',
    styleUrls: ['./base_cap_designacion.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BaseCapDesignacionComponent implements OnInit {
    dataSource:any[];
    @Input('archivo') row:any[];
    @ViewChild(DxDataGridComponent) grid: DxDataGridComponent;

    constructor(private httpClient: HttpClient,private capService:BaseCapService) {
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
         //console.log(this.row[0]);
        let data_alta:any;
         data_alta = Object.assign({},this.grid.instance.getSelectedRowsData()[0]);        
         data_alta['org_unidad_id'] = this.row[0].org_unidad_id;
         data_alta['fuente_id'] = this.row[0].fuente_id;
         data_alta['pap_id'] = this.row[0].idpap;         
         data_alta['monto'] = this.row[0].monto_escala ?? 0;
         //data_alta['monto_siga'] = data_alta['mt_contmn'] ?? 0;
         data_alta['meta_id'] = this.row[0].meta_id;
         data_alta['codigo_plaza'] = this.row[0].codigo_plaza;
         data_alta['plaza'] = this.row[0].plaza;
         //data_alta['fecha_fin_vigencia_cas'] = this.row[0].fecha_fin_vigencia_cas;
         data_alta['tipo_ingreso'] = 'DESIGNACION';
        console.log('conprobar',data_alta);
        this.capService.postCapDesignacion(data_alta).subscribe((a) => {
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
                    //onClick: this.refreshDataGrid.bind(this)
                }
                }
        );
    }

    cargaData(a) {    
        let header = new HttpHeaders({'content-type':'application/json'});  
        a.dataSource = new CustomStore({          
          key: "id_personal",
          load: ()=>this.httpClient.get("http://rrhh.pvn.gob.pe/api/cap/siga_net_cap").toPromise().
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
