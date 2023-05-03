import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import {TooltipModule} from 'primeng/tooltip';
import {LightboxModule} from 'primeng/lightbox';
import {DialogModule} from 'primeng/dialog';



import {InputSwitchModule} from 'primeng/inputswitch';
import { DxDataGridModule,
  DxTabPanelModule,DxCheckBoxModule,DxButtonModule,DxDateBoxModule,DxDropDownButtonModule,DxToastModule } from 'devextreme-angular';
import { DxTemplateModule,DxDropDownBoxModule,DxPopupModule,DxSelectBoxModule,DxListModule,DxScrollViewModule,DxLookupModule } from 'devextreme-angular';
import {TabViewModule} from 'primeng/tabview';

import {HelpersModule} from '../helpers/helpers.module';
import { CertificacionCasComponent } from './certificacion_cas.component';
import { CertificacionIndexComponent } from './certificacion_index.component';
import { CertificacionHistorialComponent} from './certificacion_historial.component';
import { CertificacionPlazasComponent} from './certificacion_plazas.component';
import { CertificacionCasService } from './certificacion_cas.service';
import { PlazaDetalleComponent} from './plaza_detalle/plaza_detalle.component';
import { PlazaConvocatoriaComponent} from './plaza_convocatoria/plaza_convocatoria.component';
import {FieldsetModule} from 'primeng/fieldset';



const routes:Routes = [
  { path:'',
    component: CertificacionIndexComponent
  }
]

@NgModule({
  providers:[CertificacionCasService],
  imports: [
    CommonModule,
    TabViewModule,
    DxDataGridModule,DxCheckBoxModule,DxTabPanelModule,DxTemplateModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule,
    CalendarModule,    
    CheckboxModule,
    CardModule,
    DxToastModule,
    HelpersModule,
    TooltipModule,
    LightboxModule,    
    DialogModule,DxDateBoxModule,
    FormsModule,DxSelectBoxModule,DxLookupModule,
    InputSwitchModule,FieldsetModule,DxButtonModule,DxDropDownButtonModule,
    DxDropDownBoxModule,DxPopupModule,DxListModule,DxScrollViewModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CertificacionIndexComponent,CertificacionCasComponent,CertificacionHistorialComponent,CertificacionPlazasComponent,
                PlazaDetalleComponent,PlazaConvocatoriaComponent ],
  entryComponents: [
                  PlazaDetalleComponent
              ]
  
})

export class CertificacionCasModule { }
