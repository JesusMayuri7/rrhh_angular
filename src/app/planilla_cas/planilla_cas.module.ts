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
import { NgPipesModule } from 'ngx-pipes';
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

import { PlanillaCasIndexComponent } from './planilla_cas_index.component';
import { PlanillaCasService } from './planilla_cas.service';
import { DevengadoCasComponent } from './devengado_cas.component';
import { ProyeccionCasComponent } from './proyeccion_cas.component';
import { ProyeccionDosCasComponent } from './proyeccion_dos_cas.component';
import { ProyeccionTresCasComponent } from './proyeccion_tres_cas.component';
import { PlanillaCasComponent} from './planilla_cas.component';


const routes:Routes = [
  { path:'',
    component: PlanillaCasIndexComponent
  }
]

@NgModule({
  providers:[PlanillaCasService],
  imports: [
    CommonModule,
    NgPipesModule,
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
    DxDropDownBoxModule,DxDropDownButtonModule,DxSelectBoxModule,DxNumberBoxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevengadoCasComponent,PlanillaCasIndexComponent,ProyeccionCasComponent,PlanillaCasComponent,ProyeccionTresCasComponent,
    ProyeccionDosCasComponent]
})

export class PlanillaCasModule { }
