import { Component, OnInit,ViewEncapsulation,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';


import { ExcelService } from '../service/excel.service';

import { DialogService} from 'primeng/dynamicdialog';
import { MessageService} from 'primeng/api';
import { PlanillaCapService } from './planilla_cap.service';



@Component({
    selector: 'zd-planilla-cap-index',  
    templateUrl: './planilla_cap_index.component.html',
    styleUrls: ['./planilla_cap_index.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers:[PlanillaCapService,ExcelService,MessageService,DialogService],
  
  })
  export class PlanillaCapIndexComponent {
  
    constructor(
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver
    ) {}


}