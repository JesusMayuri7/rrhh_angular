import { Component, OnInit } from '@angular/core';
import {PresupuestoService} from '../service/presupuesto.service';
import {PeaService} from '../service/pea.service';
import {Presupuesto,Message,SelectItem,MenuItem,LazyLoadEvent,FilterMetadata} from '../interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {catchError,map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'zd-cas',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css'],
  providers:[PresupuestoService,PeaService]
})
export class PresupuestoComponent implements OnInit {    
    datos:any[];
    presupuesto:Presupuesto[];
    trabajador:any[];
    cols:any[];
    colspeas:any[];
    meses:SelectItem[];
    selectedCity1:any;
         totalesPim : number;
         totalesCer : number;
         totalesEje : number;
         totalesPro : number;
         totalesTot : number;
         totalesSal : number;
         totalesEne : number;
         totalesFeb : number;
         totalesMar : number;
         totalesAbr : number;
         totalesMay : number;
         totalesJun : number;
         totalesJul : number;
         totalesAgo : number;
         totalesSet : number;
         totalesOct : number;
         totalesNov : number;
         totalesDic : number; 
         totalesAna : number;
    totalDic;totalNov:number = 0;       
    totalOct:number = 0; 
    totalSet:number = 0; 
    totalAgo:number = 0; 
    totalJul:number = 0; 
    totalJun:number = 0; 
    totalMay:number = 0; 
    totalAbr:number = 0; 
    totalMar:number = 0; 
    totalFeb:number = 0; 
    totalEne:number = 0; 
    totalPim:number = 0; 
    totalCer:number = 0; 
    totalEje:number = 0; 
    totalPro:number = 0; 
    totalTot:number = 0; 
    totalSal:number = 0; 
    totalAna:number = 0;
    private _placeholderBase64 = `data:image/png;base64,`;
    private _placeHolderSafe: SafeUrl;
    contando:number=0;
    loading: boolean;
       

    constructor(private presupuestoService: PresupuestoService,private peaService: PeaService,private sanitizer: DomSanitizer) { 

    }
    image='/assets/icons/blank.png';
    defaultImage = '/assets/icons/blank.png';
    rowGroupFuente: any;
    rowGroupActividad: any;  
    rowGroupMeta: any;
    rowGroupEspecifica: any;
    offset = 20;
    habilitado=false;

    cargaFoto(dni){
        //return this.contando+=1;
        if(typeof dni !== 'undefined'){
            console.log('entro '+dni);
        return "http://programacion.minsa/api/trabajador/"+dni; }
        else{
            return '/assets/icons/blank.png';
        }        
    }

    ngOnInit() {     
      this.cols = [
        { field: 'Concepto', header: 'Concepto' ,width:'20%',tamanio:'0.5em', visible:true},
        { field: 'meta', header: 'Meta' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'pim', header: 'Pim' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'Total', header: 'Total' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'Saldo', header: 'Saldo' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'enero', header: 'Enero' ,width:'3%',tamanio:'0.5em', visible:true},
        { field: 'febrero', header: 'Febrero' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'marzo', header: 'Marzo' ,width:'3%',tamanio:'0.5em',visible:true},    
        { field: 'abril', header: 'Abril' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'mayo', header: 'Mayo' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'junio', header: 'Junio' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'julio', header: 'Julio' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'agosto', header: 'Agosto' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'setiembre', header: 'Setiembre' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'octubre', header: 'Octubre' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'noviembre', header: 'Noviembre' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'diciembre', header: 'Diciembre' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'Analisis', header: 'Analisis' ,width:'3%',tamanio:'0.5em',visible:true}
      ];

      this.colspeas = [
        { field: 'nombres', header: 'Concepto' ,width:'20%',tamanio:'0.5em', visible:true},
        { field: 'nrocap', header: 'Meta' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'situacion2', header: 'Pim' ,width:'3%',tamanio:'0.5em',visible:true},        
        { field: 'enero', header: 'Enero' ,width:'3%',tamanio:'0.5em', visible:true},
        { field: 'febrero', header: 'Febrero' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'marzo', header: 'Marzo' ,width:'3%',tamanio:'0.5em',visible:true},    
        { field: 'abril', header: 'Abril' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'mayo', header: 'Mayo' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'junio', header: 'Junio' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'julio', header: 'Julio' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'agosto', header: 'Agosto' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'setiembre', header: 'Setiembre' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'octubre', header: 'Octubre' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'noviembre', header: 'Noviembre' ,width:'3%',tamanio:'0.5em',visible:true},
        { field: 'diciembre', header: 'Diciembre' ,width:'3%',tamanio:'0.5em',visible:true},
      ];
   
      this.meses = [
        {label:'Seleccione', value:null},
        {label:'Enero', value:{id:1, name: 'enero', code: 'NY'}},
        {label:'Febrero', value:{id:2, name: 'febrero', code: 'RM'}},
        {label:'Marzo', value:{id:3, name: 'marzo', code: 'LDN'}},
        {label:'Abril', value:{id:4, name: 'abril', code: 'IST'}},
        {label:'Mayo', value:{id:5, name: 'mayo', code: 'PRS'}},
        {label:'Junio', value:{id:6, name: 'junio', code: 'PRS'}},
        {label:'Julio', value:{id:7, name: 'julio', code: 'PRS'}},
        {label:'Agosto', value:{id:8, name: 'agosto', code: 'PRS'}},
        {label:'Setiembre', value:{id:9, name: 'setiembre', code: 'PRS'}},
        {label:'Octubre', value:{id:10, name: 'octubre', code: 'PRS'}},
        {label:'Noviembre', value:{id:11, name: 'noviembre', code: 'PRS'}},
        {label:'Diciembre', value:{id:12, name: 'diciembre', code: 'PRS'}}
      ];  
   
    }

    onSort() {
      this.updateRowGroupFuente();
      this.updateRowGroupActividad();
      this.updateRowGroupEspecifica();
      this.updateRowGroupMeta();
  }

  onDescargar(mes){    
    this.presupuestoService.getDescarga(mes.value.value.id).subscribe((data)=>
    {
      
    });
  }

  onOptionsSelected(event){
    let value = event.value.value;    
    if (value==null)
    { 
      this.habilitado=false;
      this.presupuesto=[];
    }
    else {
    this.loading = true;     
    
          this.presupuestoService.getPresupuesto(value.id).subscribe((data) => {   
              console.log('presup',data);
             this.presupuesto= data;

             this.updateRowGroupFuente();
             this.updateRowGroupActividad();
             this.updateRowGroupEspecifica();
             this.updateRowGroupMeta();
             this.calcularFooterTotal(this.presupuesto);
             this.loading = false;
             this.habilitado=true;
             
             //this.trabajador=this.join(data[0]['data'],data[1]['data']);            
            });
      } 
 }

  updateRowGroupFuente() {
    this.rowGroupFuente = {};
    if (this.presupuesto) {
        for (let i = 0; i < this.presupuesto.length; i++) {
            let rowData = this.presupuesto[i];
            let fuente = rowData.fuente;
            if (i == 0) {
                this.rowGroupFuente[fuente] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.presupuesto[i - 1];
                let previousRowGroup = previousRowData.fuente;
                if (fuente === previousRowGroup)
                    this.rowGroupFuente[fuente].size++;
                else
                    this.rowGroupFuente[fuente] = { index: i, size: 1 };
            }
        }
    }
  }

    updateRowGroupActividad() {
      this.rowGroupActividad = {};
      if (this.presupuesto) {
          for (let i = 0; i < this.presupuesto.length; i++) {
              let rowData = this.presupuesto[i];
              let idactividad = rowData.fuente+rowData.idactividad;
              if (i == 0) {
                  this.rowGroupActividad[idactividad] = { index: 0, size: 1 };                                                      
              }
              else {
                  let previousRowData = this.presupuesto[i - 1];                  
                  let previousRowGroup = previousRowData.fuente+previousRowData.idactividad;                  
                  if (idactividad === previousRowGroup )                  
                      this.rowGroupActividad[idactividad].size++;                     
                  else 
                      this.rowGroupActividad[idactividad] = { index: i, size: 1 }; 
              }
          }
      
      }
  }

  updateRowGroupMeta() {
    this.rowGroupMeta = {};
    if (this.presupuesto) {
        for (let i = 0; i < this.presupuesto.length; i++) {
            let rowData = this.presupuesto[i];
            let meta = rowData.fuente + rowData.idactividad + rowData.especifica + rowData.meta;
            if (i == 0) {
                this.rowGroupMeta[meta] = { index: 0, size: 1 };                                                      
            }
            else {
                let previousRowData = this.presupuesto[i - 1];                  
                let previousRowGroup = previousRowData.fuente + previousRowData.idactividad + previousRowData.especifica + previousRowData.meta;                  
                if (meta === previousRowGroup )                  
                    this.rowGroupMeta[meta].size++;                     
                else 
                    this.rowGroupMeta[meta] = { index: i, size: 1 }; 
            }
        }
    
      }
    }

    updateRowGroupEspecifica() {
      this.rowGroupEspecifica = {};
      if (this.presupuesto) {
          for (let i = 0; i < this.presupuesto.length; i++) {
              let rowData = this.presupuesto[i];
              let especifica = rowData.fuente+rowData.idactividad+rowData.especifica;
              if (i == 0) {
                  this.rowGroupEspecifica[especifica] = { index: 0, size: 1 };                                                      
              }
              else {
                  let previousRowData = this.presupuesto[i - 1];                  
                  let previousRowGroup = previousRowData.fuente+previousRowData.idactividad+previousRowData.especifica;                  
                  if (especifica === previousRowGroup )                  
                      this.rowGroupEspecifica[especifica].size++;                     
                  else 
                      this.rowGroupEspecifica[especifica] = { index: i, size: 1 }; 
              }
          }         
          }
      }
  

    join(cabecera, detalle){
        return cabecera.map(cab => {  // itera cada item array cab       
          let paso = detalle.filter(det => (det.Id2 == cab.Id));  // filtra cada item , y devuelve solo los que cumplen                           
          let completo = Object.assign([], cab); // crea una copia 
          completo['detalle']=paso;  // crea un nuevo argumento 'det' y asigna un nuevo valor 'paso'
          return completo;       
        })
    }       
    
    join2(events, speakers){
        return events.map(event => {
          return speakers
          .filter(speaker => speaker.id == event.speaker_id)
          .map(speaker => {
            return {
              id: event.id,
              title: event.title,
              date: event.date,
              speaker_id: event.speaker_id,
              speaker: speaker
            }
          })
        }).reduce((a,b) =>{
          return a.concat(b);
        }, []);
    }  


    calcularFooterTotal(tra){
         this.totalesPim=0; // Esta declaracion es importante
         this.totalesEje=0;
         this.totalesSal=0;
         this.totalesEne=0;
         this.totalesFeb=0;
         this.totalesMar=0;
         this.totalesAbr=0;
         this.totalesMay=0;
         this.totalesJun=0;
         this.totalesJul=0;
         this.totalesAgo=0;
         this.totalesSet=0;
         this.totalesOct=0;
         this.totalesNov=0;
         this.totalesDic=0;
         this.totalesAna=0;
         if (tra) {
            for(let item of tra) {             
            this.totalesPim +=parseFloat(item.pim);
            //this.totalesCer +=item.Certificado;
            this.totalesEje +=parseFloat(item.Total);
            //this.totalesPro +=item.Proyeccion;
            //this.totalesTot +=item.totales;
            this.totalesSal +=parseFloat(item.Saldo);
            this.totalesEne +=parseFloat(item.enero);
            this.totalesFeb +=item.febrero;
            this.totalesMar +=item.marzo;
            this.totalesAbr +=item.abril;
            this.totalesMay +=item.mayo;
            this.totalesJun +=item.junio;
            this.totalesJul +=item.julio;
            this.totalesAgo +=item.agosto;
            this.totalesSet +=item.setiembre;
            this.totalesOct +=item.octubre;
            this.totalesNov +=item.noviembre;
            this.totalesDic +=item.diciembre;
            this.totalesAna   +=item.analisis;
            }
         }
    }

    calculateGroupFuente(fuente: string) {    
        this.totalDic=0; 
        this.totalNov=0;            
        this.totalOct=0; 
        this.totalSet = 0; 
        this.totalAgo = 0; 
        this.totalJul = 0; 
        this.totalJun = 0; 
        this.totalMay = 0; 
        this.totalAbr = 0; 
        this.totalMar = 0; 
        this.totalFeb = 0; 
        this.totalEne = 0; 
        this.totalPim = 0;
        this.totalCer = 0;
        this.totalEje = 0;        
        this.totalTot = 0;
        this.totalSal = 0;
        this.totalAna = 0;
        if(this.presupuesto) {                
            for(let item of this.presupuesto) {                                  
                if(item.fuente === fuente) {                                               
                    this.totalDic += item.diciembre;
                    this.totalNov += item.noviembre;
                    this.totalOct += item.octubre;
                    this.totalSet += item.setiembre;
                    this.totalAgo += item.agosto;
                    this.totalJul += item.julio;
                    this.totalJun += item.junio;
                    this.totalMay += item.mayo;
                    this.totalAbr += item.abril;
                    this.totalMar += item.marzo;
                    this.totalFeb += item.febrero;
                    this.totalEne += item.enero;
                    this.totalPim += item.pim;                                        
                    this.totalTot += item.Total;
                    this.totalSal += item.Saldo;                       
                    this.totalAna += item.analisis;   
                }
            }
        }
        //return totalDic;
    }

    calculateGroupActividad(fuente,idactividad: string) {    
      this.totalDic=0; 
      this.totalNov=0;            
      this.totalOct=0; 
      this.totalSet = 0; 
      this.totalAgo = 0; 
      this.totalJul = 0; 
      this.totalJun = 0; 
      this.totalMay = 0; 
      this.totalAbr = 0; 
      this.totalMar = 0; 
      this.totalFeb = 0; 
      this.totalEne = 0; 
      this.totalPim = 0;
      this.totalCer = 0;
      this.totalEje = 0;
      this.totalPro = 0;
      this.totalTot = 0;
      this.totalSal = 0;
      if(this.presupuesto) {                
          for(let item of this.presupuesto) {                                
              if(item.fuente === fuente && item.idactividad === parseInt(idactividad)) {                                       
                  this.totalDic += item.diciembre;
                  this.totalNov += item.noviembre;
                  this.totalOct += item.octubre;
                  this.totalSet += item.setiembre;
                  this.totalAgo += item.agosto;
                  this.totalJul += item.julio;
                  this.totalJun += item.junio;
                  this.totalMay += item.mayo;
                  this.totalAbr += item.abril;
                  this.totalMar += item.marzo;
                  this.totalFeb += item.febrero;
                  this.totalEne += item.enero;
                  this.totalPim += item.pim;                  
                  this.totalTot += item.Total;
                  this.totalSal += item.Saldo;                     
              }
          }
        //  console.log(this.totalPim);
      }
      //return totalDic;
  }

  calculateGroupEspecifica(fuente,idactividad,especifica: string) {    
    this.totalDic=0; 
    this.totalNov=0;            
    this.totalOct=0; 
    this.totalSet = 0; 
    this.totalAgo = 0; 
    this.totalJul = 0; 
    this.totalJun = 0; 
    this.totalMay = 0; 
    this.totalAbr = 0; 
    this.totalMar = 0; 
    this.totalFeb = 0; 
    this.totalEne = 0; 
    this.totalPim = 0;
    this.totalCer = 0;
    this.totalEje = 0;
    this.totalPro = 0;
    this.totalTot = 0;
    this.totalSal = 0;
    if(this.presupuesto) {                
        for(let item of this.presupuesto) {                                
            if(item.fuente === fuente && item.idactividad === parseInt(idactividad) && item.especifica == especifica) {                                       
                this.totalDic += item.diciembre;
                this.totalNov += item.noviembre;
                this.totalOct += item.octubre;
                this.totalSet += item.setiembre;
                this.totalAgo += item.agosto;
                this.totalJul += item.julio;
                this.totalJun += item.junio;
                this.totalMay += item.mayo;
                this.totalAbr += item.abril;
                this.totalMar += item.marzo;
                this.totalFeb += item.febrero;
                this.totalEne += item.enero;
                this.totalPim += item.pim;                  
                this.totalTot += item.Total;
                this.totalSal += item.Saldo;                     
            }
        }
      //  console.log(this.totalPim);
    }
    //return totalDic;
}

}
