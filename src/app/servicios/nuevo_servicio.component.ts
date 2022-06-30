import { Component,OnInit,ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { ServiciosService } from '../service/servicios.service';
import {MessageService} from 'primeng/api';
import { isNumber } from 'util';
import { Observable } from 'apollo-link';


@Component({
    selector: 'zd-nuevo_servicio',
    templateUrl: './nuevo_servicio.component.html',
    styleUrls: ['./nuevo_servicio.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})

export class NuevoServicioComponent implements OnInit{
    form:FormGroup;
    submitted = false;
    loading = false;
    autorizaciones:any[];
    presupuestos:any[];
    condiciones:any[];
    tipos:any[];
    estados:any[];

    org_data:any;
    es:any;
    defaultDate:Date;


    constructor(private formBuilder: FormBuilder,
        public serviciosService:ServiciosService,public ref: DynamicDialogRef, public config: DynamicDialogConfig,private messageService: MessageService) {

    }

    currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0,10);
      }

    ngOnInit(){
        console.log(this.config.data);
        this.org_data=this.config.data;      
        
        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }
        this.defaultDate = new Date();
        this.form = this.formBuilder.group({            
            autorizacion: ['', Validators.required],
            condicion: ['', Validators.required],             
            servicio: ['', Validators.required],            
            detalle: [''],            
            org_area_id: ['', Validators.required],            
            org_unidad_id: ['', Validators.required],            
        });                      

        this.estados = [    
            { label: 'OCUPADO',value:{  pap: 'OCUPADO', matriz: 'OCUPADO'}},
            { label: 'VACANTE', value: { pap: 'VACANTE',matriz:'VACANTE' }},
            { label: 'OCUPADO_CF_CAS',value: { pap: 'OCUPADO_CF_CAS' , matriz:'OCUPADO'}},
            { label: 'OCUPADO_LSG', value: { pap: 'OCUPADO_LSG', matriz:'OCUPADO' }},
            { label: 'OCUPADO_PAC', value: { pap:'OCUPADO_PAC', matriz:'OCUPADO' }},
            { label: 'OCUPADO_PL_RES', value: { pap  : 'OCUPADO_PL_RES' , matriz:'OCUPADO'}},
            { label: 'OCUPADO_706', value: { pap :'OCUPADO_706', matriz:'OCUPADO' }}            
          ];     
          
        this.autorizaciones = [    
            { label: 'PVN',value:'PVN'},
            { label: 'MTC', value: 'MTC'},            
          ];     

        this.presupuestos = [    
            { label: 'GESTION',value:'GESTION'},
            { label: 'PRODUCTO', value: 'PRODUCTO'},
            { label: 'PROYECTO', value: 'PROYECTO'},
          ];  
          
        this.condiciones = [    
            { label: 'TEMPORAL',value:'TEMPORAL'},
            { label: 'PERMANENTE', value: 'PERMANENTE'},
            { label: 'PROYECTO', value: 'PROYECTO'},
          ];  
          
        this.tipos = [    
            { label: 'NUEVO',value:'NUEVO'},
            { label: 'CONTINUO', value: 'CONTINUO'},
          ];  
        //  this.matrizData();   
    }

    getNombres(dni){
        console.log('nombres',dni);
        this.loading = true;    
       /* this.serviciosService.getNombres(dni).subscribe(            
          (data)=> {
              console.log(data);
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
        );*/
    }

    matrizData(){
        this.loading = true;    
       /* this.capService.getMatrizData().subscribe(
          (data)=> {
            //this.areas=[];           
            
           // this.form.get('escala').updateValueAndValidity;
            //this.form.get('detalle').updateValueAndValidity;
           // this.form.markAllAsTouched;
            //this.form.markAsDirty;
            this.loading = false;            
          }     
        );*/
    }



    get f() { return this.form.controls;}  

    onSubmitNew() {        
      console.log(this.form.value);
        this.submitted = true;     
        this.form.patchValue({org_area_id:this.org_data.area.id});                        
        this.form.patchValue({org_unidad_id:this.org_data.unidad.id});     
        if (this.form.invalid) {
            console.log('invalido');
            return;
        }                        
            
            let parametro={autorizacion : this.form.get('autorizacion').value.value,
                           condicion : this.form.get('condicion').value.value,
                           servicio : this.form.get('servicio').value,
                           org_area_id : this.form.get('org_area_id').value,
                           org_unidad_id : this.form.get('org_unidad_id').value,
                           detalle : this.form.get('detalle').value
                            }
            console.log(parametro);
            this.serviciosService.postNuevoServicio(parametro)
                .subscribe(info => {                                        
                    this.ref.close(info);
            });      
        
        // display form values on success
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
    }



}

