import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority',
})
export class PriorityPipe implements PipeTransform {
  transform(value: number): string {
    return value === 0 ? 'низкий' : value === 1 ? 'средний' : 'высокий';
  }
}
