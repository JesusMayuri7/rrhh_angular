import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { AirHspService } from './airhsp.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent} from 'primeng/primeng';

@Component({
  selector: 'zd-airhsp',
  templateUrl: './airhsp.component.html',
  styleUrls: ['./airhsp.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AirHspComponent implements OnInit {
 ordenes:any[];
 cols: any[];
 frozenCols: any[];
 criterios:any[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 data:{};
 totalRecords:number=0;
 rowCount:number=0;
 p:string;
 v:string;
     RemPrinRO:number = 0;
     RemPrinRDR:number = 0;
     BonFam:number = 0;
     BonifEsco:number = 0;
     BoniPatrias:number = 0;
     BoniNavidad:number = 0; 
     BoniExtJulio:number =0;
     BoniExtDic:number =0;
     Essalud:number = 0;

  constructor(private airhspService:AirHspService,private excelService:ExcelService) { }

  ngOnInit() {
    this.cols = [   
      { field: 'codigo_plaza', header: 'N° Plaza' ,ancho:'1.8em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},      
      { field: 'numero_documento', header: 'Dni', ancho:'2.5em',estilo: { 'font-size':'0.8em'},rowspan:'1',visible:true,numero:false},        
        { field: 'nombres', header: 'Nombres', ancho:'10.0em',estilo: { 'font-size':'0.8em'},rowspan:'1',visible:true,numero:false},        
        { field: 'desc_cargo_funcional', header: 'Cargo ',ancho:'8.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },          
        { field: 'desc_establecimiento', header: 'Establecimiento' ,ancho:'10em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},          
        { field: 'desc_unidad_organica', header: 'Unidad',ancho:'10em',estilo: {'font-size':'0.6em'} },    
        { field: 'RemPrinRO', header: 'Rem. Ro',ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'RemPrinRDR', header: 'Rem. RDR',ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },                
        { field: 'BonFam', header: 'Bon. Fam.', ancho:'2.5em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'BonifEsco', header: 'Escolar.', ancho:'2.5em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'BoniPatrias', header: 'Bon. Patrias',ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },
        { field: 'BoniNavidad', header: 'Bon. Nav.',ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'BoniExtJulio', header: 'Eon. Ext. Jul.',ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },                
        { field: 'BoniExtDic', header: 'Bon. Ext Dic.', ancho:'2.5em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},        
        { field: 'Essalud', header: 'Essalud',ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false }     
    ];
    this.criterios = [    
      { label: 'N° Ruc', value: 'nro_ruc' },
      { label: 'Nombres', value: 'nombre_prov' },
      { label: 'N° Orden', value: 'nro_orden' } ,
      { label: 'Servicio', value: 'dsc_orden' }    
  ];

    this.estadosControl = [    
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'VACANTE', value: 'VACANTE' },
    { label: 'VACIOS', value: null }  
    ];

   this.buscar(null,null,1);
  }

  changeParametro(event,criterio){
    if(!event.value){
      this.p=null;
      this.v=null;
      criterio.value='';
      this.buscar(null,null,1);
    }
  }

  handleFilter(event){    
   // console.log('filter',event.filters);
    this.filtrados = event.filteredValue.length;
    this.calcularFooterTotal(event.filteredValue);
  }

  buscar(campo,criterio,page){
    let param={};
    if (criterio!=null) {
      console.log('buscar',campo,criterio);
        param={parametro:campo,
               valor:criterio};}    
    this.loading = true;
    
    this.airhspService.getAirHsp().subscribe(
      (res)=> {        
        console.log(res);
        this.ordenes = res['data'];
        this.loading = false;
        this.calcularFooterTotal(this.ordenes);
      }
    )
  }

  filtros(event,para){
   console.log('CAMPO',event.target.value,'VALOR',para.value.value);
   this.v=event.target.value;
   this.p=para.value.value;
   this.buscar(this.p,this.v,1);
  }

  loadCarsLazy(event:LazyLoadEvent) {    
    let pages=1;
    pages= Math.trunc((event.first/this.rowCount)+1);
    this.loading = true;      
    if ((this.p!=null) && (this.v!=null))
      this.buscar(this.p,this.v,pages);    
    else
      this.buscar(null,null,pages);    
    
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort in single sort mode
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    //filters: Filters object having field as key and filter value, filter matchMode as value
    //globalFilter: Value of the global filter if available
   // this.cars = //do a request to a remote datasource using a service and return the cars that match the lazy load criteria
}

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.ordenes, 'AirHsp_');
 }

  calcularFooterTotal(tra){
     this.RemPrinRO = 0;
     this.RemPrinRDR = 0;
     this.BonFam = 0;
     this.BonifEsco = 0;
     this.BoniPatrias = 0;
     this.BoniNavidad = 0; 
     this.BoniExtJulio =0;
     this.BoniExtDic =0;
     this.Essalud = 0;
    if (tra) {
      for(let item of tra) {          
        
        this.RemPrinRO += parseFloat(item.RemPrinRO);
        this.RemPrinRDR += parseFloat(item.RemPrinRDR);
        this.BonFam += parseFloat(item.BonFam);
        this.BonifEsco += parseFloat(item.BonifEsco);
        this.BoniPatrias += parseFloat(item.BoniPatrias);
        this.BoniNavidad += parseFloat(item.BoniNavidad); 
        this.BoniExtJulio +=parseFloat(item.BoniExtJulio);
        this.BoniExtDic += parseFloat(item.BoniExtDic);
        this.Essalud += parseFloat(item.Essalud);
      }
    }
  }
  
}

