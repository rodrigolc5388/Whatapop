import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ProductFilter } from '../product-filter';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy, OnInit {

  @Output() onSearch: EventEmitter<ProductFilter> = new EventEmitter();

  productFilter: ProductFilter = {};
  categories: Category[];
  private _categoriesSubscription: Subscription;
  private _productState: any;

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoriesSubscription = this._categoryService
      .getCategories()
      .subscribe((data: Category[]) => this.categories = data);

      this._productState = [
        {'id':'selling',
         'value':'A la venta'
        },
        {'id':'sold',
         'value':'Vendido'
        }
      ];
  }

  ngOnDestroy(): void {
    this._categoriesSubscription.unsubscribe();
  }

  notifyHost(): void {

    // Este console.log sí me devuelve un objeto con las
    // opciones seleccionadas en el filtro.
    console.log('notifyHost', this.productFilter);
    this.onSearch.emit(this.productFilter);
  }

  clearFilter(): void {
    //this.onSearch.emit(null);
    
    // El botón no funciona; aparentemente el código está bien pero
    // el console.log no arroja nada.
    this.productFilter = {};
    console.log('clearFilter', this.productFilter);
    this.notifyHost();
  }

}
