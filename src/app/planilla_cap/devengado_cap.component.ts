import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { PlanillaCapService } from './planilla_cap.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import CustomStore from 'devextreme/data/custom_store';
//import DataSource from "devextreme/ui/pivot_grid/data_source";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Component({
  selector: 'zd-devengado-cap',  
  templateUrl: './devengado_cap.component.html',
  styleUrls: ['./devengado_cap.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[PlanillaCapService,ExcelService,MessageService,DialogService],

})
export class DevengadoCapComponent implements OnInit,OnDestroy {
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

  constructor(private planillaCapService:PlanillaCapService,private httpClient:HttpClient) { 

    this.cargaData(this);
  }
  
 onClickme(e){   
   this.pivotGridDataSource.reload();        
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

  
  onExpandir(){       
    //this.pivotGridDataSource.expandAll(true);      
  }

  onMesClick(e){        
    this.mes = e.itemData.value;
    console.log(this.mes);
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

  calcularTotal2(rowData){  
    var campos =this.pivotGridDataSource.getAreaFields("data", true);        
    let total:number =0;
    if (this.mes == 1){
      total +=parseFloat(rowData.value.enero);       
    }
  if (this.mes == 2){
    total +=parseFloat(rowData.value.febrero);  
  }
  if (this.mes == 3){
    total +=parseFloat(rowData.value.marzo);  
  }
  if (this.mes == 4){
    total +=parseFloat(rowData.value.abril);  
  }
  if (this.mes == 5){
    total +=parseFloat(rowData.value.mayo);  
  }
  if (this.mes == 6){
    total +=parseFloat(rowData.value.junio);  
  }
  if (this.mes == 7){
    total +=parseFloat(rowData.value.julio);  
  }
  if (this.mes == 8){
    total +=parseFloat(rowData.value.agosto);  
  }
  if (this.mes == 9){
    total +=parseFloat(rowData.value.setiembre);  
  }
  if (this.mes == 10){
    total +=parseFloat(rowData.value.octubre);  
  }
  if (this.mes == 11){
    total +=parseFloat(rowData.value.noviembre);  
  }
  if (this.mes == 12){
    total +=parseFloat(rowData.value.diciembre);  
  }
      return total;
  }

  cargaData(a) {   
    let header = new HttpHeaders({'content-type':'application/json'});  
    this.pivotGridDataSource = new PivotGridDataSource({
      onFieldsPrepared: fields => {
        fields.forEach(field => {           
          if (field.area === "column" && field.dataField === "detalle") {
             field.sortingMethod = (a, b) => {           
              if (a.value==='Total') return -1              
              return 0;
            };
          }
          if (field.area === "row" && field.dataField === "fuente") {
            field.sortingMethod = (a, b) => {           
             if (a.value==='RO') return -1              
             return 0;
           };
         }
        })
      },
    fields: [
      {
        caption: "Certificado",
        dataField: "dsc_certificado",
        dataType: "string",
        area: "column",  
        allowExpandAll:true                
      },
      {
        dataField: "detalle",
        dataType: "string",
        area: "column",    
        sortOrder: "desc", 
        allowExpandAll:true    
      },
      {
        dataField: "clasificador",
        dataType: "string",
        area: "column",    
        sortOrder: "desc",
        allowExpandAll:true      
      },
      {
      caption: "Fuente",
      width:15,
      dataField: "fuente",
      area: "row",
      expanded: true,
    }, {
      width:230,
      caption: "Meta",
      dataField: "finalidad",
      area: "row",
      expanded: true,
    /*  selector: function(data) {
        return  data.sec_func + " - " + data.finalidad;
      }*/
    }, 
   
    {
      caption: "Cert",
      dataField: "certificacion",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data",
    },
    {
      caption: "Devengado",      
      dataType: "number",
      dataField: "devengado",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data",
      isMeasure : true,    
    },  
    {
      caption: "Ene",
      dataField: "enero",
      dataType: "number",
      summaryType: "sum",
      visible: true,
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data",
      isMeasure : true
    },
    {
      caption: "Feb",
      dataField: "febrero",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data",
      isMeasure : true
    },
    {
      caption: "Mar",
      dataField: "marzo",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data",
      isMeasure : true
    },
  
    {
      caption: "Abr",
      dataField: "abril",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "May",
      dataField: "mayo",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Jun",
      dataField: "junio",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Jul",
      dataField: "julio",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Ago",
      dataField: "agosto",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Set",
      dataField: "setiembre",
      dataType: "number",
      summaryType: "sum",  
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },    
      area: "data"
    },
    {
      caption: "Oct",
      dataField: "octubre",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Nov",
      dataField: "noviembre",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Dic",
      dataField: "diciembre",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data",
  },
   /* {
      caption: "Total",
      dataField: "total",
      dataType: "number",
      summaryType: "sum",  
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },    
      area: "data"
    },*/
    {
      caption: "Total",
      dataType: "number",
      isMeasure: true,
      summaryType: "custom",                
      calculateCustomSummary: function (options) {        
          if (options.summaryProcess == 'start') {
              options.totalValue = 0;
          }
          if (options.summaryProcess == 'calculate') {
              options.totalValue+= parseFloat(options.value.devengado) +parseFloat(a.calcularTotal2(options));               
              //options.totalValue+= a.calcularTotal(options);             
              //options.totalValue += parseFloat(options.value.enero) + parseFloat(options.value.febrero) + parseFloat(options.value.marzo);
          }                    
      },
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },             
    {
      caption: "Saldo",
      dataType: "number",
      isMeasure: true,
      summaryType:"sum",           
      calculateSummaryValue: function(args) { 
        //if(args.field("data") && args.field("row").caption==="Sales")
        {          
          if (args.value("certificacion") == null) {  
            return 0;
          }        
           return (parseFloat(args.value("certificacion")) - parseFloat(args.value("Total")))
          ;             
        }
      },
      
    /*  calculateCustomSummary: function (options) {        
          if (options.summaryProcess == 'start') {
              options.totalValue = 0;
          }
          if (options.summaryProcess == 'calculate') {
              options.totalValue =a.calcularSaldo(options);
              //options.totalValue += parseFloat(options.value.enero) + parseFloat(options.value.febrero) + parseFloat(options.value.marzo);
          }                    
      },*/
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Pea",
      width:10,
      dataField: "peas",
      area: "data",
      expanded: true,
      dataType: "number",
      summaryType:"sum",
    },
  ],
    remoteOperations: false,
    store: new CustomStore({
      load: function(loadOptions) {        
        return a.httpClient.post("http://rrhh.pvn.gob.pe/api/cap/planilla/planilla_cap_anual",
        {planilla:a.tipo_planilla,mes:a.mes},{headers :header})
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
