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

}
