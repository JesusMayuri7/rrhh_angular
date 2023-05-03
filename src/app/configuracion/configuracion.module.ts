import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';

import {TabViewModule} from 'primeng/tabview';


import { DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxTooltipModule,DxPopupModule,DxDropDownBoxModule } from 'devextreme-angular';
import { DxDataGridModule, DxButtonModule,DxSelectBoxModule,DxDateBoxModule,DxDropDownButtonModule,DxPivotGridModule } from 'devextreme-angular';
import {HelpersModule} from '../helpers/helpers.module';

import { ConfiguracionService } from './configuracion.service';
import { MetasComponent } from "./metas/metas.component";
//import { LaudosComponent } from "./laudos/laudos.component";
import { ConvocatoriasComponent } from "./convocatorias/convocatorias.component";
import { ConfiguracionComponent } from "./configuracion.component";
import { CertificadosComponent } from "./certificados/certificados.component";
import { MopComponent } from "./mop/mop.component";
import { AddCertificadoComponent } from './certificados/add_certificado/add_certificado.component';



const routes:Routes = [
  { path:'',
    component: ConfiguracionComponent
  }
]



@NgModule({
  providers:[ConfiguracionService],
  imports: [
    CommonModule,    
    ReactiveFormsModule,    
    HelpersModule,
    FormsModule,
    TabViewModule,
    DxTabPanelModule,
    DxCheckBoxModule,
    DxTemplateModule,
    DxDataGridModule,
    DxPivotGridModule,
    DxTooltipModule,
    DxPopupModule,DxButtonModule,DxSelectBoxModule,DxDateBoxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfiguracionComponent,MetasComponent,
    //LaudosComponent,
    ConvocatoriasComponent,CertificadosComponent,MopComponent,AddCertificadoComponent
    ],
 schemas:[
  CUSTOM_ELEMENTS_SCHEMA
 ]
})

export class ConfiguracionModule { }
