import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router'; // Importo el 'Router'

import { Product } from '../product';
import { ProductFilter } from '../product-filter';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-collection',
  templateUrl: './products-collection.component.html',
  styleUrls: ['./products-collection.component.css']
})
export class ProductsCollectionComponent implements OnDestroy, OnInit {

  products: Product[];
  private _filterStream$: Subject<ProductFilter> = new Subject;

  constructor(
    private _productService: ProductService,
    private _router: Router) { }

  ngOnInit(): void {
    this._filterStream$
      .switchMap((filter: ProductFilter) => this._productService.getProducts(filter))
      .subscribe((products: Product[]) => this.products = products);
    this.filterCollection(null);
  }

  ngOnDestroy(): void {
    this._filterStream$.unsubscribe();
  }

  filterCollection(filter: ProductFilter): void {
    this._filterStream$.next(filter);
  }
  
  // Implemente el manejador del evento recibido en el template.
  mostrarDetalle(idItem: number): void {
    this._router.navigate(['/products', idItem]);
  }

} 
