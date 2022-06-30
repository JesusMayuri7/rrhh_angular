import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ServiceModule } from '../service/service.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule} from '@angular/forms';

import { SigaZComponent } from './sigaz.component';
import { SigaZService} from './sigaz.service';
import {HelpersModule} from '../helpers/helpers.module';

const routes:Routes = [
  { path:'',
    component: SigaZComponent
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
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SigaZComponent],
  providers:[SigaZService]
})

export class SigaZModule { }
