import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
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
import { FormsModule} from '@angular/forms';

import {HelpersModule} from '../helpers/helpers.module';
import { AirHspCasComponent } from './airhsp_cas.component';
import { AirhspCasService } from './airhsp_cas.service';
import { AirhspCasNuevoComponent } from "./airhsp_cas_nuevo.component";
import { AirhspCasPlazaComponent } from "./airhsp_cas_plaza.component";
import { AirhspCasControlComponent } from "./airhsp_cas_control.component";
import { AirhspCasConvocatoriaComponent } from "./airhsp_cas_convocatoria.component";

const routes:Routes = [
  { path:'',
    component: AirHspCasComponent
  }
]

@NgModule({
  providers:[AirhspCasService],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule,
    CalendarModule,
    NgPipesModule,
    CheckboxModule,
    CardModule,
    HelpersModule,
    TooltipModule,
    LightboxModule,
    DialogModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AirHspCasComponent,AirhspCasNuevoComponent, AirhspCasControlComponent,AirhspCasPlazaComponent,AirhspCasConvocatoriaComponent],
  entryComponents: [
    AirhspCasNuevoComponent, AirhspCasControlComponent,AirhspCasPlazaComponent,AirhspCasConvocatoriaComponent
  ],
})

export class AirHspCasModule { }
