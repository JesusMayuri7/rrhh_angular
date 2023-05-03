import { Component, OnInit, ɵConsole } from '@angular/core';

import { CapService } from '../service/cap.service';
import { Cap} from '../interface';
import { ExcelService } from '../service/excel.service';
import {ViewEncapsulation} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
//import {LeftPadPipe} from '../pipes/lpad';


import { ControlComponent } from "./control.component";

@Component({
  selector: 'zd-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService,MessageService,CapService,ExcelService]
})
export class CapComponent implements OnInit {
 cap:any[];
 cols: any[];
 estados:any[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
  constructor(private capService:CapService,private messageService: MessageService,private excelService:ExcelService,public dialogService: DialogService) { }

  ngOnInit() {
    this.cols = [
      { field: 'presupuesto', header: 'Ppto.' ,width:'3%',tamanio:'0.5em'},
      { field: 'nroCap', header: 'Cap' ,width:'2%',tamanio:'0.5em'},
      { field: 'plaza', header: 'Air' ,width:'3%',tamanio:'0.5em'},
      { field: 'meta', header: 'Meta' ,width:'3%',tamanio:'0.5em'},
      { field: 'CapSituacion', header: 'Situacion' ,width:'5%',tamanio:'0.5em'},            
      { field: 'desc_unidad', header: 'Unidad' ,width:'10%',tamanio:'0.5em'},            
      { field: 'cargocap', header: 'Cargo' ,width:'18%',tamanio:'0.5em'},    
      { field: 'PapSituacion', header: 'Condicion' ,width:'8%',tamanio:'0.5em'},      
      { field: 'Establecimiento', header: 'Establec.' ,width:'4%',tamanio:'0.5em'},
      { field: 'papNombres', header: 'Nombres' ,width:'15%',tamanio:'0.5em'},
      { field: 'nivelDes', header: 'Escala' ,width:'2.5%',tamanio:'0.5em'},
      { field: 'monto', header: 'Monto' ,width:'5%',tamanio:'0.5em'},
      //{ field: 'MtxEscala', header: 'Escala' ,width:'3%',tamanio:'0.5em'},
      { field: 'MatrizNombres', header: 'Nombres' ,width:'15%',tamanio:'0.5em'},
      { field: 'MatrizEstado', header: 'Estado' ,width:'3.5%',tamanio:'0.5em'}
    ];
    /*
    this.estados = [    
      { label: 'OCUPADO', value: 'OCUPADO' },
      { label: 'VACANTE', value: 'VACANTE' },
      { label: 'OCUPADO_CF_CAS', value: 'OCUPADO_CF_CAS' },
      { label: 'OCUPADO_LSG', value: 'OCUPADO_LSG' },
      { label: 'OCUPADO_PAC', value: 'OCUPADO_PAC' },
      { label: 'OCUPADO_PL_RES', value: 'OCUPADO_PL_RES' },
      { label: 'OCUPADO_706', value: 'OCUPADO_706' }            
    ];
    */

    this.estadosControl = [    
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'VACANTE', value: 'VACANTE' },
    { label: 'VACIOS', value: null }  
    ];

   this.cargarCap();
  }

/*   showEdit(servicio) {    
    if (servicio.MtxId){
        const ref = this.dialogService.open(NuevoMatrizComponent, {
            data: {
                accion:'edit',
                cap_data: servicio
            },
            header: 'Editar Control Personal Cap',
            width: '25%'
        });
        ref.onClose.subscribe((car) => {    
          if (car) {          
              this.cargarCap();
              this.messageService.add({severity:'success', summary: 'Control de Personal', detail:car.message});
          }
        });
    }
    else 
         this.showNew(servicio);
  } */

/*   showNew(servicio) {    
    console.log(servicio);
    const ref = this.dialogService.open(NuevoMatrizComponent, {
         data: {
            accion:'new',
            cap_data: servicio            
        },
        header: 'Nuevo Control Personal Cap',
        width: '25%'
    });

    ref.onClose.subscribe((car) => {
      console.log('car',car);
      if (car) {          
          this.cargarCap();
          this.messageService.add({severity:'success', summary: 'Control de Personal', detail:car.message});
      }
    });
  } */

  showControl(servicio) {    
    console.log('servicio',servicio);
    const ref = this.dialogService.open(ControlComponent, {
         data: {
            accion:'new',
            cap_data: servicio            
        },
        header: 'Historial de Plaza Cap',
        width: '85%'
    });

    ref.onClose.subscribe((car) => {
      console.log('car',car);
      if (car) {          
          this.cargarCap();
          this.messageService.add({severity:'success', summary: 'Control de Personal', detail:car.message});
      }
    });
  }

  addFilter(dt,a) {    
   let valores = [];   
   a.value.forEach((element,index) => {        
   /*if (a.value.length-1 == index)
        valores = valores.concat(element['value']['desc_estado'])
    else*/
        valores.push(element['desc_estado'])
        //valores = valores.concat(element['value']['desc_estado'],",");
   });
   dt.filter(valores, 'PapSituacion', 'in');   
    //this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  handleFilter(event){    
    this.filtrados = event.filteredValue.length;
  }

  cargarCap(){
    this.loading = true;
    this.capService.getCap().subscribe(
      (data)=> {        
        this.cap = data['cap'];
        this.estados = [];
        for (let entry of data['estado']) {       
          this.estados.push({label : entry.desc_estado , value : {id: entry.id, desc_estado: entry.desc_estado, situacion : entry.situacion } } )          
         }             
        this.loading = false;
         }
    );
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.cap, 'Cap_');
 }
  
}

