import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { BaseCasService } from './base_cas.service';
import { ExcelService } from '../service/excel.service';
import { SigaIngresosComponent } from './siga_ingresos.component';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import { OrganigramaComponent } from "./organigrama.component";



@Component({
    selector: 'zd-base-cas-index',  
    templateUrl: './base_cas_index.component.html',
    styleUrls: ['./base_cas_index.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers:[BaseCasService,ExcelService,MessageService,DialogService],
  
  })
  export class BaseCasIndexComponent {

    tabs = [{ "title": "UNO", "template":"'template1" }, { "title": "DOS", "template":"template2" }]; 

}