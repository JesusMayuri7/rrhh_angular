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
import { DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxTooltipModule,DxPopupModule } from 'devextreme-angular';
import { DxDataGridModule, DxButtonModule,DxSelectBoxModule,DxDateBoxModule } from 'devextreme-angular';
import {HelpersModule} from '../helpers/helpers.module';

import { BaseCapService } from './base_cap.service';

//import { BaseCapComponent } from './base_cap.component';
import { SigaCapComponent } from './siga_cap.component';
import { BaseCapIndexComponent } from './base_cap_index.component';
import { BaseCapComponent } from './base_cap.component';
import { AirHspCapComponent } from './airhsp_cap.component';

import { BaseCapDesignacionComponent } from "./base_cap_detalle/base_cap_designacion.component";
import { BaseCasConcursoComponent } from "./base_cap_detalle/base_cas_concurso.component";
import { BaseCapBajaComponent } from "./base_cap_detalle/base_cap_baja.component";
import { BaseCapAltaComponent } from "./base_cap_detalle/base_cap_alta.component";
import { BaseCapVidaLeyComponent } from "./base_cap_vida_ley.component";
import { BaseCapSctrPensionComponent } from "./base_cap_sctr_pension.component";




const routes:Routes = [
  { path:'',
    component: BaseCapIndexComponent,
  }
]

@NgModule({
  providers:[BaseCapService],
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
    TabViewModule,DxTooltipModule,DxPopupModule,
    DxDataGridModule, DxButtonModule,DxSelectBoxModule,DxDateBoxModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [SigaCapComponent,BaseCapIndexComponent,BaseCapComponent,BaseCapDesignacionComponent,BaseCasConcursoComponent,
    BaseCapBajaComponent,BaseCapVidaLeyComponent,BaseCapSctrPensionComponent,BaseCapAltaComponent,AirHspCapComponent]
})

export class BaseCapModule { }
