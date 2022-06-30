import { Component,OnInit,ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { ServiciosService } from '../service/servicios.service';


@Component({
    selector: 'zd-np',
    templateUrl: './nuevo_personal.component.html',
    styleUrls: ['./nuevo_personal.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class NuevoPersonal implements OnInit{
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

        this.form = this.formBuilder.group({
            nro_pedido: ['', Validators.required],
            servicio_id:[this.config.data.servicio_id],
            orden: [''],
            servicio: [''],
            inicio: [''], 
            tiempo_servicio: ['', Validators.required],
            mensual: ['',Validators.required],
            detalle: [''],
            total: ['', Validators.required],            
            expediente: [''], 
        });
    }

    get f() { return this.form.controls;}  

    onSubmit() {        
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.serviciosService.postNuevoPersonal(this.form.value)
        .subscribe(info => {

            console.log('grabando');
            this.ref.close(info);
        });

         
        // display form values on success
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
    }

}

