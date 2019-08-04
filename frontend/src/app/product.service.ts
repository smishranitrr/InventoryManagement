import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getAllProducts() {
    return this.http.get<Product[]>(this.apiURL + '/products/getAll')
  }

  createProduct(product: Product){
    return this.http.post(this.apiURL+ '/products/create', product);
  }

  getProductById(id: string){
    return this.http.get<Product>(this.apiURL + 'products' + '/' + id);
  }

  deleteProduct(id){
    return this.http.delete(this.apiURL + '/products/'+id+'/delete', this.httpOptions)
  }

  updateProduct(product: Product){
    return this.http.put(this.apiURL + '/products/'+ product._id+'/update', product);
  }
}
