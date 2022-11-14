import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductComponent } from 'src/app/modules/product/components/product/product.component';

@Component({
  selector: 'farmfresh-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  isMenuActive: boolean = false;
  sideMenuClass = "side-menu";
  bodyClass = "menu-full";
  
  activatedComponentReference:any

  constructor(
    private router: Router) { 
    }

  ngOnInit(): void {
  }


  onActivate(activatedComponentReference : any) {
    this.activatedComponentReference = activatedComponentReference;
  }

  onBtnClick() {
    const productComponent = this.activatedComponentReference as ProductComponent;
    //productComponent.childFunction();
 }
}
