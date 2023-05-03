import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { AirhspCasService } from './airhsp_cas.service';
import { ExcelService } from '../service/excel.service';
import {DialogService} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
//import { AirhspCasNuevoComponent } from './airhsp_cas_nuevo.component';
//import { AirhspCasPlazaComponent } from './airhsp_cas_plaza.component';
//import { AirhspCasControlComponent } from './airhsp_cas_control.component';
//import { AirhspCasConvocatoriaComponent } from './airhsp_cas_convocatoria.component';

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
     actualizado = '';


  constructor(private airhspService:AirhspCasService,private excelService:ExcelService,private messageService: MessageService,public dialogService: DialogService) { }

  ngOnInit() {

    


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

   this.buscar(null,null,1);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        template: 'actualizado'
    }
    )
  }; 

  

    buscar(campo,criterio,page){    
    this.loading = true;    
    this.airhspService.getAirHsp().subscribe(
      (res)=> {        
        console.log(res);
        this.ordenes = res['data'];
        this.actualizado = this.ordenes[0]['actualizado']
        this.loading = false;

      }
    )
  }

  

  

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.ordenes, 'AirHspCas_');
 }

    
}

