import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { BaseCapService } from './base_cap.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';





@Component({
    selector: 'zd-base-Cap-index',  
    templateUrl: './base_Cap_index.component.html',
    styleUrls: ['./base_Cap_index.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers:[BaseCapService,ExcelService,MessageService,DialogService],
  
  })
  export class BaseCapIndexComponent {

    tabs = [{ "title": "UNO", "template":"'template1" }, { "title": "DOS", "template":"template2" }]; 

}