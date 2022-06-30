import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import {  HttpClient, HttpHeaders} from '@angular/common/http';
import { ReportePlanillaService } from '../reporte_planilla.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import CustomStore from 'devextreme/data/custom_store';
//import DataSource from "devextreme/ui/pivot_grid/data_source";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DxIntegrationModule } from 'devextreme-angular';

@Component({
  selector: 'zd-reporte-plazas-cas',  
  templateUrl: './reporte_plazas_cas.component.html',
  styleUrls: ['./reporte_plazas_cas.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[ReportePlanillaService,MessageService,DialogService],

})
export class ReportePlazasCasComponent implements OnInit,OnDestroy {
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
  
  onCellPrepared(e) {        
    if ((e.area == "column" || e.area == "row") && e.cell.type=='D' && e.cell.text=='Sueldo')  {  
      e.cellElement.style = 'font-size: 14px';  
      e.cellElement.style.backgroundColor = 'rgb(186,244,247)';       
      e.cellElement.style.fontWeight = "bold";
    }
    if ((e.area == "column" || e.area == "row") && e.cell.type=='D' && e.cell.text=='Sctr-Salud')  {  
      e.cellElement.style = 'font-size: 14px';
      e.cellElement.style.backgroundColor = 'rgb(247,236,186)';      
      e.cellElement.style.fontWeight = "bold";
    }
    if ((e.area == "column" || e.area == "row") && e.cell.type=='D' && e.cell.text=='Essalud')  {  
      e.cellElement.style = 'font-size: 14px';
      e.cellElement.style.backgroundColor = 'rgb(216,247,186)';      
      e.cellElement.style.fontWeight = "bold";
    } 

    if ((e.area === "data") && (e.cell.value <0)) {           
      e.cellElement.style.color = "red";      
      e.cellElement.style.backgroundColor = "white";
      e.cellElement.style.fontWeight = "bold";            
    }
    if ((e.area === "data") && (e.cell.value >0)) {
      e.cellElement.style.color = "blue"
    }
  }

  calcularTotal(rowData){  
    var campos =this.pivotGridDataSource.getAreaFields("data", true);        
    let total:number =0;
    if (campos.some(user => user.dataField === "enero")){
      total +=parseFloat(rowData.value.enero);       
  }
  if (campos.some(user => user.dataField === "febrero")){
    total +=parseFloat(rowData.value.febrero);  
  }
  if (campos.some(user => user.dataField === "marzo")){
    total +=parseFloat(rowData.value.marzo);  
  }
  if (campos.some(user => user.dataField === "abril")){
    total +=parseFloat(rowData.value.abril);  
  }
  if (campos.some(user => user.dataField === "mayo")){
    total +=parseFloat(rowData.value.mayo);  
  }
  if (campos.some(user => user.dataField === "junio")){
    total +=parseFloat(rowData.value.junio);  
  }
  if (campos.some(user => user.dataField === "julio")){
    total +=parseFloat(rowData.value.julio);  
  }
  if (campos.some(user => user.dataField === "agosto")){
    total +=parseFloat(rowData.value.agosto);  
  }
  if (campos.some(user => user.dataField === "setiembre")){
    total +=parseFloat(rowData.value.setiembre);  
  }
  if (campos.some(user => user.dataField === "octubre")){
    total +=parseFloat(rowData.value.octubre);  
  }
  if (campos.some(user => user.dataField === "noviembre")){
    total +=parseFloat(rowData.value.noviembre);  
  }
  if (campos.some(user => user.dataField === "diciembre")){
    total +=parseFloat(rowData.value.diciembre);  
  }
      return total;
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

          if (field.area === "row" && field.dataField === "sede") {
            field.sortingMethod = (a, b) => {           
             if (a.value==='SEDE') 
                return -1              
             if (a.value==='ZONAL') 
                return 0
             if (a.value==='PEAJE') 
                return 1                               
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
        caption:"Estado OPP",
        dataField: "estado_opp",
        dataType: "string",
        area: "column",                  
      }, 
      {
        caption:"Tipo Ingreso",
        dataField: "tipo_ingreso",
        dataType: "string",
        area: "filter",                  
      }, 
      {
        caption:"Tipo Salida",
        dataField: "tipo_salida",
        dataType: "string",
        area: "filter",                  
      }, 
      {
        caption:"Presupuesto",
        dataField: "presupuesto",
        dataType: "string",
        area: "row",                  
      },     
      {
        caption: "Sede",
        width:50,
        dataField: "sede",
        area: "row",
        expanded: true,
      },
      {
        caption:"Vigencia",
        dataField: "fecha_fin_vigencia_cas",
        dataType: "string",
        area: "row",                  
      }, 
    {
      caption: "Fuente",
      width:10,
      dataField: "fuente_base",
      dataType: "string",
      area: "filter",
    }, 
    {
      caption: "Meta",
      width:280,      
      dataField: "meta_2019",
      dataType: "string",
      area: "filter",
    }, 
    {
      caption: "Fase",
      width:50,
      dataField: "fase",
      area: "column",
      expanded: true,
    },
    {
      caption: "Convocatoria",
      width:50,
      dataField: "convocatoria",
      area: "column",
      expanded: true,
    },

    {
      width:280,
      caption: "Unidad Organica",
      dataField: "desc_unidad",
      area: "filter",    
      allowFiltering: true,
                headerFilter: {
                    allowSearch: true
                },      
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
      caption: "Nombres",
      width:50,
      dataField: "nombres",
      area: "row",
      expanded: true,
    },
    {
      width:280,
      caption: "Cargo",
      dataField: "cargo",
      area: "filter",    
      allowFiltering: true,
                headerFilter: {
                    allowSearch: true
                },      
    },  
    {
      width:100,
      caption: "N° Convocatoria",
      dataField: "convocatoria_nro",
      area: "filter",    
      allowFiltering: true,
                headerFilter: {
                    allowSearch: true
                },      
    },  
    {
      width:100,
      caption: "Codigo Plaza",
      dataField: "codigo_plaza",
      area: "filter",    
      allowFiltering: true,
                headerFilter: {
                    allowSearch: true
                },      
    },
    {
      width:100,
      caption: "Monto",
      dataField: "monto",
      dataType: "number", 
      area: "filter",    
      allowFiltering: true,
                headerFilter: {
                    allowSearch: true
                },      
    },
    {
      caption: "Cantidad",
      width:15,
      dataField: "id",      
      area: "data",
      dataType: "number",      
      summaryType: "count",
    }, 
    
  ],
    remoteOperations: false,
    store: new CustomStore({
      load: function(loadOptions) {        
        return a.httpClient.get("http://rrhh.pvn.gob.pe/api/cas/base_cas",
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
