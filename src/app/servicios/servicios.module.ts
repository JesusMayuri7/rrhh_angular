import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {NgPipesModule} from 'ngx-pipes';

import { ServiciosComponent } from './servicios.component';
import { ServiceModule } from '../service/service.module';
import {NuevoPersonal} from './nuevo_personal.component';
import {EditarPersonal} from './editar_personal.component';
import {NuevoServicioComponent} from './nuevo_servicio.component';

const routes:Routes = [
  { path:'',
    component: ServiciosComponent
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
    ReactiveFormsModule,
    DynamicDialogModule,
    InputTextareaModule,
    TooltipModule,
    InputTextModule,
    ToastModule,
    CalendarModule,
    NgPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServiciosComponent,NuevoPersonal,NuevoServicioComponent,EditarPersonal],
  entryComponents: [
    NuevoPersonal,NuevoServicioComponent,EditarPersonal
]
})

export class ServiciosModule { }
