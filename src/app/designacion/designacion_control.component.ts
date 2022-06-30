import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { CapService } from '../service/cap.service';
import { ExcelService } from '../service/excel.service';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/api';

@Component({
  selector: 'zd-pap',
  templateUrl: './designacion_control.component.html',
  styleUrls: [ './designacion_control.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class DesignacionControlComponent implements OnInit {
 cap:any[];
 cols: any[];
 frozenCols: any[];
 estados:any[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 cap_data:any;

  constructor(private capService:CapService,private excelService:ExcelService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.cap_data=this.config.data.cap_data;    
    this.cols = [   
      { field: 'nroCap', header: 'N° Cap' ,ancho:'2.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},      
        { field: 'cargocap', header: 'Cargo Cap', ancho:'8.0em',estilo: { 'font-size':'0.8em'},rowspan:'1',visible:true,numero:false},        
        { field: 'desc_area', header: 'Ubicacion',ancho:'6em',estilo: {'font-size':'0.6em'} },    
        { field: 'estado', header: 'Estado' ,ancho:'4em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},          
        { field: 'dni', header: 'Dni',ancho:'4.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'nombres', header: 'nombres',ancho:'10em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'inicio', header: 'Inicio', ancho:'5.0em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'doc_designacion', header: 'N° Doc.', ancho:'3.5em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'doc_cese', header: 'Fecha Doc.',ancho:'3.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },        
        { field: 'fin', header: 'Fin',ancho:'5.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },                
        { field: 'detalle', header: 'Observaciones',ancho:'10.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false }        
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

   this.cargarPap(this.cap_data.idpap);
  }

  handleFilter(event){
    this.filtrados = event.filteredValue.length;
    console.log(event);
    this.calcularFooterTotal(event.filteredValue);
  }

  cargarPap(id){
    this.loading = true;
    let parametro = {idpap:id}
    this.capService.postMatrizControl(parametro).subscribe(
      (data)=> {
        this.cap = data['data'];
        this.loading = false;
       // this.calcularFooterTotal(this.cap);
        console.log(this.cap); }
    );
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.cap, 'Pap_');
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

