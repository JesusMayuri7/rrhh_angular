import { Component,OnInit,ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { AirhspCasService } from './airhsp_cas.service';
import {MessageService} from 'primeng/api';
import { isNumber } from 'util';

@Component({
    selector: 'zd-airhsp_cas-nuevo',
    templateUrl: './airhsp_cas_nuevo.component.html',
    styleUrls: ['./airhsp_cas_nuevo.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})

export class AirhspCasNuevoComponent implements OnInit{
    form:FormGroup;
    submitted = false;
    loading = false;
    escalas:any[];
    unidades:any[];
    estados:any[];
    contratos:any[];
    nuevos:any[];
    modalidades:any[];
    cap_data:any;
    es:any;
    defaultDate:Date;
    convocatorias:any[];

    constructor(private formBuilder: FormBuilder,
        public airhspCasService:AirhspCasService,public ref: DynamicDialogRef, public config: DynamicDialogConfig,private messageService: MessageService) {

    }

    currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0,10);
      }

    ngOnInit(){
        this.cap_data=this.config.data.designaciones_data;      
        
        this.modalidades = [    
            { label: 'Cas',value: 'CAS' },
            { label: 'Cap', value: 'CAP'},
            { label: 'Pac',value:'PAC'},           
            { label: 'Confianza',value: 'CONFIANZA' },
        ]; 

        this.nuevos = [    
            { label: 'Nuevo', value: 'NUEVO'},
            { label: 'Reemplazo',value:'REEMPLAZO'}            
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
            dni: [''],            
            trabajador_id:[''],
            nombres: [''],            
            nuevo: [{label:'Nuevo',value:'NUEVO'},Validators.required],            
            monto: ['0'],            
            nro_convocatoria: [''],            
            cargo: ['',Validators.required],            
            certificacion: ['I-',Validators.required],            
            unidad: ['',Validators.required],                         
            detalle: [''],             
            airhsp_id: ['',Validators.required],             
            codigo_plaza: ['',Validators.required],             
            tipo:[{label:'Cas',value:'CAS'},Validators.required],            
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
        this.airhspCasService.getNombres(dni).subscribe(            
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
        this.airhspCasService.getDireccion().subscribe(
          (data)=> {          
            this.unidades=[];                        
            this.unidades = data['data'];                   
            this.convocatorias =this.config.data.convocatorias; 
            console.log(this.convocatorias);           
            let unidad_id = this.unidades.findIndex(ob => (ob.id === this.cap_data.bc_org_unidad_id));  
            this.form.patchValue({airhsp_id: this.cap_data.id});    
            //this.form.patchValue({nro_convocatoria: this.convocatorias});    
            this.form.patchValue({codigo_plaza: this.cap_data.codigo_plaza});                                           
            this.form.patchValue({monto: this.cap_data.monto}); 
            this.form.patchValue({cargo: this.cap_data.cargo});  
            setTimeout(() => {                
                this.form.patchValue({unidad: this.unidades[unidad_id]});
                //this.form.patchValue({estado: this.estados[estado_id]});                  
                //this.form.patchValue({tipo_contrato: 'FIJO'});                  
            }, 300);
            // actualizar valores del formulario
            if (this.cap_data){
                if (this.config.data.accion=='edit'){                                                              
                     setTimeout(() => {                        
                        this.form.patchValue({codigo_plaza: this.cap_data.codigo_plaza});                                                                           
                        this.form.patchValue({certificacion: this.cap_data.certificacion? this.cap_data.certificacion:'I-'});                                       
                        this.form.patchValue({tipo: {label:  this.cap_data.modalidad.charAt(0).toUpperCase() + this.cap_data.modalidad.toLowerCase().slice(1), value:this.cap_data.modalidad}});             
                        this.form.patchValue({nuevo: {label: this.cap_data.nuevo.charAt(0).toUpperCase() + this.cap_data.nuevo.toLowerCase().slice(1), value:this.cap_data.nuevo}});                                     
                        }, 300);                                                                                       
                    this.form.patchValue({id: this.cap_data.conv_id});                                                                                
                    this.form.patchValue({dni: this.cap_data.dni});                    
                    this.form.patchValue({nro_convocatoria: this.cap_data.nro_convocatoria});                                       
                    this.form.patchValue({nombres: this.cap_data.nombres});                                                                   
                    this.form.patchValue({cargo: this.cap_data.cargo});                                                                                     
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
        console.log("estado",this.form.value);
        if (this.form.invalid) {
            console.log('invalido');
            return;
        }        
        this.submitted = true;                
            this.airhspCasService.postConvocatoria(this.form.value)
                .subscribe(info => {     

                    this.ref.close(info);
            });                 
    }
}

