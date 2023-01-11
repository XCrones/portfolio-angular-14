import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    let getTime = value.split('T')[1];
    let time = getTime.split(':');
    time.pop();
    return time.join(':');
  }
}
