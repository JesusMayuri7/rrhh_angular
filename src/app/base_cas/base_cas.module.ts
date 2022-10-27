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
import { DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxTooltipModule,DxPopupModule,DxToastModule } from 'devextreme-angular';
import { DxDataGridModule, DxButtonModule,DxSelectBoxModule,DxDateBoxModule,DxDropDownBoxModule } from 'devextreme-angular';
import {HelpersModule} from '../helpers/helpers.module';

import { BaseCasService } from './base_cas.service';


import { OrganigramaComponent } from "./organigrama.component";
import { SigaIngresosComponent } from './siga_ingresos.component';
import { BaseCasIndexComponent } from './base_cas_index.component';
import { AirHspCasComponent } from "./airhsp_cas.component";
import { AirhspCasService } from './airhsp_cas.service';
import { BaseCasDesignacionComponent } from "./base_cas_detalle/base_cas_designacion.component";
import { BaseCasConcursoComponent } from "./base_cas_detalle/base_cas_concurso.component";
import { BaseCasBajaComponent } from "./base_cas_detalle/base_cas_baja.component";
import { BaseCasAltaComponent } from "./base_cas_detalle/base_cas_alta.component";
import { BaseCasSctrPensionComponent } from "./base_cas_sctr_pension.component";

const routes:Routes = [
  { path:'',
    component: BaseCasIndexComponent
  }
]

@NgModule({
  providers:[BaseCasService,AirhspCasService],
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
    DxTooltipModule,
    DxPopupModule,DxButtonModule,DxSelectBoxModule,DxDateBoxModule,DxDropDownBoxModule,DxToastModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BaseCasIndexComponent,OrganigramaComponent,SigaIngresosComponent,AirHspCasComponent,BaseCasDesignacionComponent,
    BaseCasConcursoComponent,BaseCasBajaComponent,BaseCasSctrPensionComponent,BaseCasAltaComponent]
})

export class BaseCasModule { }
