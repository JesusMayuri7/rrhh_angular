import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ServiceModule } from '../service/service.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';

import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';

import { CapComponent } from './cap.component';
import { ControlComponent } from './control.component';


const routes:Routes = [
  { path:'',
    component: CapComponent
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
    ToastModule,
    CalendarModule,
    InputTextModule,
    
    CheckboxModule,
    CardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CapComponent,ControlComponent],
  entryComponents: [
    ControlComponent
],

})

export class CapModule { }
