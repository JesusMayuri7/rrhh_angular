import { Component, OnInit,ViewEncapsulation,Input, ViewChild } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent,DxPivotGridComponent } from 'devextreme-angular';  
import * as moment from 'moment';
import { ConfiguracionService } from '../configuracion.service';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { Workbook } from 'exceljs';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';

@Component({
    //moduleId: module.id,
    selector: 'zd-laudos',
    templateUrl: './laudos.component.html',
    styleUrls: ['./laudos.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class LaudosComponent implements OnInit {
    dataSource:any[]=[];
    pivotGridDataSource:  any;
    @Input('archivo') row:any[] =[];
    @ViewChild('gridVar', { static: false })
  grid!: DxDataGridComponent;
    //@ViewChild(DxPivotGridComponent, { static: false }) pivotGrid: DxPivotGridComponent;
    showRowTotals:boolean = true;

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

    onExporting(e: { component: any; cancel: boolean; }) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Sales');
    
      exportPivotGrid({
        component: e.component,
        worksheet,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
        });
      });
      e.cancel = true;
    }

    alta(e: any){
        let data_alta:any;
         data_alta = Object.assign({},this.grid.instance.getSelectedRowsData()[0]);        
         data_alta['org_unidad_id'] = this.row[0].org_unidad_id;
         data_alta['base_cas_id'] = this.row[0].id;
         data_alta['codigo_plaza'] = this.row[0].codigo_plaza;
         data_alta['fecha_fin_vigencia_cas'] = this.row[0].fecha_fin_vigencia_cas;
         data_alta['tipo_ingreso'] = 'CONCURSO';
        console.log('conprobar',data_alta);
        this.casService.postCasDesignacion(data_alta).subscribe((a) => {
            console.log(a);
        })
       // console.log(this.grid.instance.getSelectedRowsData()[0]);
    }

    refresh(){
        this.cargaData(this);
    }


    cargaData(a:any) {   
        let header = new HttpHeaders({'content-type':'application/json'});  
        this.pivotGridDataSource = new PivotGridDataSource({
          onFieldsPrepared: fields => {
            fields.forEach(field => {           
              if (field.area === "row" && field.dataField === "fuente") {
                 field.sortingMethod = (a, b) => {           
                  if (a.value==='RO') return -1              
                  return 0;
                };
              }
              if (field.area === "column" && field.dataField === "mes_name") {
                field.sortingMethod = (a, b) => {           
                 console.log(a,b);
                 return 0;
               };
             }
            })
          },
        fields: [
      
          {
            caption:"Laudo",
            dataField: "desc_laudo",
            dataType: "string",
            area: "column",                  
          },
          {
            caption: "Escala",
            width:10,
            dataField: "desc_escala",
            dataType: "string",
            area: "row",
          }, 
          {
            caption:"Categoria",
            dataField: "categoria",
            dataType: "string",
            area: "row",   
            width:200,          
          },       

        {
          caption: "Cargo",
          width:250,
          dataField: "cargo",
          dataType: "string",
          area: "row",
        }, 
        {
          width:20,
          caption: "Monto",
          dataField: "monto",
          dataType: "number",      
          summaryType: "sum",
          format: {
            type: "fixedPoint", // one of the predefined formats
            precision: 2, // the precision of values        
          },
          area: "data"
        },
        {
          width:20,
          caption: "Incremento (%)",
          dataField: "porcentaje_incremento",
          dataType: "number",      
          summaryType: "sum",
          format: {
            type: "fixedPoint", // one of the predefined formats
            precision: 0, // the precision of values        
          },
          area: "data"
        }
      ],
        remoteOperations: false,
        store: new CustomStore({
          load: function(loadOptions) {        
            return a.httpClient.get("http://rrhh.pvn.gob.pe/api/configuracion/laudos",
            {headers :header})
            .toPromise()
            .then((result:any) => {              
              return {          
                  data: result['data'],        
                // groupCount: result.groupCount*/
              };
              })
            }
          }),
    
    
    
    
        });
}
}

