import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BackendUri } from './app-settings';
import { Product } from './product';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }

  getProducts(filter: ProductFilter = undefined): Observable<Product[]> {
    //console.log('getProducts', filter);
    let filtro: any;

    // RedPath - Filtros por texto y categoría
    if (filter) {
      if (filter.text) {
        filtro = `&q=${filter.text}`;
      }
      // Filtro por categoría
      if (filter.category && filter.category !== '0') {
        filtro += `&category.id=${filter.category}`
      }

      // YellowPath - Filtro por state del producto.
      if (filter.state){
        filtro += `&state=${filter.state}`;
      }

      if (filter.maxPrice != null && filter.maxPrice !== 0){
        filtro += `&price_lte=${filter.maxPrice}`
      } 

      if (filter.minPrice && filter.minPrice !== 0){
        filtro += `&price_gte=${filter.minPrice}`
      }
    }

    return this._http
      .get(`${this._backendUri}/products?_sort=publishedDate&_order=DESC${filtro}`)
      .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
  }

  getProduct(productId: number): Observable<Product> {
    return this._http
      .get(`${this._backendUri}/products/${productId}`)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  buyProduct(productId: number): Observable<Product> {
    const body: any = { 'state': 'sold' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  setProductAvailable(productId: number): Observable<Product> {
    const body: any = { 'state': 'selling' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

}
