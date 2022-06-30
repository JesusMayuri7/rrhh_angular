import { Component, OnInit,ViewEncapsulation,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';


import { ExcelService } from '../service/excel.service';

import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';




@Component({
    selector: 'zd-reporte-planilla-index',  
    templateUrl: './reporte_planilla_index.component.html',
    styleUrls: ['./reporte_planilla_index.component.css'],
    encapsulation: ViewEncapsulation.None,    
  
  })
  export class ReportePlanillaIndexComponent {
  
    constructor(
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver
    ) {}


}