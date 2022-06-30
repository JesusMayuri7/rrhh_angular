import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PapAirComponent } from './pap_air.component';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ServiceModule } from '../service/service.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxTooltipModule,DxPopupModule } from 'devextreme-angular';
import { DxDataGridModule, DxButtonModule,DxSelectBoxModule,DxDateBoxModule } from 'devextreme-angular';

import {HelpersModule} from '../helpers/helpers.module';

const routes:Routes = [
  { path:'',
    component: PapAirComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ServiceModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    HelpersModule,
    DxTabPanelModule,
    DxCheckBoxModule,
    DxTemplateModule,
    DxDataGridModule,
    DxTooltipModule,DxPopupModule,
    DxDataGridModule, DxButtonModule,DxSelectBoxModule,DxDateBoxModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [PapAirComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PapAirModule { }
