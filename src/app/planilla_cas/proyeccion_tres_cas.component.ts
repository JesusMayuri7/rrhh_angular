import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { PlanillaCasService } from './planilla_cas.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import CustomStore from 'devextreme/data/custom_store';
//import DataSource from "devextreme/ui/pivot_grid/data_source";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Component({
  selector: 'zd-proyeccion-tres-cas',  
  templateUrl: './proyeccion_tres_cas.component.html',
  styleUrls: ['./proyeccion_tres_cas.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[PlanillaCasService,ExcelService,MessageService,DialogService],
})
export class ProyeccionTresCasComponent implements OnInit,OnDestroy {
  fuentes:any[];
  dataSource: any = {};
  store: CustomStore;
  pivotGridDataSource: any;
  showDataFields: boolean = true;
  showRowFields: boolean = true;
  showColumnFields: boolean = true;
  showFilterFields: boolean = true;
  mes:number=0;
  meses: any;
  uit:number=4400;  
  base:boolean=false;
  bases:any;
  vigencia:any=null;
  vigencias:any[];
  estado:any=null;
  estados:any[];
  gridBoxValue: number[];

  constructor(private planillaCasService:PlanillaCasService,private httpClient:HttpClient) { 

    this.cargaData(this);
  }
  
 onClickme(){   
   this.pivotGridDataSource.reload();     
 }

 ngOnDestroy() {
  this.pivotGridDataSource.dispose();
 
}

  ngOnInit() {      
    this.vigencias= [
      { label: 'Vigencia', value: null },
      { label: 'TODOS', value: 'SOSTENIBLE,31/03/2021,30/04/2021,31/10/2021'},
      { label: 'SOSTENIBLE', value: 'SOSTENIBLE' },
      { label: 'NO_SOSTENIBLE', value: '31/12/2020' }   
    ];

    this.estados= [
      { label: 'Estado', value: null },
      { label: 'TODOS', value: 'OCUPADO,VACANTE' },
      { label: 'OCUPADO', value: 'OCUPADO' },
      { label: 'VACANTE', value: 'VACANTE' }   
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
    this.bases = [    
      { label: 'Base', value: true},
      { label: 'Air', value: false},
      ];    
  }

      

  onItemClick(e){      
    console.log(e.itemData.value);  
    this.mes = e.itemData.value;
  }

  onEstadoClick(e){        
    console.log(e.itemData.value);
    this.estado = e.itemData.value;
  }

  onVigenciaClick(e){        
    console.log(e.itemData.value);
    this.vigencia = e.itemData.value;
  }

  onBaseClick(e){        
    console.log(e.itemData.value);
    this.base = e.itemData.value;
  }

  onInitialized(e: any) {
   // this.pivotGridDataSource.option('dataSource', null);
}

  onCellPrepared(e) {    
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

  calcularProyec(rowData){  
    console.log(this.mes);
    var campos =this.pivotGridDataSource.getAreaFields("data", true);        
    let total:number =0;
    if (campos.some(user => user.dataField === "enero") && this.mes <= 1 ){
        total +=parseFloat(rowData.value.enero);       
    }
    if (campos.some(user => user.dataField === "febrero") && this.mes <=2 ){
      total +=parseFloat(rowData.value.febrero);  
    }
    if (campos.some(user => user.dataField === "marzo") && this.mes <=3 ){
      total +=parseFloat(rowData.value.marzo);  
    }
    if (campos.some(user => user.dataField === "abril") && this.mes <=4 ){
      total +=parseFloat(rowData.value.abril);  
    }
    if (campos.some(user => user.dataField === "mayo") && this.mes <=5 ){
      total +=parseFloat(rowData.value.mayo);  
    }
    if (campos.some(user => user.dataField === "junio") && this.mes <=6 ){
      total +=parseFloat(rowData.value.junio);  
    }
    if (campos.some(user => user.dataField === "julio") && this.mes <=7 ){
      total +=parseFloat(rowData.value.julio);  
    }
    if (campos.some(user => user.dataField === "agosto") && this.mes <=8 ){
      total +=parseFloat(rowData.value.agosto);  
    }
    if (campos.some(user => user.dataField === "setiembre") && this.mes <=9 ){
      total +=parseFloat(rowData.value.setiembre);  
    }
    if (campos.some(user => user.dataField === "octubre") && this.mes <=10 ){
      total +=parseFloat(rowData.value.octubre);  
    }
    if (campos.some(user => user.dataField === "noviembre") && this.mes <=11 ){
      total +=parseFloat(rowData.value.noviembre);  
    }
    if (campos.some(user => user.dataField === "diciembre") && this.mes <=12 ){
      total +=parseFloat(rowData.value.diciembre);  
    }
      return total;
  }

  cargaData(a) {   
    let header = new HttpHeaders({'content-type':'application/json'});  
    this.pivotGridDataSource = new PivotGridDataSource({
    /*  onFieldsPrepared: fields => {
        fields.forEach(field => {           
          if (field.area === "row" && field.dataField === "fuente") {
             field.sortingMethod = (a, b) => {           
              if (a.value==='RO') return -1              
              return 0;
            };
          }
        })
      },*/
    fields: [
      {
        caption:"Pea",
        dataField: "peas",
        dataType: "number",
        area: "data",   
        summaryType: "sum", 
        sortOrder: "desc",   
        width:15,  
      },
      
    {
      caption:"Ocupados",
      dataField: "ocupados",
      dataType: "number",
      area: "data",   
      summaryType: "sum", 
      sortOrder: "desc",   
      width:15,  
    },  
    {
      caption:"Vacantes",
      dataField: "vacantes",
      dataType: "number",
      area: "data",   
      summaryType: "sum", 
      sortOrder: "desc",   
      width:15,  
    }, 
    {
      caption:"Sostenible",
      dataField: "sostenible",
      dataType: "number",
      area: "data",   
      summaryType: "sum", 
      sortOrder: "desc",   
      width:15,  
    },  
    {
      caption:"No Sostenible",
      dataField: "no_sostenible",
      dataType: "number",
      area: "data",   
      summaryType: "sum", 
      sortOrder: "desc",   
      width:15,  
    }, 
      {
        caption:"Modalidad",
        dataField: "modalidad",
        dataType: "string",
        area: "column",    
        //sortOrder: "desc"      
      },
      {
        caption:"Clasificador",
        dataField: "clasificador",
        dataType: "string",
        area: "row",    
        sortOrder: "asc"      
      },
      {
        caption:"Sede",
        dataField: "sede",
        dataType: "string",
        area: "row",    
        sortOrder: "asc"      
      },
      {
        caption:"Detalle",
        dataField: "detalle",
        dataType: "string",
        area: "row",            
      },
      {
      caption: "Fte.",      
      dataField: "fuente",
      area: "row",
      expanded: true,
      sortOrder: "desc"     
     },
     {
      width:230,
      caption: "Meta",
      dataField: "finalidad",
      area: "row",
      expanded: true,

    }, 
    {      
      caption: "Pim",
      dataField: "pim",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },  
    {      
      caption: "Devengado",
      dataField: "devengado",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },  
    {
      caption: "Proyeccion",
      dataType: "number",
      isMeasure: true,    
      summaryType: "sum",        
      dataField: "proyeccion",                    
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },    
      
   {
      caption: "Saldo Pim",
      dataType: "number",
      isMeasure: true,
      summaryType:"sum",           
      calculateSummaryValue: function(args) {         
        {          
          if (args.value("pim") == null) {  
            return 0;
          }                       
            return parseFloat(args.value("pim")) - (parseFloat(args.value("devengado")+ parseFloat(args.value("proyeccion")))); 
        }
      },    
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },

  ],
    remoteOperations: false,
    store: new CustomStore({
      load: function(loadOptions) {      
        console.log(a.mes,a.vigencia,a.estado,a.uit,a.base);         
        return a.httpClient.post("http://rrhh.pvn.gob.pe/api/cas/planilla/proyeccion_tres_cas",{mes:a.mes,vigencia:a.vigencia,estado:a.estado,uit:a.uit,base:a.base},
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
