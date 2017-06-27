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

  // Como el parámetro que se recibe es el ID del producto, que es un number, el tipo del EventEmitter también es de tipo number.
  @Output() clickEnComprar = new EventEmitter<number>();

  itemSeleccionado(idItem: number): void {
    console.log(idItem);
    this.clickEnComprar.emit(idItem);
  }
}
