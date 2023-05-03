import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../upload.service';
import { forkJoin } from 'rxjs';
import {Presupuesto,Message,SelectItem,MenuItem,LazyLoadEvent,FilterMetadata} from '../../interface';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('file') file;

  public files: Set<File> = new Set();
  paramData:any;
  meses:any[];

  constructor(public uploadService: UploadService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {  
    this.meses = [
      {label:'Seleccione', value:0},
      {label:'Enero', value:1},
      {label:'Febrero', value:2},
      {label:'Marzo', value:3},
      {label:'Abril', value:4},
      {label:'Mayo', value:5},
      {label:'Junio', value:6},
      {label:'Julio', value:7},
      {label:'Agosto', value:8},
      {label:'Setiembre', value:9},
      {label:'Octubre', value:10},
      {label:'Noviembre', value:11},
      {label:'Diciembre', value:12}
    ];  


    console.log(this.config.data);
    this.paramData=this.config.data;     
   }

  progress;
  canBeClosed = true;
  primaryButtonText = 'Subir';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  
  closeDialog(mes) {    
    
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
       return this.ref.close();
    }

    // set the component state to "uploading"
    this.uploading = true;
    
    // start the upload and save the progress map
    console.log(mes.value);
    if (mes.value)
        this.progress = this.uploadService.upload(this.files,this.paramData.url,mes.value.value);
    else
        this.progress = this.uploadService.upload(this.files,this.paramData.url);
    
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log('val',val));
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finalizado';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {      
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      //this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;      
    },
    () => {
      console.log('fin');
    });
  }
}
