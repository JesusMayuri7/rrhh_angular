import { NgModule, OnInit } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabMenuModule,ButtonModule,GrowlModule} from 'primeng/primeng';
import { DataGridModule,PanelModule,DialogModule} from 'primeng/primeng';
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
import { LaudosComponent } from '../configuracion/laudos/laudos.component';



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
        loadChildren:'./../cap/cap.module#CapModule'
      }, 
      {
        path : "pap",
        loadChildren:'./../pap_laudo/pap.module#PapModule'
      }, 
      {
        path : "presupuesto",
        loadChildren:'./../presupuesto/presupuesto.module#PresupuestoModule'
      //  loadChildren: () => import('./../presupuesto/presupuesto.module').then(mod => mod.PresupuestoModule)
      },    
      {
        path : "organigrama",
        loadChildren:'./../organigrama/organigrama.module#OrganigramaModule'
      },    
      {
        path : "servicios",
        loadChildren:'./../servicios/servicios.module#ServiciosModule'
      },    
      {
        path : "sigamef",
        loadChildren:'./../orden/orden.module#OrdenModule'
      },  
      {
        path : "sigaz",
        loadChildren:'./../sigaz/sigaz.module#SigaZModule'
      },  
      {
        path : "airhsp",
        loadChildren:'./../airhsp/airhsp.module#AirHspModule'
      },  
      {
        path : "airhsp_cas",
        loadChildren:'./../airhsp_cas/airhsp_cas.module#AirHspCasModule'
      },  
      {
        path : "base_cas",
        loadChildren:'./../base_cas/base_cas.module#BaseCasModule'
      },  
      {
        path : "base_formativa",
        loadChildren:'./../base_formativa/base_formativa.module#BaseFormativaModule',        
      }, 
      {
        path : "base_cap",
        loadChildren:'./../base_cap/base_cap.module#BaseCapModule'
      },  
      {
        path : "certificacion_cas",
        loadChildren:'./../certificacion/certificacion_cas.module#CertificacionCasModule'
      }, 
      {
        path : "proyeccion_cas",
        loadChildren:'./../proyeccion/proyeccion.module#ProyeccionModule'
      }, 
      {
        path : "planilla_cas",
        loadChildren:'./../planilla_cas/planilla_cas.module#PlanillaCasModule'
      }, 
      {
        path : "planilla_formativa",
        loadChildren:'./../planilla_formativa/planilla_formativa.module#PlanillaFormativaModule'
      }, 
      {
        path : "planilla_cap",
        loadChildren:'./../planilla_cap/planilla_cap.module#PlanillaCapModule'
      }, 
      {
        path : "designaciones",
        loadChildren:'./../designacion/designacion.module#DesignacionModule'
      },  
      {
        path : "importar",
        loadChildren:'./../upload/upload.module#UploadModule'
      },  
      {
        path : "pap_air",
        loadChildren:'./../pap_air/pap_air.module#PapAirModule'
      },  
      {
        path : "configuracion",
        loadChildren:'./../configuracion/configuracion.module#ConfiguracionModule',
      },
      {
        path : "confianza",
        loadChildren:'./../designacion/designacion.module#DesignacionModule'
      }, 
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
    GrowlModule,
    MenubarModule,
    DropdownModule,TabMenuModule,ButtonModule,FormsModule,ReactiveFormsModule,
    DataGridModule,PanelModule,DialogModule,InputTextModule,CalendarModule 
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
