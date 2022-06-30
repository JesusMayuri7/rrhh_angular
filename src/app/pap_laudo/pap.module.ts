import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PapComponent } from './pap.component';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ServiceModule } from '../service/service.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';

import {HelpersModule} from '../helpers/helpers.module';

const routes:Routes = [
  { path:'',
    component: PapComponent
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
    HelpersModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PapComponent]
})

export class PapModule { }
