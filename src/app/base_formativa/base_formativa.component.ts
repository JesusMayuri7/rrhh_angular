import { Component, OnInit,EventEmitter, ViewChild, Output } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import { BaseFormativaService } from './base_formativa.service';
import { ExcelService } from '../service/excel.service';
import CustomStore from 'devextreme/data/custom_store';

import { DxTooltipComponent, DxDataGridComponent } from 'devextreme-angular';



@Component({
  selector: 'zd-base-formativa',
  templateUrl: './base_formativa.component.html',
  styleUrls: ['./base_formativa.component.css'],
  providers:[BaseFormativaService,ExcelService],
  
})
export class BaseFormativaComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent | undefined;
 cap:any[]=[];
 cols: any[]=[];
 frozenCols: any[]=[];
 estados:any[]=[];
 estadosControl:any[]=[];
 selectCap:any;
 loading:boolean= false;
 filtrados:number=0;
 TotalServicios:number=0;
 autorizaciones:any[]=[];
 formato:{}={};
 dataSource: any = {};
 applyFilterTypes: any;
 currentFilter: any;
 metas:any[]=[];
 unidades:any[]=[];
 filterValue: any[]=[];
 organos:[]=[];
 unidades2:[]=[];
 metas2:[]=[];
 areas:[]=[];
 anio:string='2023'


  constructor(private formativaService:BaseFormativaService,private excelService:ExcelService,private httpClient: HttpClient) { 
    this.applyFilterTypes = [{
      key: "auto",
      name: "Immediately"
    }];
    this.currentFilter = this.applyFilterTypes[0].key;

    this.filterValue = [
      ['presupuesto', '=', 'ACTIVO'],
    //  'and',
    //  ['OrderDate', 'weekends']
  ];

  }

  ngOnInit() {
     console.log("organigrama");
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
   this.dependencias();
   this.cargaData(this);

  }

  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift(
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
              },
              {
                value: '2021',
                text: '2021'
              }],
            displayExpr: 'text',
            valueExpr: 'value',
            value: '2023',
           onValueChanged: this.changeAnio.bind(this)
        }
      } 
    );
  }

  changeAnio(e:any){
    this.anio = e.value;
    this.getMetas();
    this.cargaData(this);
    //this.dataGrid.instance.refresh();
}

getMetas(){
  this.formativaService.getMetas(this.anio).subscribe((data:any) => {     
    this.metas2 = data['data'];
    console.log(this.metas2);
  })
}


  dependencias() {
    this.formativaService.getDependencias().subscribe(
      (result:any)=> {        
        this.metas = result['metas'];  
       // this.metas2 = result['metas2'];           
        console.log('uni',this.unidades);        
        this.areas = result["areas2"]; 
      });
  }

  onCellPrepared(e:any) {
   // console.log("cell");
   // if (e.rowType === "header" && (e.column.dataField === "codigo_plaza")) {    
    //  console.log("plaza");
     // e.cellElement.horizontalAlignment = 'left';
    //  e.rowElement.style.backgroundColor = '#d6dde7'
      //e.cellElement.css({"text-align":"left"}); 
     // e.cellElement.css({"text-align":"left","backgroundColor": "green","margin-left":0,"padding-left":0 }); 
     // e.cellElement.css({"max-width": "calc(100% - 10px)"});
   // }  
    /*
    if(e.rowType === 'data') {        
          if(e.data.meta != e.data.meta_siga && (e.data.estado=='OCUPADA')) {
            if(e.column.dataField === 'meta')
            {
                e.cellElement.style.backgroundColor = '#E11601';
                e.cellElement.style.color = '#FFFFFF';
                e.cellElement.style.fontWeight = 'bold';
            }
          }
      
    if(e.data.SaleAmount > 15000) {
            if(e.column.dataField === 'OrderNumber') {
                e.cellElement.style.fontWeight = 'bold';
            }
            if(e.column.dataField === 'SaleAmount') {
                e.cellElement.style.backgroundColor = '#FFBB00';
                e.cellElement.style.color = '#000000';
            }
        }
    }

    if(e.rowType === 'group') {
        if(e.row.groupIndex === 0) {
            e.cellElement.style.backgroundColor = '#BEDFE6';
        }
        if(e.row.groupIndex === 1) {
            e.cellElement.style.backgroundColor = '#C9ECD7';
        }
        e.cellElement.style.color = '#000';
        if(e.cellElement.firstChild && e.cellElement.firstChild.style) e.cellElement.firstChild.style.color = '#000';
    }

    if(e.rowType === 'groupFooter' && e.column.dataField === 'SaleAmount') {
        e.cellElement.style.fontStyle = 'italic';
    }       */  
}

  isNotEmpty(value: any): boolean {
    return value !== undefined && value !== null && value !== "";
  }

  cargaData(a:any) {
    let header = new HttpHeaders({'content-type':'application/json'});  
    a.dataSource = new CustomStore({
      key: "id",
      load: ()=>this.cargarPap(),
      /* remove: (key) => this.httpClient.delete("http://rrhh.pvn.gob.pe/api/formativa/base_formativa_remove/"+encodeURIComponent(key))
      .toPromise()
      .then(result => {        
        return {          
            data: result['data'],            
          // groupCount: result.groupCount
        };
      })*/
      update: (key, values) => this.httpClient.post("http://rrhh.pvn.gob.pe/api/formativa/base_formativa_update", {
        id: key,
        values: values
      },{headers :header}).toPromise()
      .then((result: { [x: string]: any; }) => {               
        return {          
            data: result['data'],            
          // groupCount: result.groupCount*/
        };
      }),  
  })
}
  onRowRemoved(){
      console.log('removido');
  }




  cargarPap():Promise<any>{    
    return this.httpClient.get("http://rrhh.pvn.gob.pe/api/formativa/base_formativa_anio/"+this.anio).toPromise()
      .then((result: { [x: string]: any; }) => {
        return {
            data: result['data'],
                      
           // groupCount: result.groupCount*/
        };
    });          
  }
  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.cap, 'BaseFormativa_');
 }

  calcularFooterTotal(tra: any){
      this.TotalServicios=0;

    if (tra) {
      for(let item of tra) {          
        this.TotalServicios+= parseFloat(item.servicio);

      }
    }
  }
  
}

