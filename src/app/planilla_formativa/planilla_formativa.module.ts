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
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

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
import { DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxDropDownButtonModule } from 'devextreme-angular';
import { DxDataGridModule,DxPivotGridModule,DxButtonModule,DxDropDownBoxModule } from 'devextreme-angular';
import {HelpersModule} from '../helpers/helpers.module';

import { PlanillaFormativaIndexComponent } from './planilla_formativa_index.component';
import { PlanillaFormativaService } from './planilla_formativa.service';
import { DevengadoFormativaComponent } from './devengado_formativa.component';
import { PlanillaFormativaComponent} from './planilla_formativa.component';


const routes:Routes = [
  { path:'',
    component: PlanillaFormativaIndexComponent
  }
]

@NgModule({
  providers:[PlanillaFormativaService],
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
    DxDropDownBoxModule,DxDropDownButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevengadoFormativaComponent,PlanillaFormativaIndexComponent,PlanillaFormativaComponent]
})

export class PlanillaFormativaModule { }
