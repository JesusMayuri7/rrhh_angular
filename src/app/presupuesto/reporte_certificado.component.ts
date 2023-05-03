import { Component, OnInit,ViewEncapsulation, OnDestroy,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ReportePlanillaService } from './reporte_planilla.service';
import { ExcelService } from '../service/excel.service';
import { DialogService} from 'primeng/dynamicdialog';
import { MessageService} from 'primeng/api';
import CustomStore from 'devextreme/data/custom_store';
//import DataSource from "devextreme/ui/pivot_grid/data_source";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DxDataGridComponent, DxIntegrationModule } from 'devextreme-angular';

@Component({
  selector: 'zd-reporte-certificado',  
  templateUrl: './reporte_certificado.component.html',
  styleUrls: ['./reporte_certificado.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[ReportePlanillaService,ExcelService,MessageService,DialogService],

})
export class ReporteCertificadoComponent implements OnInit,OnDestroy {
  @ViewChild('drillDownDataGrid') drillDownDataGrid: DxDataGridComponent;
  drillDownDataSource: any;
  data: any = [];
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
  

  constructor(private planillaformativaService:ReportePlanillaService,private httpClient:HttpClient,private excelService:ExcelService) { 

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

 async downloadTable() 
  
  {
    //const rowPathLength = e.cell.rowPath.length;
    //const rowPathName = e.cell.rowPath[rowPathLength - 1];
    let theDrilldownSource =this.pivotGridDataSource.createDrillDownDataSource({
      customColumns:['ano_eje','secuencia','producto','actividad','finalidad','detalle','fuente','sec_func','clasificador','concepto','monto','devengado',
      'enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre']
    });
    this.drillDownDataSource = theDrilldownSource;
    this.drillDownDataSource.paginate(false);
    //this.drillDownDataSource.fields(['presupuesto']);
    console.log(this.data);  
    this.data = await this.drillDownDataSource.load();
    this.excelService.exportAsExcelFile(this.data, 'Certificado_');
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
        caption:"Modalidad",
        dataField: "modalidad",
        dataType: "string",
        area: "row",                  
      }, 
      {
        caption:"Detalle",
        dataField: "detalle",
        dataType: "string",
        area: "filter",                  
      },      
      {
        caption: "Concepto",
        width:10,      
        dataField: "concepto",
        dataType: "string",
        area: "row",
      }, 
      {
        caption: "Certificado",
        width:10,
        dataField: "dsc_certificado",
        dataType: "string",
        area: "row",
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
      caption: "Fuente",
      width:10,
      dataField: "fuente_base",
      dataType: "string",
      area: "filter",
    }, 
    {
      caption: "Meta",
      width:10,      
      dataField: "sec_func",
      dataType: "string",
      area: "filter",
    }, 
    {
      caption: "Clasificador",
      width:10,      
      dataField: "clasificador",
      dataType: "string",
      area: "row",
    }, 

 /*   {
      caption: "Dni",
      width:15,
      dataField: "dni",
      area: "row",
      expanded: true,
    },*/    
    {
      caption: "Certificado",
      width:15,
      dataField: "monto",      
      area: "data",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
    }, 
    {
      caption: "Secuencia",
      width:15,
      dataField: "secuencia",      
      area: "filter",
      dataType: "string",                
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
      caption: "Saldo",
      width:15,
      dataField: "saldo",      
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
        return a.httpClient.get("http://rrhh.pvn.gob.pe/api/presupuestal/certificacion",
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
