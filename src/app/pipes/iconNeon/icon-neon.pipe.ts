import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconNeon',
})
export class IconNeonPipe implements PipeTransform {
  transform(stateNeon: boolean): string {
    return stateNeon ? 'lightbulb' : 'lightbulb_outline';
  }
}
