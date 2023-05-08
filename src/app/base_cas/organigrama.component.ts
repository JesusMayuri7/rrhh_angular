import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { OrganigramaService } from '../service/organigrama.service';
import { ExcelService } from '../service/excel.service';
import CustomStore from 'devextreme/data/custom_store';
import { DxTooltipComponent, DxDataGridComponent } from 'devextreme-angular';
import { BaseCasService } from './base_cas.service';
import { on } from "devextreme/events";



@Component({
  selector: 'zd-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.css'],
  providers: [OrganigramaService, ExcelService],
  encapsulation: ViewEncapsulation.None,
})
export class OrganigramaComponent implements OnInit {
  @ViewChild(DxTooltipComponent) tooltip: DxTooltipComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  cap: any[];
  cols: any[];
  frozenCols: any[];
  estados: any[];
  estadosControl: any[];
  selectCap: any;
  loading: boolean;
  filtrados: number = 0;
  TotalServicios: number = 0;
  autorizaciones: any[];
  formato: {};
  dataSource: any = {};
  applyFilterTypes: any;
  currentFilter: any;
  organos: [];
  metas: [];
  metas2: [];
  unidades: [];
  areas: [];
  unidades2: [];
  currentEmployee = null;
  popupDesignacion: boolean = false;
  popupConcurso: boolean = false;
  popupBaja: boolean = false;
  popupAlta: boolean = false;
  popupHistorial: boolean = false;
  rowData: any = {};
  historial:any=[];
  anio:string= '2023';
  isVisible = false;
  type = 'info';
  message = '';

  constructor(private casService: BaseCasService, private excelService: ExcelService, private httpClient: HttpClient) {


    this.applyFilterTypes = [{
      key: "auto",
      name: "Immediately"
    }];
    this.currentFilter = this.applyFilterTypes[0].key;
  }

  ngOnInit() {
    this.estados = [
      { label: 'PENDIENTE', value: 'PENDIENTE' },
      { label: 'VIGENTE', value: 'VIGENTE' },
      { label: 'FINALIZADO', value: 'FINALIZADO' }
    ];

    this.estadosControl = [
      { label: 'OCUPADO', value: 'OCUPADO' },
      { label: 'VACANTE', value: 'VACANTE' },
      { label: 'VACIOS', value: null }
    ];

    this.autorizaciones = [
      { label: 'MTC_218', value: 'MTC_218' },
      { label: 'REGULARES', value: 'REGULARES' },
      { label: 'PVN_NUEVOS', value: 'PVN_NUEVOS' }
    ];

    this.dependencias();
    this.getMetas();
    this.cargaData(this);
  }

  dependencias() {
    this.casService.getDependencias().subscribe(
      (result) => {
        this.organos = result['organos'];
        this.metas = result['metas'];
      //  this.metas2 = result['metas2'];
        this.unidades = result["unidades"];
        this.unidades2 = result["unidades2"];
        this.areas = result["areas2"];        
        
      });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {

        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'filter',
          onClick: this.filterDataGrid.bind(this)
        }
      },
      {

        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      },
      {

        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'detailslayout',
          onClick: this.todosGrid.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxSelectBox',
        options: {
            width: 200,
            items: [
              {
                value: '2023',
                text: '2023'
              },
              {
                value: '2022',
                text: '2022'
            }, {
                value: '2021',
                text: '2021'
            },            
          ],
            displayExpr: 'text',
            valueExpr: 'value',
            value: '2023',
           onValueChanged: this.changeAnio.bind(this)
        }
      } 
    );
  }

  changeAnio(e){
       this.anio = e.value;
       this.getMetas();
       this.cargarCAS();
       this.dataGrid.instance.refresh();
  }

  getMetas(){
    this.casService.getMetas(this.anio).subscribe((data) => {     
      this.metas2 = data['data'];
      console.log(this.metas2);
    })
  }
  


  closeBaja() {
    this.dataGrid.instance.refresh();
  }

  closeAlta() {
    this.dataGrid.instance.refresh();
  }

  refreshDataGrid() {
    //this.dataGrid.instance.clearFilter();  
    this.dataGrid.instance.filter(["presupuesto", "=", "ACTIVO"]);
    this.dataGrid.instance.refresh();
  }

  todosGrid() {
    this.dataGrid.instance.clearFilter();
    this.dataGrid.instance.refresh();
  }

  filterDataGrid() {
    var filter = this.dataGrid.instance.getCombinedFilter();
    //if(filter)
    //this.dataGrid.instance.filter(["presupuesto", "=", "ACTIVO"]);        
    //else      
    this.dataGrid.instance.filter([["error", "=", 1], ["presupuesto", "=", "ACTIVO"]]);
  }

  toast(_type:string,_message:string) {
    this.type = _type;
    this.message = _message;
    this.isVisible = true;
}

  addMenuItems(e: any): void {
    let items = [];
    this.rowData = e.component.getSelectedRowsData();
    items.push(
      {
        text: "Baja",
        // disabled: !hasEditData,
        onClick: () => {
          this.popupBaja = true;
        }
      },
      {
        text: "Alta Concurso",
        onClick: () => {
          if(this.rowData[0].estado_actual == 'VACANTE')
          {
            this.popupConcurso = true;          
          }
          else{
              this.toast('error','Error, el registro debe estar VACANTE');
          }
         
          //e.component.cancelEditData();
        }
      },
      {
        text: "Alta Designacion",
        onClick: () => {
          this.popupDesignacion = true;
        }
      },
      {
        text: "por DNI",
        onClick: () => {          
          this.popupAlta = true;
        }
      },
      {
        text: "Historial",
        onClick: () => {          
             this.historialPopup();
        }
      }
    );
    e.items = items;
  }

  historialPopup() {
    let base_cas_id = this.rowData[0].id;
    console.log('base_cas_id ',base_cas_id);
    this.casService.getHistorialCas(base_cas_id).subscribe(
      (data)=> {          
           this.historial = data['data'];
           this.popupHistorial = true;          
         } 
        );              
  }


  onCellPrepared(e) {
    var self = this;
    if (e.rowType === "data") {
      if (e.column.dataField === 'monto') {
        if (e.row.data.monto !== e.row.data.monto_air || e.row.data.monto !== e.row.data.monto_cert) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
      if (e.column.dataField === 'monto_siga' && e.row.data.estado_actual === 'OCUPADO') {
        if (e.row.data.monto !== e.row.data.monto_siga) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }


      if ((e.column.dataField === 'nombres') && (e.row.data.estado_actual === 'OCUPADO')) {
        // console.log(e.row.data.estado_air,"-",e.row.data.dni,"-",e.row.data.dni);         
        if ((e.row.data.dni !== e.row.data.dni_air) || (e.row.data.dni !== e.row.data.nu_dociden)) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }

      if (e.column.dataField === 'nombres_siga' && e.row.data.estado_actual === 'OCUPADO' && e.row.data.modalidad === 'CONFIANZA') {
        if (e.row.data.estado_confianza !== 'VIGENTE') {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }

      if (e.column.dataField=='estado_air' && e.row.data.estado_actual === 'OCUPADO' ) {
        if (e.row.data.estado_air != 'OCUPADO') {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }

      if (e.column.dataField=='estado_licencia' && e.row.data.tipo_salida === 'LICENCIA_SG' ) {
        if (e.row.data.estado_licencia == 'VENCIDA') {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
      
      if (e.column.dataField === 'nombres_air' )
      {
          if (e.row.data.estado_confianza === 'VIGENTE') {
            if ((e.row.data.estado_actual !== 'OCUPADO') ) {
              e.cellElement.style.color = 'red';
              e.cellElement.style.fontWeight = 'bold';
              e.row.data.error = 1;
            }
          }
          if ( e.row.data.estado_air === 'OCUPADO')
            if ((e.row.data.dni !== e.row.data.dni_air) || (e.row.data.dni !== e.row.data.nu_dociden)) {
              e.cellElement.style.color = 'red';
              e.cellElement.style.fontWeight = 'bold';
              e.row.data.error = 1;
            }

      }      

      if ((e.column.dataField === 'dni_confianza') && (e.row.data.estado_actual === 'OCUPADO') && e.row.data.estado_confianza =='VIGENTE') {
        // console.log(e.row.data.estado_air,"-",e.row.data.dni,"-",e.row.data.dni);         
        if (e.row.data.dni !== e.row.data.dni_confianza) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }

      if ((e.column.dataField === 'inicio_confianza') && (e.row.data.estado_actual === 'OCUPADO') && e.row.data.estado_confianza =='VIGENTE' && e.row.data.tipo_confianza =='DESIGNACION') {         
        if (e.row.data.inicio_confianza !== e.row.data.fe_ingreso)  {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }

      if (e.column.dataField === 'meta_air' && (e.row.data.meta_air != "0000")) {
        // console.log(e.row.data.estado_air,"-",e.row.data.dni,"-",e.row.data.dni);         
        if ((e.row.data.meta !== e.row.data.meta_air)) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }


      if (e.column.dataField === 'meta_siga' && (e.row.data.estado_actual === 'OCUPADO')) {
        if (e.row.data.meta !== e.row.data.meta_siga) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
      if (e.column.dataField === 'fuente_siga' && (e.row.data.estado_actual === 'OCUPADO')) {
        if (e.row.data.fuente_base !== e.row.data.fuente_siga) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
      if (e.column.dataField === 'fuente_base' && (e.row.data.estado_actual === 'OCUPADO')) {
        if (e.row.data.fuente_base !== e.row.data.fuente_siga) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
       
      if (e.column.dataField === "meta_cert" && (e.row.data.estado_actual === 'OCUPADO')) {
        if (e.row.data.meta_cert !== e.row.data.meta_siga) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }

      if (e.column.dataField === "cargo" && (e.row.data.estado_actual === 'OCUPADO')) {
        if (e.row.data.cargo !== e.row.data.cargo_cert) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
    }
  }

  cargaData(a) {
    let header = new HttpHeaders({ 'content-type': 'application/json' });
    a.dataSource = new CustomStore({
      key: ["id", "base_cas_detalle_id"],
      load: () => this.cargarCAS(),
      update: (key, values) => this.httpClient.put("http://rrhh.pvn.gob.pe/api/cas/base_cas_update", {
        id: key,
        values: values
      }, { headers: header }).toPromise()
        .then(result => {
          console.log(result);
          return {
            data: result['data'],
            // groupCount: result.groupCount*/
          };
        }),
    })
  }


  cargarCAS(): Promise<any> {
    console.log(this.anio);
    return this.httpClient.get("http://rrhh.pvn.gob.pe/api/cas/base_cas/"+this.anio).toPromise()
      .then(result => {
        return {
          data: result['data'],
        };
      });
  }



}

