import { Component, OnInit,OnDestroy, ViewEncapsulation } from '@angular/core';
import { AirhspCasService } from './airhsp_cas.service';
import { ExcelService } from '../service/excel.service';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'zd-airhsp_cas-control',
  templateUrl: './airhsp_cas_control.component.html',
  styleUrls: [ './airhsp_cas_control.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class AirhspCasControlComponent implements OnInit {
 cap:any[];
 cols: any[];
 frozenCols: any[];
 estados:any[];
 unidades:any[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalServicios:number=0;
 cap_data:any;
 displayDialog: boolean;
 car:any = {};

  constructor(private casService:AirhspCasService,private excelService:ExcelService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.cap_data=this.config.data.cap_data;    
    this.cols = [   
        { field: 'nro_convocatoria', header: 'N° Conv.' ,ancho:'3.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},            
        { field: 'desc_unidad', header: 'Unidad',ancho:'15em',estilo: {'font-size':'0.6em'} },                    
        { field: 'inscripcion', header: 'Inicio',ancho:'5em',estilo: {'font-size':'0.6em'} },                    
        { field: 'cierre', header: 'Fin',ancho:'5em',estilo: {'font-size':'0.6em'} },                    
        { field: 'estado', header: 'Estado',ancho:'5.5em',estilo: {'font-size':'0.6em'} },                    
        { field: 'jurados', header: 'Jurados',ancho:'15.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },                
        { field: 'detalle', header: 'Detalle',ancho:'10.em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false }        
    ];
    this.estados = [    
      { label: 'TODOS', value: null },
      { label: 'OCUPADO', value: 'OCUPADO' },
      { label: 'VACANTE', value: 'VACANTE' },
      { label: 'OCUPADO_CF_CAS', value: 'OCUPADO_CF_CAS' },
      { label: 'OCUPADO_LSG', value: 'OCUPADO_LSG' },
      { label: 'OCUPADO_PAC', value: 'OCUPADO_PAC' },
      { label: 'OCUPADO_PL_RES', value: 'OCUPADO_PL_RES' }            
  ];

    this.estadosControl = [    
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'VACANTE', value: 'VACANTE' },
    { label: 'VACIOS', value: null }  
    ];

   this.cargarConvocatoria();
  }

  onHide() {
    console.log('cerando');
   //this.ref.close(this.cap);
  }

  showDialogToAdd(data) {
    //   this.newCar = true;
       this.car = {};
       this.displayDialog = true;
   }

   showDialogToEdit(data) {
        console.log('id',data);
    //   this.newCar = true;
       if (data['org_unidad_id']) {
       let unidad_id = this.unidades.findIndex(ob => ( ob.id === data.data['org_unidad_id']));   
       this.car = {'desc_unidad':this.unidades[unidad_id],'jurados':data.jurados,'id':data['id']};
       }
       else
       {
        this.car = {'jurados':data.jurados,'id':data['id']};
       }
       
       
       this.displayDialog = true;
   }

   save(convo:any){    
      this.loading = true;
      console.log(convo);
     // let parametro = {idpap:id}
      this.casService.postConvocatorias(convo).subscribe(
        (data)=> {
          if (data.data['id']) {
              console.log('data grabada',data)
              let unidad_id = this.unidades.findIndex(ob => ( ob.id === data.data['org_unidad_id']));         //OJO org_unidad_id                         
              let id = this.cap.findIndex(ob => (ob.id === data.data['id']) );
              if (id>0) {
                //this.cap[id].nro_convocatoria = data.data['id'];
              //  console.log('jurados',data.data['jurados']);
              //  this.cap[id].jurados = (data.data['jurados']==null) || (data.data['jurados']=='undefinded)')  ? '':data.data['jurados'];
                this.cap[id].desc_unidad = this.unidades[unidad_id].desc_unidad;
              //  buscar id, y si encuentra en la matriz actualizar , sino agregar unshift.....
              }
              else
                this.cap.unshift({'nro_convocatoria':data.data['id'], 'jurados':data.data['jurados'],'desc_unidad':this.unidades[unidad_id].desc_unidad})
              }
              this.loading = false;
              this.displayDialog = false;
        }
         // this.calcularFooterTotal(this.cap);          
      );
   }




  handleFilter(event){
    this.filtrados = event.filteredValue.length;
    console.log(event);
    this.calcularFooterTotal(event.filteredValue);
  }

  cargarConvocatoria(){
    this.loading = true;
   // let parametro = {idpap:id}
    this.casService.getConvocatoria().subscribe(
      (data)=> {
        this.cap = data['data'];
        this.unidades = data['unidades'];
        this.loading = false;
       // this.calcularFooterTotal(this.cap);
        console.log(this.cap); }
    );
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.cap, 'Pap_');
 }

  calcularFooterTotal(tra){
      this.TotalServicios=0;

    if (tra) {
      for(let item of tra) {          
        this.TotalServicios+= parseFloat(item.servicio);

      }
    }
  }
  
}

