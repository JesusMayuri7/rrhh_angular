import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";


@NgModule({  
  declarations: [WebDataRocksPivot],
  exports: [WebDataRocksPivot], // Add the DialogComponent as entry component  
})
export class WebDataRocksPivotModule {}