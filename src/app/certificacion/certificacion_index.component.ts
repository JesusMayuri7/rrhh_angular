import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'zd-certificacion-index',  
    templateUrl: './certificacion_index.component.html',
    styleUrls: ['./certificacion_index.component.css'],
    encapsulation: ViewEncapsulation.None  
  })
  export class CertificacionIndexComponent {

    tabs = [{ "title": "UNO", "template":"'template1" }, { "title": "DOS", "template":"template2" }]; 

}