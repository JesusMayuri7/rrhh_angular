import { Component, OnInit,ViewEncapsulation,ViewChild } from '@angular/core';
import {DialogService} from 'primeng/components/dynamicdialog/dialogservice';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';

import CustomStore from 'devextreme/data/custom_store';
import { PlazaDetalleComponent} from './plaza_detalle/plaza_detalle.component';
import { DxTooltipComponent,DxDataGridComponent } from 'devextreme-angular';  

@Component({
    selector: 'zd-certificacion-plazas',  
    templateUrl: './certificacion_plazas.component.html',
    styleUrls: ['./certificacion_plazas.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [DialogService]  
  })
  export class CertificacionPlazasComponent implements OnInit {
    @ViewChild(DxTooltipComponent) tooltip: DxTooltipComponent;
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;  
    dataSource: any = {};
    applyFilterTypes: any;
    currentFilter: any;
    publicacion: any[];
    dropDownOptions: object;
    editorOptions: object;
    popupContratadoVisible:boolean=false;
    popupConvocatoriaVisible:boolean=false;
    rowData:any={};

    constructor(private httpClient: HttpClient,public dialogService: DialogService) { 

      this.dropDownOptions = { width: 700 };  
      this.editorOptions = {
          itemTemplate: "statusTemplate"
      }
    }

    addMenuItems(e: any): void {  
      let items = [];
      this.rowData = e.component.getSelectedRowsData();    
      console.log(this.rowData);
      items.push(        
        {
          text: "Contratado",
          onClick: () => {
            this.popupContratadoVisible = true;
          }
        },
        {
          text: "Informe",
          onClick: () => {
            this.popupConvocatoriaVisible = true;
          }
        }
      );
  
      e.items = items;
  } 


    ngOnInit() {
    this.cargaData(this);
    }

    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift(
       {
              location: 'after',
              widget: 'dxButton',
              options: {
                  icon: 'refresh',
                  onClick:  this.refreshDataGrid.bind(this)
              }
          });
      }

  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

    open(e){       
      if (e.columnIndex==7 && e.data.enlace.length>0) {     
         var url = 'http://gis.proviasnac.gob.pe/convocatorias/';
         window.open(url+e.data.enlace, null);        
      }
    }

    onSelectionChanged(selectedRowKeys, cellInfo, dropDownBoxComponent) {
      cellInfo.setValue(selectedRowKeys[0]);
      if(selectedRowKeys.length > 0) {
          dropDownBoxComponent.option("value",  selectedRowKeys[0]);
          dropDownBoxComponent.close();
      }
    }

    onEditorPreparing(e) {
     /*     if (e.parentType === "dataRow" && e.dataField === "convocatoria") {              
              e.editorOptions.onOpened = function (e) { e.component._popup.option('width', 800); };  
             //e.editorOptions.disabled = typeof e.row.data.StateID !== "number";
          }*/
    }

    cargarPap():Promise<any>{    
      return this.httpClient.get("http://rrhh.pvn.gob.pe/api/tramite/certificacion_plazas").toPromise()
        .then(result => {
          this.publicacion= result['publicacion'];             
          return {          
              data: result['data'],        
             // groupCount: result.groupCount*/
          };
      });          
    }

    customDisplayExpr(data) {      
      if (data) {          
          return `${data.convocatoria} ${data.cargo}`;
      }
  }

    cargaData(a) {
      console.log(a);
      let header = new HttpHeaders({'content-type':'application/json'});  
      a.dataSource = new CustomStore({
        key: "id",
        load: ()=>this.cargarPap(),     
        remove: (key) => this.httpClient.delete('http://rrhh.pvn.gob.pe/api/tramite/certificacion/'+key),      
        update: (key, values) => this.httpClient.put("http://rrhh.pvn.gob.pe/api/tramite/certificacion", {
            id: key,
            values: values
          },{headers :header}).toPromise()
          .then(result => {            
            return {          
                data: result['data'],        
              // groupCount: result.groupCount*/
            };
          }), 
      })
    }
}