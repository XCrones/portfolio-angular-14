import { Pipe, PipeTransform } from '@angular/core';
import { IProductsV2 } from '../../services/products_v2/products-v2.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(products: IProductsV2[], search: string): IProductsV2[] {
    return products.filter((v) =>
      v.title.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
  }
}
