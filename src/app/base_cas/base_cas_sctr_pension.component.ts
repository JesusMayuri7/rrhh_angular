import { Component, OnInit,EventEmitter, Input, Output,ViewChild,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import { OrganigramaService } from '../service/organigrama.service';
import { ExcelService } from '../service/excel.service';
import CustomStore from 'devextreme/data/custom_store';
import { Observable } from 'apollo-link';
import { DxTooltipComponent,DxDataGridComponent } from 'devextreme-angular';  
//import { BaseCasService } from './base_cas.service';
import { on } from "devextreme/events";
import { BaseCasService } from './base_cas.service';



@Component({
  selector: 'zd-base-cas-sctr-pension',
  templateUrl: './base_cas_sctr_pension.component.html',
  styleUrls: ['./base_cas_sctr_pension.component.css'],  
  encapsulation: ViewEncapsulation.None,
})
export class BaseCasSctrPensionComponent implements OnInit {
  @ViewChild(DxTooltipComponent) tooltip: DxTooltipComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;  
 cap:any[];
 cols: any[];
 frozenCols: any[];
 estados:any[];
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
 metas:any;
 unidades:any;
 currentEmployee = null;
 popupDesignacion:boolean= false;
 popupConcurso:boolean= false;
 popupBaja:boolean= false;
 rowData:any={};

  constructor(private httpClient: HttpClient,private baseCasService: BaseCasService) { 
    

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
      { label: 'MTC_218', value: 'MTC_218'},
      { label: 'REGULARES',value:'REGULARES'},
      { label: 'PVN_NUEVOS',value:'PVN_NUEVOS'}                        
  ]; 

   this.getMetas();
   this.cargaData(this);
  }

  getMetas(){
    this.baseCasService.getMetas('2022').subscribe( (data) => {
      this.metas = data['metas'];
      console.log(this.metas);
    })
  }

    closeBaja(){
       this.dataGrid.instance.refresh();
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

        if (e.column.dataField ==='monto' && e.row.data.estado==='OCUPADO' ) {          
            if (e.row.data.monto !== e.row.data.monto_air ) {
              e.cellElement.style.color = 'red';
              e.cellElement.style.fontWeight = 'bold';
            }
        }
        if (e.column.dataField ==='nombres' && (e.row.data.estado_air === 'OCUPADO')) { 
            // console.log(e.row.data.estado_air,"-",e.row.data.dni,"-",e.row.data.dni);         
          if ((e.row.data.dni !== e.row.data.dni_air) ) {
              e.cellElement.style.color = 'red';
              e.cellElement.style.fontWeight = 'bold';
          }
        }
        if (e.column.dataField ==='nombres_siga' && ((e.row.data.estado_air === 'OCUPADO') )) {
           if (e.row.data.dni !==null) {
              if (e.row.data.dni.length === 8) {           
                  if ((e.row.data.dni !== e.row.data.nu_dociden ) || (e.row.data.dni === e.row.data.nu_dociden && e.row.data.estado_air === 'VACANTE')) {
                      e.cellElement.style.color = 'red';
                      e.cellElement.style.fontWeight = 'bold';
                  }
              } 
            }
        }
        if (e.column.dataField ==='meta' && (e.row.data.estado_air === 'OCUPADO') ) { 
          if (e.row.data.meta !== e.row.data.meta_siga) {    
            e.cellElement.style.color = 'red';
            e.cellElement.style.fontWeight = 'bold';
          /*  e.cellElement.mouseover(function () {  
              self.tooltip.instance.option("target", e.cellElement);  
                  self.tooltip.instance.show();  
              });  
            e.cellElement.mouseout(function () {  
                  self.tooltip.instance.hide();  
              });                                  */
          }
        }       
     }

     if (e.rowType === "data" && e.column.dataField === "meta" && (e.row.data.estado_air === 'OCUPADO')) {        
            on(e.cellElement, "mouseover", arg => {
                this.currentEmployee = e.data;
                this.tooltip.instance.show(arg.target);
            });
            on(e.cellElement, "mouseout", arg => {
              this.tooltip.instance.hide();
            });
             
           }
    }

    onEditorPrepared(e) {

    } 

  cargaData(a) {    
    let header = new HttpHeaders({'content-type':'application/json'});  
    a.dataSource = new CustomStore({      
      key: "id",
      load: ()=>this.cargarPap(),      
  })
}


  cargarPap():Promise<any>{    
    return this.httpClient.get("http://rrhh.pvn.gob.pe/api/cas/base_cas").toPromise()
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

