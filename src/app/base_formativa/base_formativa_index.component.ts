import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { BaseFormativaService } from './base_formativa.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';





@Component({
    selector: 'zd-base-formativa-index',  
    templateUrl: './base_formativa_index.component.html',
    styleUrls: ['./base_formativa_index.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers:[BaseFormativaService,ExcelService,MessageService,DialogService],
  
  })
  export class BaseFormativaIndexComponent {

    tabs = [{ "title": "UNO", "template":"'template1" }, { "title": "DOS", "template":"template2" }]; 

}