import { Component, OnInit } from '@angular/core';

import { ServiciosService } from '../service/servicios.service';
import { ExcelService } from '../service/excel.service';
import {ViewEncapsulation} from '@angular/core';
import * as alasql from 'alasql';
import { NuevoPersonal } from './nuevo_personal.component';
import { EditarPersonal } from './editar_personal.component';
import {DialogService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { NuevoServicioComponent } from './nuevo_servicio.component';

@Component({
  selector: 'zd-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService,MessageService,ServiciosService,ExcelService]
})
export class ServiciosComponent implements OnInit {
 funcional:any[];
 direccion:any[];
 unidad:any[];
 area:any[];
 cols: any[];
 frozenCols: any[];
 estados:any[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 res:any[];
 datin:any[];
 servicios:any[];

  constructor(private capService:ServiciosService,private excelService:ExcelService,public dialogService: DialogService,private messageService: MessageService,) { }

  ngOnInit() {
    this.cols = [   
      { field: 'id', header: 'ID' ,ancho:'0.6em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},      
        { field: 'servicio', header: 'Servicio / Cargo', ancho:'9.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},        
        //{ field: 'especifica', header: 'Especifica',ancho:'6em',estilo: {'font-size':'0.6em'} },    
        { field: 'desc_unidad', header: 'Unidad' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},          
        { field: 'desc_area', header: 'Area',ancho:'2.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'establecimiento', header: 'Dependencia', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},        
        { field: 'autorizacion', header: 'Autorizacion', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},             
        { field: 'condicion', header: 'Condicion', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},                
        { field: 'creado', header: 'Creado', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},        
        { field: 'expediente', header: 'Expediente', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},               
        { field: 'estado', header: 'Estado', ancho:'1.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false}, 
    ];
    this.estados = [    
      { label: 'TODOS', value: null },
      { label: 'OCUPADO', value: 'OCUPADO' },
      { label: 'VACANTE', value: 'VACANTE' },
      { label: 'OCUPADO_CF_CAS', value: 'OCUPADO_CF_CAS' },
      { label: 'OCUPADO_LSG', value: 'OCUPADO_LSG' },
      { label: 'OCUPADO_PAC', value: 'OCUPADO_PAC' },
      { label: 'OCUPADO_PL_RES', value: 'OCUPADO_PL_RES' }            
  ];

    this.estadosControl = [    
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'VACANTE', value: 'VACANTE' },
    { label: 'VACIOS', value: null }  
    ];
    this.datin = [{a:1,b:1,c:1},{a:1,b:2,c:1},{a:1,b:3,c:1}, {a:2,b:1,c:1}];
   this.cargarPap();
  }

  handleFilter(event){
    this.filtrados = event.filteredValue.length;
    console.log(event);
    this.calcularFooterTotal(event.filteredValue);
  }

  actualizar(event){    
   this.cargarPap();

  }

  showNewPersonal(servicio) {
    console.log('servicio',servicio);
    const ref = this.dialogService.open(NuevoPersonal, {
         data: {
            servicio_id: servicio.id
        },
        header: 'Nuevo Personal de Servicio',
        width: '30%'
    });
    ref.onClose.subscribe((car) => {
    
     console.log('car',car);  
     let index= this.servicios.findIndex(x => x.id ===car.data.servicios_id);
     console.log('index',index.toString);
     this.servicios[index].servicios_detalle.push(car.data);
    //this.servicios.map((a) => a.servicio_id == car.servicio_id ? a.push(car));

    /*  if (car) {                  
        this.cargarPap();
          this.messageService.add({severity:'success', summary: 'Control de Personal', detail:car.message});
      }*/

/*
      join(cabecera, detalle){
        return cabecera.map(cab => {  // itera cada item array cab       
          let paso = detalle.filter(det => (det.Id2 == cab.Id));  // filtra cada item , y devuelve solo los que cumplen                           
          let completo = Object.assign([], cab); // crea una copia 
          completo['detalle']=paso;  // crea un nuevo argumento 'det' y asigna un nuevo valor 'paso'
          return completo;       
        })
    }      */

    });
  }

showEditPersonal(servicio) {
  console.log('servicio',servicio);
  const ref = this.dialogService.open(EditarPersonal, {
       data: {
          personal: servicio
      },
      header: 'Editar Personal de Servicio',
      width: '30%'
  });
  ref.onClose.subscribe((car) => {
    if (car) {                  
      this.cargarPap();
        this.messageService.add({severity:'success', summary: 'Control de Personal', detail:car.message});
    }
  });
}

showEliminarPersonal(servicio) {
  console.log('eliminar',servicio);
  this.capService.delPersonal(servicio.id)
  .subscribe(info => {
      console.log(info);      
  });
}

showNewServicio(f,d,u,a) {
  //console.log('todos',f,d,u,a);
  if (a) {//verificar area
     const ref = this.dialogService.open(NuevoServicioComponent, {
       data: {
          funcional: f,
          direccion: d,
          unidad:u,
          area:a
      },
      header: 'Nuevo Servicio',
      width: '30%'
  });
  ref.onClose.subscribe((car) => {    
    if (car) {          
      console.log('area a',a);
      this.loading = true;    
      this.capService.getPap().subscribe(
        (data)=> {
          this.funcional=[];
          this.funcional = data['organigrama'];
          this.servicios = data['servicios'];
          this.res = alasql('SELECT * FROM ? where orgAid = ?',[this.servicios,a.id]);          
          this.loading = false;
          this.calcularFooterTotal(this.funcional);          
          this.messageService.add({severity:'success', summary: 'Control de Personal', detail:car.message}); 
        }     
      );
    
        //this.res = alasql('SELECT * FROM ? where orgAid = ?',[this.servicios,a.area.id]);        
    }
  });
  }
  else
  this.messageService.add({severity:'error', summary: 'Nuevo Servicio', detail:'Elija el area asignada'});

  
}

  changeFuncional(event){
    if (event.value) {
      this.direccion = event.value.direcciones;  
      this.res = alasql('SELECT * FROM ? where orgFid = ?',[this.servicios,event.value? event.value.id: 0]);
      if (this.res.length==0)
      this.res = alasql('SELECT * FROM ? where orgFid = ?',[this.servicios,event.value.id]);
    }
    else {
        this.res = alasql('SELECT * FROM ?',[this.servicios]);
        this.direccion = [];
        this.unidad=[];
        this.area=[];
    }
            
  }

  changeDireccion(event){
    if (event.value) {
      this.unidad = event.value.unidades;  
      this.res = alasql('SELECT * FROM ? where orgDid = ?',[this.res,event.value.id]);
      if (this.res.length==0)
      this.res = alasql('SELECT * FROM ? where orgDid = ?',[this.servicios,event.value.id]);
    }
    else {
    //this.unidad = [];
    this.res = alasql('SELECT * FROM ? where orgFid =?',[this.servicios,this.res[0]? this.res[0].orgFid : 0]);
    }
  }

  changeUnidad(event){
    if (event.value) {
      this.area = event.value.areas;        
      this.res = alasql('SELECT * FROM ? where orgUid = ?',[this.res,event.value.id]);
      if (this.res.length==0)
      this.res = alasql('SELECT * FROM ? where orgUid = ?',[this.servicios,event.value.id]);
    }
    else {            
      this.res = alasql('SELECT * FROM ? where orgDid = ?',[this.servicios, this.res[0]? this.res[0].orgDid : 0]);
    }
  }

    changeArea(event){
      if (event.value) {        
        this.res = alasql('SELECT * FROM ? where orgAid = ?',[this.res,event.value.id]);
      }
      else {                
        this.res = alasql('SELECT * FROM ? where orgUid = ?',[this.servicios,this.res[0]? this.res[0].orgUid :0 ]);        
      }
  }

  cargarPap(){
    this.loading = true;    
    this.capService.getPap().subscribe(
      (data)=> {
        this.funcional=[];
        this.funcional = data['organigrama'];
        this.servicios = data['servicios'];
        this.res = alasql('SELECT * FROM ? ',[this.servicios]);        
        this.loading = false;
        this.calcularFooterTotal(this.funcional);
        console.log('servicios',this.servicios);       
      }     
    );
  }

  exportAsXLSX():void {
    //this.excelService.exportAsExcelFile(this.cap, 'Pap_');
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

