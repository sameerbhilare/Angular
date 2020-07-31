import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // forcing updates in each input data change. By defalt this is true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propertyName: string): any {
    
    if(value.length === 0 || filterString == null || filterString == ''){
      return value;
    } else {
      const returnArray = [];
      for(const item of value ) {
        if(item[propertyName] === filterString ) {
          returnArray.push(item);
        }
      }
      return returnArray;
    }
  }

}
