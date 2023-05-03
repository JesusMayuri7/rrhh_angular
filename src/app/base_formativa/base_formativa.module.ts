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
import { DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxTooltipModule,DxPopupModule,DxDropDownBoxModule } from 'devextreme-angular';
import { DxDataGridModule, DxButtonModule,DxSelectBoxModule,DxDateBoxModule,DxDropDownButtonModule,DxPivotGridModule } from 'devextreme-angular';

import {HelpersModule} from '../helpers/helpers.module';

import { BaseFormativaService } from './base_formativa.service';

import { BaseFormativaComponent } from './base_formativa.component';
import { ResumenFormativaComponent } from './resumen_formativa.component';
import { AirHspFormativaComponent } from './airhsp_formativa.component';
import { SigaFormativaComponent } from './siga_formativa.component';
import { BaseFormativaIndexComponent } from './base_formativa_index.component';


const routes:Routes = [
  { path:'',
    component: BaseFormativaIndexComponent,
    
  }
]

@NgModule({
  providers:[BaseFormativaService],
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
    DxDropDownBoxModule,DxDropDownButtonModule,DxPivotGridModule,
    TabViewModule,DxDataGridModule, DxButtonModule,DxSelectBoxModule,DxDateBoxModule,DxTooltipModule,DxPopupModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SigaFormativaComponent,BaseFormativaComponent,BaseFormativaIndexComponent,
    AirHspFormativaComponent,ResumenFormativaComponent]
})

export class BaseFormativaModule { }
