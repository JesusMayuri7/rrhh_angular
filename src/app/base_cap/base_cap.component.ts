import { Component, OnInit,EventEmitter, Input, Output,ViewChild,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import { OrganigramaService } from '../service/organigrama.service';
import { ExcelService } from '../service/excel.service';
import CustomStore from 'devextreme/data/custom_store';
import { Observable } from 'apollo-link';
import { DxTooltipComponent,DxDataGridComponent } from 'devextreme-angular';  
//import { BaseCasService } from './base_cas.service';
import { on } from "devextreme/events";
import { BaseCapService } from './base_cap.service';



@Component({
  selector: 'zd-base-cap',
  templateUrl: './base_cap.component.html',
  styleUrls: ['./base_cap.component.css'],  
  encapsulation: ViewEncapsulation.None,
})
export class BaseCapComponent implements OnInit {
  @ViewChild(DxTooltipComponent) tooltip: DxTooltipComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;  
 cap:any[];
 cols: any[];
 frozenCols: any[];
 estados:any[];
 dependencias:[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 autorizaciones:any[];
 formato:{};
 dataSource: any = {};
 applyFilterTypes: any;
 currentFilter: any;
 metas:[];
 metas2:[];
 organos:[];
 unidades:[];
 unidades2:[];
 currentEmployee = null;
 popupDesignacion:boolean= false;
 popupConcurso:boolean= false;
 popupBaja:boolean= false;
 popupAlta:boolean= false;
 rowData:any={};
 estado_pap:any[];
 areas:[];
 areas2:[];
 cap_id:String = '3';
 caps:any=[];
 anio:string= '2022';

  constructor(private httpClient: HttpClient,private baseCapService: BaseCapService) { 
    

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


    this.estado_pap = [    
      { label: 'OCUPADO', value: 'OCUPADO' },
      { label: 'OCUPADO_RJ', value: 'OCUPADO_RJ' },
      { label: 'VACIOS', value: null }  
      ];

    this.autorizaciones = [    
      { label: 'MTC_218', value: 'MTC_218'},
      { label: 'REGULARES',value:'REGULARES'},
      { label: 'PVN_NUEVOS',value:'PVN_NUEVOS'}                        
  ]; 

  this.caps= [    
    '1',
    '2'   
  ];

   this.getMetas();
   this.getDependencias();
   this.cargaData(this);
  }

  on2018Changed(e)
{
  this.cap_id = (this.cap_id =='1') ? '2':'1';
  e.component.option({
    text: this.cap_id == '1' ? 'CAP 2018' : 'CAP 2021'
  });
  this.cargaData(this);
}

 on2021Changed(e)
{
  this.cap_id = '2';
  e.component.option({
    text: this.cap_id =='1' ? 'CAP 2018' : 'CAP 2021'
  });
  this.cargaData(this);
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
            //text: 'CAP 2021',
            onClick:  this.refreshDataGrid.bind(this) 
        }
      },
      {
        location: 'after',
        widget: 'dxSelectBox',
        options: {
            width: 200,
            items: [{
                value: '2022',
                text: '2022'
            },{
                value: '2021',
                text: '2021'
            },
            {
              value: '2020',
              text: '2020'
          },
          ],
            displayExpr: 'text',
            valueExpr: 'value',
            value: '2022',
           onValueChanged: this.changeAnio.bind(this)
        }
      } 
        );
    }

    changeAnio(e){
      this.anio = e.value;      
      this.getMetas();
     // this.cargarPap();
     this.dataGrid.instance.refresh();
     }

     filterDataGrid() {
      var filter = this.dataGrid.instance.getCombinedFilter();
      //if(filter)
      //this.dataGrid.instance.filter(["presupuesto", "=", "ACTIVO"]);        
      //else      
      this.dataGrid.instance.filter([["error", "=", 1]]);
    }

    refreshDataGrid() {
      this.dataGrid.instance.filter(["estado_cap", "=", "O"]);
      this.dataGrid.instance.refresh();
  }  

  getMetas(){
    this.baseCapService.getMetas(this.anio).subscribe((data) => {
     // this.metas = data['metas'];
      this.metas2 = data['data'];
      console.log(this.metas2);
    })
  }

  getDependencias(){
    this.baseCapService.getDependencias().subscribe( (data) => {
      this.organos = data['organos'];
      this.unidades = data['unidades'];
      this.unidades2 = data['unidades2'];
      this.areas = data['areas'];
      this.areas2 = data['areas2'];
      console.log("dependencias",data['areas']);
    })
  }

    closeBaja(){
       this.dataGrid.instance.refresh();
    }
    closeAlta(){
      this.dataGrid.instance.refresh();
   }

  addMenuItems(e: any): void {  
    let items = [];
    this.rowData = e.component.getSelectedRowsData();    
    items.push(
      {
        text: "Alta",
       // disabled: !hasEditData,
        onClick: () => {
          this.popupAlta = true;
        }
      },
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
          this.popupConcurso = true;
          //e.component.cancelEditData();
        }
      },
      {
        text: "Alta Designacion",
        onClick: () => {
          this.popupDesignacion = true;
        }
      }
    );
    e.items = items;
}  

 
  onCellPrepared(e) {
    var self = this;  
    if (e.rowType === "data") {
      if (e.column.dataField ==='monto_air' && e.row.data.estado_air==='OCUPADO' ) {          
        if (e.row.data.monto_basico !== e.row.data.monto_air ) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
      if (e.column.dataField ==='estado_actual' && e.row.data.estado_actual == 'VACANTE') {          
        if (e.row.data.estado_air == 'OCUPADO' ) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }

      if (e.column.dataField ==='estado_actual' && e.row.data.estado_air==='VACANTE' && e.row.data.modalidad==='DESIGNACION') {          
        if (!(e.row.data.estado_pap == 'OCUPADO_CF_CAS' ||  e.row.data.estado_pap == 'VACANTE_EC')) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
       if (e.column.dataField ==='estado_actual' && e.row.data.modalidad==='CONCURSO' && e.row.data.tipo_salida == 'LICENCIA_SG') {          
        if (e.row.data.estado_pap !== 'OCUPADO_LSG' || e.row.data.estado_opp !== 'OCUPADO' || e.row.data.estado_air !== 'TEMPORAL' ) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
      if (e.column.dataField ==='estado_actual' && e.row.data.modalidad==='CONCURSO' && e.row.data.tipo_salida == 'DESIGNACION') {          
        if (e.row.data.estado_pap !== 'OCUPADO_PL_RES' || e.row.data.estado_opp !== 'OCUPADO' || e.row.data.estado_air !== 'TEMPORAL' ) {
          e.cellElement.style.color = 'red';
          e.cellElement.style.fontWeight = 'bold';
          e.row.data.error = 1;
        }
      }
/*         if (e.column.dataField ==='monto_siga' && e.row.data.estado_actual==='OCUPADO' ) {          
            if (e.row.data.monto_escala !== e.row.data.monto_siga ) {
              e.cellElement.style.color = 'red';
              e.cellElement.style.fontWeight = 'bold';
              e.row.data.error = 1;
            }
        } */
        if ((e.column.dataField === 'nombres') && (e.row.data.estado_actual === 'OCUPADO')) {
          // console.log(e.row.data.estado_air,"-",e.row.data.dni,"-",e.row.data.dni);         
          if ((e.row.data.dni !== e.row.data.dni_air) || (e.row.data.dni !== e.row.data.nu_dociden)) {
            e.cellElement.style.color = 'red';
            e.cellElement.style.fontWeight = 'bold';
            e.row.data.error = 1;
          }
        }

        if (e.column.dataField ==='nombres_air' && (e.row.data.estado_air === 'OCUPADO')) { 
            // console.log(e.row.data.estado_air,"-",e.row.data.dni,"-",e.row.data.dni);         
          if ((e.row.data.dni !== e.row.data.dni_air) ) {
              e.cellElement.style.color = 'red';
              e.cellElement.style.fontWeight = 'bold';
              e.row.data.error = 1;
          }
        }
        if (e.column.dataField ==='nombres_siga' && e.row.data.estado_actual === 'OCUPADO') {
            if ((e.row.data.dni !== e.row.data.nu_dociden ) ) {
                      e.cellElement.style.color = 'red';
                      e.cellElement.style.fontWeight = 'bold';
                      e.row.data.error = 1;
            }
        }
        if (e.column.dataField ==='meta_siga' && (e.row.data.estado_actual === 'OCUPADO') ) { 
          if (e.row.data.meta !== e.row.data.meta_siga) {    
              e.cellElement.style.color = 'red';
              e.cellElement.style.fontWeight = 'bold';
              e.row.data.error = 1;
          /*  e.cellElement.mouseover(function () {  
              self.tooltip.instance.option("target", e.cellElement);  
                  self.tooltip.instance.show();  
              });  
            e.cellElement.mouseout(function () {  
                  self.tooltip.instance.hide();  
              });                                  */
          }
        }       
        if (e.column.dataField === "meta" && (e.row.data.estado_actual === 'OCUPADO')) {    
          if (e.row.data.meta !== e.row.data.meta_siga) {
              e.cellElement.style.color = 'red';
              e.cellElement.style.fontWeight = 'bold';
              e.row.data.error = 1;
            on(e.cellElement, "mouseover", arg => {
                this.currentEmployee = e.data;
                this.tooltip.instance.show(arg.target);
            });
            on(e.cellElement, "mouseout", arg => {
              this.tooltip.instance.hide();
            });
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
     }  
    }

    onEditorPrepared(e) {
   //   console.log(e.editorName);
   //   if (e.parentType == "filterRow" && e.editorName == 'dxDropDown')  
   //   e.editorOptions.onOpened = function (e) { e.component._popup.option('width', 400); };  
    } 

  cargaData(a) {    
    let header = new HttpHeaders({'content-type':'application/json'});  
    a.dataSource = new CustomStore({      
      //key: "idpap",
      key: ["idpap", "pd_id"],
      load: ()=>this.cargarPap(),
      update: (key, values) => this.httpClient.put("http://rrhh.pvn.gob.pe/api/cap/base_cap_update", {
        id: key,
        values: values
      },{headers :header}).toPromise()
      .then(result => {        
        console.log(result['data']);
        return {     
            data: result['data'],            
          // groupCount: result.groupCount*/
        };
      }), 
  })
}


  cargarPap():Promise<any>{    
    return this.httpClient.get("http://rrhh.pvn.gob.pe/api/cap/base_cap_anio/"+this.anio).toPromise()
      .then(result => {        
        console.log(result);        
        
        return {
            data: result['data'],                                    
          //  sumary:588            
           // groupCount: result.groupCount*/
        };
    });          
  }
  

  
}

