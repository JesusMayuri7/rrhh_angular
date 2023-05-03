import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { ConfiguracionService } from './configuracion.service';
import { ExcelService } from '../service/excel.service';
import { DialogService} from 'primeng/dynamicdialog';
import { MessageService} from 'primeng/api';




@Component({
    selector: 'zd-configuracion',  
    templateUrl: './configuracion.component.html',
    styleUrls: ['./configuracion.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers:[ConfiguracionService,ExcelService,MessageService,DialogService],
  
  })
  export class ConfiguracionComponent {

    tabs = [{ "title": "UNO", "template":"'template1" }, { "title": "DOS", "template":"template2" }]; 

}