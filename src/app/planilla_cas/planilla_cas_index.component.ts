import { Component, OnInit,ViewEncapsulation,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';


import { ExcelService } from '../service/excel.service';

import { DialogService} from 'primeng/dynamicdialog';
import { MessageService} from 'primeng/api';
import { PlanillaCasService } from './planilla_cas.service';



@Component({
    selector: 'zd-planilla-cas-index',  
    templateUrl: './planilla_cas_index.component.html',
    styleUrls: ['./planilla_cas_index.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers:[PlanillaCasService,ExcelService,MessageService,DialogService],
  
  })
  export class PlanillaCasIndexComponent {
  
    constructor(
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver
    ) {}


}