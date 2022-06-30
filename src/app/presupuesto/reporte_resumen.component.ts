import { Component, OnInit,ViewEncapsulation, OnDestroy,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ReportePlanillaService } from './reporte_planilla.service';
import { ExcelService } from '../service/excel.service';
import { MessageService, DialogService} from 'primeng/primeng';
import CustomStore from 'devextreme/data/custom_store';
//import DataSource from "devextreme/ui/pivot_grid/data_source";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'zd-reporte-resumen',  
  templateUrl: './reporte_resumen.component.html',
  styleUrls: ['./reporte_resumen.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[MessageService,DialogService],

})
export class ReporteResumenComponent implements OnInit,OnDestroy {
  @ViewChild('drillDownDataGrid') drillDownDataGrid: DxDataGridComponent;
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
  drillDownDataSource: any;
  data: any = [];

  constructor(private httpClient:HttpClient,private excelService:ExcelService) { 

    this.cargaData(this);
    
  }

  async downloadTable() {
    //if (e.area == 'data') 
    {
      //const rowPathLength = e.cell.rowPath.length;
      //const rowPathName = e.cell.rowPath[rowPathLength - 1];
      let theDrilldownSource =this.pivotGridDataSource.createDrillDownDataSource({
        customColumns:['ano_eje','presupuesto','generica','subgenerica','subgenerica_det','producto','actividad','finalidad','detalle','fuente','especifica3','sec_func','pia','pim','certificado','devengado',
        'enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre']
      });
      this.drillDownDataSource = theDrilldownSource;
      this.drillDownDataSource.paginate(false);
      //this.drillDownDataSource.fields(['presupuesto']);
      console.log(this.data);  
      this.data = await this.drillDownDataSource.load();
      this.excelService.exportAsExcelFile(this.data, 'Pesupuesto_');
    }
    
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
    /*   
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
    }*/
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
        caption: "Año",
        width:10,      
        dataField: "ano_eje",
        dataType: "string",
        area: "row",
      }, 
      {
        caption: "Generica",
        width:200,      
        dataField: "generica",
        dataType: "string",
        area: "filter",
      }, 
      {
        caption: "SubGenerica",
        width:200,      
        dataField: "subgenerica",
        dataType: "string",
        area: "filter",
      }, 
      {
        caption: "SubGenericaDet",
        width:200,      
        dataField: "subgenerica_det",
        dataType: "string",
        area: "filter",
      }, 
      {
        caption: "Especifica",
        width:150,      
        dataField: "detalle",
        dataType: "string",
        area: "row",
      }, 
      {
        caption: "Fuente",
        width:10,
        dataField: "fuente",
        dataType: "string",
        area: "row",
      }, 
      {
        caption: "Presupuesto",
        width:10,      
        dataField: "presupuesto",
        dataType: "string",
        area: "filter",
      }, 
      {
        caption: "Producto",
        width:10,      
        dataField: "producto",
        dataType: "string",
        area: "filter",
      }, 
      {
        caption: "Actividad",
        width:10,      
        dataField: "actividad",
        dataType: "string",
        area: "filter",
      }, 
    {
      caption: "Meta",
      width:240,      
      dataField: "sec_func",
      dataType: "string",
      area: "filter",
      selector:  function (data) {
        return data.sec_func +" - " + data.finalidad
      }
    }, 
    {
      caption: "Clasificador",
      width:10,      
      dataField: "especifica3",
      dataType: "string",
      area: "filter",
    }, 
    {
      caption: "Pia",
      width:15,
      dataField: "pia",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    },   
    { 
      caption: "Pim",
      width:15,
      dataField: "pim",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Certificado",
      width:15,
      dataField: "certificado",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Devengado",
      width:15,
      dataField: "devengado",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 

    {
      caption: "Enero",
      width:15,
      dataField: "enero",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Febrero",
      width:15,
      dataField: "febrero",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Marzo",
      width:15,
      dataField: "marzo",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Abril",
      width:15,
      dataField: "abril",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Mayo",
      width:15,
      dataField: "mayo",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Junio",
      width:15,
      dataField: "junio",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Julio",
      width:15,
      dataField: "julio",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Agosto",
      width:15,
      dataField: "agosto",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Setiembre",
      width:15,
      dataField: "setiembre",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Octubre",
      width:15,
      dataField: "octubre",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Noviembre",
      width:15,
      dataField: "noviembre",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Diciembre",
      width:15,
      dataField: "diciembre",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
  ],
    remoteOperations: false,
    store: new CustomStore({
      load: function(loadOptions) {        
        return a.httpClient.get("http://rrhh.pvn.gob.pe/api/presupuestal/resumen",
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
