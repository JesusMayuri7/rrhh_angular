import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyeccionComponent } from './proyeccion.component';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { ExcelService } from '../service/excel.service';
import { ProyeccionService} from './proyeccion.service';
import { WebDataRocksPivotModule } from '../webdatarocks/webdatarocks.module';

const routes:Routes = [
  { path:'',
    component: ProyeccionComponent
  }
]

@NgModule({
  providers:[ProyeccionService,ExcelService],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    WebDataRocksPivotModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProyeccionComponent ]
})

export class ProyeccionModule { }
