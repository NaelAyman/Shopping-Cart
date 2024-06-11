import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'https://fakestoreapi.com/';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(this.baseUrl + 'products');
  }

  getAllCategories() {
    return this.http.get(this.baseUrl + 'products/categories');
  }

  getProductByCategory(category: string) {
    return this.http.get(this.baseUrl + 'products/category/' + category);
  }

  getProductsDetails(id: any) {
    return this.http.get(this.baseUrl + 'products/' + id);
  }

}
