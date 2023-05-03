import { NgModule, OnInit } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import { InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from '../home/home.component';
import { TopBarComponent } from './shell/top-bar/top-bar.component';
import { MainContentComponent } from './shell/main-content/main-content.component';
import {CalendarModule} from 'primeng/calendar';
import {MenubarModule} from 'primeng/menubar';
import { CoreGuardChild } from './core_guard_child';
import { CapModule } from "../cap/cap.module";
import { PapModule } from '../pap_laudo/pap.module';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';


import { AirHspModule } from '../airhsp/airhsp.module';
import { AirHspCasModule } from '../airhsp_cas/airhsp_cas.module';
import { BaseCasModule } from '../base_cas/base_cas.module';
import { BaseFormativaModule } from '../base_formativa/base_formativa.module';
import { BaseCapModule } from '../base_cap/base_cap.module';
import { CertificacionCasModule } from '../certificacion/certificacion_cas.module';
import { PlanillaCasModule } from '../planilla_cas/planilla_cas.module';
import { PlanillaFormativaModule } from '../planilla_formativa/planilla_formativa.module';
import { PlanillaCapModule } from '../planilla_cap/planilla_cap.module';
import { UploadModule } from '../upload/upload.module';
import { PapAirModule } from '../pap_air/pap_air.module';
import { ConfiguracionModule } from '../configuracion/configuracion.module';
import { PresupuestoModule } from '../presupuesto/presupuesto.module';

import {PanelModule} from 'primeng/panel';
import { TableModule } from 'primeng/table';

//import { LaudosComponent } from '../configuracion/laudos/laudos.component';



const routes:Routes = [
  {
    path: "",
    component: ShellComponent,
    canActivateChild: [CoreGuardChild],
    children:[     
      {
        path: "",
        component: HomeComponent,
      },
      {
        path : "cap",
        loadChildren:() => CapModule,
      }, 
      {
        path : "pap",
        loadChildren:() => PapModule,
      }, 
      {
        path : "presupuesto",
        loadChildren:()=>PresupuestoModule,
      //  loadChildren: () => import('./../presupuesto/presupuesto.module').then(mod => mod.PresupuestoModule)
      },    
     
      {
        path : "airhsp",
        loadChildren: ()=>AirHspModule,
      },  
      {
        path : "airhsp_cas",
        loadChildren:()=>AirHspCasModule,
      },  
      {
        path : "base_cas",
        loadChildren:()=>BaseCasModule,
      },  
      {
        path : "base_formativa",
        loadChildren:()=>BaseFormativaModule,    
      }, 
      {
        path : "base_cap",
        loadChildren:()=>BaseCapModule,
      },  
      {
        path : "certificacion_cas",
        loadChildren:()=>CertificacionCasModule,
      }, 

      {
        path : "planilla_cas",
        loadChildren:()=>PlanillaCasModule,
      }, 
      {
        path : "planilla_formativa",
        loadChildren:()=>PlanillaFormativaModule,
      }, 
      {
        path : "planilla_cap",
        loadChildren:()=>PlanillaCapModule,
      }, 

      {
        path : "importar",
        loadChildren:()=>UploadModule,
      },  
      {
        path : "pap_air",
        loadChildren:()=>PapAirModule,
      },  
      {
        path : "configuracion",
        loadChildren:()=>ConfiguracionModule,
      }
    ]
  },    

     {
    path: "**",
    redirectTo: "/",
    pathMatch: "full"
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,    
    MenubarModule,
    DialogModule,
    DropdownModule,
    PanelModule,TableModule,DataViewModule,
    FormsModule,ReactiveFormsModule,
    InputTextModule,CalendarModule 
  ],
  declarations: [ShellComponent, TopBarComponent, MainContentComponent,HomeComponent],
  exports: [ShellComponent,HomeComponent,RouterModule],
  providers:[ ]
})
export class CoreModule implements OnInit {

  //constructor(private authService:AuthService){}

  ngOnInit(): void {
  //  this.authService.autenticated().subscribe((data) => {
  //    console.log(data);
  //  })
  }
 }
