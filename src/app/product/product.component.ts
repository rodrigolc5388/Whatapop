import { Component, Input, Output, EventEmitter } from '@angular/core';
// Importo Output y EventEmitter
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() data: Product;

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Green Path                                                       |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Expón un atributo de salida con el decorador correspondiente. El |
  | tipo de dicho atributo debe permitir la emisión de eventos; la   |
  | idea es enviar al componente padre el producto sobre el cuál se  |
  | ha hecho clic. Y puesto que dicho clic se realiza en el template |
  | de este componente, necesitas, además, un manejador para el      |
  | mismo.                                                           |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  // Como el parámetro que se recibe es el ID del producto, que es un number, el tipo del EventEmitter también es de tipo number.
  @Output() clickEnComprar = new EventEmitter<number>();

  itemSeleccionado(idItem: number): void {
    console.log(idItem);
    this.clickEnComprar.emit(idItem);
  }
}
