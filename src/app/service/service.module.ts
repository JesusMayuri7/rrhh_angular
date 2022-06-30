import { NgModule,ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarService } from './car.service';
import { ExcelService } from './excel.service';


@NgModule({
  imports: [
    CommonModule,
    
  ]
})
export class ServiceModule { 
  static forRoot():ModuleWithProviders<ServiceModule> {
       return {
            ngModule: ServiceModule,            
            providers: [CarService,ExcelService]
        };
    }  
}
