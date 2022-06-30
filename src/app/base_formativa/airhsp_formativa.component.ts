import { Component, OnInit,OnDestroy, ViewChild,ViewEncapsulation } from '@angular/core';

import { BaseFormativaService } from './base_formativa.service';
import { ExcelService } from '../service/excel.service';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/api';
import { identifierModuleUrl } from '@angular/compiler';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'zd-airhsp-formativa',
  templateUrl: './airhsp_formativa.component.html',
  styleUrls: [ './airhsp_formativa.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class AirHspFormativaComponent implements OnInit {
 cap:any[];
 cols: any[];
 frozenCols: any[];
 estados:any[];
 unidades:any[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 cap_data:any;
 displayDialog: boolean;
 car:any = {};
 anios:any[];
 meses:any[];
 expanded = true;
 actualizado ='';

  constructor(private formativaService:BaseFormativaService,private excelService:ExcelService) { }
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  ngOnInit() {
    console.log('cargando siga');
    this.meses = [    
        { label: 'ENERO', value: '1' },
        { label: 'FEBRERO', value: '2' },        
        { label: 'MARZO', value: '3' },
        { label: 'ABRIL', value: '4' },        
        { label: 'MAYO', value: '5' },
        { label: 'JUNIO', value: '6' },        
        { label: 'JULIO', value: '7' },
        { label: 'AGOSTO', value: '8' },        
        { label: 'SETIEMBRE', value: '9' },
        { label: 'OCTUBRE', value: '10' },        
        { label: 'NOVIEMBRE', value: '11' },
        { label: 'DICIEMBRE', value: '12' },                
    ];

   this.cargarSigaNet();
  }

  calculateFullName(rowData){
    return rowData.APELLIDO_PATERNO + ' '+rowData.APELLIDO_MATERNO +' '+rowData.NOMBRES;
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        template: 'actualizado'
    }, 
      {
            location: 'after',
            widget: 'dxSelectBox',
            options: {
                width: 200,
                items: [{
                    value: 'Fuente',
                    text: 'Fuente'
                }, {
                    value: 'Finalidad',
                    text: 'Fuente y Meta'
                }],
                displayExpr: 'text',
                valueExpr: 'value',
                value: 'CustomerStoreState',
               onValueChanged: this.groupChanged.bind(this)
            }
        }, 
        {
            location: 'after',
            widget: 'dxButton',
            options: {
                width: 136,
                text: 'Contraer',
                onClick: this.collapseAllClick.bind(this)
            }
        }, {
            location: 'after',
            widget: 'dxButton',
            options: {
                icon: 'refresh',
                onClick: this.cargarSigaNet.bind(this)
            }
        });
}

groupChanged(e) {
  this.dataGrid.instance.clearGrouping();
  if (e.value ==='Fuente')
  {
  this.dataGrid.instance.columnOption('Fuente', 'groupIndex', 0);  
  }
  if (e.value ==='Finalidad')
  {
  this.dataGrid.instance.columnOption('Fuente', 'groupIndex', 0);
  this.dataGrid.instance.columnOption('Finalidad', 'groupIndex', 1);
  }
 // this.totalCount = this.getGroupCount(e.value);
}

collapseAllClick(e) {
  this.expanded = !this.expanded;
  e.component.option({
      text: this.expanded ? 'Contraer' : 'Expandir'
  });
}

  cargarSigaNet(){
    this.loading = true;
   // let parametro = {idpap:id}
    this.formativaService.getAirHspFormativa().subscribe(
      (data)=> {
        this.cap = data['data'];  
        this.actualizado = this.cap[0]['actualizado'];
        this.loading = false;
       // this.calcularFooterTotal(this.cap);
        }
    );
  }

 
  
}

