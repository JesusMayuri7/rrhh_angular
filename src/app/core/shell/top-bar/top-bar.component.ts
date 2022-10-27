import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../service/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'zd-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private authService:AuthService, private router:Router){

  }


  items: MenuItem[];

  logout(){
    console.log('salir top bar');
    this.authService.logout().subscribe(res=>{
      this.router.navigate(['/login']);      
    },
    (error)=> {
      this.router.navigate(['/login']);      
    });      
  }

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-fw pi-home',
        routerLink: ['/']
      },
      {

        label: 'Gestion',
        items: [{
          label: 'Cas',

          items: [
            { label: 'Base', routerLink: ['base_cas'] },
            { label: 'AirHsp', routerLink: ['airhsp_cas'] },
          ]
        },
        {
          label: 'Cap',

          items: [
            { label: 'Base', routerLink: ['base_cap'] },
            { label: 'AirHsp', routerLink: ['airhsp'] },
            { label: 'Cap', routerLink: ['cap'] },
            { label: 'Pap', routerLink: ['pap'] },
            { label: 'Pap Air', routerLink: ['pap_air'] },
          ]
        },
        {
          label: 'Formativa',

          items: [
            { label: 'Base', routerLink: ['base_formativa'] },
          ]
        },
        ]
      },
      {

        label: 'Planilla',
        items: [{
          label: 'Cas',

          routerLink: ['planilla_cas']
        },
        {
          label: 'Cap',

          routerLink: ['planilla_cap']
        },
        {
          label: 'Formativa',

          routerLink: ['planilla_formativa']
        },
        ]
      },
      {
        label: 'Servicios',

        items: [
          { label: 'Siga Mef', routerLink: ['siga_mef'] },
          { label: 'Siga Z', routerLink: ['sigaz'] }
        ]
      },
      {
        label: 'Presupuesto',

        routerLink: ['presupuesto']
      },
      {
        label: 'Tramite CAS',

        routerLink: ['certificacion_cas']
      },
      {
        label: 'Configuracion',

        routerLink: ['configuracion']
      },
      {
        label: 'Importar',

        routerLink: ['importar']
      },
      {
        label: 'Confianza',

        routerLink: ['confianza']
      },
    ];
  }
}
