import { Component,OnInit,ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { CapService } from '../service/cap.service';
import {MessageService} from 'primeng/api';
import { isNumber } from 'util';
import { Observable } from 'apollo-link';



@Component({
    selector: 'zd-nm',
    templateUrl: './nuevo_matriz.component.html',
    styleUrls: ['./nuevo_matriz.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})

export class NuevoMatrizComponent implements OnInit{
    form:FormGroup;
    submitted = false;
    loading = false;
    escalas:any[];
    areas:any[];
    estados:any[];
    contratos:any[];
    modalidades:any[];
    cap_data:any;
    es:any;
    defaultDate:Date;


    constructor(private formBuilder: FormBuilder,
        public capService:CapService,public ref: DynamicDialogRef, public config: DynamicDialogConfig,private messageService: MessageService) {

    }

    currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0,10);
      }

    ngOnInit(){
        this.cap_data=this.config.data.cap_data;      
        
        this.contratos = [    
            { label: 'FIJO', value: 'FIJO'},
            { label: 'INDETERMINADO',value:'INDETERMINADO'},
            { label: 'CONFIANZA',value: 'CONFIANZA' },
        ];  

        this.modalidades = [    
            { label: 'CAP', value: 'CAP'},
            { label: 'PAC',value:'PAC'},           
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
            idpap:[this.config.data.cap_data.idpap],
            idtrabajador:[''],
            nombres: [''],
            escala: ['', Validators.required],
            area: [''], 
            inicio: [this.defaultDate, Validators.required],
            fin: [''] ,
            tipo_contrato:['FIJO',Validators.required],
            nro_documento: ['', Validators.required],
            fecha_documento: [''],            
            nro_documento_fin: [''],
            fecha_documento_fin: [''],            
            estado: ['', Validators.required], 
            detalle: ['', Validators.required], 
            pap: [false], 
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
        this.capService.getNombres(dni).subscribe(            
          (data)=> {
            if (data.status==1) {
              this.form.patchValue({nombres:data.data.nombres});
              this.form.patchValue({idtrabajador:data.data.idtrabajador}); 
            }
            else
            {
            this.form.patchValue({nombres:''});
            this.form.patchValue({idtrabajador:''});
            this.messageService.add({severity:'warn', summary: 'Personal no registrado', detail:'Escriba el nombre'});
            }
            //this.res = alasql('SELECT * FROM ? ',[this.servicios]);        
            this.loading = false;
            //this.calcularFooterTotal(this.funcional);            
          }     
        );
    }

    matrizData(){      
        this.loading = true;    
        this.capService.getMatrizData().subscribe(
          (data)=> {
            this.escalas=[];
            this.areas=[];
            this.estados=[];
            this.escalas = data['escala'];
            this.areas = data['area'];
            this.estados = data['estado'];
            let escala_id = this.escalas.findIndex(ob => (ob.id === this.cap_data.PapIdEscala));                                                        
            let estado_id = this.estados.findIndex(ob => (ob.id === this.cap_data.papIdEstado));       
            setTimeout(() => {
                this.form.patchValue({escala: this.escalas[escala_id]});
                this.form.patchValue({estado: this.estados[estado_id]});                  
                this.form.patchValue({tipo_contrato: 'FIJO'});                  
             }, 300);
                        
            // actualizar valores del formulario
            if (this.cap_data){
                if (this.config.data.accion=='edit'){                    
                    let finicio = this.cap_data.inicio? new Date(this.cap_data.inicio).toISOString().substring(0,10) : '';
                    let ffin = this.cap_data.fin? new Date(this.cap_data.fin).toISOString().substring(0,10):'';
                    let area_id = this.areas.findIndex(ob => (ob.id === this.cap_data.MtxAreaId));                                         
                    console.log("modalidad",this.cap_data.modalidad,this.form.get('modalidad').value);
                    console.log("tipo_contrato",this.cap_data.tipo_contrato,this.form.get('tipo_contrato').value);
                    setTimeout(() => {
                        this.form.patchValue({modalidad: {'label':this.cap_data.modalidad,'value':this.cap_data.modalidad}}); 
                        this.form.patchValue({tipo_contrato: {'label':this.cap_data.tipo_contrato,'value':this.cap_data.tipo_contrato}}); 
                        this.form.patchValue({area: this.areas[area_id]});                        
                        console.log("modalidad",this.cap_data.modalidad,this.form.get('modalidad').value);
                        console.log("tipo_contrato",this.cap_data.tipo_contrato,this.form.get('tipo_contrato').value);
                    }, 300);                                                      
                    this.form.patchValue({dni:this.cap_data.MtxDni});                                                             
                    this.form.patchValue({id:this.cap_data.MtxId});                                                               
                    this.form.patchValue({dni: this.cap_data.MtxDni});
                    this.form.patchValue({idpap:this.cap_data.idpap});
                    this.form.patchValue({idtrabajador:this.cap_data.idtrabajador});
                    this.form.patchValue({nombres: this.cap_data.MatrizNombres});                         
                    this.form.patchValue({inicio: finicio});
                    this.form.patchValue({fin: ffin});                                         
                    this.form.patchValue({nro_documento: this.cap_data.nro_documento});
                    this.form.patchValue({fecha_documento: this.cap_data.fecha_documento});                 
                    this.form.patchValue({nro_documento_fin: this.cap_data.nro_documento_fin});
                    this.form.patchValue({fecha_documento_fin: this.cap_data.fecha_documento_fin});                 
                    this.form.patchValue({detalle: this.cap_data.detalle});    
                    console.log('pathc',this.form.value);
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
        //this.form.patchValue({inicio:this.form.get('inicio').value)});                        
        //console.log(this.utcToLocal(this.form.get('inicio').value));        
        console.log("estado",this.form.value);
        if (this.form.invalid) {
            console.log('invalido');
            return;
        }
        
        if (!this.form.get('idtrabajador').value) {            
            if ((this.form.get('dni').value.length==8) && (this.form.get('nombres').value.length>10)) {
                let parametro={dni:this.form.get('dni').value,
                                nombres:this.form.get('nombres').value};
                this.capService.postDni(parametro)
                .subscribe(info => {                    
                    this.form.patchValue({idtrabajador:info.data.idtrabajador});                        
                    this.capService.postMatriz(this.form.value).subscribe(info => {                                        
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
            let ffecha_documento = this.form.get('fecha_documento').value? new Date(this.form.get('fecha_documento').value).toISOString().substring(0,10) : '';
            let ffecha_documento_fin = this.form.get('fecha_documento_fin').value? new Date(this.form.get('fecha_documento_fin').value).toISOString().substring(0,10) : '';                        

            this.form.patchValue({inicio: finicio});
            this.form.patchValue({fin: ffin}); 
            this.form.patchValue({fecha_documento: ffecha_documento}); 
            this.form.patchValue({fecha_documento_fin: ffecha_documento_fin}); 
            console.log("listo",this.form.value);
            this.capService.postMatriz(this.form.value)
                .subscribe(info => {                    
                    this.ref.close(info);
            });        
        }        
    }



}

