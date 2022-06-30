import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'millonPeople'
})
export class MillonPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    var valor= value+'';
    if (valor.length>=9)  {
        console.log(valor);
        let indice=valor.indexOf(",",0); 
        console.log(indice);
        if (indice>0){          
            const replaceWith = "'";
            //'Hello RegEx!'.replace(/^(.{11})(.)/, `$1p`);
            return replaceAt(valor,indice,replaceWith);            
        }
    }
    return valor;
  }  
}

function replaceAt(cadena,index, replacement) {
    return cadena.substr(0, index) + replacement+ cadena.substr(index + replacement.length);
}