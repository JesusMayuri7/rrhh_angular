import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenComponent } from './orden.component';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ServiceModule } from '../service/service.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule} from '@angular/forms';

const routes:Routes = [
  { path:'',
    component: OrdenComponent
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
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdenComponent]
})

export class OrdenModule { }
