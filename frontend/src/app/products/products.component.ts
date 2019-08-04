import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "../product.service";
import { Product } from './../product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  name: string;
  price: number;
  ratings: any[]
  selectedValue = null;
  products: any[];
  selectedItem: any = {};

  constructor(private http: HttpClient, private router: Router, public productService: ProductService) {
    this.getAllproducts();
    // checking condition for logged in user if not logged in redirecting to login page;
    //we can handle it by AuthGaurd for every protected routes.
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      this.router.navigate(['/login']);
    }
    this.ratings = [1, 2, 3, 4, 5, 6];
  }

  ngOnInit() {
    this.getAllproducts();// loading all products.
  }

/**
 * updating the selected product
 */
  edit() {
    let data = {
      _id: this.selectedItem._id,
      name: this.name,
      price: this.price,
      rating: this.selectedValue
    }
    this.productService.updateProduct(data)
      .subscribe(data => {
        this.getAllproducts();
        this.clear();
      });
  }
  /**
   * getting all created products from backend
   */

  getAllproducts() {
    return this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    })
  }
  /**
   * creating product
   */
  add() {
    let data = {
      _id: '',
      name: this.name,
      price: this.price,
      rating: this.selectedValue
    }
    this.productService.createProduct(data).subscribe((data) => {
      this.getAllproducts();
      this.clear();
    })
  }

  /**
   * deleting selected product list item and clearing field.
   */
  delete() {
    this.productService.deleteProduct(this.selectedItem._id).subscribe(data => {
      console.log(data);
      this.getAllproducts();
      this.clear()
    });
  }

  /**
   * clearing the products input form field on cancel
  */
  cancel() {
    this.clear();
  }

  /**
   * clearing the products input form field
  */
  clear() {
    this.name = "";
    this.price = null;
    this.selectedValue = "";
  }

  listClick(event, newValue) {
    this.selectedItem = newValue;
    this.name = newValue.name;
    this.price = newValue.price;
    this.selectedValue = newValue.rating;
  }
  /*
  logout: clearing localstorage
  */
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
