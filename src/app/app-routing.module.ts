import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AppGuardLoad } from './app_guard_load';
import { AppGuardCan } from './app_guard_can';
import { CoreModule } from './core/core.module';


export const routes: Routes = [
	{
		path: 'login',
		component: AuthComponent,
		canActivate:[AppGuardCan]		
	},
	{
		path: 'v1',
		loadChildren: () => CoreModule,
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