import { Pipe, PipeTransform } from '@angular/core';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(products: Array<IProductsV2>, search: string): IProductsV2[] {
    return products.filter((v) =>
      v.title.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
  }
}
