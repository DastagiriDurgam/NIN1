import { Pipe, Injectable, PipeTransform } from '@angular/core';


@Pipe({
  name: 'printnumbers'
})
@Injectable()
export class PrintNumbersPipe implements PipeTransform {
  transform(value, obj) {    

    let arr = new Array();
    let totalNumber = (value-obj.start) ;  
    for (let i = 0; i < totalNumber; i++) {
       arr[i] = obj.start + i;
       if(arr[i]==value)
       break;
    }
    return (arr);
  }
}