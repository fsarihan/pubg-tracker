import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchOrder'
})
export class MatchOrderPipe implements PipeTransform {
  transform(array: any[], field?: string): any[] {
    for (const i in array) {
      if (array[i].type !== 'participant') {
        delete array[i];
      }
    }
    array.sort((a: any, b: any) => {
      if (a['attributes'].stats.winPlace < b['attributes'].stats.winPlace) {
        return -1;
      } else if (a['attributes'].stats.winPlace > b['attributes'].stats.winPlace) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
