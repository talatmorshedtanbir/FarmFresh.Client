import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'farmfresh-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  isMenuActive: boolean = false;
  sideMenuClass = "side-menu";
  bodyClass = "menu-full";
  
  constructor(
    private router: Router) { 
    }

  ngOnInit(): void {
  }

 toggleMenu() {
   if(this.sideMenuClass === "side-menu") {
      this.sideMenuClass = "toggled-2";
      this.bodyClass = "menu-toggled";
    
      const sideBar = document.querySelector<HTMLElement>('body main .menu-full')!;
      sideBar.style.marginLeft = '50px';
   }
   else {
      this.sideMenuClass = "side-menu";
      this.bodyClass = "menu-full";

      const sideBar = document.querySelector<HTMLElement>('body main .menu-toggled')!;
      sideBar.style.marginLeft = '300px';
   }
 }
}
