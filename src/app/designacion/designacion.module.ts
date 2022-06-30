import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ServiceModule } from '../service/service.module';
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

import { DesignacionComponent } from './designacion.component';
import { DesignacionNuevoComponent } from './designacion_nuevo.component';
import { DesignacionControlComponent } from './designacion_control.component';
import { DesignacionService } from "./designacion.service";


const routes: Routes = [
  {
    path: '',
    component: DesignacionComponent
  }
]

@NgModule({
  providers:[DesignacionService],
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
    ToastModule,
    CalendarModule,
    InputTextModule,
    NgPipesModule,
    CheckboxModule,
    CardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DesignacionComponent, DesignacionNuevoComponent, DesignacionControlComponent],
  entryComponents: [
    DesignacionNuevoComponent, DesignacionControlComponent
  ],

})

export class DesignacionModule { }
