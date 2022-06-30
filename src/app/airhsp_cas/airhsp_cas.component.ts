import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { AirhspCasService } from './airhsp_cas.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import { AirhspCasNuevoComponent } from './airhsp_cas_nuevo.component';
import { AirhspCasPlazaComponent } from './airhsp_cas_plaza.component';
import { AirhspCasControlComponent } from './airhsp_cas_control.component';
import { AirhspCasConvocatoriaComponent } from './airhsp_cas_convocatoria.component';

@Component({
  selector: 'zd-airhsp-cas',
  templateUrl: './airhsp_cas.component.html',
  styleUrls: ['./airhsp_cas.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[AirhspCasService,ExcelService,MessageService,DialogService]
})
export class AirHspCasComponent implements OnInit {
 ordenes:any[];
 cols: any[];
 frozenCols:any[];
 resultados:any[];
 estadosControl:any[];
 sedes:any[];
 fuentes:any[];
 unidades:any[];
 vigencias:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 data:{};
 totalRecords:number=0;
 rowCount:number=0;
 p:string;
 v:string;
 selectedCar:any=[];
 convocatorias:any[];
     RemPrinRO:number = 0;
     monto:number=0;
     RemPrinRDR:number = 0;
     BonFam:number = 0;
     BonifEsco:number = 0;
     BoniPatrias:number = 0;
     BoniNavidad:number = 0; 
     BoniExtJulio:number =0;
     BoniExtDic:number =0;
     Essalud:number = 0;
     activas:number=0;
     proceso:number=0;
     concluido:number=0;


  constructor(private airhspService:AirhspCasService,private excelService:ExcelService,private messageService: MessageService,public dialogService: DialogService) { }

  ngOnInit() {
    this.cols = [   
      { field: 'id', header: '#' ,ancho:'1.0em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},      
      { field: 'codigo_plaza', header: 'N° Plaza' ,ancho:'1.8em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},      
      { field: 'fuente_id', header: 'Fuente', ancho:'2.0em',estilo: { 'font-size':'0.6em','text-align':'center'},estilo_header: {'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},        
      { field: 'meta', header: 'Meta', ancho:'2.0em',estilo: { 'font-size':'0.6em','text-align':'center'},estilo_header: {'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},        
      { field: 'sede', header: 'Sede', ancho:'2.0em',estilo: { 'font-size':'0.6em','text-align':'center'},estilo_header: {'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},        
      { field: 'bc_desc_unidad', header: 'Unidad',ancho:'7.0em',estilo: {'font-size':'0.6em','text-align':'left'} ,estilo_header:{'font-size':'0.6em','text-align':'left'} },    
      { field: 'cargo', header: 'Cargo ',ancho:'7.0em',estilo: {'font-size':'0.6em','text-align':'left'},estilo_header:{'font-size':'0.6em','text-align':'left'},rowspan:'1',visible:true,numero:false },          
      { field: 'nombres', header: 'Nombres', ancho:'8.0em',estilo: { 'font-size':'0.6em','text-align':'left'},estilo_header: {'font-size':'0.6em','text-align':'left'},rowspan:'1',visible:true,numero:false},        
      { field: 'fecha_fin_vigencia_cas', header: 'Vigencia' ,ancho:'3.0em',estilo: {'font-size':'0.6em','text-align':'left'},estilo_header:{'font-size':'0.6em','text-align':'left'},rowspan:'1',visible:true,numero:false},          
      { field: 'estado', header: 'Estado',ancho:'1.5em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false },    
      { field: 'monto', header: 'Rem.',ancho:'2.3em',estilo: {'font-size':'0.6em','text-align':'right'},estilo_header:{'font-size':'0.6em','text-align':'right'},rowspan:'1',visible:true,numero:false },        
      { field: 'bonipatrias', header: 'Agui. Jul.',ancho:'2.0em',estilo: {'font-size':'0.6em','text-align':'right'},estilo_header:{'font-size':'0.6em','text-align':'right'},rowspan:'1',visible:true,numero:false },
      { field: 'boninavidad', header: 'Agui. Dic.',ancho:'2.0em',estilo: {'font-size':'0.6em','text-align':'right'},estilo_header:{'font-size':'0.6em','text-align':'right'},rowspan:'1',visible:true,numero:false },          
      { field: 'essalud', header: 'Essalud',ancho:'2.0em',estilo: {'font-size':'0.6em','text-align':'right'},estilo_header:{'font-size':'0.6em','text-align':'right'},rowspan:'1',visible:true,numero:false },
      { field: 'solicitante', header: 'Solicitante',ancho:'7.0em',estilo: {'font-size':'0.6em','text-align':'left'} ,estilo_header:{'font-size':'0.6em','text-align':'left','width':'100%'} },    
        { field: 'certificacion', header: 'Certf.',ancho:'2.0em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false },             
        { field: 'nro_convocatoria', header: 'N° Conv.',ancho:'2.0em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false },             
        { field: 'activas', header: 'Activa',ancho:'2.0em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false },
        { field: 'proceso', header: 'Proceso',ancho:'2.0em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false },
        { field: 'concluido', header: 'Concluida',ancho:'2.0em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false },
        { field: 'resultado', header: 'Resultado',ancho:'3.0em',estilo: {'font-size':'0.6em','text-align':'center','color':'white'},estilo_header:{'font-size':'0.6em','text-align':'center','overflow':'visible'},rowspan:'1',visible:true,numero:false },
    ];
    this.resultados= [    
      { label: 'PENDIENTE ', value: 'PENDIENTE' },
      { label: 'ACTIVO ', value: 'ACTIVO' },
      { label: 'EN PROCESO ', value: 'EN PROCESO' },
      { label: 'CONCLUIDO ', value: 'CONCLUIDO' } ,
      { label: 'DESIERTO ', value: 'DESIERTO' }    
  ];

  this.vigencias= [    
    { label: 'SOSTENIBLE', value: 'SOSTENIBLE' },
    { label: '31/12/2019', value: '31/12/2019' }   
];

    this.estadosControl = [    
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'VACANTE', value: 'VACANTE' },
    { label: 'VACIOS', value: null }  
    ];

    this.sedes = [    
      { label: 'SEDE', value: 'SEDE'},
      { label: 'ZONAL',value:'ZONAL'}            
  ]; 

  this.fuentes = [    
      { label: 'RO', value: '1'},
      { label: 'RDR',value:'2'}            
  ]; 

  this.frozenCols = [
    { field: 'id', header: '#' ,ancho:'1.0em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},      
      { field: 'codigo_plaza', header: 'N° Plaza' ,ancho:'1.8em',estilo: {'font-size':'0.6em','text-align':'center'},estilo_header:{'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},      
      { field: 'fuente_id', header: 'Fuente', ancho:'2.0em',estilo: { 'font-size':'0.6em','text-align':'center'},estilo_header: {'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},        
      { field: 'sede', header: 'Sede', ancho:'2.0em',estilo: { 'font-size':'0.6em','text-align':'center'},estilo_header: {'font-size':'0.6em','text-align':'center'},rowspan:'1',visible:true,numero:false},          
];

   this.buscar(null,null,1);
  }



  open(_exp:String){
    console.log(_exp);
    var url = _exp.substring(_exp.length - 6);
    url = "http://gis.proviasnac.gob.pe/intranet/TRAMITE_doc/tramite_exp_hoja_std.asp?nu_expedref="+url+"&s_id_periodo=2019&tipo=I&opcion=5";
    window.open(url, null);
}


 newConvocatoria(servicio) {
  console.log('editar',servicio);
  const ref = this.dialogService.open(AirhspCasConvocatoriaComponent, {
      data: {
          accion:'edit',
          designaciones_data: servicio            
      },
      header: 'Nuevo proceso',
      width: '35%'
  });

  ref.onClose.subscribe((car) => {
    console.log('car',car);
    if (car) {          
        //TODO actualizar registro
         var foundIndex = this.ordenes.findIndex(x => x.id == car.data.id);        
         this.ordenes[foundIndex].cargo = car.data.cargo;              
         this.selectedCar = this.ordenes[foundIndex];
         console.log('detalle',this.ordenes[foundIndex].detalle); 
    //    this.messageService.add({severity:'success', summary: 'Convocatoria', detail:car.message});
    }
  });    
}

listConvocatoria(servicio) {
  console.log('editar',servicio);
  const ref = this.dialogService.open(AirhspCasControlComponent, {
      data: {
          accion:'edit',
          designaciones_data: servicio            
      },
      header: 'Nuevo proceso',
      width: '65%'
  });

  ref.onClose.subscribe(() => {
    console.log('carLIST',this.dialogService.dialogComponentRef.instance.componentRef.instance.cap);
    //if () {          
        //TODO actualizar registro

    
    //    this.messageService.add({severity:'success', summary: 'Convocatoria', detail:car.message});
    //}
  });    
}



  showEdit(servicio) {    
    console.log('serv',servicio);
    if (servicio.id){
        const ref = this.dialogService.open(AirhspCasNuevoComponent, {
            data: {
                accion:'edit',
                designaciones_data: servicio,
                convocatorias:this.convocatorias    
            },
            header: 'Editar Convocatoria',
            width: '30%'
        });
        ref.onClose.subscribe((car) => {    
          if (car) {          
              //this.cargarDesignaciones();
              var foundIndex = this.ordenes.findIndex(x => x.id == car.data.airhsp_id);        
              this.ordenes[foundIndex].nro_convocatoria = car.data.nro_convocatoria;          
              this.ordenes[foundIndex].certificacion = car.data.certificacion;  
              this.messageService.add({severity:'success', summary: 'Convocatoria', detail:car.message});
          }
        });
    }
    else 
         this.showNew(servicio);
  }

  showNew(servicio) {        
    const ref = this.dialogService.open(AirhspCasNuevoComponent, {
         data: {
            accion:'new',
            designaciones_data: servicio,
            convocatorias:this.convocatorias            
        },
        header: 'Nueva Convocatoria ( Codigo Plaza : '+ servicio.codigo_plaza+' )',
        width: '35%'
    });

    ref.onClose.subscribe((car) => {
      console.log('car',car);
      if (car) {          
          //TODO actualizar registro
          var foundIndex = this.ordenes.findIndex(x => x.id == car.data.airhsp_id);
        
          this.ordenes[foundIndex].nro_convocatoria = car.data.nro_convocatoria;          
          this.ordenes[foundIndex].certificacion = car.data.certificacion;          
          this.messageService.add({severity:'success', summary: 'Convocatoria', detail:car.message});
      }
    });
  }

  
  newPlaza() {        
    const ref = this.dialogService.open(AirhspCasPlazaComponent, {
         data: {
            accion:'new',
            plaza_data: []            
        },
        header: 'Editar Plaza',
        width: '35%'
    });

    ref.onClose.subscribe((car) => {
      console.log('car',car);
      if (car) {          
          //TODO actualizar registro
          var foundIndex = this.ordenes.findIndex(x => x.id == car.data.airhsp_id);    
          this.selectedCar =this.ordenes[foundIndex];   
          this.ordenes[foundIndex].nombres = car.data.nombres;          
          //this.messageService.add({severity:'success', summary: 'Convocatoria', detail:car.message});
      }
    });
  }

  editPlaza(servicio) {
      console.log('editar',servicio);
      const ref = this.dialogService.open(AirhspCasPlazaComponent, {
          data: {
              accion:'edit',
              designaciones_data: servicio            
          },
          header: 'Editar Plaza ( Codigo Plaza : '+ servicio.codigo_plaza+' )',
          width: '35%'
      });

      ref.onClose.subscribe((car) => {
        console.log('car',car);
        if (car) {          
            //TODO actualizar registro
             var foundIndex = this.ordenes.findIndex(x => x.id == car.data.id);        
             this.ordenes[foundIndex].cargo = car.data.cargo;     
             this.ordenes[foundIndex].codigo_plaza = car.data.codigo_plaza;     
             this.ordenes[foundIndex].detalle = car.data.detalle;     
             this.ordenes[foundIndex].certificacion = car.data.certificacion;     
             this.ordenes[foundIndex].fuente_id = car.data.fuente_id;     
             this.ordenes[foundIndex].meta_id = car.data.meta_id;     
             this.ordenes[foundIndex].monto = car.data.monto;     
             this.ordenes[foundIndex].bc_org_unidad_id = car.data.bc_org_unidad_id;     
             this.ordenes[foundIndex].sede = car.data.sede;
             this.ordenes[foundIndex].nombres = car.data.nombres;          
             this.selectedCar = this.ordenes[foundIndex];
             console.log('detalle',this.ordenes[foundIndex].detalle); 
        //    this.messageService.add({severity:'success', summary: 'Convocatoria', detail:car.message});
        }
      });    
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
        this.convocatorias = res['convocatorias'];
        this.selectedCar = [this.ordenes[1]];
        this.unidades = [];
        
        for (let entry of res['unidades']) {       
          this.unidades.push({label : entry.desc_unidad , value : {id: entry.id, desc_unidad: entry.desc_unidad } } )          
         }  

        this.loading = false;
        this.calcularFooterTotal(this.ordenes);
      }
    )
  }

  addFilter(dt,a) {        
    let valores = [];   
    a.value.forEach((element,index) => {        
      console.log(element);    
         valores.push(element);         
    });
    dt.filter(valores, 'resultado', 'in');        
   }

   addFilterSede(dt,a) {        
    let valores = [];   
    a.value.forEach((element,index) => {        
      console.log(element);    
         valores.push(element);         
    });
    dt.filter(valores, 'sede', 'in');        
   }

   addFilterFuente(dt,a) {        
    let valores = [];   
    a.value.forEach((element,index) => {        
      console.log(element);    
         valores.push(element);         
    });
    dt.filter(valores, 'fuente_id', 'in');        
   }

   addFilterUnidad(dt,a) {    
    console.log(dt,a.value);
    let valores = [];   
    a.value.forEach((element,index) => {        
      console.log(element);
        valores.push(element.desc_unidad);
    });
    dt.filter(valores, 'bc_desc_unidad', 'in');        
   }

   addFilterSolicitante(dt,a) {        
    let valores = [];   
    a.value.forEach((element,index) => {                  
         valores.push(element.desc_unidad);    
    });
    dt.filter(valores, 'solicitante', 'in');        
   }

   addFilterVigencias(dt,a) {    
    console.log(dt,a.value);
    let valores = [];   
    a.value.forEach((element,index) => {        
      console.log(element);
    /*if (a.value.length-1 == index)
         valores = valores.concat(element['value']['desc_estado'])
     else*/
         valores.push(element);
         //valores = valores.concat(element['value']['desc_estado'],",");
    });
    dt.filter(valores, 'fecha_fin_vigencia_cas', 'in');   
     //this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
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
    this.excelService.exportAsExcelFile(this.ordenes, 'AirHspCas_');
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
     this.activas=0;
     this.proceso=0;
     this.concluido=0;
     this.monto=0;
    if (tra) {
      
      for(let item of tra) {                  
        this.RemPrinRO += parseFloat(item.remprinro);
        this.RemPrinRDR += parseFloat(item.remprinrdr);
        this.monto += parseFloat(item.monto);        
        this.BoniPatrias += parseFloat(item.bonipatrias? item.bonipatrias:0);
        this.BoniNavidad += parseFloat(item.boninavidad? item.boninavidad:0);         
        this.Essalud += parseFloat(item.essalud? item.essalud:0);
        this.activas += parseFloat(item.activas? item.activas: 0);
        this.proceso += parseFloat(item.proceso? item.proceso:0);
        this.concluido += parseFloat(item.concluido? item.concluido:0);
        
      }
    }
  }
  
}

