import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';
import {DialogService} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'zd-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  constructor(public uploadService: UploadService,public dialogService: DialogService,private messageService: MessageService) { }

  
  
  public openUploadDialog() {
    //let dialogRef = this.dialog.open(DialogComponent, { width: '60%', height: '50%',data: { comp: 'param'} });
  }

  public showPresupuestal(link,mensaje,mes) {
    const ref = this.dialogService.open(DialogComponent, {
         data: {
            url: link,
            titulo: mensaje,
            mes: mes
        },
        header: 'Importacion de archivo: '+mensaje,
        width: '60%'
    });    
  }
}
