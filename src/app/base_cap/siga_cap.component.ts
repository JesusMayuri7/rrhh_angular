import { Component, OnInit,OnDestroy, ViewChild,ViewEncapsulation } from '@angular/core';

import { BaseCapService } from './base_cap.service';
import { ExcelService } from '../service/excel.service';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/api';
import { identifierModuleUrl } from '@angular/compiler';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'zd-siga-cap',
  templateUrl: './siga_cap.component.html',
  styleUrls: [ './siga_cap.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class SigaCapComponent implements OnInit {
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
 actualizado = '';

  constructor(private CapService:BaseCapService,private excelService:ExcelService) { }
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

    onExporting (e){  
      e.component.beginUpdate();  
      e.component.columnOption("id_personal", "visible", true);  
    }
    
    onExported(e){  
        e.component.columnOption("id_personal", "visible", false);  
        e.component.endUpdate();  
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
                    text: 'Fuente y finalidad'
                }],
                displayExpr: 'text',
                valueExpr: 'value',
                value: 'CustomerStoreState',
               onValueChanged: this.groupChanged.bind(this)
            }
        }, {
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
    console.log('cargando cap');
    this.loading = true;
   // let parametro = {idpap:id}
    this.CapService.getSigaNetCap().subscribe(
      (data)=> {
        this.cap = data['data'];   
        this.actualizado = this.cap[0]['actualizado'];
        this.cap.map(x => {
          switch(x['mes_id']) { 
            case 1: { x['mes']='ENERO'; break; } 
            case 2: { x['mes']='FEBRERO'; break; } 
            case 3: { x['mes']='MARZO'; break; } 
            case 4: { x['mes']='ABRIL'; break; } 
            case 5: { x['mes']='MAYO'; break; } 
            case 6: { x['mes']='JUNIO'; break; } 
            case 7: { x['mes']='JULIO'; break; } 
            case 8: { x['mes']='AGOSTO'; break; } 
            case 9: { x['mes']='SETIEMBRE'; break; } 
            case 10: { x['mes']='OCTUBRE'; break; }             
            case 11: { x['mes']='NOVIEMBRE'; break; } 
            case 12: { x['mes']='DICIEMBRE'; break; }              
         } 
        });      
        this.loading = false;
       // this.calcularFooterTotal(this.cap);
        }
    );
  }

 
  
}

