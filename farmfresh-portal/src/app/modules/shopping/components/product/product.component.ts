import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/product-response';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CategoryResponse } from '../../models/category-response';

@Component({
  selector: 'farmfresh-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  total: number = 0;
  page: number = 1;
  itemPerPage: number = 10;
  pageSize: Promise<any> = new Promise((resolve) => resolve(this.itemPerPage));
  searchText: string = "";
  categorySearchId: number = 0; 

  categories: CategoryResponse[] = [];
  products: ProductResponse[] = [];

  constructor(private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.loadAllCategories();
    this.loadPaginatedProductsData();
  }

  loadProductsPage(page : any) {
    this.productService.getAllPaginatedProducts(page,
       this.itemPerPage,
       this.searchText,
       this.categorySearchId)
   .subscribe((response: any) => {
     this.products = response.products;
     this.products.map((product => 
        product.imageBase64 = "data:image/jpg;base64," + product.imageBase64));

     this.total = response.pagingInfo.total;

     this.page = this.page < Math.round(this.total/this.itemPerPage) ?
        this.page + 1 : 1;
   });
  }
  
  loadProductsByCategory(categoryId: number) {
    this.categorySearchId = categoryId;
    this.loadProductsPage(1);
  }

  searchByProductTitle(productTitle: string) {
    this.searchText = productTitle;
    console.log(this.searchText)
    this.loadProductsPage(1);
    
  }

  loadPaginatedProductsData() {
    this.loadProductsPage(this.page);
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
    }, err => {      
    });
  }
}
