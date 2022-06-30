import { Component,OnInit,ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { ServiciosService } from '../service/servicios.service';


@Component({
    selector: 'zd-ep',
    templateUrl: './editar_personal.component.html',
    styleUrls: ['./editar_personal.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class EditarPersonal implements OnInit{
    form:FormGroup;
    submitted = false;
    loading = false;
    es:any;
    constructor(private formBuilder: FormBuilder, public serviciosService:ServiciosService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

    }

    ngOnInit(){
        console.log('CONFIG',this.config.data);

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
        
        if (this.config.data.personal)
        {
            let inicio= new Date(this.config.data.personal.inicio).toISOString().substring(0,10);
            
            this.form = this.formBuilder.group({
                nro_pedido: [this.config.data.personal.nro_pedido],
                servicio_id:[this.config.data.personal.servicios_id],
                id:[this.config.data.personal.id],
                orden: [this.config.data.personal.orden],
                servicio: [this.config.data.personal.servicio, Validators.required],
                inicio: [inicio, Validators.required], 
                tiempo_servicio: [this.config.data.personal.tiempo_servicio, Validators.required],
                mensual: [this.config.data.personal.mensual, Validators.required],
                detalle: [this.config.data.personal.detalle],
                total: [this.config.data.personal.total,Validators.required],            
                expediente: [this.config.data.personal.expediente], 
            });
            /*setTimeout(() => {
                this.form.patchValue({inicio: inicio});                        
                }, 300);*/
        }
    }

    get f() { return this.form.controls;}  

    onSubmit() {
        console.log(this.form.value);
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.serviciosService.postNuevoPersonal(this.form.value)
        .subscribe(info => {            
            this.ref.close(info);
        });

         
        // display form values on success
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
    }

}

