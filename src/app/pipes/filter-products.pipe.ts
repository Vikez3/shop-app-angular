import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../../assets/data';

@Pipe({
  name: 'filterProducts',
  standalone: true,
})
export class FilterProductsPipe implements PipeTransform {
  transform(arr: ProductType[], prop: string): ProductType[] {
    if (!arr || !prop) {
      return arr;
    }
    const filteredArr = arr.filter((el) => el.productType === prop);
    return filteredArr;
  }
}
