import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MillonPipe} from '../pipes/millon.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations:[
    MillonPipe,
  ],
  exports: [
    MillonPipe,
  ]
})
export class HelpersModule { 
}
