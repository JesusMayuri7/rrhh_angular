import { Component, OnInit,ViewEncapsulation,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';


import { ExcelService } from '../service/excel.service';

import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import { PlanillaFormativaService } from './planilla_formativa.service';



@Component({
    selector: 'zd-planilla-formativa-index',  
    templateUrl: './planilla_formativa_index.component.html',
    styleUrls: ['./planilla_formativa_index.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers:[PlanillaFormativaService,ExcelService,MessageService,DialogService],
  
  })
  export class PlanillaFormativaIndexComponent {
  
    constructor(
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver
    ) {}


}