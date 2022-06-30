import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { PlanillaCapService } from './planilla_cap.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import CustomStore from 'devextreme/data/custom_store';
//import DataSource from "devextreme/ui/pivot_grid/data_source";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DxIntegrationModule } from 'devextreme-angular';

@Component({
  selector: 'zd-planilla-cap',  
  templateUrl: './planilla_cap.component.html',
  styleUrls: ['./planilla_cap.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[PlanillaCapService,ExcelService,MessageService,DialogService],

})

export class PlanillaCapComponent implements OnInit,OnDestroy {
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
  uniqueValues = [];
  anio:String = '2022';
  anios:any[];

  constructor(private planillaCapService:PlanillaCapService,private httpClient:HttpClient) { 

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

onValueChanged(e)
{
  this.anio = e.value;
  this.cargaData(this);
}

  ngOnInit() {      
    this.vigencias= [    
      { label: 'SOSTENIBLE', value: 'SOSTENIBLE' },
      { label: '31/12/2019', value: '31/12/2019' }   
    ];

    this.anios= [    
      '2020',
      '2021',
      '2022'   
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
    if ((e.area == "column" || e.area == "row") && e.cell.type=='D' && (e.cell.text=='Sueldo' || e.cell.text=='Asig.Familiar' || e.cell.text=='Reintegro'))  {  
      e.cellElement.style = 'font-size: 14px';  
      e.cellElement.style.backgroundColor = 'rgb(186,244,247)';       
      e.cellElement.style.fontWeight = "bold";
    }
    if ((e.area == "column" || e.area == "row") && e.cell.type=='D' && (e.cell.text=='Sctr_salud' || e.cell.text=='Sctr_pension' || e.cell.text=='Vida_ley'))  {  
      e.cellElement.style = 'font-size: 14px';
      e.cellElement.style.backgroundColor = 'rgb(247,236,186)';      
      e.cellElement.style.fontWeight = "bold";
    }
    if ((e.area == "column" || e.area == "row") && e.cell.type=='D' && (e.cell.text=='Essalud' || e.cell.text=='Eps.Aporte'))  {  
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
        })
      },
      
    fields: [
      {
        caption:"Planilla",
        dataField: "desc_planilla",
        dataType: "string",
        area: "filter",            
      },
      {
        caption:"Nivel",
        dataField: "nivel",
        dataType: "string",
        area: "filter",            
      },
        {
          caption: "Fuente",
          dataField: "fuente",
          dataType: "string",
          area: "row",                  
        },  
        {
          caption: "Meta",
          dataField: "cod_mnemonico",
          dataType: "string",
          area: "row",                  
        }, 
        {
          caption: "Año",
          dataField: "anio",
          dataType: "string",
          area: "column",                  
        },     
      {
        dataField: "mes",
        dataType: "string",
        area: "column",                  
      },      
      {
        caption: "Tipo",
        width:15,
        dataField: "tipo",
        dataType: "string",
        area: "column",
      }, 
    {
      width:200,
      caption: "Nombres",
      dataField: "txt_nombres",
      area: "row",    
      allowFiltering: true,
                headerFilter: {
                    allowSearch: true
                },      
    },  
    {
      caption: "Plaza",
      width:10,
      dataField: "cod_plaza",
      area: "row",
      expanded: true,
    },
    {
      caption: "Cargo",
      width:220,
      dataField: "txt_cargo",
      area: "row",
      expanded: true,
    },
    {
      caption: "Tipo",
      width:15,
      dataField: "tipo",
      dataType: "string",
      area: "row",
    }, 
    {
      caption: "Concepto",
      width:15,
      dataField: "concepto",
      dataType: "string",
      area: "column",
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
  /*  {
      width:10,
      caption: "Pea",
      dataField: "pea",
      dataType: "number",      
      summaryType: "custom",      
      area: "data",
      calculateCustomSummary: function (options) {
        if (options.summaryProcess == 'start') {
            options.totalValue = 0;
        }
        else if (options.summaryProcess == 'calculate') {
          if (a.uniqueValues.includes(options.value) == false) 
          {
            //console.log(options.totalValue);
              a.uniqueValues.push(options.value);
            options.totalValue += 1;
          }
        }
        else if (options.summaryProcess == 'finalize') {
          a.uniqueValues = [];
        }
      }
    }*/
  ],
    remoteOperations: false,
    store: new CustomStore({
      load: function(loadOptions) {        
        return a.httpClient.get("http://rrhh.pvn.gob.pe/api/cap/planilla/planilla_cap/"+a.anio,
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
