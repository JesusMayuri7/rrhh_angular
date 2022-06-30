import { Component, OnInit, ViewChild } from '@angular/core';

import { OrganigramaService } from '../service/organigrama.service';
import { ExcelService } from '../service/excel.service';
import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";

@Component({
  selector: 'zd-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.css'],
  providers:[OrganigramaService,ExcelService]
})
export class OrganigramaComponent implements OnInit {
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

  constructor(private capService:OrganigramaService,private excelService:ExcelService) { }

  ngOnInit() {
    this.cols = [   
      { field: 'desc_funcional', header: 'Desc. Funcional' ,ancho:'5.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},      
        { field: 'desc_direccion', header: 'Direccion', ancho:'3.5em',estilo: { 'font-size':'0.8em'},rowspan:'1',visible:true,numero:false},        
        //{ field: 'especifica', header: 'Especifica',ancho:'6em',estilo: {'font-size':'0.6em'} },    
        { field: 'desc_unidad', header: 'Unidad' ,ancho:'4em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},          
        { field: 'desc_area', header: 'Area',ancho:'4.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'autorizacion', header: 'Autorizacion',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'presupuesto', header: 'Presupuesto',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'tipo', header: 'Tipo', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'servicio', header: 'Servicio',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },        
        { field: 'estado', header: 'Estado',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false }        
    ];
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
  this.formato =
  {
    "lugar": {
      type: "string",      
    },
    "desc_direccion": {
        type: "level",
        hierarchy: "Organigrama",
    },

    "desc_unidad": {
      type: "level",
      hierarchy: "Organigrama",
      parent: "desc_direccion"
    },
    "desc_area": {
      type: "level",
      hierarchy: "Organigrama",
      parent: "desc_unidad"
    },
    "autorizacion": {
      type: "string",      
    },
    "presupuesto": {
      type: "string",      
    },
    "tipo": {
      type: "string",      
    },
    "servicio": {
        type: "number"
    },
    "control": {
      type: "string"
  },
  "condicion": {
    type: "string"
},
    "estado": {
      type: "string",      
    },
  };

   //this.cargarPap();
  }

  @ViewChild('pivot1') child: WebDataRocksPivot;
  public global = {
     localization: 'https://cdn.webdatarocks.com/loc/es.json'  
  };

  onPivotReady(pivot: WebDataRocks.Pivot): void {           
        console.log("[ready] WebDataRocksPivot", this.child);
    }

    onCustomizeCell(cell: WebDataRocks.CellBuilder, data: WebDataRocks.Cell): void {
      //console.log("[customizeCell] WebDataRocksPivot");
      if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
      if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
      if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
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

  cargarPap(){
    this.loading = true;
    this.capService.getPap().subscribe(
      (data)=> {
        this.cap = data['data'];
        this.cap.unshift(this.formato);
        this.loading = false;
        this.calcularFooterTotal(this.cap);
        console.log(this.cap);
        console.log('reporte listo');
        this.child.webDataRocks.off("reportcomplete");
        this.child.webDataRocks.setReport({
          dataSource: {
            data: this.cap
          },
          options: {
            grid: {
                type: "classic",              
                title: "Ordenes de Servicio"
              
            }
        },
          formats: [{
            name: "numeros",
            maxDecimalPlaces: 0,
            maxSymbols: 20,
            textAlign: "right"
        }],
          slice: {
              rows: [
                { uniqueName: "Organigrama"},
                {uniqueName: "desc_direccion"},
                {uniqueName: "desc_unidad"},
                {uniqueName: "desc_area"}              
            ],
              columns: [                
                {uniqueName: "control"},
                {uniqueName: "estado"},
                {uniqueName: "condicion"},
            ],
              measures: [{
                  uniqueName: "servicio",
                  aggregation: "sum",
                  format: "numeros"
              }],
              expands: {
                expandAll: true,
                rows: [
                  { tuple: [ "Organigrama" ] }
                ]
              }
          }
        });
      }

    );
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

