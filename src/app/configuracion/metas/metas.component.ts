import { Component, OnInit,ViewEncapsulation,Input, ViewChild } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent, DxTooltipComponent } from 'devextreme-angular';  
import * as moment from 'moment';
import { ConfiguracionService } from '../configuracion.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-metas',
    templateUrl: './metas.component.html',
    styleUrls: ['./metas.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class MetasComponent implements OnInit {
    dataSource:any[];
    @Input('archivo') row:any[];
    @ViewChild(DxTooltipComponent) tooltip: DxTooltipComponent;
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

    constructor(private httpClient: HttpClient,private casService:ConfiguracionService) {
        let that = this;  
        /*that.popup.instance.option("width", '90%');  
        window.addEventListener("resize", function(){  
            //if(that.popup.instance.option("width")!=="100%"){  
               that.popup.instance.option("width", '100%');  
           // }  
        })*/  
    }
    
    ngOnInit(): void {            
            this.cargaData(this);
    }

    alta(e){
     /*   let data_alta:any;
         data_alta = Object.assign({},this.dataGrid.instance.getSelectedRowsData()[0]);        
         data_alta['org_unidad_id'] = this.row[0].org_unidad_id;
         data_alta['base_cas_id'] = this.row[0].id;
         data_alta['codigo_plaza'] = this.row[0].codigo_plaza;
         data_alta['fecha_fin_vigencia_cas'] = this.row[0].fecha_fin_vigencia_cas;
         data_alta['tipo_ingreso'] = 'CONCURSO';
        console.log('conprobar',data_alta);
        this.casService.postCasDesignacion(data_alta).subscribe((a) => {
            console.log(a);
        })*/
       // console.log(this.grid.instance.getSelectedRowsData()[0]);
    }

    refresh(){
        this.cargaData(this);
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
                    onClick: this.cargaData(this)
                }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'edit',
                        onClick: this.alta(e)
                    }
                    }
        );
    }

    cargaData(a) {    
        let header = new HttpHeaders({'content-type':'application/json'});  
        a.dataSource = new CustomStore({          
          key: "idmeta_anual",
          load: ()=>this.httpClient.get("http://rrhh.pvn.gob.pe/api/presupuesto/get_metas/2023").toPromise().
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

