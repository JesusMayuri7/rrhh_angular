import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AirHspService {
    private readonly API= `${environment.API}`;

    constructor(private http: HttpClient) {

    }

    
    getAirHsp() {        
      return this.http.get(this.API+'activos/airhsp')     
    }
    
}
