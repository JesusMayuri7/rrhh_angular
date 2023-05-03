import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import {TooltipModule} from 'primeng/tooltip';
import {LightboxModule} from 'primeng/lightbox';
import {DialogModule} from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TabViewModule} from 'primeng/tabview';
import { DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxDropDownButtonModule,DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridModule,DxPivotGridModule,DxButtonModule,DxDropDownBoxModule,DxNumberBoxModule } from 'devextreme-angular';
import {HelpersModule} from '../helpers/helpers.module';

import { PlanillaCapIndexComponent } from './planilla_cap_index.component';
import { PlanillaCapService } from './planilla_cap.service';
import { DevengadoCapComponent } from './devengado_cap.component';
import { PlanillaCapComponent} from './planilla_cap.component';



const routes:Routes = [
  { path:'',
    component: PlanillaCapIndexComponent
  }
]

@NgModule({
  providers:[PlanillaCapService],
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    HelpersModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    DynamicDialogModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule,
    CalendarModule,
    CheckboxModule,
    CardModule,
    TooltipModule,
    LightboxModule,
    DialogModule,
    InputSwitchModule,
    DxTabPanelModule,
    DxCheckBoxModule,
    DxTemplateModule,
    DxDataGridModule,
    TabViewModule,
    DxPivotGridModule,
    DxButtonModule,
    DxDropDownBoxModule,DxDropDownButtonModule,DxNumberBoxModule,DxSelectBoxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevengadoCapComponent,PlanillaCapIndexComponent,PlanillaCapComponent]
})

export class PlanillaCapModule { }
