import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'zd-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private routers: Router,
              private formBuilder: FormBuilder,
              private auth: AuthService) {
 
  }

  get formLogin() { return this.loginForm.controls; }

  ngOnInit() {
    localStorage.clear();
    this.auth.isLogged= false;
    this.initialForm();
  }

  initialForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [ '', Validators.required]
    });
  }

  onSubmit(values:any) {
    console.log('componente submit');
   // debugger;

/*     if (this.formLogin.email.status === 'INVALID' ||
        this.formLogin.password.status === 'INVALID') {
      return;
    } */

        this.auth.login(values.email, values.password)              
              .subscribe(response => {  
                   console.log('componente login');
                  this.routers.navigate(['v1']);
              });
  }
}
