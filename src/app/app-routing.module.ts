import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AppGuardLoad } from './app_guard_load';
import { AppGuardCan } from './app_guard_can';


export const routes: Routes = [
	{
		path: 'login',
		component: AuthComponent,
		canActivate:[AppGuardCan]		
	},
	{
		path: 'v1',
		loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
		canLoad: [AppGuardLoad]
	},


	{
		path: '**',
		redirectTo: '/login',
		pathMatch: 'prefix'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes),],
	exports: [RouterModule]
})
export class AppRoutingModule {}