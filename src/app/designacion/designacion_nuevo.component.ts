import { Component,OnInit,ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { DesignacionService } from '../designacion/designacion.service';
import {MessageService} from 'primeng/api';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { isNumber } from 'util';




@Component({
    selector: 'zd-nm',
    templateUrl: './designacion_nuevo.component.html',
    styleUrls: ['./designacion_nuevo.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})

export class DesignacionNuevoComponent implements OnInit{
    form:FormGroup;
    submitted = false;
    loading = false;
    escalas:any[];
    unidad:any[];
    estados:any[];
    contratos:any[];
    modalidades:any[];
    cap_data:any;
    es:any;
    defaultDate:Date;


    constructor(private formBuilder: FormBuilder,
        public desingacionService:DesignacionService,public ref: DynamicDialogRef, public config: DynamicDialogConfig,private messageService: MessageService) {

    }

    currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0,10);
      }

    ngOnInit(){
        this.cap_data=this.config.data.designaciones_data;      
        
        this.modalidades = [    
            { label: 'CAP', value: 'CAP'},
            { label: 'PAC',value:'PAC'},           
            { label: 'CAS',value: 'CAS' },
            { label: 'CONFIANZA',value: 'CONFIANZA' },
        ]; 

        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","M","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar',
            dateFormat: 'yy-mm-dd',
        }
        this.defaultDate = new Date();
        this.form = this.formBuilder.group({
            dni: ['', Validators.required],            
            trabajador_id:['',Validators.required],
            nombres: [''],            
            direccion: [''],            
            cargo: ['',Validators.required],            
            unidad: ['',Validators.required], 
            inicio: [this.defaultDate, Validators.required],
            fin: [''] ,            
            doc_designacion: [''],            
            doc_cese: [''],            
            detalle: ['', Validators.required],             
            modalidad:['CAP',Validators.required],
            id:[''],
        });                      
/*
        this.estados = [    
            { label: 'OCUPADO',value:{  pap: 'OCUPADO', matriz: 'OCUPADO'}},
            { label: 'VACANTE', value: { pap: 'VACANTE',matriz:'VACANTE' }},
            { label: 'OCUPADO_CF_CAS',value: { pap: 'OCUPADO_CF_CAS' , matriz:'OCUPADO'}},
            { label: 'OCUPADO_LSG', value: { pap: 'OCUPADO_LSG', matriz:'OCUPADO' }},
            { label: 'OCUPADO_PAC', value: { pap:'OCUPADO_PAC', matriz:'OCUPADO' }},
            { label: 'OCUPADO_PL_RES', value: { pap  : 'OCUPADO_PL_RES' , matriz:'OCUPADO'}},
            { label: 'OCUPADO_706', value: { pap :'OCUPADO_706', matriz:'OCUPADO' }}            
          ];          
*/
          this.matrizData();   
    }

    utcToLocal(date: Date): Date {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay()));
      }

    getNombres(dni){        
        this.loading = true;    
        this.desingacionService.getNombres(dni).subscribe(            
          (data)=> {
            console.log('nombres',data);
            if (data.status==1) {
              this.form.patchValue({nombres:data.data.nombres});
              this.form.patchValue({trabajador_id:data.data.idtrabajador}); 
            }
            else
            {
            this.form.patchValue({nombres:''});
            this.form.patchValue({trabajador_id:''});
            this.messageService.add({severity:'warn', summary: 'Personal no registrado', detail:'Escriba el nombre'});
            }
            //this.res = alasql('SELECT * FROM ? ',[this.servicios]);        
            this.loading = false;
            //this.calcularFooterTotal(this.funcional);            
          }     
        );
    }

    matrizData(){      
        console.log('cap_Data',this.cap_data);
        this.loading = true;    
        this.desingacionService.getUnidad().subscribe(
          (data)=> {          
            this.unidad=[];                        
            this.unidad = data['data'];       
            let unidad_id = this.unidad.findIndex(ob => (ob.id === this.cap_data.org_unidad_id));                     
            setTimeout(() => {
                this.form.patchValue({unidad: this.unidad[unidad_id]});
                //this.form.patchValue({estado: this.estados[estado_id]});                  
                //this.form.patchValue({tipo_contrato: 'FIJO'});                  
            }, 300);
            // actualizar valores del formulario
            if (this.cap_data){
                if (this.config.data.accion=='edit'){                    
                    console.log('inicio',this.cap_data.inicio,'fin',this.cap_data.fin);            
                     let finicio = this.cap_data.inicio? new Date(this.cap_data.inicio+' GMT-0500'):'';
                     let ffin =  isNaN(Date.parse(this.cap_data.fin))==false? new Date(this.cap_data.fin+' GMT-0500'):'';
                     console.log('fin',ffin);
                     
                     setTimeout(() => {
                         this.form.patchValue({modalidad: {'label':this.cap_data.modalidad,'value':this.cap_data.modalidad}});                         
                         //   this.form.patchValue({area: this.areas[area_id]});                        
                     //    console.log("modalidad",this.cap_data.modalidad,this.form.get('modalidad').value);                        
                        }, 300);                                                      
                        
                    this.form.patchValue({id:this.cap_data.id});                                                               
                    this.form.patchValue({dni: this.cap_data.dni});                    
                    this.form.patchValue({trabajador_id:this.cap_data.trabajador_id});
                    this.form.patchValue({nombres: this.cap_data.nombres});                         
                    this.form.patchValue({direccion: this.cap_data.direccion});                         
                    this.form.patchValue({cargo: this.cap_data.cargo});                         
                    this.form.patchValue({inicio: finicio});
                    this.form.patchValue({fin: ffin});                                         
                    this.form.patchValue({doc_designacion: this.cap_data.doc_designacion});
                    
                    this.form.patchValue({doc_cese: this.cap_data.doc_cese});                    
                    this.form.patchValue({detalle: this.cap_data.detalle});    
                    
                      //this.form.patchValue({escala:this.escalas[escala_id]});                        
                }
            }
           // this.form.get('escala').updateValueAndValidity;
            //this.form.get('detalle').updateValueAndValidity;
           // this.form.markAllAsTouched;
            //this.form.markAsDirty;
            this.loading = false;            
          }     
        );
    }



    get f() { return this.form.controls;}  

    onSubmitNew() {             
        this.submitted = true;        
        
        console.log("estado",this.form.value);
        if (this.form.invalid) {
            console.log('invalido');
            return;
        }
        
        if (!this.form.get('trabajador_id').value) {            
            if ((this.form.get('dni').value.length==8) && (this.form.get('nombres').value.length>10)) {
                let parametro={dni:this.form.get('dni').value,
                                nombres:this.form.get('nombres').value};
                this.desingacionService.postDni(parametro)
                .subscribe(info => {                    
                    this.form.patchValue({trabajador_id:info.data.trabajador_id});                        
                    this.desingacionService.postMatriz(this.form.value).subscribe(info => {                                        
                    this.ref.close(info);
            });        
                });         
            }
            else
            this.messageService.add({severity:'warn', summary: 'Personal', detail:'Verifique el dni y nombres'});
        }
        else {
            let finicio = this.form.get('inicio').value? new Date(this.form.get('inicio').value).toISOString().substring(0,10) : '';
            let ffin = this.form.get('fin').value? new Date(this.form.get('fin').value).toISOString().substring(0,10) : '';            

            this.form.patchValue({inicio: finicio});
            this.form.patchValue({fin: ffin});            
            console.log("listo",this.form.value);
            this.desingacionService.postMatriz(this.form.value)
                .subscribe(info => {                    
                    this.ref.close(info);
            });        
        } 
    }



}

