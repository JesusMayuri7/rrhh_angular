import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarService } from './car.service';
import {SelectItem,MenuItem,LazyLoadEvent,FilterMetadata} from './api';


@NgModule({
  imports: [
    CommonModule,
    
  ],
  
  providers: [CarService]
})
export class CompartidoModule { }
