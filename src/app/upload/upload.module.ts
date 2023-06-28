import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from './dialog/dialog.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadService } from './upload.service';

import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import { DxToastModule } from 'devextreme-angular';

const routes:Routes = [
  { path:'',
    component: UploadComponent
  }
]

@NgModule({
  imports: [ MatButtonModule, DropdownModule,CardModule,FieldsetModule,
    MatDialogModule,CommonModule, MatListModule, ButtonModule, 
     MatProgressBarModule,DynamicDialogModule,DxToastModule,
  RouterModule.forChild(routes)],
  declarations: [UploadComponent, DialogComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [UploadService,DialogService,MessageService]
})
export class UploadModule {}
