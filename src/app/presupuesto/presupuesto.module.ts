import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { LazyLoadImageModule } from './ng-lazyload-image';
//import { ServiceModule } from '../service/service.module';
import { PresupuestoComponent } from './presupuesto.component';
import { ReportePlanillaComponent } from './reporte_planilla.component';
import { ReportePlanillaIndexComponent } from './reporte_planilla_index.component';
import { ReporteResumenComponent } from './reporte_resumen.component';
import { ReporteCertificadoComponent } from './reporte_certificado.component';
import { ReporteEjecucionComponent } from './reporte_ejecucion.component';
import { ReportePlazasCasComponent } from './cas/reporte_plazas_cas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxDropDownButtonModule } from 'devextreme-angular';
import { DxDataGridModule,DxPivotGridModule,DxButtonModule,DxDropDownBoxModule } from 'devextreme-angular';

const routes:Routes = [
  {
    path: '',
    component: ReportePlanillaIndexComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    //ServiceModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    TabViewModule,
    DxTabPanelModule,DxCheckBoxModule, DxTemplateModule,DxDropDownButtonModule,
    DxDataGridModule,DxPivotGridModule,DxButtonModule,DxDropDownBoxModule,
  //  LazyLoadImageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PresupuestoComponent,ReportePlanillaComponent,ReportePlanillaIndexComponent,ReporteResumenComponent,
    ReporteCertificadoComponent,ReporteEjecucionComponent,ReportePlazasCasComponent],
  entryComponents:[ReportePlanillaComponent]
})
export class PresupuestoModule { }
