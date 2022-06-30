import { Component, OnInit,EventEmitter, Input, Output,ViewChild,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import { OrganigramaService } from '../service/organigrama.service';
import { ExcelService } from '../service/excel.service';
import CustomStore from 'devextreme/data/custom_store';
import { Observable } from 'apollo-link';
import { DxTooltipComponent,DxDataGridComponent } from 'devextreme-angular';  
//import { BaseCasService } from './base_cas.service';
import { on } from "devextreme/events";
import { BaseFormativaService } from './base_formativa.service';


@Component({
  selector: 'zd-base-formativa-sctr-pension',
  templateUrl: './base_formativa_sctr_pension.component.html',
  styleUrls: ['./base_formativa_sctr_pension.component.css'],  
  encapsulation: ViewEncapsulation.None,
})
export class BaseFormativaSctrPensionComponent implements OnInit {
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

  constructor(private httpClient: HttpClient,private baseFormativaService: BaseFormativaService) { 
    

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
    this.baseFormativaService.getMetas('2022').subscribe( (data) => {
      this.metas = data['metas'];
    })
  }

    closeBaja(){
       this.dataGrid.instance.refresh();
    }


  cargaData(a) {    
    let header = new HttpHeaders({'content-type':'application/json'});  
    a.dataSource = new CustomStore({      
      key: "id",
      load: ()=>this.cargarPap(),      
  })
}


  cargarPap():Promise<any>{    
    return this.httpClient.get("http://rrhh.pvn.gob.pe/api/formativa/base_formativa").toPromise()
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

