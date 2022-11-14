import { ProductResponse } from './../../models/product-response';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CategoryResponse } from '../../models/category-response';

@Component({
  selector: 'farmfresh-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  total: number = 0;
  page: number = 1;
  itemPerPage: number = 10;
  pageSize: Promise<any> = new Promise((resolve) => resolve(this.itemPerPage));

  categories: CategoryResponse[] = [];
  products: ProductResponse[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadAllCategories();
    this.loadPaginatedProductsData();
  }

  loadPage(page : any) {
  }

  loadPaginatedProductsData() {
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
    }, err => {      
    });
  }
}
