import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './service/auth.service';

@Component({
	selector: 'zd-shell',
	templateUrl: './app.component.html',
	//styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	

    constructor(private authService: AuthService,private router:Router) {}
    ngOnInit(): void {
        this.authService.autenticated().pipe( 
            map(res => {
            if(res['token'])  
            {              
              localStorage.setItem('token', res['token']);                                   
            } 
            this.router.navigate((['/login']));             
          })); 
    }
}
