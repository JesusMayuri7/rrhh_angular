import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { ExcelService } from '../service/excel.service';

import {DialogService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {DesignacionService  } from "./designacion.service";

//import {LeftPadPipe} from '../pipes/lpad';

import { DesignacionNuevoComponent } from './designacion_nuevo.component';
import { DesignacionControlComponent } from "./designacion_control.component";

@Component({
  selector: 'zd-designaciones',
  templateUrl: './designacion.component.html',
  styleUrls: ['./designacion.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService,MessageService,DesignacionService,ExcelService]
})
export class DesignacionComponent implements OnInit {
 designaciones:any[];
 cols: any[];
 estados:any[];
 estadosControl:any[];
 selectdesignaciones:any;
 loading:boolean;
 filtrados:number=0;
  constructor(private DesignacionService:DesignacionService,private messageService: MessageService,private excelService:ExcelService,public dialogService: DialogService) { }

  ngOnInit() {
    this.cols = [  // adecuar estilo en la vista
      { field: 'id', header: 'ID' ,width:'1.3%',estilo:{'font-size':'0.6em','text-align':'right'}},
      { field: 'desc_unidad', header: 'Oficina' ,width:'11%',estilo:{'font-size':'0.6em','margin': '-1.0em'}},
      { field: 'cargo', header: 'Cargo' ,width:'15%',estilo:{'font-size':'0.6em','margin': '-1.0em'}},
      { field: 'dni', header: 'Dni' ,width:'3%',estilo:{'font-size':'0.6em','margin': '-1.0em','text-align':'center'}},
      { field: 'nombres', header: 'Nombres' ,width:'10%',estilo:{'font-size':'0.6em','margin': '-1.0em'}},
      { field: 'inicio', header: 'Inicio' ,width:'4%',estilo:{'font-size':'0.6em','margin': '-1.0em','text-align':'center'}},            
      { field: 'fin', header: 'Fin' ,width:'4%',estilo:{'font-size':'0.6em','margin': '-1.0em','text-align':'center'}},    
      { field: 'doc_designacion', header: 'Doc. Desig.' ,width:'8%',estilo:{'font-size':'0.6em','margin': '-1.0em'}},      
      { field: 'doc_cese', header: 'Doc. Cese' ,width:'8%',estilo:{'font-size':'0.6em','margin': '-1.0em'}},
      { field: 'direccion', header: 'Direccion' ,width:'14%',estilo:{'font-size':'0.6em','margin': '-1.0em'}},
      { field: 'modalidad', header: 'Modalidad' ,width:'3.5%',estilo:{'font-size':'0.6em','margin': '-1.0em'} }      ,
      { field: 'tipo', header: 'Tipo' ,width:'5.5%',estilo:{'font-size':'0.6em','margin': '-1.0em'} }      
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

   this.cargarDesignaciones();
  }

  showEdit(servicio) {    
    console.log('serv',servicio);
    if (servicio.id){
        const ref = this.dialogService.open(DesignacionNuevoComponent, {
            data: {
                accion:'edit',
                designaciones_data: servicio
            },
            header: 'Editar Designacion',
            width: '30%'
        });
        ref.onClose.subscribe((car) => {    
          if (car) {          
              this.cargarDesignaciones();
              this.messageService.add({severity:'success', summary: 'Control de Personal', detail:car.message});
          }
        });
    }
    else 
         this.showNew(servicio);
  }

  showNew(servicio) {        
    const ref = this.dialogService.open(DesignacionNuevoComponent, {
         data: {
            accion:'new',
            designaciones_data: servicio            
        },
        header: 'Nueva Designacion',
        width: '25%'
    });

    ref.onClose.subscribe((car) => {
      console.log('car',car);
      if (car) {          
          this.cargarDesignaciones();
          this.messageService.add({severity:'success', summary: 'Control de Personal', detail:car.message});
      }
    });
  }

  showControl(servicio) {    
    
    const ref = this.dialogService.open(DesignacionControlComponent, {
         data: {
            accion:'new',
            designaciones_data: servicio            
        },
        header: 'Historial de Plaza designaciones',
        width: '85%'
    });

    ref.onClose.subscribe((car) => {
      console.log('car',car);
      if (car) {          
          this.cargarDesignaciones();
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

  cargarDesignaciones(){
    this.loading = true;
    this.DesignacionService.getDesignaciones().subscribe(
      (data)=> {        
        console.log(data);
        this.designaciones = data['data'];
        this.estados = [];
     /*   for (let entry of data['estado']) {       
          this.estados.push({label : entry.desc_estado , value : {id: entry.id, desc_estado: entry.desc_estado, situacion : entry.situacion } } )          
         }             */
        this.loading = false;
         }

    );
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.designaciones, 'designaciones_');
 }

 rptdesignacionesOcupados():void {
  //this.DesignacionService.getAirHsp().subscribe(() => {

 // });
}
  
}

