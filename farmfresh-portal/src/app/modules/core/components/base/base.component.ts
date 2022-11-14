import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductComponent } from 'src/app/modules/shopping/components/product/product.component';

@Component({
  selector: 'farmfresh-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  isMenuActive: boolean = false;
  sideMenuClass = "side-menu";
  bodyClass = "menu-full";

  activatedComponentReference:any;

  constructor(
    private router: Router) { 
    }

  ngOnInit(): void {
  }


  onActivate(activatedComponentReference : any) {
    this.activatedComponentReference = activatedComponentReference;
  }

  searchProduct(productName : string) {
    const productComponent = this.activatedComponentReference as ProductComponent;
    
    productComponent.searchByProductTitle(productName);
  }
}
