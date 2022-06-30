import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams , HttpResponse, HttpHeaders} from '@angular/common/http';
import { CertificacionCasService } from './certificacion_cas.service';
import { ExcelService } from '../service/excel.service';
import {LazyLoadEvent, MessageService, DialogService} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import {MillonPipe} from '../pipes/millon.pipe';



import 'jspdf-autotable';
import { NumberFormat } from 'xlsx/types';
import { SelectItem } from '../interface';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';

//import * as deMessages from 'devextreme/localization/messages/es.json';
//import * as ruMessages from 'devextreme/localization/messages/ru.json';

declare let jsPDF;

@Component({
  selector: 'zd-certificacion-cas',  
  templateUrl: './certificacion_cas.component.html',
  styleUrls: ['./certificacion_cas.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[CertificacionCasService,ExcelService,MessageService,DialogService],

})
export class CertificacionCasComponent implements OnInit { 
 ordenes:any[];
 cols: any[];
 metas:any[];
 frozenCols:any[];
 resultados:any[];
 estadosControl:any[];
 sedes:any[];
 fuentes:any[];
 unidades:any[];
 vigencias:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0; idValidar:string;
 TotalServicios:number=0;
 data:{};
 totalRecords:number=0;
 rowCount:number=0;
 p:string;
 v:string;
 selectedCar:any=[];
 convocatorias:any[];
     RemPrinRO:number = 0;
     monto:number=0;
     RemPrinRDR:number = 0;
     BonFam:number = 0;
     BonifEsco:number = 0;
     BoniPatrias:number = 0;
     BoniNavidad:number = 0; 
     BoniExtJulio:number =0;
     BoniExtDic:number =0;
     Essalud:number = 0;
     activas:number=0;
     proceso:number=0;
     concluido:number=0;
     editing:boolean = false;
     validar:string = 'Validar';
     cols_validar:any[];
     plazas_validar:any[];
     plazas: {
      codigo_plaza: string;
      meta: string;
    }[];
    formulario: FormGroup;    
    item:FormGroup;
    itemData :Array<Object> = [];
    sumaOficina:Array<Object> = [];
    dataSource: any = {};
    applyFilterTypes: any;
    currentFilter: any;
    cols_itemData:any;
    organos:[];
    metas2:[];
    unidades2:[];
    selectedUnidad:any;
    itemKey:any;

  constructor(private certificacionCasService:CertificacionCasService,private _formBuilder: FormBuilder,private httpClient: HttpClient,
    private excelService:ExcelService,private messageService: MessageService,public dialogService: DialogService) { 


  }

  ngOnInit() {

    this.formulario = this._formBuilder.group({
      expediente: 'I-',      
      items: this._formBuilder.array([  ])
    });

    this.item = this._formBuilder.group({      
        cargo:'',
        codigo_plaza: '',
        cantidad:'1',
        honorario_mensual:0,
        essalud_mensual:174.15,
        total_mensual:0,
        meses:1,
        honorario_total:0,
        essalud_total:0,
        aguinaldo_total:600,      
        total_general:0,
        periodo:'',
        desc_unidad2:'',
        org_unidad_id2:0,
        meta: {},        
        meta_2019:'',        
    });



    this.plazas = [];

    this.cols_validar = [   
   //   { field: 'id', header: '#' ,ancho:'10px',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.6em','width':'10em'},rowspan:'1',visible:true,numero:false},      
      { field: 'codigo_plaza', header: 'Plaza' ,ancho:'3.2em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.6em','width':'10em'},rowspan:'1',visible:true,numero:false},      
   //   { field: 'fuente_id', header: 'Fuente', ancho:'15px',estilo: { 'font-size':'0.67em','width':'10em'},estilo_header: {'font-size':'0.6em','width':'10em'},rowspan:'1',visible:true,numero:false},        
   //   { field: 'meta', header: 'Meta', ancho:'15px',estilo: { 'font-size':'0.67em','width':'10em'},estilo_header: {'font-size':'0.6em','width':'10em'},rowspan:'1',visible:true,numero:false},        
   
      { field: 'm_base', header: 'Meta', ancho:'2.5em',estilo: { 'font-size':'0.67em','text-align':'left'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
      { field: 'finalidad', header: 'Meta Base',ancho:'18em',estilo: {'font-size':'0.67em','text-align':'left'} ,estilo_header:{'font-size':'0.67em','width':'10em'} },    
      { field: 'monto_base', header: 'Ingreso' ,ancho:'5.5em',estilo: {'font-size':'0.67em','text-align':'left'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'blue','color':'white'},rowspan:'1',visible:true,numero:false},          
      { field: 'm_air', header: 'Meta', ancho:'3.5em',estilo: { 'font-size':'0.67em','text-align':'left'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
      { field: 'meta_air', header: 'Nombres', ancho:'12em',estilo: { 'font-size':'0.67em','text-align':'left'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
      { field: 'monto_air', header: 'Cargo ',ancho:'5.5em',estilo: {'font-size':'0.67em','text-align':'left'},estilo_header:{'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false },          
      { field: 'estados', header: 'Estado',ancho:'5em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'green','color':'white'},rowspan:'1',visible:true,numero:false },          
      { field: 'estado_air', header: 'Estado',ancho:'2em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'blue','color':'white'},rowspan:'1',visible:true,numero:false },                
      { field: 'fecha_fin_vigencia_cas', header: 'Vigencia',ancho:'8em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'blue','color':'white'},rowspan:'1',visible:true,numero:false },                
      { field: 'convoca', header: 'fase',ancho:'3em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'yellow','color':'black'},rowspan:'1',visible:true,numero:false },          
      { field: 'convocatoria', header: 'Nro',ancho:'3em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'yellow','color':'black'},rowspan:'1',visible:true,numero:false },          
      { field: 'inscripcion', header: 'Inicio',ancho:'5em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'yellow','color':'black'},rowspan:'1',visible:true,numero:false },                
    ]; 

    this.cols_itemData = [   
      //   { field: 'id', header: '#' ,ancho:'10px',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.6em','width':'10em'},rowspan:'1',visible:true,numero:false},      
         { field: 'codigo_plaza', header: 'Plaza' ,ancho:'3.2em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.6em','width':'10em'},rowspan:'1',visible:true,numero:false},      
      //   { field: 'fuente_id', header: 'Fuente', ancho:'15px',estilo: { 'font-size':'0.67em','width':'10em'},estilo_header: {'font-size':'0.6em','width':'10em'},rowspan:'1',visible:true,numero:false},        
      //   { field: 'meta', header: 'Meta', ancho:'15px',estilo: { 'font-size':'0.67em','width':'10em'},estilo_header: {'font-size':'0.6em','width':'10em'},rowspan:'1',visible:true,numero:false},        
      
         { field: 'meta', header: 'Meta', ancho:'2.5em',estilo: { 'font-size':'0.67em','text-align':'left'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
         { field: 'finalidad', header: 'Meta Base',ancho:'18em',estilo: {'font-size':'0.67em','text-align':'left'} ,estilo_header:{'font-size':'0.67em','width':'10em'} },    
         { field: 'desc_unidad', header: 'Unidad', ancho:'12em',estilo: { 'font-size':'0.67em','text-align':'left'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
         { field: 'cargo', header: 'Cargo', ancho:'12em',estilo: { 'font-size':'0.67em','text-align':'left'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
         { field: 'honorario_mensual', header: 'Remuneracion' ,ancho:'5.5em',estilo: {'font-size':'0.67em','text-align':'left'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'blue','color':'white'},rowspan:'1',visible:true,numero:false},          
         { field: 'essalud_mensual', header: 'Essalud ',ancho:'5.5em',estilo: {'font-size':'0.67em','text-align':'left'},estilo_header:{'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false },          
         { field: 'total_mensual', header: 'Total ',ancho:'5.5em',estilo: {'font-size':'0.67em','text-align':'left'},estilo_header:{'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false },          
         { field: 'meses', header: 'Meses', ancho:'3.5em',estilo: { 'font-size':'0.67em','text-align':'left'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
         { field: 'estados', header: 'Estado',ancho:'5em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'green','color':'white'},rowspan:'1',visible:true,numero:false },          
         { field: 'estado_air', header: 'Estado',ancho:'2em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'blue','color':'white'},rowspan:'1',visible:true,numero:false },                
         //{ field: 'fecha_fin_vigencia_cas', header: 'Vigencia',ancho:'8em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'blue','color':'white'},rowspan:'1',visible:true,numero:false },                
         //{ field: 'convoca', header: 'Estado',ancho:'3em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'yellow','color':'black'},rowspan:'1',visible:true,numero:false },          
         //{ field: 'convocatoria', header: 'Nro',ancho:'3em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'yellow','color':'black'},rowspan:'1',visible:true,numero:false },          
         //{ field: 'inscripcion', header: 'Inicio',ancho:'5em',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em','background-color':'yellow','color':'black'},rowspan:'1',visible:true,numero:false },                
       ]; 


    this.resultados= [    
      { label: 'PENDIENTE ', value: 'PENDIENTE' },
      { label: 'ACTIVO ', value: 'ACTIVO' },
      { label: 'EN PROCESO ', value: 'EN PROCESO' },
      { label: 'CONCLUIDO ', value: 'CONCLUIDO' } ,
      { label: 'DESIERTO ', value: 'DESIERTO' }    
  ];

  this.vigencias= [    
    { label: 'SOSTENIBLE', value: 'SOSTENIBLE' },
    { label: '31/12/2019', value: '31/12/2019' }   
];

    this.estadosControl = [    
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'VACANTE', value: 'VACANTE' },
    ];

    this.sedes = [    
      { label: 'SEDE', value: 'SEDE'},
      { label: 'ZONAL',value:'ZONAL'}            
  ]; 

  this.fuentes = [    
      { label: 'RO', value: 1},
      { label: 'RDR',value:2}            
  ]; 

  this.frozenCols = [
      { field: 'id', header: '#' ,ancho:'30px',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},      
      { field: 'codigo_plaza', header: 'N° Plaza' ,ancho:'50px',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},      
      { field: 'sede', header: 'Sede', ancho:'50px',estilo: { 'font-size':'0.67em','width':'10em'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
      { field: 'fuente_id', header: 'Fuente', ancho:'50px',estilo: { 'font-size':'0.67em','width':'10em'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
      { field: 'meta', header: 'Meta', ancho:'40px',estilo: { 'font-size':'0.67em','width':'10em'},estilo_header: {'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false},        
      { field: 'monto', header: 'Rem.',ancho:'60px',estilo: {'font-size':'0.67em','width':'10em'},estilo_header:{'font-size':'0.67em','width':'10em'},rowspan:'1',visible:true,numero:false },              
    ];
    
    // this.buscar(null,null,1);

  // this.getMetas();
  this.dependencias();
   this.cargaData(this);
  } // fin init

  dependencias() {
    this.loading = true; 
    this.certificacionCasService.getDependencias().subscribe(
      (result)=> {
        this.organos = result['organos'];  
        this.metas = result['metas'];  
        this.metas2 = result['metas2'];  
        this.unidades = result["unidades"];         
        this.unidades2 = result["unidades2"]; 
        
       // this.selectedUnidad = result["unidades2"][0];
        console.log(this.unidades2);
        this.loading = false; 
      });
  }

  onItemClick(e) {   
    this.item.patchValue({org_unidad_id2:e.item.id});
    this.item.patchValue({desc_unidad2:e.item.desc_unidad});
	   console.log(this.item);
	}

  cargaData(a) {
    let header = new HttpHeaders({'content-type':'application/json'});  
    a.dataSource = new CustomStore({
      key: "id",
      load: ()=>this.cargarPap(),     
      remove: (key) => this.httpClient.delete('http://rrhh.pvn.gob.pe/api/tramite/certificacion/'+key),      
      update: (key, values) => this.httpClient.put("http://rrhh.pvn.gob.pe/api/tramite/certificacion", {
          id: key,
          values: values
        },{headers :header}).toPromise()
        .then(result => {
          console.log("get",result);
          return {          
              data: result['data'],
              totalCount: 588,
              sumary:588            
            // groupCount: result.groupCount*/
          };
        }), 
    })
  }



  onRowUpdating(row){
    row.newData = Object.assign(row.oldData, row.newData); 
    //console.log(row);
 /*   let header = new HttpHeaders({'content-type':'application/json'});  
    this.httpClient.put("http://rrhh.pvn.gob.pe/api/cas/certificacion", {
        id: row.key,
        _method : "PUT",
        values: row.newData
      },{headers :header}).toPromise().then(result => {
         console.log("resultado",result);
      });*/
  }

  crearExpediente(values){    
      this.httpClient.post("http://rrhh.pvn.gob.pe/api/tramite/certificacion", values)
          .toPromise()
          .then(result => {
            console.log("get",result);  
           // this.dataSource.refresh(true);               ERROR 
           //  data: result['data'],                                
               // groupCount: result.groupCount*/            
          });    
  }


  onRowUpdated(row){
   console.log("ted",row);
  }

cargarPap():Promise<any>{    
  return this.httpClient.get("http://rrhh.pvn.gob.pe/api/cas/certificacion").toPromise()
    .then(result => {
      console.log("get",result['data']);
      return {          
          data: result['data'],
          totalCount: 588,
          sumary:588            
         // groupCount: result.groupCount*/
      };
  });          
}

    formatear(numero:number){      
      return Intl.NumberFormat("es-PE",{          
        minimumFractionDigits: 2,
      }).format(numero);
    }    
    
  
    get items() {    
      return this.formulario.get('items') as FormArray;
    }
  
    addItem(): void {
      let hm:number = this.item.get('honorario_mensual').value;
      let em:number = this.item.get('essalud_mensual').value;    
      let meses:number = this.item.get('meses').value;
      let at:number = this.item.get('aguinaldo_total').value;
      let tm:number = +hm + +em;      
      let ht:number = hm*meses;      
      let est:number = em*meses;      
      let total:number = +ht + +est + +at;
      
      this.item.patchValue({total_mensual:tm});      
      this.item.patchValue({honorario_total:ht});
      this.item.patchValue({essalud_total:est});
      this.item.patchValue({aguinaldo_total:at});
      this.item.patchValue({total_general:total});

      //this.item.patchValue({essalud_mensual:this.formatear(this.item.get('essalud_mensual').value)});
      //let hm:number = this.plazas_validar[0]['monto_base'];
      //this.item.patchValue({honorario_mensual:this.formatear(hm)});      
    //this.items.push(this.item);      
    this.itemData.push(this.item.value);
    this.item.get('codigo_plaza').reset();    
    this.item.get('cargo').reset();    
    this.item.get('essalud_mensual').reset();
    this.item.get('honorario_mensual').reset();    
    console.log(this.itemData);
    }
  /*

 removeItem() {
    this.plazas.pop();
    this.demoArray.removeAt(this.demoArray.length - 1);
 }*/
  
 getMetas(){  
  this.loading = true;  
  this.certificacionCasService.getMetas().pipe(
     
  ).subscribe(
    (res)=> {                    
      this.metas = res['metas'];            
       this.loading = false;
    }
  )}
 
  createPdf() {
  console.log("data",this.itemData);
  this.crearExpediente({expediente:this.formulario.get("expediente").value,values:this.itemData});   
   // totales
    let so:number=0;
    let eo:number=0;
    let tm:number=0;
    let ht:number=0;
    let et:number=0;
    let at:number=0;
    let tg:number=0;
    let ca:number=0;
    this.itemData.map( x => {
        ca += +x['cantidad'];
        so += +x['honorario_mensual'];
        eo += +x['essalud_mensual'];
        tm += +x['total_mensual'];
        ht += +x['honorario_total'];
        et += +x['essalud_total'];
        at += +x['aguinaldo_total'];
        tg += +x['total_general'];
        x['cantidad']= x['cantidad'];
        x['honorario_mensual']=this.formatear(x['honorario_mensual']);
        x['essalud_mensual']=this.formatear(x['essalud_mensual']);
        x['total_mensual']=this.formatear(x['total_mensual']);
        x['honorario_total']=this.formatear(x['honorario_total']);
        x['essalud_total']=this.formatear(x['essalud_total']);
        x['aguinaldo_total']=this.formatear(x['aguinaldo_total']);
        x['total_general']=this.formatear(x['total_general']);
 
     });
    this.sumaOficina.push(
      {
      'cantidad':ca,
      'honorario_mensual':this.formatear(so),
      'essalud_mensual':this.formatear(eo),
      'total_mensual':this.formatear(tm),
      'honorario_total':this.formatear(ht),
      'essalud_total':this.formatear(et),
      'aguinaldo_total':this.formatear(at),
      'total_general':this.formatear(tg),
      'desc_unidad':this.item.get('desc_unidad2').value
      },
    );     
     console.log('suma',this.sumaOficina); 


    console.log(this.items.value);
    var doc = new jsPDF('landscape', 'pt', 'a4');

    doc.setFontSize(15);        
    doc.text('PRESUPUESTO PARA REQUERIMIENTO CAS - 2020',220, 80);
    doc.setFontSize(8);
    doc.setTextColor(100);
    

    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    var pageSize = doc.internal.pageSize;
    //var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    
    // AGREGAR SUMA TOTAL GENERAL Y OFICINA
    doc.autoTable({
      head: [
              [
                { content: 'NOMBRE DEL PUESTO', rowSpan: 2,  styles: {halign: 'center',valign: 'middle'} },
                { content: 'AIRHSP', rowSpan: 4, styles: {halign: 'center', valign: 'middle'} },
                { content: 'CAN.', rowSpan: 2, styles: {halign: 'center', valign: 'middle'} },
                { content: 'GASTO', colSpan: 3,rowSpan: 1, styles: {halign: 'center'} },
                { content: 'PERIODO - MARZO A DICIEMBRE 2020', colSpan: 5,rowSpan: 1, styles: {halign: 'center'} },
              ] ,
              [                
                { content: 'HONORARIO MENSUAL', styles: {halign: 'center', valign: 'middle'} },
                { content: 'ESSALUD', styles: {halign: 'center', valign: 'middle'} },
                { content: 'TOTAL', styles: {halign: 'center',valign: 'middle'}  },
                { content: 'MESES', rowSpan: 3,styles: {halign: 'center', valign: 'middle'} },
                { content: 'HONORARIO', styles: {halign: 'center', valign: 'middle'} },
                { content: 'ESSALUD', styles: {halign: 'center', valign: 'middle'} },
                { content: 'AGUINALDO', styles: {halign: 'center',valign: 'middle'}  },               
                { content: 'TOTAL',  styles: {halign: 'center',valign: 'middle'} },                                                                 
              ] ,
              [
                { content: 'TOTAL GENERAL',  styles: {halign: 'left',valign: 'middle'} },                                              
                { content: this.sumaOficina[0]['cantidad'], styles: {halign: 'center',valign: 'middle',fontSize: 9} },
                { content:  this.sumaOficina[0]['honorario_mensual'], styles: {halign: 'right', valign: 'middle',fontSize: 9}, },
                { content: this.sumaOficina[0]['essalud_mensual'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['total_mensual'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },

                { content: this.sumaOficina[0]['honorario_total'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['essalud_total'], styles: {halign: 'right', valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['aguinaldo_total'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['total_general'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },    
              ] ,
              [
                { content: this.sumaOficina[0]['desc_unidad'], styles: {halign: 'left',fontSize: 9} },                
                { content: this.sumaOficina[0]['cantidad'], styles: {halign: 'center', valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['honorario_mensual'],styles: {halign: 'right',valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['essalud_mensual'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },                
                { content: this.sumaOficina[0]['total_mensual'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },                

                { content: this.sumaOficina[0]['honorario_total'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['essalud_total'], styles: {halign: 'right', valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['aguinaldo_total'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },
                { content: this.sumaOficina[0]['total_general'], styles: {halign: 'right',valign: 'middle',fontSize: 9} },                                                      
              ],
            ],             
      body: this.itemData,
            columns: [
              { dataKey: 'cargo'},
              { dataKey: 'codigo_plaza'},
              { dataKey: 'cantidad'},
              { dataKey: 'honorario_mensual'},
              { dataKey: 'essalud_mensual'},
              { dataKey: 'total_mensual'},
              { dataKey: 'meses'},
              { dataKey: 'honorario_total'},
              { dataKey: 'essalud_total'},
              { dataKey: 'aguinaldo_total'},
              { dataKey: 'total_general'},              
            ],
            columnStyles: {
              0: {columnWidth: 200,halign: 'left'}, 
              1: {columnWidth: 50,halign: 'center',fontSize: 9}, 
              2: {columnWidth: 30,halign: 'center'},
              3: {columnWidth: 60,halign: 'right'}, 
              4: {columnWidth: 60,halign: 'right'}, 
              5: {columnWidth: 60,halign: 'right'},
              6: {columnWidth: 50,halign: 'center'}, 
              7: {columnWidth: 60,halign: 'right'}, 
              8: {columnWidth: 60,halign: 'right'},
              9: {columnWidth: 60,halign: 'right'}, 
              10: {columnWidth: 60,halign: 'right'}, 
              11: {columnWidth: 60,halign: 'right',text: {valign: 'middle'}}
            },
            margin: {top: 90},      
            headStyles: {fillColor: [200, 200, 200]},                 
            styles: {overflow: 'linebreak',  font: 'arial', lineWidth: 1,lineColor:[0, 0, 0],margin:100,
            textColor: false,
            fontSize: 8, }
    });
    doc.save("table.pdf");
  }
  

  

  certificacionCasValidar(campo:string){             
      let param={codigo_plaza:this.item.get('codigo_plaza').value};  
      this.loading = true;  
      this.certificacionCasService.postCertificacionValidar(param).subscribe(
        (res)=> {              
          this.plazas_validar = res['data'];            
          console.log(this.plazas_validar);
          this.item.patchValue({cargo:this.plazas_validar[0]['cargo']});                  
          this.itemKey = this.plazas_validar[0]['org_unidad_id2'];
          this.item.patchValue({org_unidad_id2:this.plazas_validar[0]['org_unidad_id2']});
          this.item.patchValue({desc_unidad2:this.plazas_validar[0]['desc_unidad2']});
          let hm:number = this.plazas_validar[0]['monto_base'];
          this.item.patchValue({honorario_mensual:hm});
          var foundIndex = this.metas.findIndex(x => x.idmeta_anual == this.plazas_validar[0]['m_base']);                    
          setTimeout(() => {
            this.item.patchValue({meta:this.metas[foundIndex]});        
          }, 0);
          //this.createPdf();
          this.loading = false;
        }
      )
  }

  certificacionCargoUpdate(){             
    //console.log(this.item.get('meta').value.meta);
    let param={
                codigo_plaza : this.item.get('codigo_plaza').value,
                cargo : this.item.get('cargo').value,
                meta : this.item.get('meta').value.meta,
                meta_id : this.item.get('meta').value.idmeta_anual,
                monto : this.item.get('honorario_mensual').value,
              };  
    this.loading = true;  
    console.log(param);
    this.certificacionCasService.putCertificacionCargoUpdate(param).subscribe(
      (res)=> {              
        console.log(res);
        //this.plazas_validar = res['data'];            

        //this.item.patchValue({cargo:this.plazas_validar[0]['cargo']});
        //let hm:number = this.plazas_validar[0]['monto_base'];
        //this.item.patchValue({honorario_mensual:hm});
        //var foundIndex = this.metas.findIndex(x => x.idmeta_anual == this.plazas_validar[0]['m_base']);                    
        setTimeout(() => {
          //this.item.patchValue({meta:this.metas[foundIndex]});        
        }, 0);
        //this.createPdf();
        this.loading = false;
      }
    )
}












  open(e){       
    if (e.columnIndex==0) {
      var anio = e.value.substring(e.value.length - 4);
      console.log(anio);
       var url = e.value.substring(2,e.value.length - 5);
       //var url = url1.value.substring(6);
       console.log(url);
       url = "http://gis.proviasnac.gob.pe/intranet/TRAMITE_doc/tramite_exp_hoja_std.asp?nu_expedref="+url+"&s_id_periodo="+anio+"&tipo=I&opcion=5";
       window.open(url, null);        
    }
    if (e.columnIndex==3) {     

      console.log(e);
      var doc = e.value.substring(0,13);      
       window.open(e.data.informe_opp+doc+'.pdf', null);        
    }
  }

  open_pdf(e){       

  }




  /*
  newPlaza() {        
    const ref = this.dialogService.open(AirhspCasPlazaComponent, {
         data: {
            accion:'new',
            plaza_data: []            
        },
        header: 'Editar Plaza',
        width: '35%'
    });

    ref.onClose.subscribe((car) => {
      console.log('car',car);
      if (car) {          
          //TODO actualizar registro
          var foundIndex = this.ordenes.findIndex(x => x.id == car.data.airhsp_id);    
          this.selectedCar =this.ordenes[foundIndex];   
          this.ordenes[foundIndex].nombres = car.data.nombres;          
          //this.messageService.add({severity:'success', summary: 'Convocatoria', detail:car.message});
      }
    });
  }*/
/*
  editPlaza(servicio) {
      console.log('editar',servicio);
      const ref = this.dialogService.open(AirhspCasPlazaComponent, {
          data: {
              accion:'edit',
              designaciones_data: servicio            
          },
          header: 'Editar Plaza ( Codigo Plaza : '+ servicio.codigo_plaza+' )',
          width: '35%'
      });

      ref.onClose.subscribe((car) => {
        console.log('car',car);
        if (car) {          
            //TODO actualizar registro
             var foundIndex = this.ordenes.findIndex(x => x.id == car.data.id);        
             this.ordenes[foundIndex].cargo = car.data.cargo;     
             this.ordenes[foundIndex].codigo_plaza = car.data.codigo_plaza;     
             this.ordenes[foundIndex].detalle = car.data.detalle;     
             this.ordenes[foundIndex].certificacion = car.data.certificacion;     
             this.ordenes[foundIndex].fuente_id = car.data.fuente_id;     
             this.ordenes[foundIndex].meta_id = car.data.meta_id;     
             this.ordenes[foundIndex].monto = car.data.monto;     
             this.ordenes[foundIndex].bc_org_unidad_id = car.data.bc_org_unidad_id;     
             this.ordenes[foundIndex].sede = car.data.sede;
             this.ordenes[foundIndex].nombres = car.data.nombres;          
             this.selectedCar = this.ordenes[foundIndex];
             console.log('detalle',this.ordenes[foundIndex].detalle); 
        //    this.messageService.add({severity:'success', summary: 'Convocatoria', detail:car.message});
        }
      });    
  }
*/
  changeParametro(event,criterio){
    if(!event.value){
      this.p=null;
      this.v=null;
      criterio.value='';
     
    }
  }


  buscar(campo){
    let param={};    
    this.loading = true;
    
    this.certificacionCasService.getBaseCas().subscribe(
      (res)=> {        
        
        this.ordenes = res['data'];               
         this.loading = false;
      }
    )
  }





  filtros(event,para){
   console.log('CAMPO',event.target.value,'VALOR',para.value.value);
   this.v=event.target.value;
   this.p=para.value.value;
 //  this.buscar(this.p,this.v,1);
  }

  loadCarsLazy(event:LazyLoadEvent) {    
    let pages=1;
    pages= Math.trunc((event.first/this.rowCount)+1);
    this.loading = true;      
    //if ((this.p!=null) && (this.v!=null))
    //  this.buscar(this.p,this.v,pages);    
    //else
     // this.buscar(null,null,pages);    
    
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort in single sort mode
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    //filters: Filters object having field as key and filter value, filter matchMode as value
    //globalFilter: Value of the global filter if available
   // this.cars = //do a request to a remote datasource using a service and return the cars that match the lazy load criteria
}

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.ordenes, 'AirHspCas_');
 }

  calcularFooterTotal(tra){
     this.RemPrinRO = 0;
     this.RemPrinRDR = 0;
     this.BonFam = 0;
     this.BonifEsco = 0;
     this.BoniPatrias = 0;
     this.BoniNavidad = 0; 
     this.BoniExtJulio =0;
     this.BoniExtDic =0;
     this.Essalud = 0;
     this.activas=0;
     this.proceso=0;
     this.concluido=0;
     this.monto=0;
    if (tra) {
      
      for(let item of tra) {                  
        this.RemPrinRO += parseFloat(item.remprinro);
        this.RemPrinRDR += parseFloat(item.remprinrdr);
        this.monto += parseFloat(item.monto);        
        this.BoniPatrias += parseFloat(item.bonipatrias? item.bonipatrias:0);
        this.BoniNavidad += parseFloat(item.boninavidad? item.boninavidad:0);         
        this.Essalud += parseFloat(item.essalud? item.essalud:0);
        this.activas += parseFloat(item.activas? item.activas: 0);
        this.proceso += parseFloat(item.proceso? item.proceso:0);
        this.concluido += parseFloat(item.concluido? item.concluido:0);
        
      }
    }
  }


  
}

