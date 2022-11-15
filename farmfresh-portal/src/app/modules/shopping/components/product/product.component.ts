import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/product-response';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CategoryResponse } from '../../models/category-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'farmfresh-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  modalOptions: any= {
    backdrop:'static',
    backdropClass:'customBackdrop'
  };

  total: number = 0;
  page: number = 1;
  itemPerPage: number = 1;
  pageSize: Promise<any> = new Promise((resolve) => resolve(this.itemPerPage));
  searchText: string = "";
  categorySearchId: number = 0; 

  categories: CategoryResponse[] = [];
  products: ProductResponse[] = [];
  modalProduct: ProductResponse = {
    id: 0,
    title: '',
    subTitle: '',
    keyInformation: '',
    price: 0,
    imageBase64: '',
    description: '',
    country: '',
    categories: []
  };

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: NgbModal,) { }

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
   });
  }
  
  loadProductsByCategory(categoryId: number) {
    this.categorySearchId = categoryId;
    this.loadProductsPage(1);
    this.closeModal();
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

  openProductModal(content: any){
    this.modalService.open(content, this.modalOptions);
  }

  loadModalProduct(product: ProductResponse) {
    this.modalProduct = product;
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
