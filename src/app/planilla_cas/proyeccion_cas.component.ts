import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { PlanillaCasService } from './planilla_cas.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import CustomStore from 'devextreme/data/custom_store';
//import DataSource from "devextreme/ui/pivot_grid/data_source";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Component({
  selector: 'zd-proyeccion-cas',  
  templateUrl: './proyeccion_cas.component.html',
  styleUrls: ['./proyeccion_cas.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[PlanillaCasService,ExcelService,MessageService,DialogService],
})
export class ProyeccionCasComponent implements OnInit,OnDestroy {
  vigencias:any[];
  fuentes:any[];
  dataSource: any = {};
  store: CustomStore;
  pivotGridDataSource: any;
  showDataFields: boolean = true;
  showRowFields: boolean = true;
  showColumnFields: boolean = true;
  showFilterFields: boolean = true;
  mes:number=0;
  bases:any;
  base:boolean=true;
  uit:number = 4400

  vigencia='SOSTENIBLE,31/03/2021,30/04/2021,31/10/2021';
  meses: any;
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
      { label: 'SOSTENIBLE', value: 'SOSTENIBLE' },
      { label: 'NO_SOSTENIBLE', value: 'NO_SOSTENIBLE' },  
      { label: '31/12/2020', value: '31/12/2020' }   
    ];

    this.bases = [    
      { label: 'Base', value: true},
      { label: 'Air', value: false},
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

  onBaseClick(e){        
    this.base = e.itemData.value;
    console.log(e.itemData.value);
    console.log(this.base);
  }

  onItemClick(e){        
    this.mes = e.itemData.value;
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



  cargaData(a) {   
    let header = new HttpHeaders({'content-type':'application/json'});  
    this.pivotGridDataSource = new PivotGridDataSource({
      onFieldsPrepared: fields => {
        fields.forEach(field => {           
          if (field.area === "row" && field.dataField === "sede") {
            field.sortingMethod = (a, b) => {           
             if (a.value==='SEDE') 
                return -1;              
             if (a.value==='ZONAL') 
                return 0;
             if (a.value==='PEAJE') 
                return 1;                               
             return 0;
           };
         }
        })
      },
    fields: [
      {
        caption:"Presupuesto",
        dataField: "presupuesto",
        dataType: "string",
        area: "row",    
        width:10,
        //sortOrder: "desc"      
      },
      {
        caption:"Fuente",
        dataField: "fuente_base",
        dataType: "string",
        area: "row",    
        width:10,
        //sortOrder: "desc"      
      },
      {
        caption:"Dependencia",
        dataField: "dependencia",
        dataType: "string",
        area: "row",    
        width:250,
        sortOrder: "desc"      
      }, 
      {
        caption:"Estado",
        dataField: "estado",
        dataType: "string",
        area: "row",    
        //sortOrder: "desc"      
      },
      {
        caption:"Vigencia",
        dataField: "vigencia",
        dataType: "string",
        area: "column",    
        //sortOrder: "desc"      
      },
      {
        caption:"Cargo",
        dataField: "cargo",
        dataType: "string",
        area: "filter",    
        //sortOrder: "desc"      
      },
      {
        caption:"Sede",
        dataField: "sede",
        dataType: "string",
        area: "filter",    
        width:50,
        sortOrder: "desc"      
      },  
      {
        caption:"Sede2",
        dataField: "sede2",
        dataType: "string",
        area: "row",    
        width:50,
        sortOrder: "desc"      
      },  
      {
        caption:"Producto",
        dataField: "producto",
        dataType: "string",
        area: "filter",    
        width:200,
        sortOrder: "desc"      
      }, 
      {
        caption:"Finalidad",
        dataField: "meta_2019",
        dataType: "string",
        area: "filter",    
        width:200,
        sortOrder: "desc"      
      },    
      {
        caption:"Plaza",
        dataField: "codigo_plaza",
        dataType: "string",
        area: "filter",    
        sortOrder: "desc",   
        width:15,  
      }, 
      {
        caption:"Nombres",
        dataField: "nombres",
        dataType: "string",
        area: "filter",    
        sortOrder: "desc",   
        width:250,  
      },  
      {
        caption:"Mes",
        dataField: "meses",
        dataType: "string",
        area: "filter",    
        sortOrder: "desc",   
        width:10,  
      }, 
      {
        caption:"Pea",
        dataField: "pea",
        dataType: "number",
        area: "data",   
        summaryType: "sum", 
        sortOrder: "desc",   
        width:15,  
      },  
  /*  {
      width:15,
      caption: "Cert",
      dataField: "certificacion",
      dataType: "number",      
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },*/
    {
      
      caption: "Honorario",
      dataField: "honorario_mensual",
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
      caption: "Essalud",
      dataField: "essalud_mensual",
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
      caption: "Sctr_Salud",
      dataField: "sctr_salud_mensual",
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
      caption: "Aguinaldo",
      dataField: "aguinaldo",
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
      caption: "Honorario Anual",
      dataField: "honorario_anual",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Essalud Anual",
      dataField: "essalud_anual",
      dataType: "number",
      summaryType: "sum",
      format: {
        type: "fixedPoint", // one of the predefined formats
        precision: 2, // the precision of values        
      },
      area: "data"
    },
    {
      caption: "Sctr_Salud Anual",
      dataField: "sctr_salud_anual",
      dataType: "number",
      summaryType: "sum",
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
        return a.httpClient.post("http://rrhh.pvn.gob.pe/api/cas/planilla/proyeccion_cas",{mes:a.mes,vigencia:a.vigencia,base:a.base,uit:a.uit},
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
