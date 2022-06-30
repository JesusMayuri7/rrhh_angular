import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { SigaZService } from './sigaz.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent} from 'primeng/primeng';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'zd-sigaz',
  templateUrl: './sigaz.component.html',
  styleUrls: ['./sigaz.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[SigaZService,ExcelService]
})
export class SigaZComponent implements OnInit {
 ordenes:any[];
 cols: any[];
 frozenCols: any[];
 criterios:any[];
 estadosControl:any[];
 zonales:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 data:{};
 totalRecords:number=0;
 rowCount:number=0;
 p:string;
 v:string;
 e:string='TODOS';
 z:string='TODOS';
 c:string='TODOS';
 condi:string='TODOS';
 controles:SelectItem[];
 controles2:SelectItem[];
 condiciones:SelectItem[];
 condiciones2:SelectItem[];

  constructor(private sigazService:SigaZService,private excelService:ExcelService) { }

  ngOnInit() {
    this.cols = [   
      { field: 'orden', header: 'Orden' ,ancho:'1.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},      
        { field: 'nro_pedido', header: 'Req.', ancho:'1.0em',estilo: { 'font-size':'0.8em'},rowspan:'1',visible:true,numero:false},        
        { field: 'id', header: 'ID', ancho:'1.0em',estilo: { 'font-size':'0.8em'},rowspan:'1',visible:true,numero:false},        
        { field: 'nombre_depend', header: 'Area ',ancho:'3.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'nro_ruc', header: 'Ruc',ancho:'2.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },        
        { field: 'nombre_prov', header: 'Proveedor' ,ancho:'4.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},          
        { field: 'dsc_orden', header: 'Servicio',ancho:'15.5em',estilo: {'font-size':'0.6em'} },    
        { field: 'plazos', header: 'Plazo', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'valor', header: 'Valor',ancho:'1.2em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },                
        { field: 'inicio', header: 'Fecha',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'fin', header: 'Fin', ancho:'1.5em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'estados', header: 'Estado',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },
        { field: 'control', header: 'Control',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },
        { field: 'condicion', header: 'Condicion',ancho:'1.6em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },
        { field: 'vigencia', header: 'Vigencia',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false }                
    ];
    this.criterios = [    
      { label: 'N° Ruc', value: 'ruc' },
      { label: 'Nombres', value: 'nombre_prov' },
      { label: 'N° Orden', value: 'orden' },
      { label: 'N° Pedido', value: 'nro_pedido' },   
      { label: 'Servicio', value: 'dsc_orden' }    
  ];

    this.estadosControl = [    
    { label: 'TODOS', value: 'TODOS' },  
    { label: 'NINGUNO', value: 'NINGUNO' },
    { label: 'PENDIENTE', value: 'PENDIENTE' },
    { label: 'VIGENTE', value: 'VIGENTE' },
    { label: 'FINALIZADO', value: 'FINALIZADO' },
    ];

    this.condiciones = [    
      { label: 'TODOS', value: 'TODOS' },  
      { label: 'PERMANENTE', value: 'PERMANENTE' },
      { label: 'TEMPORAL', value: 'TEMPORAL' },      
    ];

    this.condiciones2 = [     
      { label: 'NINGUNO', value: null },       
      { label: 'PERMANENTE', value: 'PERMANENTE' },
      { label: 'TEMPORAL', value: 'TEMPORAL' },      
    ];

    this.controles = [    
      { label: 'TODOS', value: 'TODOS' },  
      { label: 'LOCADOR', value: 'LOCADOR' },
      { label: 'OTROS', value: 'OTROS' },
      { label: 'NINGUNO', value: 'NINGUNO' }      
    ];

    this.controles2 = [          
      { label: 'LOCADOR', value: 'LOCADOR' },
      { label: 'OTROS', value: 'OTROS' },
      { label: 'NINGUNO', value: 'NINGUNO' }      
    ];

    this.zonales = [    
      { label: 'TODOS', value: 'TODOS' },  
      { label: 'ZONAL PIURA TUMBES', value: '2' },
      { label: 'ZONAL LAMBAYEQUE', value: '3' },
      { label: 'ZONAL AMAZONAS', value: '4' },
      { label: 'ZONAL CAJAMARCA', value: '5' },
      { label: 'ZONAL LA LIBERTAD', value: '7' },
      { label: 'ZONAL ANCASH', value: '8' },
      { label: 'ZONAL SAN MARTIN - LORETO', value: '9' },
      { label: 'ZONAL HUANUCO - UCAYALI', value: '19' },
      { label: 'ZONAL UCAYALI', value: '20' },
      { label: 'ZONAL JUNIN PASCO', value: '6' },
      { label: 'ZONAL LIMA', value: '11' },
      { label: 'ZONAL ICA', value: '12' },
      { label: 'ZONAL HUANCAVELICA', value: '13' },
      { label: 'ZONAL AYACUCHO', value: '14' },
      { label: 'ZONAL AREQUIPA', value: '15' },
      { label: 'ZONAL MOQUEGUA TACNA', value: '16' },
      { label: 'ZONAL PUNO', value: '17' },
      { label: 'ZONAL CUSCO APURIMAC', value: '18' },      
      ];

   this.buscar(null,null,1,'TODOS','TODOS','TODOS','TODOS');
  }

  onRowEditInit(book:any) {
    console.log(book);
  }
  
  onRowEditSave(book:any) {
    console.log(book);
    this.sigazService.postControl(book.data).subscribe((data)=>{
      console.log(data);
    });    
  }
  
  onRowEditCancel(book:any) {
    console.log(book);
  }

  filtroControl(valor){    
    if (valor.value){
      this.c=valor.value.value; 
      this.buscar(null,null,1,this.e,this.z,this.c,this.condi);
      }
      else
      {
        this.c='TODOS';
        this.buscar(null,null,1,'TODOS',this.z,this.c,this.condi);
      }
  }

  changeParametro(event,criterio){
    if(!event.value){
      this.p=null;
      this.v=null;
      criterio.value='';
      this.buscar(null,null,1,'TODOS','TODOS','TODOS','TODOS');
    }
  }

  handleFilter(event){    
   // console.log('filter',event.filters);
    this.filtrados = event.filteredValue.length;
    this.calcularFooterTotal(event.filteredValue);
  }

  filtroEstado(valor){           
    if (valor.value){
    this.e=valor.value.value; 
    this.buscar(null,null,1,this.e,this.z,this.c,this.condi);
    }
    else
    {
      this.e='TODOS';
      this.buscar(null,null,1,'TODOS',this.z,this.c,this.condi);
    }
   }

   filtroZonal(valor){    
    if(valor.value) {      
      this.z =valor.value.value;       
      this.buscar(null,null,1,this.e,this.z,this.c,this.condi);
    }
    else
    {
      this.z='TODOS';
      this.buscar(null,null,1,this.e,'TODOS','TODOS','TODOS');    
    }
 }



  buscar(campo,criterio,page,estado,zonales,control,condicion){
    let param={};
    if (criterio!=null || estado!=null ) {
        param={parametro:campo,
               valor:criterio,
               estado:estado,
               zonales:zonales,
               control:control,
               condicion:condicion};
        console.log('pa',param);
              }    
    this.loading = true;    
    this.sigazService.postOrdenes(param,'?page='+page).subscribe(
      (res)=> {    
        this.loading = false;
        console.log('res',res);    
        this.ordenes = res['data']['data'];
        this.totalRecords = res['data']['total'];
        this.rowCount=res['data']['per_page'];
        //this.zonales = [];
      /*  for (let entry of res['zonales']) {       
          this.zonales.push({label : entry.desc_area , value : {id: entry.id, desc_area: entry.desc_area, ejecutora_id : entry.ejecutora_id } } )          
         }  */
       //this.totalRecords = ;
        //this.calcularFooterTotal(this.cap);
      }
    );
  }

  filtros(event,para){
   console.log('CAMPO',event.target.value,'VALOR',para.value.value);
   this.v=event.target.value;
   this.p=para.value.value;

   this.buscar(this.p,this.v,1,this.e,this.z,this.c,this.condi);
  }

  loadCarsLazy(event:LazyLoadEvent) {    
    let pages=1;
    pages= Math.trunc((event.first/this.rowCount)+1);
    this.loading = true;  
    console.log(this.p,this.v);
    if ((this.p!=null) && (this.v!=null))
      this.buscar(this.p,this.v,pages,this.e,this.z,this.c,this.condi);    
    else
      this.buscar(null,null,pages,this.e,this.z,this.c,this.condi);    
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
    this.excelService.exportAsExcelFile(this.ordenes, 'Ordenes_');
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

