import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes, } from '@angular/router';

import { AuthComponent } from './auth.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
//import { CoreModule } from '../core/core.module';

const routes:Routes = [

  {
    path: '',
    component: AuthComponent
  },

  
]

@NgModule({
  imports: [
    CommonModule,    
    ReactiveFormsModule,FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthComponent],
})

export class AuthModule { }
