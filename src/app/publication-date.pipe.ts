import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import 'moment/locale/es';
import { Product } from './product';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Blue Path                                                        |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Crea el pipe PublicationDatePipe. Su cometido es, partiendo de   |
| una fecha dada, retornar una cadena de texto que exprese el      |
| tiempo que ha pasado desde dicha fecha hasta ahora. Por ejemplo: |
| hace 2 horas. Para esta tarea nos apoyamos en la librería        |
| Moment.js; ya tienes hecho el import correspondiente, solo       |
| tienes que usarla donde proceda. Haciendo                        |
| 'moment(fecha).fromNow()' obtenemos justo lo que necesitamos.    |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


@Pipe({
  name: 'PublicationDate'
})
export class PublicationDatePipe implements PipeTransform {
    
  transform(value: number): string {
      let date = new Date(value);

      return moment(date).fromNow();
  }
}






