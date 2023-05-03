import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule,Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
    BrowserModule, 
    FormsModule,    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthComponent],
})

export class AuthModule { }
