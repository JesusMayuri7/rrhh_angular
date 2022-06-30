import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car} from './car';
import {Trabajador} from './trabajador'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CarService {
    
    constructor(private http: HttpClient) {}

    getCarsSmall() {
        return this.http.get('assets/data/cars-small.json')
                    .toPromise()
                    .then(res => <Car[]> res)
                    .then(data => { return data; });
    }

    getCarsMedium() {
        return this.http.get('assets/data/cars-small.json')
                    .toPromise()
                    .then(res => <Car[]> res)
                    .then(data => { return data; });
    }

    getCarsLarge(page,campo,orden) {
        return this.http.get('http://programacion.minsa/api/alta_vigente/'+campo+'/'+orden+'?page='+page)
                    .toPromise()
                    .then(res => <Trabajador[]> res)
                    .then(data => { return data; });
    }
}
