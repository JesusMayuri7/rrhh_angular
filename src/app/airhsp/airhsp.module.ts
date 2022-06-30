import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';

import {HelpersModule} from '../helpers/helpers.module';
import { AirHspComponent } from './airhsp.component';
import { AirHspService } from './airhsp.service';
import { ExcelService } from '../service/excel.service';



const routes:Routes = [
  { path:'',
    component: AirHspComponent
  }
]

@NgModule({
  providers:[AirHspService,ExcelService],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    HelpersModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AirHspComponent],
  
})

export class AirHspModule { }
