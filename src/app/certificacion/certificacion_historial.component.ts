import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import { DxTooltipComponent,DxDataGridComponent } from 'devextreme-angular';  
import CustomStore from 'devextreme/data/custom_store';

@Component({
    selector: 'zd-certificacion-historial',  
    templateUrl: './certificacion_historial.component.html',
    styleUrls: ['./certificacion_historial.component.css'],
    encapsulation: ViewEncapsulation.None  
  })
  export class CertificacionHistorialComponent implements OnInit {
      @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;  
    dataSource: any = {};
    applyFilterTypes: any;
    currentFilter: any;
    events: Array<string> = [];
    constructor(private httpClient: HttpClient) { 
  
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
          },
  
          );
      }

      refreshDataGrid() {           
         this.dataGrid.instance.refresh();
      }

      logEvent(eventName) {
        console.log(eventName);
    }


    open(e){       
      if (e.columnIndex==1) {
        var anio = e.value.substring(e.value.length - 4);
        console.log(anio);
         var url = e.value.substring(2,e.value.length - 5);
         //var url = url1.value.substring(6);
         console.log(url);
         url = "http://gis.proviasnac.gob.pe/intranet/TRAMITE_doc/tramite_exp_hoja_std.asp?nu_expedref="+url+"&s_id_periodo="+anio+"&tipo=I&opcion=5";
         window.open(url, null);        
      }
      if (e.columnIndex==4) {     
        console.log(e);
        //var doc = e.value.substring(0,13);      
        // window.open(e.data.informe_opp+doc+'.pdf', null);        
      }
    }

    cargarPap():Promise<any>{    
      return this.httpClient.get("http://rrhh.pvn.gob.pe/api/tramite/certificacion").toPromise()
        .then(result => {
          console.log("get",result['data']);
          return {          
              data: result['data'],
              totalCount: 630,
              sumary:630            
             // groupCount: result.groupCount*/
          };
      });          
    }

    cargaData(a) {
      console.log(a);
      let header = new HttpHeaders({'content-type':'application/json'});  
      a.dataSource = new CustomStore({
        key: "id",
        load: ()=>this.cargarPap(),     
        //remove: (key) => this.httpClient.delete('http://rrhh.pvn.gob.pe/api/tramite/certificacion/'+key),      
        update: (key, values) => this.httpClient.put("http://rrhh.pvn.gob.pe/api/tramite/certificacion", {
            id: key,
            values: values
          },{headers :header}).toPromise()
          .then(result => {
            console.log("get",result);
            return {          
                data: result['data'],
                totalCount: 588,
                sumary:588            
              // groupCount: result.groupCount*/
            };
          }), 
      })
    }
}