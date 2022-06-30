import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { OrdenService } from '../service/orden.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent} from 'primeng/primeng';
import { valueFromNode } from 'apollo-utilities';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'zd-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[OrdenService,ExcelService]
})
export class OrdenComponent implements OnInit {
 ordenes:any[];
 cols: any[];
 frozenCols: any[];
 criterios:any[];
 estadosControl:any[];
 controles:any[];
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
 zonales:any[];
 controles2:SelectItem[];
 condiciones:SelectItem[];

  constructor(private ordenService:OrdenService,private excelService:ExcelService) { }

  ngOnInit() {
    this.cols = [   
      { field: 'orden', header: 'Orden' ,ancho:'1.0em',estilo: {'font-size':'0.7em'},rowspan:'1',visible:true,numero:false},      
        { field: 'nro_pedido', header: 'Pedido', ancho:'1.0em',estilo: { 'font-size':'0.7em'},rowspan:'1',visible:true,numero:false},        
        { field: 'id', header: 'ID', ancho:'0.8em',estilo: { 'font-size':'0.7em'},rowspan:'1',visible:true,numero:false},        
        { field: 'nombre_depend', header: 'Area ',ancho:'4.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'nro_ruc', header: 'Ruc',ancho:'1.7em',estilo: {'font-size':'0.7em'},rowspan:'1',visible:true,numero:false },        
        { field: 'nombre_prov', header: 'Proveedor' ,ancho:'4.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},          
        { field: 'dsc_orden', header: 'Servicio',ancho:'12.5em',estilo: {'font-size':'0.6em'} },            
        { field: 'plazos', header: 'Plazo', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'valor', header: 'Valor',ancho:'1.5em',estilo: {'font-size':'0.65em'},rowspan:'1',visible:true,numero:false },                
        //{ field: 'fin', header: 'Fin', ancho:'3.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'inicio', header: 'Inicio',ancho:'1.5em',estilo: {'font-size':'0.65em'},rowspan:'1',visible:true,numero:false },  
        { field: 'fin', header: 'Fin',ancho:'1.5em',estilo: {'font-size':'0.65em'},rowspan:'1',visible:true,numero:false },  
        { field: 'condicion', header: 'Condicion',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },                                         
        { field: 'estados', header: 'Estados',ancho:'1.5em',estilo: {'font-size':'0.65em'},rowspan:'1',visible:true,numero:false },                                         
        { field: 'control', header: 'Control',ancho:'1.4em',estilo: {'font-size':'0.65em'},rowspan:'1',visible:true,numero:false },
        { field: 'vigencia', header: 'Vigencia',ancho:'1.5em',estilo: {'font-size':'0.65em'},rowspan:'1',visible:true,numero:false },
        { field: 'tipo', header: 'Tipo',ancho:'1.5em',estilo: {'font-size':'0.65em'},rowspan:'1',visible:true,numero:false },                                                                         
    ];
    
    this.criterios = [    
      { label: 'N° Ruc', value: 'nro_ruc' },
      { label: 'Nombres', value: 'nombre_prov' },
      { label: 'N° Orden', value: 'orden' } ,
      { label: 'N° Pedido', value: 'nro_pedido' } ,
      { label: 'Servicio', value: 'dsc_orden' }    
  ];

  this.estadosControl = [    
    { label: 'TODOS', value: 'TODOS' },  
    { label: 'NINGUNO', value: 'NINGUNO' },
    { label: 'PENDIENTE', value: 'PENDIENTE' },
    { label: 'VIGENTE', value: 'VIGENTE' },
    { label: 'FINALIZADO', value: 'FINALIZADO' },
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

    this.condiciones = [          
      { label: 'PERMANENTE', value: 'PERMANENTE' },
      { label: 'TEMPORAL', value: 'TEMPORAL' },
      { label: 'PROYECTO', value: 'PROYECTO' }      
    ];

    

   this.buscar(null,null,1,'TODOS','TDODOS','TODOS','TODOS');
  }

  onRowEditInit(book:any) {
    console.log(book);
  }

  onRowEditSave(book:any) {
    console.log(book);
    this.ordenService.postControl(book.data).subscribe((data)=>{
      console.log(data);
    });    
  }

  onRowEditCancel(book:any) {
    console.log(book);
  }



  changeParametro(event,criterio){
    if(!event.value){
      this.p=null;
      this.v=null;
      this.c=null;
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

  filtroCondicion(valor){    
    if (valor.value){
      this.condi=valor.value.value; 
      this.buscar(null,null,1,this.e,this.z,this.c,this.condi);
      }
      else
      {
        this.c='TODOS';
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
    if (criterio!=null || estado!=null) {
        param={parametro:campo,
               valor:criterio,
               estado:estado,
               centro_costo:zonales,
               control:control,
               condicion:condicion};
        console.log('pa',param);            
    }    
    this.loading = true;
    this.ordenService.postOrdenes(param,'?page='+page).subscribe(
      (res)=> {  
        console.log(res);
        this.ordenes = res['orden']['data'];
        this.totalRecords = res['orden']['total'];
        this.rowCount=res['orden']['per_page'];
        this.zonales = [];
        for (let entry of res['zonales']) {       
          this.zonales.push({label : entry.nombre_depend , value : {id: entry.centro_costo, desc_area: entry.nombre_depend } } )          
         }  
        console.log('zonales',this.zonales);
       //this.totalRecords = ;
        this.loading = false;
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

  calcularFooterTotal(tra){
      this.TotalServicios=0;

    if (tra) {
      for(let item of tra) {          
        this.TotalServicios+= parseFloat(item.servicio);

      }
    }
  }

  exportAsXLSX(){    
    this.ordenService.getDescarga().subscribe((data)=>
    {
      
    });
  }
  
}

