import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ReportePlanillaService } from './reporte_planilla.service';
import { ExcelService } from '../service/excel.service';
import { DialogService} from 'primeng/dynamicdialog';
import { MessageService, } from 'primeng/api';
import CustomStore from 'devextreme/data/custom_store';
//import DataSource from "devextreme/ui/pivot_grid/data_source";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DxIntegrationModule } from 'devextreme-angular';

@Component({
  selector: 'zd-reporte-planilla',  
  templateUrl: './reporte_planilla.component.html',
  styleUrls: ['./reporte_planilla.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[ReportePlanillaService,ExcelService,MessageService,DialogService],

})
export class ReportePlanillaComponent implements OnInit,OnDestroy {
  vigencias:any[];
  meses:any[];
  mes:number=0;
  tipo_planilla:number=0;
  dataSource: any = {};
  store: CustomStore;
  pivotGridDataSource: any;
  showDataFields: boolean = true;
  showRowFields: boolean = true;
  showColumnFields: boolean = true;
  showFilterFields: boolean = true;

  constructor(private planillaformativaService:ReportePlanillaService,private httpClient:HttpClient) { 

    this.cargaData(this);
  }
  
 onClickme(e){   
  console.log(this.pivotGridDataSource);
  // primero podemos buscar en todo el array , puede ser en el store
  //   ahi buscamos por nombres con array for afterEach, obtenemos el 
  //  y despues filterValues por dni

  //this.pivotGridDataSource.field("nombres", { filterValues: ["MAMANI"] });  
 // this.pivotGridDataSource.load()  
   //this.pivotGridDataSource.reload();        
 }

 ngOnDestroy() {
  this.pivotGridDataSource.dispose();
 
}

  ngOnInit() {      
    this.vigencias= [    
      { label: 'SOSTENIBLE', value: 'SOSTENIBLE' },
      { label: '31/12/2019', value: '31/12/2019' }   
    ];
      
    this.meses = [    
      { label: 'Mes', value: 0},
      { label: 'Enero', value: 1},
      { label: 'Febrero',value:2},
      { label: 'Marzo',value:3},
      { label: 'Abril',value:4},
      { label: 'Mayo',value:5},
      { label: 'Junio',value:6},
      { label: 'Julio',value:7},
      { label: 'Agosto',value:8},
      { label: 'Setiembre',value:9},
      { label: 'Octubre',value:10},
      { label: 'Noviembre',value:11},
      { label: 'Diciembre',value:12},
  ];     
  }

  

  onMesClick(e){        
    this.mes = e.itemData.value;
  }

  onPlanillaClick(e){        
    this.tipo_planilla = e.itemData.value;
  }






  cargaData(a) {   
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
      // Cantidad

      {
        caption:"Tipo Salida",
        dataField: "tipo_salida",
        dataType: "string",
        area: "filter",                  
      }, 

      {
        caption:"Estado PAP",
        dataField: "estado_pap",
        dataType: "string",
        area: "filter",                  
      }, 
      {
        caption:"Tipo",
        dataField: "tipo_escala",
        dataType: "string",
        area: "filter",                  
      }, 
      {
        width:280,
        caption: "Area",
        dataField: "desc_area",
        area: "filter",    
        allowFiltering: true,
                  headerFilter: {
                      allowSearch: true
                  },      
      }, 
      {
        caption:"Presupuesto",
        dataField: "presupuesto",
        dataType: "string",
        area: "filter",                  
      },  
      {
        caption:"Estado",
        dataField: "estado",
        dataType: "string",
        area: "filter",                  
      }, 
      {
        caption:"Modalidad",
        dataField: "modalidad",
        dataType: "string",
        area: "column",                  
      }, 
  
      {
        caption:"Estado OPP",
        dataField: "estado_opp",
        dataType: "string",
        area: "column",                  
      },  
      {
        caption:"Tipo Contrato",
        dataField: "tipo_contrato",
        dataType: "string",
        area: "row",                  
      }, 
      {
        caption: "Plaza",
        width:10,
        dataField: "plaza",
        dataType: "string",
        area: "filter",
      }, 
    {
      caption: "Fuente",
      width:10,
      dataField: "fuente",
      dataType: "string",
      area: "filter",
    }, 
    {
      caption: "Meta",
      width:280,      
      dataField: "finalidad",
      dataType: "string",
      area: "filter",
    }, 
 /*   {
      caption: "Dni",
      width:15,
      dataField: "dni",
      area: "row",
      expanded: true,
    },*/
 
    {
      caption: "Nombres",
      width:280,      
      dataField: "nombres",
      dataType: "string",
      area: "filter",
    }, 
    {
      caption: "Cantidad",
      width:15,
      dataField: "cantidad",      
      area: "data",
      dataType: "number",      
      summaryType: "count",
    }, 
    
  ],
    remoteOperations: false,
    store: new CustomStore({
      load: function(loadOptions) {        
        return a.httpClient.get("http://rrhh.pvn.gob.pe/api/reporte/rpt_cantidad_modalidad",
        {headers :header})
        .toPromise()
        .then(result => {              
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
