import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganigramaComponent } from './organigrama.component';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ServiceModule } from '../service/service.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { WebDataRocksPivotModule } from '../webdatarocks/webdatarocks.module';


const routes:Routes = [
  { path:'',
    component: OrganigramaComponent
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
    WebDataRocksPivotModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrganigramaComponent ],
})

export class OrganigramaModule { }
