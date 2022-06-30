import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse} from '@angular/common/http';
import { BaseFormativaService } from './base_formativa.service';
import { ExcelService } from '../service/excel.service';
import CustomStore from 'devextreme/data/custom_store';
import { Observable } from 'apollo-link';



@Component({
  selector: 'zd-base-formativa-proyeccion-ejec',
  templateUrl: './base_formativa_proyec.component.html',
  styleUrls: ['./base_formativa_proyec.component.css'],
  providers:[BaseFormativaService,ExcelService],
  
})
export class BaseFormativaProyeccionComponent implements OnInit {
 cap:any[];
 cols: any[];
 frozenCols: any[];
 estados:any[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 autorizaciones:any[];
 formato:{};
 dataSource: any = {};
 applyFilterTypes: any;
 currentFilter: any;
 enero_visible:boolean;
 ref:any;

  constructor(private capService:BaseFormativaService,private excelService:ExcelService,private httpClient: HttpClient) { 
    this.calculateTotal = this.calculateTotal.bind(this);
    this.enero_visible = true;
    this.applyFilterTypes = [{
      key: "auto",
      name: "Immediately"
    }];
    this.currentFilter = this.applyFilterTypes[0].key;
    
  }
  
  ngOnInit() {
    
     console.log("organigrama");
    this.estados = [          
      { label: 'PENDIENTE', value: 'PENDIENTE' },
      { label: 'VIGENTE', value: 'VIGENTE' },
      { label: 'FINALIZADO', value: 'FINALIZADO' }      
  ];

    this.estadosControl = [    
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'VACANTE', value: 'VACANTE' },
    { label: 'VACIOS', value: null }  
    ];

    this.autorizaciones = [    
      { label: 'MTC_218', value: 'MTC_218'},
      { label: 'REGULARES',value:'REGULARES'},
      { label: 'PVN_NUEVOS',value:'PVN_NUEVOS'}                        
  ]; 

   //this.cargarPap();

   this.cargaData(this);

   
  }

  calculateTotal(rowData) {
    console.log("enero",this.enero_visible);
    let column = this as any;  
    console.log("columan",column);
    //console.log(rowData);
    return Number(rowData.enero) + Number(rowData.febrero);
  }

  optionChanged(event: any) {  
    console.log("opcion",event);  
    if (event.name === "columns" && (event.fullName.includes("visible"))) {  
      console.log("visible");
      const parts: string[] = event.fullName.split('columns[').filter(e => e.length);
      console.log(parts);  
      parts.pop();
    }  
  }



  onCellPrepared(e) {
   // console.log("cell");
   // if (e.rowType === "header" && (e.column.dataField === "codigo_plaza")) {    
    //  console.log("plaza");
     // e.cellElement.horizontalAlignment = 'left';
    //  e.rowElement.style.backgroundColor = '#d6dde7'
      //e.cellElement.css({"text-align":"left"}); 
     // e.cellElement.css({"text-align":"left","backgroundColor": "green","margin-left":0,"padding-left":0 }); 
     // e.cellElement.css({"max-width": "calc(100% - 10px)"});
   // }  
    /*
    if(e.rowType === 'data') {        
          if(e.data.meta != e.data.meta_siga && (e.data.estado=='OCUPADA')) {
            if(e.column.dataField === 'meta')
            {
                e.cellElement.style.backgroundColor = '#E11601';
                e.cellElement.style.color = '#FFFFFF';
                e.cellElement.style.fontWeight = 'bold';
            }
          }
      
    if(e.data.SaleAmount > 15000) {
            if(e.column.dataField === 'OrderNumber') {
                e.cellElement.style.fontWeight = 'bold';
            }
            if(e.column.dataField === 'SaleAmount') {
                e.cellElement.style.backgroundColor = '#FFBB00';
                e.cellElement.style.color = '#000000';
            }
        }
    }

    if(e.rowType === 'group') {
        if(e.row.groupIndex === 0) {
            e.cellElement.style.backgroundColor = '#BEDFE6';
        }
        if(e.row.groupIndex === 1) {
            e.cellElement.style.backgroundColor = '#C9ECD7';
        }
        e.cellElement.style.color = '#000';
        if(e.cellElement.firstChild && e.cellElement.firstChild.style) e.cellElement.firstChild.style.color = '#000';
    }

    if(e.rowType === 'groupFooter' && e.column.dataField === 'SaleAmount') {
        e.cellElement.style.fontStyle = 'italic';
    }       */  
}

  calcularTotalSctr(rowData){
    return parseFloat(rowData.sctr_ene_mar) + parseFloat(rowData.sctr_abr_jun) + parseFloat(rowData.sctr_jul_set) + parseFloat(rowData.sctr_oct_dic);
  }

  isNotEmpty(value: any): boolean {
    return value !== undefined && value !== null && value !== "";
  }

  cargaData(a) {
    a.dataSource = new CustomStore({      
      load: ()=>this.cargarPap()
  })
}



  addFilterAutorizacion(dt,a) {        
    let valores = [];   
    a.value.forEach((element,index) => {        
      console.log(element);    
         valores.push(element);         
    });
    dt.filter(valores, 'autorizacion', 'in');        
   }

   
  addFilterEstado(dt,a) {        
    let valores = [];   
    a.value.forEach((element,index) => {        
      console.log(element);    
         valores.push(element);         
    });
    dt.filter(valores, 'estado', 'in');        
   }

  handleFilter(event){
    this.filtrados = event.filteredValue.length;
    console.log(event);
    this.calcularFooterTotal(event.filteredValue);
  }

  cargarPap():Promise<any>{    
    console.log('cargando');
    return this.httpClient.get("http://rrhh.pvn.gob.pe/api/formativa/base_formativa_proyeccion_ejec").toPromise()
      .then(result => {
        console.log(result['data']);
        return {
            data: result['data'],
            totalCount: 588,
            sumary:588            
           // groupCount: result.groupCount*/
        };
    });          
  }
  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.cap, 'Organigrama_');
 }

  calcularFooterTotal(tra){
      this.TotalServicios=0;

    if (tra) {
      for(let item of tra) {          
        this.TotalServicios+= parseFloat(item.servicio);

      }
    }
  }
  
}

