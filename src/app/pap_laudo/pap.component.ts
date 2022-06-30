import { Component, OnInit } from '@angular/core';

import { PapService } from '../service/pap.service';
import { ExcelService } from '../service/excel.service';


@Component({
  selector: 'zd-pap',
  templateUrl: './pap.component.html',
  styleUrls: ['./pap.component.css'],
  providers:[PapService,ExcelService]
})
export class PapComponent implements OnInit {
 cap:any[];
 cols: any[];
 frozenCols: any[];
 estados:any[];
 estadosControl:any[];
 selectCap:any;
 loading:boolean;
 filtrados:number=0;
 TotalBasico:number=0;
 TotalAsigFam:number=0;
 TotalLaudoAnt:number=0;
 TotalLaudoAct:number=0;
 TotalRemu:number=0;
 TotalEssalud:number=0;
 TotalVidaLey:number=0;
 TotalSctrSalud:number=0;
 TotalSctrPension:number=0;
 TotalMensual:number=0;
 TotalMensualAnual:number=0;
 TotalEscolaridad:number=0;
 TotalBoniJulio:number=0;
 TotalBoniDic:number=0;
 TotalGratiJulio:number=0;
 TotalGratiDic:number=0;
 TotalContinua:number=0;
 TotalCts:number=0;
 TotalEssaludAnual:number=0;
 TotalVidaLeyAnual:number=0;
 TotalSctrAnual:number=0;
 TotalAnual:number=0;
 TotalBasicoAnual:number=0;
 TotalLaudoAnteriorAnual:number=0;
 TotalLaudoActualAnual:number=0;

  constructor(private capService:PapService,private excelService:ExcelService) { }

  ngOnInit() {
    this.cols = [   
      { field: 'nroCap', header: 'Cap' ,ancho:'1.3em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},      
        { field: 'fuente', header: 'Fuente', ancho:'1.0em',estilo: { 'font-size':'0.8em'},rowspan:'1',visible:true,numero:false},        
        //{ field: 'especifica', header: 'Especifica',ancho:'6em',estilo: {'font-size':'0.6em'} },    
        { field: 'nombres', header: 'Nombres' ,ancho:'7.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},          
        { field: 'estado', header: 'Estado',ancho:'3.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },  
        { field: 'meta', header: 'Meta', ancho:'1.6em',estilo: { 'font-size':'0.6em'},rowspan:'1',visible:true,numero:false},
        { field: 'nivelO', header: 'Nivel',ancho:'1.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false },         
        { field: 'monto', header: 'Basico',ancho:'2.3em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:false }, 
        { field: 'AsigFamiliar', header: 'Asig. \n Fam.' ,ancho:'2.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},  
        { field: 'laudo_anterior', header: 'Laudo \n 2014 2015' ,ancho:'2.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},  
        { field: 'laudo_actual', header: 'Laudo \n 2018 2019' ,ancho:'2.0em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},  
        { field: 'TotalRemuneracion', header: 'Total \n Remu.' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},    
        { field: 'essalud', header: 'Essalud' ,ancho:'2.3em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        {field: 'Vida_Ley', header: 'Vida \n Ley',ancho:'1.8em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'Sctr_Salud', header: 'Sctr \n Salud' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'Sctr_Pension', header: 'Sctr \n Pension' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'TotalMensual', header: 'Mensual' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'2',visible:true,numero:true},
        { field: 'TotalMensualAnual', header: 'Anual' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'2',visible:true,numero:true},
        { field: 'TotalBasicoAnual', header: 'Basico \n Asig. Fam.' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'2',visible:true,numero:true},
        { field: 'TotalLaudoAnteriorAnual', header: 'Laudo \n 2014 2015' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'2',visible:true,numero:true},
        { field: 'TotalLaudoActualAnual', header: 'Laudo \n 2018 2019' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'2',visible:true,numero:true},
        { field: 'escolaridad', header: 'Escolaridad' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'BoniJulio', header: 'Boni \n Julio' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'BoniDic', header: 'Boni \n Dic.' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'GratiJulio', header: 'Grati \n Julio' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'GratiDic', header: 'Grati \n Dic' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'TotalContinuaAnual', header: 'Continua' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'Cts', header: 'Cts' ,ancho:'2.3em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'EssaludAnual', header: 'Essalud' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'VidaLeyAnual', header: 'Vida Ley' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'SctrAnual', header: 'Sctr' ,ancho:'2.3em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true},
        { field: 'TotalAnual', header: 'Anual' ,ancho:'2.5em',estilo: {'font-size':'0.6em'},rowspan:'1',visible:true,numero:true}
    ];
  /*  this.estados = [    
      { label: 'TODOS', value: null },
      { label: 'OCUPADO', value: 'OCUPADO' },
      { label: 'VACANTE', value: 'VACANTE' },
      { label: 'OCUPADO_CF_CAS', value: 'OCUPADO_CF_CAS' },
      { label: 'OCUPADO_LSG', value: 'OCUPADO_LSG' },
      { label: 'OCUPADO_PAC', value: 'OCUPADO_PAC' },
      { label: 'OCUPADO_PL_RES', value: 'OCUPADO_PL_RES' }            
  ];*/

    this.estadosControl = [    
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'VACANTE', value: 'VACANTE' },
    { label: 'VACIOS', value: null }  
    ];

   this.cargarPap();
  }

  addFilter(dt,a) {    
    let valores = [];   
    a.value.forEach((element,index) => {        
      console.log('element',element);
    /*if (a.value.length-1 == index)
         valores = valores.concat(element['value']['desc_estado'])
     else*/
         valores.push(element['desc_estado'])
         //valores = valores.concat(element['value']['desc_estado'],",");
    });
    dt.filter(valores, 'estado', 'in');   
     //this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
   }

  handleFilter(event){
    this.filtrados = event.filteredValue.length;    
    this.calcularFooterTotal(event.filteredValue);
  }

  cargarPap(){
    this.loading = true;
    this.capService.getPapLaudo().subscribe(
      (data)=> {
        this.cap = data['data'];
        this.estados = [];
        for (let entry of data['estado']) {       
          this.estados.push({label : entry.desc_estado , value : {id: entry.id, desc_estado: entry.desc_estado, situacion : entry.situacion } } )          
         }  
        this.loading = false;
        this.calcularFooterTotal(this.cap);
        console.log(this.cap); }
    );
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.cap, 'Pap_');
 }

  calcularFooterTotal(tra){
      this.TotalBasico=0;
      this.TotalAsigFam=0;
      this.TotalLaudoAnt=0;
      this.TotalLaudoAct=0;
      this.TotalRemu=0;
      this.TotalEssalud=0;
      this.TotalVidaLey=0;
      this.TotalSctrSalud=0;
      this.TotalSctrPension=0;
      this.TotalMensual=0;
      this.TotalBasicoAnual=0;
      this.TotalLaudoAnteriorAnual=0;
      this.TotalLaudoActualAnual=0;
      this.TotalMensualAnual=0;
      this.TotalEscolaridad=0;
      this.TotalBoniJulio=0;
      this.TotalBoniDic=0;
      this.TotalGratiJulio=0;
      this.TotalGratiDic=0;
      this.TotalContinua=0;
      this.TotalCts=0;
      this.TotalEssaludAnual=0;
      this.TotalVidaLeyAnual=0;
      this.TotalSctrAnual=0;
      this.TotalAnual=0;
    if (tra) {
      for(let item of tra) {          
        this.TotalBasico+= parseFloat(item.monto);
        this.TotalAsigFam+= parseFloat(item.AsigFamiliar);
        this.TotalLaudoAnt+= parseFloat(item.laudo_anterior);
        this.TotalLaudoAct+= parseFloat(item.laudo_actual);
        this.TotalRemu+= parseFloat(item.TotalRemuneracion);        
        this.TotalEssalud+= parseFloat(item.essalud);
        this.TotalVidaLey+= parseFloat(item.Vida_Ley);        
        this.TotalSctrSalud+= parseFloat(item.Sctr_Salud);
        this.TotalSctrPension+= parseFloat(item.Sctr_Pension);        
        this.TotalMensual+= parseFloat(item.TotalMensual);
        this.TotalBasicoAnual+= parseFloat(item.TotalBasicoAnual);
        this.TotalLaudoAnteriorAnual+= parseFloat(item.TotalLaudoAnteriorAnual);
        this.TotalLaudoActualAnual+= parseFloat(item.TotalLaudoActualAnual);
        this.TotalMensualAnual+= parseFloat(item.TotalMensualAnual);
        this.TotalEscolaridad+= parseFloat(item.escolaridad);
        this.TotalBoniJulio+= parseFloat(item.BoniJulio);
        this.TotalBoniDic+= parseFloat(item.BoniDic);
        this.TotalGratiJulio+= parseFloat(item.GratiJulio);
        this.TotalGratiDic+= parseFloat(item.GratiDic);
        this.TotalContinua+= parseFloat(item.TotalContinuaAnual);
        this.TotalCts+= parseFloat(item.Cts);
        this.TotalEssaludAnual+= parseFloat(item.EssaludAnual);
        this.TotalVidaLeyAnual+= parseFloat(item.VidaLeyAnual);
        this.TotalSctrAnual+= parseFloat(item.SctrAnual);        
        this.TotalAnual+= parseFloat(item.TotalAnual);
      }
    }
  }
  
}

