import { Component, OnInit,ViewEncapsulation,Input, ViewChild } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';  
import * as moment from 'moment';
import { BaseCasService } from '../base_cas.service';

@Component({
    //moduleId: module.id,
    selector: 'zd-base-cas-historial',
    templateUrl: './base_cas_historial.component.html',
    styleUrls: ['./base_cas_historial.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BaseCasHistorialComponent implements OnInit {
    dataSource:any[];
    @Input('archivo') row:any[];
    @ViewChild(DxDataGridComponent) grid: DxDataGridComponent;
    isVisible = false;
    type = 'info';
    message = '';

    constructor(private httpClient: HttpClient,private casService:BaseCasService) {
        let that = this;  
        /*that.popup.instance.option("width", '90%');  
        window.addEventListener("resize", function(){  
            //if(that.popup.instance.option("width")!=="100%"){  
               that.popup.instance.option("width", '100%');  
           // }  
        })*/  
    }
    
    ngOnInit(): void {
            console.log('detalle',this.row);
            //this.cargaData(this);
    }

    toast(_type:string,_message:string) {
        this.type = _type;
        this.message = _message;
        this.isVisible = true;
      }

      refreshGrid() {
        this.grid.instance.refresh();
      }  


    onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift(
                 {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'refresh',                  
                }
                },

        );
    }

}
